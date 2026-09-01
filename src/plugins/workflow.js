export const workflowPlugin = {
  name: 'workflow', version: '0.1.0', dependencies: ['access-control'],
  install(core) {
    core.registerModel({ name: 'workflow', title: '工作流', fields: {
      name: { type: 'string', required: true, title: '流程名称' }, key: { type: 'string', required: true, title: '流程标识' },
      trigger: { type: 'string', required: true, title: '触发方式' }, status: { type: 'string', required: true, title: '状态' }, schema: { type: 'json', title: '流程定义' }
    }});
  }
};
