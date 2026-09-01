import test from 'node:test';
import assert from 'node:assert/strict';
import { Container } from '../src/core/container.js';
import { EventBus } from '../src/core/event-bus.js';
import { PulCore } from '../src/core/pulcore.js';
import { AccessDeniedError } from '../src/core/acl.js';
import { accessControlPlugin } from '../src/plugins/access-control.js';
import { portalManagerPlugin } from '../src/plugins/portal-manager.js';
import { workflowPlugin } from '../src/plugins/workflow.js';
import { auditLogPlugin } from '../src/plugins/audit-log.js';

async function createFoundation() { const core = new PulCore(); const plugins = [accessControlPlugin, portalManagerPlugin, workflowPlugin, auditLogPlugin]; for (const plugin of plugins) core.plugins.install(plugin); for (const plugin of plugins) await core.plugins.enable(plugin.name); return core; }
test('container creates singleton services lazily', () => { const container = new Container(); let calls = 0; container.register('service', () => ({ call: ++calls })); assert.equal(container.resolve('service'), container.resolve('service')); assert.equal(calls, 1); });
test('event bus respects listener priority', async () => { const events = new EventBus(); const order = []; events.on('test', () => order.push('low')); events.on('test', () => order.push('high'), { priority: 10 }); await events.emit('test'); assert.deepEqual(order, ['high', 'low']); });
test('foundation plugins install models and resolve dependencies', async () => { const core = await createFoundation(); assert.deepEqual(core.plugins.list().map((item) => item.name), ['access-control', 'portal-manager', 'workflow', 'audit-log']); assert.deepEqual(core.models.list().map((item) => item.name), ['user', 'role', 'portal', 'workflow', 'audit_log']); assert.equal(core.plugins.list().every((item) => item.status === 'enabled'), true); });
test('portal manager supports real CRUD through metadata', async () => { const core = await createFoundation(); const created = await core.execute({ role: 'admin', model: 'portal', action: 'create', input: { name: '客户门户', key: 'crm', mode: 'no-code', description: '客户业务入口', enabled: true } }); assert.equal(created.key, 'crm'); const list = await core.execute({ role: 'admin', model: 'portal', action: 'list' }); assert.equal(list.meta.total, 2); const updated = await core.execute({ role: 'admin', model: 'portal', action: 'update', id: created.id, input: { enabled: false } }); assert.equal(updated.enabled, false); });
test('ACL blocks anonymous foundation access', async () => { const core = await createFoundation(); await assert.rejects(core.execute({ role: 'anonymous', model: 'portal', action: 'list' }), AccessDeniedError); });
