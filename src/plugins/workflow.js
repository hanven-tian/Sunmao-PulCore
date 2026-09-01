export const workflowPlugin = {
  name: 'workflow', title: '工作流', description: '事件触发和流程节点执行', category: 'foundation', capabilities: ['workflow.design', 'workflow.execute'], version: '0.1.0', dependencies: ['access-control'],
  install(core) {
    core.registerModel({ name: 'workflow', title: '工作流', fields: {
      name: { type: 'string', required: true, title: '流程名称' }, key: { type: 'string', required: true, title: '流程标识' },
      trigger: { type: 'string', required: true, title: '触发方式' }, status: { type: 'string', required: true, title: '状态' }, schema: { type: 'json', title: '流程定义' }
    }});
  }
};
