import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../src/server.js';

test('HTTP vertical slice exposes foundation plugins and portal CRUD', async (context) => {
  const { server } = await createApp(); server.listen(0, '127.0.0.1'); await once(server, 'listening'); context.after(() => server.close());
  const base = `http://127.0.0.1:${server.address().port}`;
  const health = await fetch(`${base}/health`).then((response) => response.json()); assert.equal(health.name, 'PulCore'); assert.equal(health.plugins.length, 51); assert.equal(health.plugins.every((plugin) => plugin.status === 'enabled'), true); assert.equal(health.plugins.every((plugin) => plugin.license === 'free'), true);
  const plugins = await fetch(`${base}/api/plugins`, { headers: { 'x-user-role': 'admin' } }).then((response) => response.json()); assert.equal(plugins.meta.total, 51);
  const disabled = await fetch(`${base}/api/plugins/ai-data-qa:disable`, { method: 'POST', headers: { 'x-user-role': 'admin' } }).then((response) => response.json()); assert.equal(disabled.status, 'disabled');
  const enabled = await fetch(`${base}/api/plugins/ai-data-qa:enable`, { method: 'POST', headers: { 'x-user-role': 'admin' } }).then((response) => response.json()); assert.equal(enabled.status, 'enabled');
  const metadata = await fetch(`${base}/api/models/portal`).then((response) => response.json()); assert.equal(metadata.title, '门户');
  const response = await fetch(`${base}/api/model-portal:list`, { headers: { 'x-user-role': 'admin' } }); assert.equal(response.status, 200); const list = await response.json(); assert.equal(list.meta.total, 1); assert.equal(list.data[0].key, 'admin');
});
