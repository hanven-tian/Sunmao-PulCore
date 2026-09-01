function modelPlugin({ name, title, description, capabilities, model }) {
  return {
    name, title, description, category: 'foundation', version: '0.1.0', dependencies: ['access-control'], capabilities,
    install(core) { core.registerModel(model); }
  };
}

export const dataSourcePlugin = modelPlugin({
  name: 'data-source-manager', title: '数据源管理', description: '统一管理业务数据库连接与状态', capabilities: ['datasource.register', 'datasource.test'],
  model: { name: 'data_source', title: '数据源', fields: {
    name: { type: 'string', required: true, title: '名称' }, key: { type: 'string', required: true, title: '标识' },
    dialect: { type: 'string', required: true, title: '数据库类型' }, config: { type: 'json', title: '连接配置' }, enabled: { type: 'boolean', required: true, title: '启用状态' }
  }}
});

export const uiSchemaPlugin = modelPlugin({
  name: 'ui-schema', title: '页面 Schema', description: '持久化页面、区块和交互配置', capabilities: ['schema.render', 'schema.publish'],
  model: { name: 'ui_schema', title: '页面 Schema', fields: {
    name: { type: 'string', required: true, title: '名称' }, key: { type: 'string', required: true, title: '标识' },
    portalKey: { type: 'string', title: '所属门户' }, schema: { type: 'json', required: true, title: 'Schema' }, status: { type: 'string', required: true, title: '状态' }
  }}
});

export const fileManagerPlugin = modelPlugin({
  name: 'file-manager', title: '文件管理', description: '文件元数据、存储适配与访问控制', capabilities: ['file.upload', 'file.download', 'storage.adapter'],
  model: { name: 'file_asset', title: '文件', fields: {
    name: { type: 'string', required: true, title: '文件名' }, mimeType: { type: 'string', title: '类型' }, size: { type: 'integer', title: '大小' },
    storageKey: { type: 'string', required: true, title: '存储标识' }, url: { type: 'string', title: '访问地址' }, metadata: { type: 'json', title: '元数据' }
  }}
});

export const notificationPlugin = modelPlugin({
  name: 'notification', title: '消息通知', description: '站内信、邮件与 Webhook 通道', capabilities: ['notification.send', 'channel.register'],
  model: { name: 'notification', title: '通知', fields: {
    channel: { type: 'string', required: true, title: '通道' }, recipient: { type: 'string', required: true, title: '接收者' },
    subject: { type: 'string', title: '主题' }, content: { type: 'text', required: true, title: '内容' }, status: { type: 'string', required: true, title: '状态' }
  }}
});

export const importExportPlugin = modelPlugin({
  name: 'import-export', title: '导入导出', description: '模型数据批量导入、导出和任务追踪', capabilities: ['data.import', 'data.export'],
  model: { name: 'data_job', title: '数据任务', fields: {
    type: { type: 'string', required: true, title: '类型' }, modelKey: { type: 'string', required: true, title: '模型' },
    status: { type: 'string', required: true, title: '状态' }, progress: { type: 'integer', title: '进度' }, result: { type: 'json', title: '结果' }
  }}
});

export const schedulerPlugin = modelPlugin({
  name: 'scheduler', title: '任务调度', description: '定时任务、重试策略和执行记录', capabilities: ['schedule.create', 'schedule.execute'],
  model: { name: 'scheduled_task', title: '定时任务', fields: {
    name: { type: 'string', required: true, title: '名称' }, key: { type: 'string', required: true, title: '标识' },
    cron: { type: 'string', required: true, title: 'Cron' }, handler: { type: 'string', required: true, title: '处理器' }, enabled: { type: 'boolean', required: true, title: '启用状态' }
  }}
});

export const foundationSuitePlugins = [dataSourcePlugin, uiSchemaPlugin, fileManagerPlugin, notificationPlugin, importExportPlugin, schedulerPlugin];
