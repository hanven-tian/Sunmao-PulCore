'use client';

import { Activity, AppWindow, Boxes, Braces, Check, ChevronDown, CircleHelp, Code2, Database, GitBranch, KeyRound, LayoutDashboard, MoreHorizontal, PackageCheck, Play, Plus, Search, Settings, ShieldCheck, Sparkles, TableProperties, Trash2, Workflow, X } from 'lucide-react';
import { useMemo, useState } from 'react';

const navigation = [
  ['工作台', LayoutDashboard], ['数据模型', Database], ['页面设计', AppWindow],
  ['工作流', Workflow], ['权限策略', ShieldCheck], ['插件中心', Boxes],
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
        {navigation.map(([label, Icon]) => <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => { setActive(label); if (label === '数据模型') setDesignerOpen(true); }}><Icon size={18}/><span>{label}</span>{label === '插件中心' && <em>12</em>}</button>)}
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
        <section className="stats-grid">
          <Stat icon={Database} label="数据模型" value="16" note="+2 本月" tone="cyan"/>
          <Stat icon={AppWindow} label="已发布页面" value="28" note="6 个草稿" tone="violet"/>
          <Stat icon={Workflow} label="运行中流程" value="9" note="今日 1,204 次" tone="amber"/>
          <Stat icon={Boxes} label="已启用插件" value="12" note="全部正常" tone="green"/>
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
        </section>
      </div>
    </section>
    {designerOpen && <ModelDesigner onClose={() => setDesignerOpen(false)}/>} 
  </main>;
}

function Logo(){ return <div className="brand-mark" aria-hidden="true"><span/><span/></div>; }
function PanelTitle({title,note,action}:{title:string;note:string;action?:string}){ return <div className="panel-heading"><div><h2>{title}</h2><p>{note}</p></div>{action && <button>{action}</button>}</div>; }
function Stat({icon:Icon,label,value,note,tone}:{icon:typeof Database;label:string;value:string;note:string;tone:string}){ return <article className="stat-card"><span className={`stat-icon ${tone}`}><Icon size={19}/></span><div><p>{label}</p><strong>{value}</strong><small>{note}</small></div></article>; }

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
