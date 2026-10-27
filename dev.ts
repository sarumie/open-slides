import { spawn } from 'bun';
import prompts from 'prompts';
import { createViteConfig } from '@open-slide/core/vite';
import { createServer } from 'vite';
import { createPresenterSyncPlugin } from './presenter-sync';

const { provider } = await prompts({
  type: 'select',
  name: 'provider',
  message: 'Select tunnel provider:',
  choices: [
    { title: 'Cloudflare (cloudflared)', value: 'cloudflared' },
    { title: 'Ngrok', value: 'ngrok' },
  ],
  initial: 0,
});

if (!provider) {
  process.exit(0);
}

// ponytail: in-process Vite dev server with WebSocket presenter sync; upgrade to standalone proxy if multi-server clustering needed.
const base = await createViteConfig({ userCwd: process.cwd() });
base.plugins = base.plugins || [];
base.plugins.push(createPresenterSyncPlugin());

const server = await createServer({
  ...base,
  server: {
    ...base.server,
    host: true,
  },
});

await server.listen();
server.printUrls();

const port = server.config.server.port ?? 5173;

let tunnelProc: ReturnType<typeof spawn> | null = null;

if (provider === 'cloudflared') {
  tunnelProc = spawn(['bunx', 'cloudflared', 'tunnel', '--url', `http://localhost:${port}`], {
    stdout: 'pipe',
    stderr: 'pipe',
  });

  (async () => {
    const reader = tunnelProc.stderr.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const text = decoder.decode(value);
      const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
      if (match) {
        console.log(`\n  \x1b[32m➜\x1b[0m  \x1b[1mCloudflare:\x1b[0m \x1b[36m${match[0]}\x1b[0m\n`);
        break;
      }
    }
  })();
} else {
  // bunx fails to spawn ngrok's bundled native binary on Windows ("could not create process"),
  // so fall back to npx there; everywhere else bunx is fine.
  const runner = process.platform === 'win32' ? ['npx', '--yes', 'ngrok'] : ['bunx', 'ngrok'];
  const proc = spawn([...runner, 'http', String(port)], {
    stdout: 'ignore',
    stderr: 'pipe',
  });
  tunnelProc = proc;

  // ngrok writes its failure reason to stderr and exits; surface it instead of hanging silently.
  let stderrTail = '';
  const stderrDone = (async () => {
    const decoder = new TextDecoder();
    for await (const chunk of proc.stderr) stderrTail = (stderrTail + decoder.decode(chunk)).slice(-2000);
  })();

  // Poll ngrok local API until tunnel is established and print URL
  (async () => {
    for (let i = 0; i < 20; i++) {
      await Bun.sleep(500);
      try {
        const res = await fetch('http://127.0.0.1:4040/api/tunnels');
        if (res.ok) {
          const data = await res.json();
          const url = data.tunnels?.[0]?.public_url;
          if (url) {
            console.log(`\n  \x1b[32m➜\x1b[0m  \x1b[1mNgrok:\x1b[0m      \x1b[36m${url}\x1b[0m\n`);
            return;
          }
        }
      } catch {
        // ngrok not ready yet
      }
      if (proc.exitCode !== null) break;
    }
    await proc.exited;
    await stderrDone;
    console.error(
      `\n  \x1b[31m➜\x1b[0m  \x1b[1mNgrok:\x1b[0m no tunnel after 10s${stderrTail ? `\n${stderrTail.trim()}` : ''}\n`,
    );
  })();
}

const cleanup = async () => {
  await server.close();
  tunnelProc?.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

