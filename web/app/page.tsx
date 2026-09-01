'use client';

import { Activity, AppWindow, Boxes, Braces, Check, ChevronDown, CircleHelp, Code2, Database, GitBranch, HardDrive, KeyRound, LayoutDashboard, MoreHorizontal, PackageCheck, Play, Plug, Plus, Search, Settings, ShieldCheck, Sparkles, TableProperties, Trash2, UserCog, Workflow, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const navigation = [
  ['工作台', LayoutDashboard], ['门户管理', AppWindow], ['数据模型', Database], ['数据源', HardDrive],
  ['用户与权限', UserCog], ['工作流', Workflow], ['插件管理', Plug],
] as const;

const models = [
  { name: '客户', key: 'customer', fields: 18, records: '2,486', updated: '3 分钟前', color: '#35b9b6' },
  { name: '联系人', key: 'contact', fields: 12, records: '5,912', updated: '18 分钟前', color: '#8b6ac8' },
  { name: '商机', key: 'opportunity', fields: 24, records: '1,284', updated: '1 小时前', color: '#d59b3f' },
  { name: '合同', key: 'contract', fields: 21, records: '864', updated: '昨天', color: '#50a978' },
];

const activities = [
  [GitBranch, '商机审批流程已发布', '版本 v1.8 · 由 陈屿 更新', '8 分钟前'],
  [KeyRound, '销售主管权限策略已更新', '新增合同导出权限', '26 分钟前'],
  [PackageCheck, '审计日志插件已启用', '版本 v0.9.4', '1 小时前'],
] as const;

export default function Home() {
  const [active, setActive] = useState('工作台');
  const [query, setQuery] = useState('');
  const [environment, setEnvironment] = useState('生产环境');
  const [designerOpen, setDesignerOpen] = useState(false);
  const visibleModels = useMemo(() => models.filter((m) => `${m.name}${m.key}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return <main className="app-shell">
    <aside className="sidebar">
      <div className="brand"><Logo /><div><strong>榫卯</strong><small>PulCore</small></div></div>
      <nav className="nav-list" aria-label="平台导航"><p>构建</p>
        {navigation.map(([label, Icon]) => <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => { setActive(label); if (label === '数据模型') setDesignerOpen(true); }}><Icon size={18}/><span>{label}</span>{label === '插件管理' && <em>10</em>}</button>)}
      </nav>
      <div className="sidebar-footer">
        <button className="nav-item"><CircleHelp size={18}/><span>帮助文档</span></button>
        <button className="nav-item"><Settings size={18}/><span>系统设置</span></button>
        <div className="profile"><span>林</span><div><b>林默</b><small>平台管理员</small></div><MoreHorizontal size={17}/></div>
      </div>
    </aside>

    <section className="content">
      <header className="topbar">
        <div className="mobile-brand"><Logo /><b>榫卯 PulCore</b></div>
        <label className="search-box"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索模型、页面或插件…"/><kbd>⌘ K</kbd></label>
        <div className="top-actions"><button className="icon-button" aria-label="运行状态"><Activity size={18}/></button><button className="environment" onClick={() => setEnvironment(environment === '生产环境' ? '测试环境' : '生产环境')}><i className={environment === '生产环境' ? '' : 'test'}/>{environment}<ChevronDown size={14}/></button></div>
      </header>

      <div className="workspace">
        <div className="page-heading"><div><p>PULCORE CONSOLE</p><h1>{active}</h1><span>用模型、页面与插件，组合你的下一套业务系统。</span></div><button className="primary-button"><Plus size={17}/>新建应用</button></div>
        {active === '工作台' ? <><section className="stats-grid">
          <Stat icon={Database} label="数据模型" value="16" note="+2 本月" tone="cyan"/>
          <Stat icon={AppWindow} label="已发布页面" value="28" note="6 个草稿" tone="violet"/>
          <Stat icon={Workflow} label="运行中流程" value="9" note="今日 1,204 次" tone="amber"/>
          <Stat icon={Boxes} label="已启用插件" value="10" note="全部正常" tone="green"/>
        </section>

        <section className="main-grid">
          <article className="panel models-panel">
            <PanelTitle title="核心数据模型" note="元数据驱动 API、界面与权限" action="查看全部 →"/>
            <div className="model-table"><div className="model-row table-head"><span>模型</span><span>字段</span><span>记录数</span><span>最近更新</span><span/></div>
              {visibleModels.map((m) => <div className="model-row" key={m.key}><div className="model-name"><i style={{background:m.color}}/><div><b>{m.name}</b><code>{m.key}</code></div></div><span>{m.fields}</span><span>{m.records}</span><span className="muted">{m.updated}</span><button aria-label={`打开${m.name}模型`}><MoreHorizontal size={17}/></button></div>)}
              {!visibleModels.length && <div className="empty-state">没有找到匹配的数据模型</div>}
            </div>
          </article>
          <aside className="panel activity-panel"><PanelTitle title="最近动态" note="团队与系统变更"/>
            <div className="activity-list">{activities.map(([Icon,title,note,time]) => <div className="activity-item" key={title}><span><Icon size={16}/></span><div><b>{title}</b><p>{note}</p><small>{time}</small></div></div>)}</div>
          </aside>
        </section>

        <section className="builder-banner">
          <div className="schema-visual"><span><Database size={16}/>Model</span><i/><span><Braces size={16}/>Schema</span><i/><span><AppWindow size={16}/>UI</span></div>
          <div className="banner-copy"><span><Sparkles size={14}/> 元数据驱动</span><h2>定义一次模型，生成完整业务能力</h2><p>自动生成数据表、REST API、页面区块与权限入口，让团队专注业务本身。</p></div>
          <button className="secondary-button" onClick={() => setDesignerOpen(true)}><Play size={15} fill="currentColor"/>打开模型设计器</button>
        </section></> : <FoundationModule active={active} openDesigner={() => setDesignerOpen(true)}/>}
      </div>
    </section>
    {designerOpen && <ModelDesigner onClose={() => setDesignerOpen(false)}/>} 
  </main>;
}

function Logo(){ return <div className="brand-mark" aria-hidden="true"><span/><span/></div>; }
function PanelTitle({title,note,action}:{title:string;note:string;action?:string}){ return <div className="panel-heading"><div><h2>{title}</h2><p>{note}</p></div>{action && <button>{action}</button>}</div>; }
function Stat({icon:Icon,label,value,note,tone}:{icon:typeof Database;label:string;value:string;note:string;tone:string}){ return <article className="stat-card"><span className={`stat-icon ${tone}`}><Icon size={19}/></span><div><p>{label}</p><strong>{value}</strong><small>{note}</small></div></article>; }

type ModuleRecord = { id: string; name: string; key: string; description: string; enabled: boolean; meta: string };
const moduleSeed: Record<string, ModuleRecord[]> = {
  '门户管理': [
    { id: 'portal-admin', name: '管理工作台', key: '/admin', description: '平台配置与业务管理入口', enabled: true, meta: '无代码模式' },
    { id: 'portal-team', name: '团队协作', key: '/team', description: '成员任务和协作信息门户', enabled: true, meta: '无代码模式' },
  ],
  '数据源': [
    { id: 'source-main', name: '主数据库', key: 'primary', description: 'PulCore 默认业务数据源', enabled: true, meta: 'SQLite · 已连接' },
    { id: 'source-analytics', name: '分析数据库', key: 'analytics', description: '用于报表与聚合查询', enabled: false, meta: 'PostgreSQL · 未连接' },
  ],
  '用户与权限': [
    { id: 'user-admin', name: '平台管理员', key: 'admin', description: '管理平台配置与所有业务应用', enabled: true, meta: '管理员角色' },
    { id: 'user-member', name: '普通成员', key: 'member', description: '访问已授权的门户和数据', enabled: true, meta: '成员角色' },
  ],
  '工作流': [
    { id: 'flow-approval', name: '通用审批流程', key: 'approval', description: '提交、审批、退回和结束节点', enabled: true, meta: '记录事件触发' },
    { id: 'flow-notify', name: '数据变更通知', key: 'change_notify', description: '模型数据变化后发送站内通知', enabled: false, meta: '事件总线触发' },
  ],
  '插件管理': [
    { id: 'plugin-access', name: '用户与权限', key: 'access-control', description: '用户、角色和 ACL 权限策略', enabled: true, meta: '基础插件 · v0.1.0' },
    { id: 'plugin-portal', name: '门户管理', key: 'portal-manager', description: '独立前端入口、路由和菜单', enabled: true, meta: '基础插件 · v0.1.0' },
    { id: 'plugin-workflow', name: '工作流', key: 'workflow', description: '事件触发和流程节点执行', enabled: true, meta: '基础插件 · v0.1.0' },
    { id: 'plugin-audit', name: '审计日志', key: 'audit-log', description: '记录平台配置和数据操作', enabled: true, meta: '基础插件 · v0.1.0' },
    { id: 'plugin-source', name: '数据源管理', key: 'data-source-manager', description: '统一管理数据库连接和可用状态', enabled: true, meta: '基础插件 · v0.1.0' },
    { id: 'plugin-schema', name: '页面 Schema', key: 'ui-schema', description: '持久化页面、区块和交互配置', enabled: true, meta: '基础插件 · v0.1.0' },
    { id: 'plugin-file', name: '文件管理', key: 'file-manager', description: '文件元数据、存储适配和访问控制', enabled: true, meta: '通用插件 · v0.1.0' },
    { id: 'plugin-notify', name: '消息通知', key: 'notification', description: '站内信、邮件和 Webhook 通道', enabled: true, meta: '通用插件 · v0.1.0' },
    { id: 'plugin-transfer', name: '导入导出', key: 'import-export', description: '模型数据批量导入、导出与任务追踪', enabled: true, meta: '通用插件 · v0.1.0' },
    { id: 'plugin-schedule', name: '任务调度', key: 'scheduler', description: '定时任务、重试策略和执行记录', enabled: true, meta: '通用插件 · v0.1.0' },
  ],
};

function FoundationModule({ active, openDesigner }: { active: string; openDesigner: () => void }) {
  const storageKey = `pulcore:${active}`;
  const [records, setRecords] = useState<ModuleRecord[]>(moduleSeed[active] ?? []);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    const seed = moduleSeed[active] ?? [];
    const saved = localStorage.getItem(storageKey);
    if (!saved) return setRecords(seed);
    const savedRecords = JSON.parse(saved) as ModuleRecord[];
    const savedById = new Map(savedRecords.map((item) => [item.id, item]));
    setRecords([...seed.map((item) => savedById.get(item.id) ?? item), ...savedRecords.filter((item) => !seed.some((seedItem) => seedItem.id === item.id))]);
  }, [storageKey, active]);
  useEffect(() => { if (moduleSeed[active]) localStorage.setItem(storageKey, JSON.stringify(records)); }, [records, storageKey, active]);
  if (active === '数据模型') return <section className="module-empty"><Database size={26}/><h2>模型设计器已就绪</h2><p>创建字段后自动生成数据表、API、页面和权限入口。</p><button onClick={openDesigner}>打开模型设计器</button></section>;

  const addRecord = () => {
    const index = records.length + 1;
    const labels: Record<string, string> = { '门户管理': '新门户', '数据源': '新数据源', '用户与权限': '新角色', '工作流': '新工作流', '插件管理': '扩展插件' };
    setRecords((items) => [...items, { id: `${active}-${Date.now()}`, name: `${labels[active] ?? '新项目'} ${index}`, key: `item_${index}`, description: '点击更多菜单继续配置', enabled: false, meta: '新建草稿' }]);
    setNotice('已创建草稿，可继续启用和配置');
  };
  const toggle = (id: string) => { setRecords((items) => items.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item)); setNotice('状态已保存到当前浏览器'); };
  const remove = (id: string) => { setRecords((items) => items.filter((item) => item.id !== id)); setNotice('项目已删除'); };

  return <section className="foundation-module">
    <div className="module-toolbar"><div><b>{records.filter((item) => item.enabled).length}</b><span> 个已启用 · 共 {records.length} 个项目</span></div><button onClick={addRecord}><Plus size={15}/>新增{active.replace('管理','')}</button></div>
    {notice && <div className="module-notice"><Check size={14}/>{notice}<button onClick={() => setNotice('')}><X size={13}/></button></div>}
    <div className="module-grid">{records.map((item) => <article className="module-card" key={item.id}>
      <div className="module-card-top"><span className="module-symbol">{item.name.slice(0,1)}</span><button className={item.enabled ? 'switch on' : 'switch'} onClick={() => toggle(item.id)} aria-label={`${item.enabled ? '停用' : '启用'}${item.name}`}><i/></button></div>
      <h3>{item.name}</h3><code>{item.key}</code><p>{item.description}</p>
      <footer><span><i className={item.enabled ? 'online' : ''}/>{item.meta}</span><button onClick={() => remove(item.id)} aria-label={`删除${item.name}`}><Trash2 size={14}/></button></footer>
    </article>)}</div>
    {!records.length && <div className="module-empty"><Boxes size={26}/><h2>暂无项目</h2><p>创建第一个基础配置来开始使用。</p><button onClick={addRecord}>立即创建</button></div>}
  </section>;
}

type Field = { id: number; name: string; key: string; type: string; required: boolean };
const initialFields: Field[] = [
  { id: 1, name: '客户名称', key: 'name', type: '单行文本', required: true },
  { id: 2, name: '客户级别', key: 'level', type: '单选', required: true },
  { id: 3, name: '联系电话', key: 'phone', type: '手机号', required: false },
];

function ModelDesigner({ onClose }: { onClose: () => void }) {
  const [fields, setFields] = useState(initialFields);
  const [modelName, setModelName] = useState('客户档案');
  const [modelKey, setModelKey] = useState('customer_profile');
  const [preview, setPreview] = useState<'api' | 'schema'>('api');
  const [saved, setSaved] = useState(false);
  const addField = () => setFields((items) => [...items, { id: Date.now(), name: '新字段', key: `field_${items.length + 1}`, type: '单行文本', required: false }]);
  const updateField = (id: number, patch: Partial<Field>) => setFields((items) => items.map((field) => field.id === id ? { ...field, ...patch } : field));
  const removeField = (id: number) => setFields((items) => items.filter((field) => field.id !== id));

  const apiPreview = `GET    /api/model-${modelKey}:list\nGET    /api/model-${modelKey}:get/:id\nPOST   /api/model-${modelKey}:create\nPUT    /api/model-${modelKey}:update/:id\nDELETE /api/model-${modelKey}:delete/:id`;
  const schemaPreview = JSON.stringify({ name: modelKey, title: modelName, fields: Object.fromEntries(fields.map((f) => [f.key, { title: f.name, type: f.type, required: f.required }])) }, null, 2);

  return <div className="designer-backdrop" role="dialog" aria-modal="true" aria-label="数据模型设计器">
    <section className="designer">
      <header className="designer-header"><div><span><Database size={15}/> DATA MODEL</span><h2>模型设计器</h2><p>定义字段后，PulCore 会同步生成数据表、API、表单和权限入口。</p></div><button onClick={onClose} aria-label="关闭设计器"><X size={20}/></button></header>
      <div className="designer-body">
        <div className="designer-form">
          <div className="model-meta"><label>模型名称<input value={modelName} onChange={(e) => setModelName(e.target.value)}/></label><label>模型标识<input value={modelKey} onChange={(e) => setModelKey(e.target.value.replace(/[^a-z0-9_]/g, ''))}/></label></div>
          <div className="fields-heading"><div><h3>字段定义</h3><p>{fields.length} 个业务字段 · 系统自动附加 ID 与时间戳</p></div><button onClick={addField}><Plus size={15}/>添加字段</button></div>
          <div className="fields-table"><div className="field-row field-head"><span>显示名称</span><span>字段标识</span><span>类型</span><span>必填</span><span/></div>
            {fields.map((field) => <div className="field-row" key={field.id}>
              <input value={field.name} onChange={(e) => updateField(field.id, { name: e.target.value })}/>
              <input value={field.key} onChange={(e) => updateField(field.id, { key: e.target.value.replace(/[^a-zA-Z0-9_]/g, '') })}/>
              <select value={field.type} onChange={(e) => updateField(field.id, { type: e.target.value })}><option>单行文本</option><option>多行文本</option><option>整数</option><option>金额</option><option>日期时间</option><option>单选</option><option>手机号</option></select>
              <button className={field.required ? 'required-toggle on' : 'required-toggle'} onClick={() => updateField(field.id, { required: !field.required })}>{field.required && <Check size={12}/>}</button>
              <button className="delete-field" onClick={() => removeField(field.id)} aria-label={`删除${field.name}`}><Trash2 size={15}/></button>
            </div>)}
          </div>
        </div>
        <aside className="designer-preview">
          <div className="preview-tabs"><button className={preview === 'api' ? 'active' : ''} onClick={() => setPreview('api')}><Code2 size={14}/>动态 API</button><button className={preview === 'schema' ? 'active' : ''} onClick={() => setPreview('schema')}><TableProperties size={14}/>Model Schema</button></div>
          <div className="preview-card"><div><i/><span>{preview === 'api' ? '自动生成的接口' : '实时元数据'}</span></div><pre>{preview === 'api' ? apiPreview : schemaPreview}</pre></div>
          <div className="generated-list"><p>保存模型后自动生成</p>{['数据库物理表', 'RESTful CRUD API', '列表与表单页面', '字段级权限入口'].map((item) => <span key={item}><Check size={13}/>{item}</span>)}</div>
        </aside>
      </div>
      <footer className="designer-footer"><span>{saved ? <><Check size={14}/>模型草稿已保存</> : '所有变更仅保存在当前原型中'}</span><div><button onClick={onClose}>取消</button><button className="save-model" onClick={() => setSaved(true)}>{saved ? '已保存' : '保存模型'}</button></div></footer>
    </section>
  </div>;
}
