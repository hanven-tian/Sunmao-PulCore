import test from 'node:test';
import assert from 'node:assert/strict';
import { Container } from '../src/core/container.js';
import { EventBus } from '../src/core/event-bus.js';
import { PulCore } from '../src/core/pulcore.js';
import { AccessDeniedError } from '../src/core/acl.js';
import { deviceLedgerPlugin } from '../src/plugins/device-ledger.js';

test('container creates singleton services lazily', () => {
  const container = new Container();
  let calls = 0;
  container.register('service', () => ({ call: ++calls }));
  assert.equal(container.resolve('service'), container.resolve('service'));
  assert.equal(calls, 1);
});

test('event bus respects listener priority', async () => {
  const events = new EventBus();
  const order = [];
  events.on('test', () => order.push('low'));
  events.on('test', () => order.push('high'), { priority: 10 });
  await events.emit('test');
  assert.deepEqual(order, ['high', 'low']);
});

test('dynamic model CRUD applies field ACL and emits events', async () => {
  const core = new PulCore();
  core.plugins.install(deviceLedgerPlugin);
  await core.plugins.enable('device-ledger');
  let listed = false;
  core.events.on('device.list.after', () => { listed = true; });

  const adminList = await core.execute({ role: 'admin', model: 'device', action: 'list' });
  assert.equal(adminList.meta.total, 1);
  assert.equal(adminList.data[0].secretKey, 'demo-secret');

  const viewerList = await core.execute({ role: 'viewer', model: 'device', action: 'list' });
  assert.equal(viewerList.data[0].secretKey, undefined);
  assert.equal(viewerList.data[0].code, 'DEV-001');
  assert.equal(listed, true);

  await assert.rejects(
    core.execute({ role: 'viewer', model: 'device', action: 'delete', id: adminList.data[0].id }),
    AccessDeniedError
  );
});

test('row ACL limits operator to owned devices', async () => {
  const core = new PulCore();
  core.plugins.install(deviceLedgerPlugin);
  await core.plugins.enable('device-ledger');
  core.repository.create('device', { code: 'DEV-002', name: '水泵', status: 'offline', ownerId: 'operator-2' });

  const list = await core.execute({
    role: 'operator',
    user: { id: 'operator-1' },
    model: 'device',
    action: 'list'
  });
  assert.equal(list.meta.total, 1);
  assert.equal(list.data[0].code, 'DEV-001');
});

