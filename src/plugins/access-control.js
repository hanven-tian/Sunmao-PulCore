export const accessControlPlugin = {
  name: 'access-control', title: '用户与权限', description: '用户、角色和 ACL 权限策略', category: 'foundation', capabilities: ['user.manage', 'role.manage', 'acl.enforce'], version: '0.1.0',
  install(core) {
    core.registerModel({ name: 'user', title: '用户', fields: {
      username: { type: 'string', required: true, title: '用户名' }, displayName: { type: 'string', required: true, title: '显示名称' },
      email: { type: 'string', title: '邮箱' }, status: { type: 'string', required: true, title: '状态' }, roleKey: { type: 'string', required: true, title: '角色' }
    }});
    core.registerModel({ name: 'role', title: '角色', fields: {
      name: { type: 'string', required: true, title: '角色名称' }, key: { type: 'string', required: true, title: '角色标识' }, description: { type: 'text', title: '说明' }
    }});
    core.acl.allow({ role: 'admin', model: '*', actions: ['*'] }).allow({ role: 'member', model: 'user', actions: ['get'], fields: ['id', 'username', 'displayName', 'email', 'status', 'roleKey'] });
  },
  enable(core) {
    if (!core.repository.list('role').length) {
      core.repository.create('role', { name: '平台管理员', key: 'admin', description: '管理平台配置与所有业务应用' });
      core.repository.create('role', { name: '普通成员', key: 'member', description: '访问已授权的门户和数据' });
    }
    if (!core.repository.list('user').length) core.repository.create('user', { username: 'admin', displayName: '平台管理员', email: 'admin@pulcore.local', status: 'active', roleKey: 'admin' });
  }
};
