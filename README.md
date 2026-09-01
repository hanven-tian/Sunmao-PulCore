# 榫卯 PulCore

榫卯（PulCore）是一个面向企业级业务系统的元数据驱动微内核低代码平台。平台以“榫”为稳定内核、以“卯”为标准扩展接口：内核负责插件生命周期、依赖注入、元数据模型、动态 API、ACL 与事件总线，业务能力通过插件自由组合。

PulCore 对标主流低代码平台的完整官方能力矩阵，社区能力和传统企业版能力在榫卯中统一永久免费，不设置功能付费墙。所有插件都遵循相同的安装、依赖、启停、失败隔离和能力声明规范。

> 当前阶段：可运行微内核、动态业务 API 与全量插件能力注册已打通。

## 已实现

- 44 个免费插件包，覆盖基础内核、可视化搭建、工作流、身份认证、多数据源、AI 与运维管控
- 插件安装、启用、停用、卸载、依赖排序、失败隔离与能力声明
- 轻量依赖注入容器
- Collection/Model 元数据注册、字段校验、关联能力声明
- 基于 Model 的通用 CRUD 服务
- 模型级、操作级、行级、字段级 ACL
- 支持前置/后置扩展的异步事件总线
- 基于 Node.js HTTP 的动态 REST API
- 表格、表单、详情、筛选、看板、多视图、自由布局与页面模板能力
- 审批、抄送、驳回、撤回、定时、延时、条件、并行、循环及集成节点
- 密码、邮箱验证码、API Key、CAS、OIDC、SAML 与登录安全策略
- MySQL、SQL Server、MariaDB、Doris、ClickHouse 与对象存储适配能力
- AI 员工、智能分析、自动报表、表单提取、数据问答、大模型网关和 AI 流程辅助
- 审计追踪、备份还原、环境迁移、性能监控、链路追踪与高级消息模板
- Web 控制台插件分类、搜索、详情、启停与依赖检查
- API/Web 双服务 Docker Compose 部署及健康检查

## 免费策略

- 所有插件永久免费，包括对标其他平台企业版本的高级流程、SSO、多数据源、AI 和运维能力。
- 插件响应中的 `license` 统一为 `free`；`upstreamTier` 仅用于说明对标来源，不代表榫卯存在付费层级。
- 本阶段的“已实现”包含可运行内核、插件生命周期、能力注册、配置界面与基础数据模型；具体外部服务适配器仍会按版本逐步补充生产级连接实现。

## 快速开始

要求 Node.js 22 或更高版本，无第三方运行时依赖。

```bash
npm test
npm start
```

服务默认监听 `http://127.0.0.1:3000`。

```bash
curl http://127.0.0.1:3000/health
curl -H 'x-user-role: admin' http://127.0.0.1:3000/api/models/portal
curl -H 'x-user-role: admin' http://127.0.0.1:3000/api/model-portal:list
```

## Docker 容器化运行

仓库同时提供控制台和微内核 API 的双服务编排：

```bash
docker compose up --build -d
```

- 控制台：`http://localhost:3000`
- 微内核 API：`http://localhost:3001`
- 健康检查：`http://localhost:3001/health`

停止服务可运行 `docker compose down`。API 容器带健康检查，控制台会等待微内核服务就绪后启动。

## 动态 API

- `GET /api/models/:model`：读取模型定义
- `GET /api/model-:model:list`：列表、分页、筛选和排序
- `GET /api/model-:model:get/:id`：详情
- `POST /api/model-:model:create`：创建
- `PUT /api/model-:model:update/:id`：更新
- `DELETE /api/model-:model:delete/:id`：删除

列表参数示例：`?page=1&pageSize=20&status=online&sort=-createdAt`。

## 目录

```text
src/core/       微内核
src/plugins/    业务插件
src/server.js   HTTP 入口
test/           内核与链路测试
```

## 命名

平台中文名为“榫卯”，英文名统一为 **PulCore**。
