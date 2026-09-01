export const deviceLedgerPlugin = {
  name: 'device-ledger',
  version: '0.1.0',

  install(core) {
    core.registerModel({
      name: 'device',
      title: '设备台账',
      fields: {
        code: { type: 'string', required: true, title: '设备编号' },
        name: { type: 'string', required: true, title: '设备名称' },
        status: { type: 'string', required: true, title: '在线状态' },
        location: { type: 'string', title: '安装位置' },
        secretKey: { type: 'string', title: '设备密钥' },
        ownerId: { type: 'string', title: '负责人' }
      }
    });
    core.acl
      .allow({ role: 'admin', model: 'device', actions: ['*'] })
      .allow({
        role: 'viewer',
        model: 'device',
        actions: ['list', 'get'],
        fields: ['id', 'code', 'name', 'status', 'location', 'createdAt', 'updatedAt']
      })
      .allow({
        role: 'operator',
        model: 'device',
        actions: ['list', 'get', 'update'],
        fields: ['id', 'code', 'name', 'status', 'location', 'ownerId', 'createdAt', 'updatedAt'],
        row: (record, context) => record.ownerId === context.user?.id
      });
  },

  enable(core) {
    if (core.repository.list('device').length === 0) {
      core.repository.create('device', {
        code: 'DEV-001',
        name: '空压机 A',
        status: 'online',
        location: '一号车间',
        secretKey: 'demo-secret',
        ownerId: 'operator-1'
      });
    }
  },

  uninstall(core) {
    core.models.unregister('device');
    core.repository.dropModel('device');
  }
};

