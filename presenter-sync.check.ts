import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';

// Runnable self-check for presenter network relay logic
const server = createServer();
const wss = new WebSocketServer({ noServer: true });
const lastState = new Map<string, string>();

server.on('upgrade', (req, socket, head) => {
  const url = new URL(req.url ?? '', 'http://localhost');
  if (url.pathname === '/__presenter_sync') {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  }
});

wss.on('connection', (ws) => {
  ws.on('message', (raw) => {
    const text = raw.toString();
    try {
      const payload = JSON.parse(text);
      if (payload?.channel && payload?.data) {
        if (payload.data.type === 'state') {
          lastState.set(payload.channel, text);
        } else if (payload.data.type === 'request-state' && lastState.has(payload.channel)) {
          ws.send(lastState.get(payload.channel)!);
        }
      }
    } catch {}

    for (const client of wss.clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    }
  });
});

await new Promise<void>((resolve) => server.listen(0, resolve));
const port = (server.address() as { port: number }).port;

const wsPhone = new WebSocket(`ws://localhost:${port}/__presenter_sync`);
const wsTablet = new WebSocket(`ws://localhost:${port}/__presenter_sync`);

await Promise.all([
  new Promise((res) => wsPhone.on('open', res)),
  new Promise((res) => wsTablet.on('open', res)),
]);

const tabletMessages: any[] = [];
const phoneMessages: any[] = [];

wsTablet.on('message', (data) => tabletMessages.push(JSON.parse(data.toString())));
wsPhone.on('message', (data) => phoneMessages.push(JSON.parse(data.toString())));

// 1. Tablet sends its initial state
wsTablet.send(
  JSON.stringify({
    channel: 'open-slide:presenter:deck-1',
    data: { type: 'state', state: { index: 0, pageCount: 10 } },
    deviceId: 'tablet',
  })
);

await Bun.sleep(50);
assert.equal(phoneMessages.length, 1);
assert.equal(phoneMessages[0].data.state.index, 0);

// 2. Phone sends 'next' command
wsPhone.send(
  JSON.stringify({
    channel: 'open-slide:presenter:deck-1',
    data: { type: 'next' },
    deviceId: 'phone',
  })
);

await Bun.sleep(50);
assert.equal(tabletMessages.length, 1);
assert.equal(tabletMessages[0].data.type, 'next');

// 3. Tablet advances and emits state 1
wsTablet.send(
  JSON.stringify({
    channel: 'open-slide:presenter:deck-1',
    data: { type: 'state', state: { index: 1, pageCount: 10 } },
    deviceId: 'tablet',
  })
);

await Bun.sleep(50);
assert.equal(phoneMessages.length, 2);
assert.equal(phoneMessages[1].data.state.index, 1);

// 4. New third client asks for cached state
const wsObserver = new WebSocket(`ws://localhost:${port}/__presenter_sync`);
await new Promise((res) => wsObserver.on('open', res));

const observerMessages: any[] = [];
wsObserver.on('message', (data) => observerMessages.push(JSON.parse(data.toString())));

wsObserver.send(
  JSON.stringify({
    channel: 'open-slide:presenter:deck-1',
    data: { type: 'request-state' },
    deviceId: 'observer',
  })
);

await Bun.sleep(50);
assert.equal(observerMessages.length, 1);
assert.equal(observerMessages[0].data.state.index, 1);

wsPhone.close();
wsTablet.close();
wsObserver.close();
server.close();

// 5. Cloudflare tunnel output regex check
const sampleCfLog = '2026-10-06T08:00:00Z INF | https://hang-locally-well-harris.trycloudflare.com |';
const cfMatch = sampleCfLog.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
assert.equal(cfMatch?.[0], 'https://hang-locally-well-harris.trycloudflare.com');

console.log('Presenter sync self-check passed.');
