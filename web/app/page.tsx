'use client';

import { Activity, AppWindow, Boxes, Braces, ChevronDown, CircleHelp, Database, GitBranch, KeyRound, LayoutDashboard, MoreHorizontal, PackageCheck, Play, Plus, Search, Settings, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
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
  const visibleModels = useMemo(() => models.filter((m) => `${m.name}${m.key}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return <main className="app-shell">
    <aside className="sidebar">
      <div className="brand"><Logo /><div><strong>榫卯</strong><small>PulCore</small></div></div>
      <nav className="nav-list" aria-label="平台导航"><p>构建</p>
        {navigation.map(([label, Icon]) => <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => setActive(label)}><Icon size={18}/><span>{label}</span>{label === '插件中心' && <em>12</em>}</button>)}
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
          <button className="secondary-button"><Play size={15} fill="currentColor"/>打开模型设计器</button>
        </section>
      </div>
    </section>
  </main>;
}

function Logo(){ return <div className="brand-mark" aria-hidden="true"><span/><span/></div>; }
function PanelTitle({title,note,action}:{title:string;note:string;action?:string}){ return <div className="panel-heading"><div><h2>{title}</h2><p>{note}</p></div>{action && <button>{action}</button>}</div>; }
function Stat({icon:Icon,label,value,note,tone}:{icon:typeof Database;label:string;value:string;note:string;tone:string}){ return <article className="stat-card"><span className={`stat-icon ${tone}`}><Icon size={19}/></span><div><p>{label}</p><strong>{value}</strong><small>{note}</small></div></article>; }
