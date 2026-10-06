import { WebSocketServer, WebSocket } from 'ws';
import type { Plugin } from 'vite';

// ponytail: in-memory channel sync relay; upgrade to redis/mqtt adapter if scaling across multiple server nodes.
export const CLIENT_BRIDGE_SCRIPT = `
(function() {
  if (typeof window === 'undefined' || !window.BroadcastChannel) return;

  var NativeBroadcastChannel = window.BroadcastChannel;
  var CHANNEL_PREFIX = 'open-slide:presenter:';

  var deviceId = '';
  try {
    deviceId = localStorage.getItem('__open_slide_device_id') || '';
    if (!deviceId) {
      deviceId = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem('__open_slide_device_id', deviceId);
    }
  } catch (e) {
    deviceId = Math.random().toString(36).slice(2);
  }

  var activeChannels = new Map();
  var socket = null;
  var queue = [];

  function connectWs() {
    try {
      var protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
      var wsUrl = protocol + '//' + location.host + '/__presenter_sync';
      socket = new WebSocket(wsUrl);

      socket.onopen = function() {
        while (queue.length > 0 && socket && socket.readyState === WebSocket.OPEN) {
          socket.send(queue.shift());
        }
      };

      socket.onmessage = function(event) {
        try {
          var payload = JSON.parse(event.data);
          if (!payload || !payload.channel || payload.deviceId === deviceId) {
            return;
          }
          var channels = activeChannels.get(payload.channel);
          if (channels) {
            var ev = new MessageEvent('message', { data: payload.data });
            channels.forEach(function(ch) {
              try {
                ch.dispatchEvent(ev);
              } catch (err) {}
            });
          }
        } catch (err) {}
      };

      socket.onclose = function() {
        setTimeout(connectWs, 1500);
      };

      socket.onerror = function() {
        try { socket.close(); } catch (err) {}
      };
    } catch (err) {}
  }

  connectWs();

  class PresenterBroadcastChannel extends NativeBroadcastChannel {
    constructor(name) {
      super(name);
      this._targetName = String(name);
      if (this._targetName.startsWith(CHANNEL_PREFIX)) {
        var set = activeChannels.get(this._targetName);
        if (!set) {
          set = new Set();
          activeChannels.set(this._targetName, set);
        }
        set.add(this);
      }
    }

    postMessage(message) {
      super.postMessage(message);
      if (this._targetName.startsWith(CHANNEL_PREFIX)) {
        var packet = JSON.stringify({
          channel: this._targetName,
          data: message,
          deviceId: deviceId,
        });
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(packet);
        } else {
          queue.push(packet);
        }
      }
    }

    close() {
      if (this._targetName.startsWith(CHANNEL_PREFIX)) {
        var set = activeChannels.get(this._targetName);
        if (set) {
          set.delete(this);
          if (set.size === 0) activeChannels.delete(this._targetName);
        }
      }
      super.close();
    }
  }

  window.BroadcastChannel = PresenterBroadcastChannel;
})();
`;

export function createPresenterSyncPlugin(): Plugin {
  return {
    name: 'presenter-sync-relay',
    configureServer(server) {
      const wss = new WebSocketServer({ noServer: true });
      const lastState = new Map<string, string>();

      server.httpServer?.on('upgrade', (req, socket, head) => {
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
          } catch {
            // ignore malformed payloads
          }

          for (const client of wss.clients) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(text);
            }
          }
        });
      });
    },
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: CLIENT_BRIDGE_SCRIPT,
          injectTo: 'head-prepend',
        },
      ];
    },
  };
}
