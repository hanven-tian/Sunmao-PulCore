function capabilityPlugin({ name, title, category, description, capabilities, upstreamTier = 'community' }) {
  return {
    name,
    title,
    category,
    description,
    capabilities,
    upstreamTier,
    license: 'free',
    version: '0.2.0',
    dependencies: ['access-control'],
    async enable(core) {
      await core.events.emit('capability.ready', { plugin: name, capabilities });
    }
  };
}

const definitions = [
  ['model-engine','数据模型内核','基础内核','集合建模、字段类型、数据关联与 CRUD API',['model.collection','model.field','model.relation.one-to-many','model.relation.many-to-many','api.crud.generate']],
  ['system-settings','系统基础配置','基础内核','环境变量、密钥、国际化、主题与系统参数',['settings.environment','settings.secret','settings.i18n','settings.theme','settings.parameter']],
  ['runtime-logs','基础运行日志','基础内核','服务日志、API 请求日志与异常捕获',['log.server','log.api','log.exception','log.output']],
  ['dashboard-charts','数据看板与图表','可视化搭建','数据看板与多维图表可视化',['dashboard.compose','chart.dimension','chart.metric','chart.filter']],
  ['multi-view','多视图','可视化搭建','日历、甘特、地图与画廊视图',['view.calendar','view.gantt','view.map','view.gallery']],
  ['layout-blocks','布局与区块','可视化搭建','自定义区块、自由布局、标签页与模板库',['block.custom','layout.free','layout.tabs','page.template']],
  ['data-print','数据打印','可视化搭建','批量操作与数据打印模板',['data.batch','data.print','print.template']],
  ['approval-flow','人工审批','工作流自动化','审批、抄送、驳回与撤回',['workflow.approval','workflow.cc','workflow.reject','workflow.withdraw']],
  ['workflow-control','流程控制节点','工作流自动化','定时、延时、条件、并行与循环',['workflow.timer','workflow.delay','workflow.condition','workflow.parallel','workflow.loop']],
  ['workflow-integration','流程集成节点','工作流自动化','HTTP、SQL、JSON 映射与变量计算',['workflow.http','workflow.sql','workflow.json-map','workflow.variable']],
  ['workflow-data-actions','流程数据节点','工作流自动化','数据增删改与消息通知节点',['workflow.data.create','workflow.data.update','workflow.data.delete','workflow.notify']],
  ['workflow-advanced','高级流程编排','工作流自动化','动态权限、自定义触发器与复杂编排',['workflow.dynamic-acl','workflow.custom-trigger','workflow.orchestration'],'enterprise'],
  ['auth-password','账号密码认证','身份认证','账号密码登录与会话管理',['auth.password','auth.session']],
  ['auth-email-code','邮箱验证码认证','身份认证','邮箱验证码登录',['auth.email-code']],
  ['auth-api-key','API 密钥认证','身份认证','面向集成的 API Key 认证',['auth.api-key']],
  ['auth-cas','CAS 单点登录','身份认证','CAS 企业统一身份对接',['auth.cas'],'enterprise'],
  ['auth-oidc','OIDC 单点登录','身份认证','OpenID Connect 身份对接',['auth.oidc'],'enterprise'],
  ['auth-saml','SAML 单点登录','身份认证','SAML 2.0 企业身份对接',['auth.saml'],'enterprise'],
  ['auth-security','登录页与安全策略','身份认证','自定义登录页、防暴力破解与安全策略',['auth.page','auth.policy','auth.brute-force-protection'],'enterprise'],
  ['datasource-mysql','MySQL 数据源','多数据源','外部 MySQL 数据库接入',['datasource.mysql']],
  ['datasource-sqlserver','SQL Server 数据源','多数据源','外部 SQL Server 数据库接入',['datasource.sqlserver']],
  ['datasource-mariadb','MariaDB 数据源','多数据源','外部 MariaDB 数据库接入',['datasource.mariadb']],
  ['datasource-doris','Doris 数据源','多数据源','Apache Doris 分析数据源接入',['datasource.doris'],'enterprise'],
  ['datasource-clickhouse','ClickHouse 数据源','多数据源','ClickHouse 分析数据源接入',['datasource.clickhouse'],'enterprise'],
  ['object-storage','对象存储','多数据源','S3、阿里云 OSS 与腾讯 COS',['storage.s3','storage.oss','storage.cos']],
  ['ai-assistant','AI 员工助手','AI 智能','面向业务角色的智能员工助手',['ai.employee','ai.assistant'],'enterprise'],
  ['ai-analysis-report','AI 分析与报表','AI 智能','数据智能分析与自动报表',['ai.analysis','ai.report'],'enterprise'],
  ['ai-form-extraction','AI 表单与提取','AI 智能','智能表单填充与文本结构化',['ai.form-fill','ai.extract'],'enterprise'],
  ['ai-data-qa','AI 数据问答','AI 智能','基于权限范围的数据问答',['ai.data-qa'],'enterprise'],
  ['ai-model-gateway','大模型网关','AI 智能','统一接入多家大模型服务',['ai.model.gateway'],'enterprise'],
  ['ai-workflow-code','AI 流程与代码辅助','AI 智能','辅助流程决策与代码搭建',['ai.workflow-decision','ai.code-assist'],'enterprise'],
  ['backup-restore','备份迁移','运维管控','备份、还原、迁移与应用复制',['ops.backup','ops.restore','ops.migrate','ops.clone'],'enterprise'],
  ['observability','性能监控与链路追踪','运维管控','性能监控、遥测与分布式链路追踪',['ops.metrics','ops.trace','ops.telemetry'],'enterprise'],
  ['message-templates','高级消息模板','运维管控','邮件、短信与站内信模板',['message.email','message.sms','message.in-app','message.template'],'enterprise']
];

export const officialMatrixPlugins = definitions.map(([name,title,category,description,capabilities,upstreamTier]) =>
  capabilityPlugin({ name, title, category, description, capabilities, upstreamTier })
);
