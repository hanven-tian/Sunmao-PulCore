export const portalManagerPlugin = {
  name: 'portal-manager', title: '门户管理', description: '独立前端入口、路由和菜单', category: 'foundation', capabilities: ['portal.create', 'portal.publish'], version: '0.1.0', dependencies: ['access-control'],
  install(core) {
    core.registerModel({ name: 'portal', title: '门户', fields: {
      name: { type: 'string', required: true, title: '门户名称' }, key: { type: 'string', required: true, title: '门户标识' },
      mode: { type: 'string', required: true, title: '构建模式' }, description: { type: 'text', title: '说明' }, enabled: { type: 'boolean', required: true, title: '启用状态' }
    }});
  },
  enable(core) { if (!core.repository.list('portal').length) core.repository.create('portal', { name: '管理工作台', key: 'admin', mode: 'no-code', description: '平台配置与业务管理入口', enabled: true }); }
};
