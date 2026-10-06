import { spawn } from 'bun';

// ponytail: basic process supervision; upgrade to a task runner if more services are added.
const dev = spawn(['bun', 'x', 'open-slide', 'dev'], {
  stdout: 'inherit',
  stderr: 'inherit',
  stdin: 'inherit',
});

const ngrok = spawn(['npx', 'ngrok', 'http', '5173'], {
  stdout: 'ignore',
  stderr: 'ignore',
});

const cleanup = () => {
  dev.kill();
  ngrok.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

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
          console.log(`\n  \x1b[32m➜\x1b[0m  \x1b[1mNgrok:\x1b[0m   \x1b[36m${url}\x1b[0m\n`);
          break;
        }
      }
    } catch {
      // ngrok not ready yet
    }
  }
})();

await dev.exited;
cleanup();
