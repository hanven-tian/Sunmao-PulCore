# 榫卯 PulCore

PulCore 是一个面向企业级业务系统的元数据驱动微内核低代码平台。内核只提供插件、依赖注入、模型、动态 API、ACL 和事件能力，具体业务由插件组合完成。

> 当前阶段：M0 可运行内核纵向切片。

## 已实现

- 插件安装、启用、停用、卸载与依赖排序
- 轻量依赖注入容器
- Model 元数据注册和字段校验
- 基于 Model 的通用 CRUD 服务
- 模型级、操作级、行级、字段级 ACL
- 支持前置/后置扩展的异步事件总线
- 基于 Node.js HTTP 的动态 REST API
- 门户管理、用户权限、工作流和审计日志基础插件

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
