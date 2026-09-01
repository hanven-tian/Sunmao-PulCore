const categories = {
  'data-source': [
    ['data-source-manager', '数据源管理器', '管理主数据库、外部数据库与 API 数据源'],
    ['data-source-clickhouse', '数据来源：外部 ClickHouse', '连接外部 ClickHouse', 'database'],
    ['data-source-doris', '数据来源：外部 Doris', '连接外部 Apache Doris', 'database'],
    ['data-source-mariadb', '数据来源：外部 MariaDB', '连接外部 MariaDB', 'database'],
    ['data-source-mysql', '数据源：外部 MySQL', '连接外部 MySQL', 'database'],
    ['data-source-nocobase', '数据来源：外部 NocoBase', '通过 API 代理连接 NocoBase 应用', 'http'],
    ['data-source-oracle', '数据来源：外部 Oracle', '连接外部 Oracle', 'database'],
    ['data-source-postgresql', '数据源：外部 PostgreSQL', '连接外部 PostgreSQL', 'database'],
    ['data-source-sqlserver', '数据源：外部 SQL Server', '连接外部 SQL Server', 'database'],
    ['data-source-kingbase', '数据来源：KingbaseES', '使用 KingbaseES 作为主库或外部库', 'database'],
    ['data-source-main', '数据来源：主数据', '管理 PulCore 主数据库'],
    ['data-source-rest-api', '数据来源：REST API', '连接外部 REST API', 'http'],
    ['data-source-fdw', '数据采集：FDW', '通过外部数据包装器连接远程数据表', 'database']
  ],
  'collection-field': [
    ['collection-sql', '集合：SQL', '提供 SQL 集合模板'], ['collection-tree', '集合：树', '提供树状集合模板'],
    ['field-china-region', '收集领域：中国行政区划', '提供中国行政区划数据与字段'], ['field-attachment-url', '集合字段：附件（URL）', '支持 URL 格式附件'],
    ['field-code', '集合字段：代码', '代码编辑与高亮'], ['field-encryption', '集合字段：加密', '字段自动加解密'],
    ['field-formula', '集合字段：公式', '计算同一记录的字段结果'], ['field-many-to-many-array', '集合字段：多对多（数组）', '以唯一键数组建立多对多关系'],
    ['field-markdown-vditor', '集合字段：Markdown（Vditor）', 'Markdown 编辑和渲染'], ['field-sequence', '集合字段：序列', '按规则生成业务编码'],
    ['field-signature', '收集字段：签名', '触摸和鼠标手写签名'], ['field-sort', '收集字段：排序', '集合数据排序字段']
  ],
  'ui-block': [
    ['block-list', '块：列表', '分页列表块'], ['block-map', '区块：地图', '高德与 Google 地图块', 'service'], ['block-markdown', '模块：Markdown', 'Markdown 内容块'],
    ['block-tree', '模块：树', '树状过滤块'], ['block-calendar', '日历', '日历集合模板与区块'], ['block-chart', '数据可视化', '图表与筛选区块'],
    ['block-comment', '模块：评论', '评论创建与查看区块'], ['block-gantt', '模块：甘特图', '甘特图项目排期块'], ['block-grid-card', '模块：网格卡', '分页网格卡片'],
    ['block-iframe', '模块：iframe', '嵌入外部页面'], ['block-action-panel', '模块：操作面板', '集中组织页面操作']
  ],
  action: [
    ['action-bulk-edit', '操作：批量编辑', '批量编辑选定记录'], ['action-export', '操作：导出记录', '按字段导出 Excel'], ['action-bulk-update', '操作：批量更新', '批量更新记录'],
    ['action-custom-request', '操作：自定义请求', '发送带上下文的 HTTP 请求'], ['action-import', '操作：导入记录', '通过 Excel 模板导入'], ['action-duplicate', '操作：重复记录', '复制并编辑记录'],
    ['action-export-pro', '操作：导出记录专业版', '异步海量导出与附件处理'], ['action-import-pro', '操作：导入记录专业版', '异步海量导入'], ['action-print', '操作：打印', '打印当前记录']
  ],
  workflow: [
    ['workflow', '工作流程', 'BPM 流程设计与执行'], ['workflow-aggregate', '工作流程：聚合节点', '统计、求和与平均值'], ['workflow-approval', '工作流程：审批', '发起和处理审批'],
    ['workflow-cc', '工作流程：CC', '流程抄送'], ['workflow-custom-action', '工作流程：自定义操作事件', '由自定义按钮触发'], ['workflow-variable', '工作流程：自定义变量', '流程临时变量'],
    ['workflow-transaction', '工作流程：数据库事务节点', '事务提交与回滚'], ['workflow-date', '工作流程：日期计算节点', '日期计算、比较与格式化'], ['workflow-delay', '工作流程：延迟节点', '延迟与分支等待'],
    ['workflow-http', '工作流程：HTTP 请求节点', '流程 HTTP 数据交互'], ['workflow-email', '工作流程：邮件节点', '流程邮件发送'], ['workflow-manual', '工作流程：手动节点', '人工决策环节'],
    ['workflow-notification', '工作流程：通知节点', '发送流程通知'], ['workflow-parallel', '工作流程：并行节点', '并行执行流程分支'], ['workflow-after-action', '工作流程：行动后事件', '数据操作完成后触发'],
    ['workflow-before-action', '工作流程：行动前事件', '数据操作前触发'], ['workflow-response', '工作流程：响应消息', '组装客户端响应'], ['workflow-sql', '工作流程：SQL 节点', '执行参数化 SQL'],
    ['workflow-subflow', '工作流程：子流程', '调用可复用子流程'], ['workflow-webhook', '工作流程：Webhook', '接收 HTTP 调用触发']
  ],
  security: [
    ['auth-2fa', '双因素认证（2FA）', '密码登录双因素认证'], ['auth-totp', '验证：TOTP 验证器', '绑定和校验 TOTP'], ['auth-manager', '验证', '密码、短信与 SSO 管理'],
    ['auth-provider-oauth', '身份提供商：OAuth', 'OAuth 2.1 与 OpenID Connect', 'oauth'], ['auth-api-key', '认证方式：API 密钥', 'API 密钥认证'], ['auth-cas', '授权方式：CAS', 'CAS 认证', 'service'],
    ['auth-oauth2', '身份验证：OAuth2', 'OAuth2 认证', 'oauth'], ['auth-oidc', '授权：OIDC', 'OpenID Connect 认证', 'oauth'], ['auth-saml', '认证方式：SAML 2.0', 'SAML 2.0 认证', 'service'],
    ['auth-sms', '授权方式：短信', '短信验证码认证', 'service'], ['password-policy', '密码策略', '密码规则与登录锁定'], ['ip-restriction', 'IP 限制', 'IP 黑白名单'],
    ['http-request-encryption', 'HTTP 请求加密', '发送前加密请求参数']
  ],
  integration: [
    ['integration-dingtalk', '钉钉', '认证、通知与用户同步', 'service'], ['email-manager', '电子邮件管理器', '连接企业邮箱', 'service'], ['embed-pulcore', '嵌入 PulCore', '嵌入其他系统或网页'],
    ['coding-agent-proxy', '连接编码代理', '向编码代理交付可执行上下文', 'http'], ['office-preview', '办公文件预览器', 'Microsoft Live Preview 文件预览', 'service'], ['integration-wecom', 'WeCom（企业微信）', '认证、通知与用户同步', 'service'],
    ['ai-gigachat', 'AI LLM：GigaChat', '接入 GigaChat 大模型', 'service'], ['ai-knowledge-base', '人工智能：知识库', '向量化检索知识库', 'service'], ['ai-mcp-server', 'AI：MCP 服务器', '向智能体暴露业务工具'],
    ['ai-employee', '人工智能员工', '组合技能与业务流程的 AI 员工', 'service']
  ],
  notification: [
    ['notification-manager', '通知管理器', '统一通道、模板与日志'], ['notification-email', '通知：电子邮件', '通过 SMTP 发送邮件', 'smtp'], ['notification-in-app', '通知：应用内消息', '实时站内消息']
  ],
  queue: [
    ['queue-rabbitmq', 'RabbitMQ 队列适配器', 'RabbitMQ 消息队列', 'queue'], ['redis-lock', 'Redis 锁适配器', 'Redis 分布式锁', 'redis'], ['redis-pubsub', 'Redis 发布/订阅适配器', 'Redis 发布订阅', 'redis'],
    ['redis-queue', 'Redis 队列适配器', 'Redis 消息队列', 'redis'], ['redis-worker-id', 'Redis 工作进程 ID 分配器', 'Redis 工作 ID 分配', 'redis']
  ],
  system: [
    ['system-settings', '系统设置', '标题、徽标和语言设置'], ['license-settings', '许可证设置', '实例信息与许可证设置'], ['migration-manager', '迁移管理器', '环境间迁移配置'],
    ['backup-manager', '备份管理器', '备份、恢复与计划任务'], ['logger', '日志记录器', 'API 与运行日志'], ['error-handler', '错误处理程序', '错误捕获与规范化'],
    ['audit-log', '审计日志', '用户与资源操作审计'], ['async-task-manager', '异步任务管理器', '任务进度与通知'], ['version-control', '版本控制', '构建版本保存与恢复'],
    ['variables-secrets', '变量和秘密', '集中管理环境变量与密钥']
  ],
  organization: [
    ['department', '部门', '组织层级与角色权限'], ['user', '用户', '用户及创建更新者字段'], ['user-data-sync', '用户数据同步', '可扩展用户同步源', 'http'],
    ['access-control', '访问控制', '角色、资源、操作与数据隔离']
  ],
  personalization: [
    ['custom-brand', '定制品牌', '品牌名称与视觉设置'], ['custom-variables', '自定义变量', '定义和引用业务变量'], ['theme-editor', '主题编辑器', '编辑并保存 UI 主题'],
    ['ui-layout', 'UI 布局', '桌面、移动与路由布局'], ['ui-schema-storage', 'UI 架构存储', '集中存储页面 Schema'], ['ui-template', 'UI 模板', '复用区块与弹窗模板'],
    ['portal-manager', '门户管理器', '注册门户、入口与路由权限'], ['localization-tester', '本地化测试员', '管理本地化资源'], ['localization', '本土化', '多语言本地化'],
    ['text-copy', '文本副本', '文本字段复制按钮'], ['app-sso', '应用单点登录', '多应用间单点登录', 'oauth']
  ],
  other: [
    ['comments', '评论', '评论集合模板与区块'], ['form-draft', '表格草稿', '保存并继续编辑表单'], ['public-form', '公共表格', '匿名公开表单'],
    ['file-manager', '文件管理器', '文件存储与附件字段'], ['file-storage-s3', '文件存储：S3', 'S3 兼容对象存储', 's3'], ['multi-keyword-filter', '多关键词筛选', '输入或 Excel 批量筛选'],
    ['multi-space', '多空间', '单实例逻辑数据隔离'], ['record-history', '记录历史', '记录变更历史'], ['template-print', '模板打印', '按模板打印业务数据'],
    ['telemetry', '遥测', 'OpenTelemetry 指标与追踪'], ['telemetry-prometheus', '遥测：Prometheus', '导出 Prometheus 指标'], ['api-docs', 'API 文档', '生成 OpenAPI 文档']
  ]
};

const configByKind = {
  database: { required: ['host', 'database', 'username', 'password'], properties: { host: { type: 'string' }, database: { type: 'string' }, username: { type: 'string' }, password: { type: 'string' } } },
  http: { required: ['baseUrl'], properties: { baseUrl: { type: 'string' }, token: { type: 'string' } } },
  oauth: { required: ['issuer', 'clientId', 'clientSecret'], properties: { issuer: { type: 'string' }, clientId: { type: 'string' }, clientSecret: { type: 'string' } } },
  smtp: { required: ['host', 'username', 'password'], properties: { host: { type: 'string' }, username: { type: 'string' }, password: { type: 'string' } } },
  redis: { required: ['url'], properties: { url: { type: 'string' } } }, queue: { required: ['url'], properties: { url: { type: 'string' } } },
  s3: { required: ['endpoint', 'bucket', 'accessKey', 'secretKey'], properties: { endpoint: { type: 'string' }, bucket: { type: 'string' }, accessKey: { type: 'string' }, secretKey: { type: 'string' } } },
  service: { required: ['endpoint', 'credential'], properties: { endpoint: { type: 'string' }, credential: { type: 'string' } } }
};

export const parityCatalog = Object.entries(categories).flatMap(([category, entries]) => entries.map(([name, title, description, kind]) => ({ name, title, description, category, kind })));

export function createParityPlugins(overrides = {}) {
  return parityCatalog.map((entry) => {
    const schema = configByKind[entry.kind];
    const contributionType = entry.category === 'workflow' ? 'workflowNodes' : entry.category === 'ui-block' ? 'blocks' : entry.category === 'collection-field' ? 'modelParts' : entry.category === 'action' ? 'actions' : entry.category === 'data-source' ? 'dataSources' : 'features';
    const base = {
      ...entry,
      version: '0.2.0', license: 'Apache-2.0', upstreamTier: 'parity',
      capabilities: [`${entry.category}.${entry.name}`],
      contributes: { [contributionType]: [{ type: entry.name, title: entry.title }] },
      requiresConfiguration: Boolean(schema), configSchema: schema ?? { properties: {} },
      implementation: schema ? 'adapter-ready' : 'native',
      enable(core) { core.contributions?.set(entry.name, this.contributes); },
      disable(core) { core.contributions?.delete(entry.name); }
    };
    return { ...base, ...(overrides[entry.name] ?? {}), ...entry, contributes: overrides[entry.name]?.contributes ?? base.contributes, configSchema: overrides[entry.name]?.configSchema ?? base.configSchema };
  });
}

export const parityCategoryCounts = Object.fromEntries(Object.entries(categories).map(([name, entries]) => [name, entries.length]));
