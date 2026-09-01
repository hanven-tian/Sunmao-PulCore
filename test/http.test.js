import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../src/server.js';

test('HTTP vertical slice exposes health, metadata and ACL-filtered list', async (context) => {
  const { server } = await createApp();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  context.after(() => server.close());
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;

  const health = await fetch(`${base}/health`).then((response) => response.json());
  assert.equal(health.name, 'PulCore');
  assert.equal(health.plugins[0].status, 'enabled');

  const metadata = await fetch(`${base}/api/models/device`).then((response) => response.json());
  assert.equal(metadata.title, '设备台账');

  const response = await fetch(`${base}/api/model-device:list?status=online`, {
    headers: { 'x-user-role': 'viewer' }
  });
  assert.equal(response.status, 200);
  const list = await response.json();
  assert.equal(list.meta.total, 1);
  assert.equal(list.data[0].secretKey, undefined);
});
