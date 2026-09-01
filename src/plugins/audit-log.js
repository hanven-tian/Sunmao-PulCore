export const auditLogPlugin = {
  name: 'audit-log', version: '0.1.0', dependencies: ['access-control'],
  install(core) {
    core.registerModel({ name: 'audit_log', title: '审计日志', fields: {
      event: { type: 'string', required: true, title: '事件' }, actor: { type: 'string', title: '操作者' }, resource: { type: 'string', title: '资源' }, detail: { type: 'json', title: '详情' }
    }});
    core.acl.allow({ role: 'auditor', model: 'audit_log', actions: ['list', 'get'] });
  },
  enable(core) { core.events.on('plugin.enabled', ({ name }) => { if (name !== 'audit-log') core.repository.create('audit_log', { event: 'plugin.enabled', actor: 'system', resource: name, detail: { plugin: name } }); }); }
};
