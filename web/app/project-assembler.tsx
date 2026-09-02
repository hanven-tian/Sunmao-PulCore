'use client';
import {
  Bot,
  Boxes,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  FileImage,
  GripVertical,
  LayoutGrid,
  PackagePlus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export type AssemblyPlugin = {
  id: string;
  name: string;
  category: string;
  description: string;
  depends: string[];
  contributes: string[];
  builtin?: boolean;
};
export const assemblyPlugins: AssemblyPlugin[] = [
  {
    id: 'model',
    name: '数据模型工具',
    category: '数据模型',
    description: '创建集合、字段、关系和校验规则',
    depends: [],
    contributes: ['集合设计器', '字段设计器', 'CRUD 资源'],
    builtin: true,
  },
  {
    id: 'access',
    name: '访问控制',
    category: '用户和权限',
    description: '角色、操作权限和数据范围',
    depends: ['model'],
    contributes: ['角色设计器', '新增/查看/编辑/删除权限'],
    builtin: true,
  },
  {
    id: 'ui',
    name: 'UI 布局',
    category: '界面搭建',
    description: '页面、菜单、区块和响应式布局',
    depends: [],
    contributes: ['页面画布', '导航菜单'],
    builtin: true,
  },
  {
    id: 'table',
    name: '块：列表',
    category: '界面搭建',
    description: '把数据模型渲染为可筛选列表',
    depends: ['model', 'ui'],
    contributes: ['列表区块', '分页', '字段列'],
  },
  {
    id: 'form',
    name: '块：表单',
    category: '界面搭建',
    description: '根据字段生成新增和编辑表单',
    depends: ['model', 'ui'],
    contributes: ['动态表单', '必填校验'],
  },
  {
    id: 'details',
    name: '块：详情',
    category: '界面搭建',
    description: '显示单条记录及关联信息',
    depends: ['model', 'ui'],
    contributes: ['详情区块'],
  },
  {
    id: 'kanban',
    name: '看板',
    category: '界面搭建',
    description: '按状态字段形成可视化看板',
    depends: ['model', 'ui'],
    contributes: ['看板区块'],
  },
  {
    id: 'calendar',
    name: '日历',
    category: '界面搭建',
    description: '按日期字段展示业务记录',
    depends: ['model', 'ui'],
    contributes: ['日历区块'],
  },
  {
    id: 'map',
    name: '区块：地图',
    category: '界面搭建',
    description: '按经纬度显示地图标记',
    depends: ['model', 'ui'],
    contributes: ['地图区块', '位置字段'],
  },
  {
    id: 'chart',
    name: '数据可视化',
    category: '界面搭建',
    description: '图表和聚合指标区块',
    depends: ['model', 'ui'],
    contributes: ['指标卡', '图表区块'],
  },
  {
    id: 'workflow',
    name: '工作流程',
    category: '工作流程',
    description: '触发器、条件和动作编排',
    depends: ['model'],
    contributes: ['工作流设计器', '记录事件触发'],
  },
  {
    id: 'approval',
    name: '工作流程：审批',
    category: '工作流程',
    description: '提交、通过、退回和抄送',
    depends: ['workflow', 'access'],
    contributes: ['审批节点', '审批状态字段'],
  },
  {
    id: 'http',
    name: '工作流程：HTTP 请求节点',
    category: '工作流程',
    description: '在流程内调用 HTTP 服务',
    depends: ['workflow'],
    contributes: ['HTTP 动作节点'],
  },
  {
    id: 'notify',
    name: '通知管理器',
    category: '通知',
    description: '站内信、邮件与 Webhook 通知',
    depends: [],
    contributes: ['通知渠道', '消息模板'],
  },
  {
    id: 'file',
    name: '文件管理器',
    category: '数据模型',
    description: '附件字段、上传和访问控制',
    depends: ['model', 'access'],
    contributes: ['附件字段', '文件区块'],
  },
  {
    id: 'import',
    name: '操作：导入记录',
    category: '数据操作',
    description: '表格模板导入并校验记录',
    depends: ['model'],
    contributes: ['导入动作'],
  },
  {
    id: 'export',
    name: '操作：导出记录',
    category: '数据操作',
    description: '导出筛选后的业务数据',
    depends: ['model'],
    contributes: ['导出动作'],
  },
  {
    id: 'print',
    name: '操作：打印',
    category: '数据操作',
    description: '打印当前记录或列表',
    depends: ['ui'],
    contributes: ['打印动作'],
  },
  {
    id: 'audit',
    name: '审计日志',
    category: '安全',
    description: '记录模型、页面、权限和数据操作',
    depends: ['access'],
    contributes: ['审计记录', '变更轨迹'],
  },
  {
    id: 'history',
    name: '记录历史',
    category: '安全',
    description: '保存记录版本并支持查看差异',
    depends: ['model', 'audit'],
    contributes: ['版本记录'],
  },
  {
    id: 'api',
    name: 'API 文档',
    category: '系统管理',
    description: '为模型资源生成接口说明',
    depends: ['model'],
    contributes: ['OpenAPI 文档'],
  },
  {
    id: 'datasource',
    name: '数据源管理器',
    category: '数据源',
    description: '管理主库和外部数据连接',
    depends: [],
    contributes: ['数据源连接器'],
  },
  {
    id: 'mysql',
    name: '数据源：外部 MySQL',
    category: '数据源',
    description: '连接外部 MySQL 数据库',
    depends: ['datasource'],
    contributes: ['MySQL 连接'],
  },
  {
    id: 'postgres',
    name: '数据源：外部 PostgreSQL',
    category: '数据源',
    description: '连接外部 PostgreSQL 数据库',
    depends: ['datasource'],
    contributes: ['PostgreSQL 连接'],
  },
  {
    id: 'rest',
    name: '数据源：REST API',
    category: '数据源',
    description: '把外部 REST API 映射为数据源',
    depends: ['datasource'],
    contributes: ['REST 数据源'],
  },
  {
    id: 'mqtt',
    name: 'MQTT 设备接入',
    category: '工业物联网',
    description: '主题订阅、消息解析和设备认证',
    depends: ['model'],
    contributes: ['设备模型', 'MQTT 连接配置', '遥测入口'],
  },
  {
    id: 'modbus',
    name: 'Modbus 设备接入',
    category: '工业物联网',
    description: '寄存器映射和网关采集',
    depends: ['model'],
    contributes: ['测点模型', '寄存器映射'],
  },
  {
    id: 'heartbeat',
    name: '设备心跳',
    category: '工业物联网',
    description: '在线状态、最后心跳和离线判定',
    depends: ['mqtt'],
    contributes: ['在线状态字段', '离线规则'],
  },
  {
    id: 'telemetry',
    name: '时序遥测',
    category: '工业物联网',
    description: '测点写入、质量标记和聚合',
    depends: ['mqtt'],
    contributes: ['遥测模型', '趋势区块'],
  },
  {
    id: 'alarm',
    name: '设备告警联动',
    category: '工业物联网',
    description: '规则告警、去重和流程联动',
    depends: ['telemetry', 'workflow'],
    contributes: ['告警模型', '告警规则'],
  },
  {
    id: 'edge',
    name: '边缘网关与指令',
    category: '工业物联网',
    description: '网关状态、指令下发和回执',
    depends: ['mqtt'],
    contributes: ['网关模型', '指令模型'],
  },
];
const required = ['model', 'access', 'ui'];
const bundles = [
  {
    name: '通用数据管理',
    ids: [
      'model',
      'access',
      'ui',
      'table',
      'form',
      'details',
      'import',
      'export',
      'audit',
    ],
  },
  {
    name: '审批业务系统',
    ids: [
      'model',
      'access',
      'ui',
      'table',
      'form',
      'details',
      'workflow',
      'approval',
      'notify',
      'audit',
    ],
  },
  {
    name: '工业物联网',
    ids: [
      'model',
      'access',
      'ui',
      'table',
      'form',
      'map',
      'chart',
      'workflow',
      'notify',
      'audit',
      'mqtt',
      'modbus',
      'heartbeat',
      'telemetry',
      'alarm',
      'edge',
    ],
  },
];

export type ProjectMeta = {
  name: string;
  key: string;
  description: string;
  mode: 'ai' | 'no-code';
  icon: string;
  cover: string;
};
const iconOptions = [
  ['layout', '通用', LayoutGrid],
  ['business', '业务', BriefcaseBusiness],
  ['team', '协作', Users],
  ['sales', '销售', ShoppingBag],
  ['ai', '智能', Sparkles],
] as const;
export function ProjectAssembler({
  onCreate,
  notify,
}: {
  onCreate: (meta: ProjectMeta, plugins: AssemblyPlugin[]) => void;
  notify: (s: string) => void;
}) {
  const [mode, setMode] = useState<'ai' | 'no-code' | null>(null),
    [meta, setMeta] = useState<ProjectMeta>({
      name: '',
      key: '',
      description: '',
      mode: 'no-code',
      icon: 'layout',
      cover: '',
    }),
    [selected, setSelected] = useState<string[]>(required),
    [category, setCategory] = useState('全部'),
    [q, setQ] = useState(''),
    [aiPrompt, setAiPrompt] = useState('');
  const categories = [
    '全部',
    ...Array.from(new Set(assemblyPlugins.map((x) => x.category))),
  ];
  const shown = useMemo(
    () =>
      assemblyPlugins.filter(
        (x) =>
          (category === '全部' || x.category === category) &&
          (x.name + x.description).includes(q),
      ),
    [category, q],
  );
  const resolve = (ids: string[]) => {
    const out = new Set(ids);
    let changed = true;
    while (changed) {
      changed = false;
      assemblyPlugins
        .filter((x) => out.has(x.id))
        .forEach((x) =>
          x.depends.forEach((d) => {
            if (!out.has(d)) {
              out.add(d);
              changed = true;
            }
          }),
        );
    }
    return Array.from(out);
  };
  const add = (pid: string) => setSelected(resolve([...selected, pid]));
  const remove = (pid: string) => {
    if (required.includes(pid)) return notify('基础内核组件不能移除');
    const depended = assemblyPlugins.filter(
      (x) => selected.includes(x.id) && x.depends.includes(pid),
    );
    if (depended.length)
      return notify(
        `请先移除依赖它的组件：${depended.map((x) => x.name).join('、')}`,
      );
    setSelected(selected.filter((x) => x !== pid));
  };
  const create = () => {
    if (!meta.name.trim()) return notify('请先填写项目名称');
    onCreate(
      { ...meta, mode: mode || 'no-code' },
      assemblyPlugins.filter((x) => selected.includes(x.id)),
    );
  };
  const planWithAi = () => {
    if (!aiPrompt.trim()) return notify('请描述要创建的业务系统');
    const text = aiPrompt;
    let ids = ['model', 'access', 'ui', 'table', 'form', 'details', 'audit'];
    if (/审批|流程|合同|请假/.test(text))
      ids.push('workflow', 'approval', 'notify');
    if (/设备|物联网|MQTT|工业/.test(text))
      ids.push(
        'mqtt',
        'modbus',
        'heartbeat',
        'telemetry',
        'alarm',
        'edge',
        'map',
        'chart',
      );
    if (/报表|驾驶舱|统计|分析|数据看板/.test(text)) ids.push('chart');
    if (/任务看板|状态看板/.test(text)) ids.push('kanban');
    if (/日历|排期|日程/.test(text)) ids.push('calendar');
    if (/地图|位置|轨迹/.test(text)) ids.push('map');
    if (/文件|附件|合同/.test(text)) ids.push('file');
    if (/导入|Excel/.test(text)) ids.push('import', 'export');
    const title = (
      text.match(
        /(?:创建|搭建|生成|做一个)?\s*([^，。]{2,18}(?:系统|平台|应用|中心))/,
      )?.[1] || 'AI 生成业务应用'
    ).trim();
    setMeta((x) => ({
      ...x,
      name: title,
      key: 'ai-app-' + Date.now(),
      description: text,
      mode: 'ai',
      icon: 'ai',
    }));
    setSelected(resolve(ids));
    notify('人工智能代理已生成模型、页面、权限、流程和插件方案');
  };
  const uploadCover = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) return notify('封面只支持图片文件');
    if (file.size > 1024 * 1024) return notify('封面不能超过 1MB');
    const reader = new FileReader();
    reader.onload = () =>
      setMeta((x) => ({ ...x, cover: String(reader.result) }));
    reader.readAsDataURL(file);
  };
  if (!mode)
    return (
      <section className="mode-picker">
        <button className="studio-back" onClick={() => history.back()}></button>
        <header>
          <small>PULCORE APPLICATION CREATION</small>
          <h2>选择应用开发模式</h2>
          <p>
            两种模式使用同一套模型、页面、工作流和权限底座，创建后可以继续切换和调整。
          </p>
        </header>
        <div>
          <button
            onClick={() => {
              setMode('ai');
              setMeta((x) => ({ ...x, mode: 'ai', icon: 'ai' }));
            }}
          >
            <Bot />
            <span>
              <b>人工智能模式</b>
              <p>
                用自然语言描述需求，由代理生成和修改界面、数据模型、业务逻辑、角色与权限。
              </p>
              <em>
                从需求描述开始 <ChevronRight size={14} />
              </em>
            </span>
          </button>
          <button
            onClick={() => {
              setMode('no-code');
              setMeta((x) => ({ ...x, mode: 'no-code' }));
            }}
          >
            <LayoutGrid />
            <span>
              <b>无代码模式</b>
              <p>
                通过拖放和批量选择装配插件，并由智能助手协助优化模型、页面和工作流。
              </p>
              <em>
                从可视化装配开始 <ChevronRight size={14} />
              </em>
            </span>
          </button>
        </div>
      </section>
    );
  return (
    <section className="assembler">
      <header>
        <div>
          <small>
            PULCORE JOINERY BUILDER /{' '}
            {mode === 'ai' ? 'AI MODE' : 'NO-CODE MODE'}
          </small>
          <h2>
            {mode === 'ai'
              ? '描述需求，生成应用结构'
              : '像搭榫卯一样装配业务系统'}
          </h2>
          <p>
            {mode === 'ai'
              ? '代理会根据需求选择插件并生成模型、页面、角色和流程，生成后仍可手工调整。'
              : '拖入单个插件，或选择一个能力组合；依赖会自动补齐。'}
          </p>
          <button className="mode-switch" onClick={() => setMode(null)}>
            切换开发模式
          </button>
        </div>
        <div className="assembler-meta">
          <input
            value={meta.name}
            onChange={(e) => setMeta({ ...meta, name: e.target.value })}
            placeholder="项目名称，例如：合同管理系统"
          />
          <input
            value={meta.key}
            onChange={(e) =>
              setMeta({
                ...meta,
                key: e.target.value.replace(/[^a-zA-Z0-9-]/g, ''),
              })
            }
            placeholder="项目标识 contract-system"
          />
        </div>
      </header>
      {mode === 'ai' && (
        <div className="ai-planner">
          <Bot size={20} />
          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="例如：创建一套合同管理系统，需要客户、合同、回款模型，合同审批，销售和财务角色，支持附件与到期提醒。"
          />
          <button onClick={planWithAi}>生成应用方案</button>
        </div>
      )}
      <div className="app-appearance">
        <div>
          <b>应用图标</b>
          <span className="icon-options">
            {iconOptions.map(([key, label, I]) => (
              <button
                className={meta.icon === key ? 'active' : ''}
                key={key}
                onClick={() => setMeta({ ...meta, icon: key })}
              >
                <I size={18} />
                <small>{label}</small>
              </button>
            ))}
          </span>
        </div>
        <label className="cover-upload">
          <b>门户卡片封面</b>
          {meta.cover ? (
            <img src={meta.cover} alt="应用封面预览" />
          ) : (
            <span>
              <FileImage />
              上传图片（最大 1MB）
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadCover(e.target.files?.[0])}
          />
        </label>
      </div>
      <div className="bundle-row">
        <b>快速组合</b>
        {bundles.map((b) => (
          <button
            key={b.name}
            onClick={() => setSelected(resolve([...selected, ...b.ids]))}
          >
            <PackagePlus size={14} />
            {b.name}
          </button>
        ))}
      </div>
      <div className="assembler-body">
        <aside>
          <h3>能力分类</h3>
          {categories.map((x) => (
            <button
              className={category === x ? 'active' : ''}
              key={x}
              onClick={() => setCategory(x)}
            >
              {x}
              <span>
                {x === '全部'
                  ? assemblyPlugins.length
                  : assemblyPlugins.filter((p) => p.category === x).length}
              </span>
            </button>
          ))}
        </aside>
        <main>
          <label className="assembler-search">
            <Search size={14} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜索可运行插件"
            />
          </label>
          <div className="assembly-catalog">
            {shown.map((p) => (
              <article
                key={p.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', p.id)}
                className={selected.includes(p.id) ? 'selected' : ''}
              >
                <GripVertical />
                <div>
                  <b>{p.name}</b>
                  <p>{p.description}</p>
                  <small>{p.contributes.join(' · ')}</small>
                </div>
                <button
                  onClick={() =>
                    selected.includes(p.id) ? remove(p.id) : add(p.id)
                  }
                >
                  {selected.includes(p.id) ? (
                    <Check size={14} />
                  ) : (
                    <PackagePlus size={14} />
                  )}
                </button>
              </article>
            ))}
          </div>
        </main>
        <section
          className="assembly-tray"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => add(e.dataTransfer.getData('text/plain'))}
        >
          <h3>
            <Boxes size={16} />
            项目装配区 <span>{selected.length}</span>
          </h3>
          <p>拖到这里或批量选择。顺序按依赖关系自动整理。</p>
          <div>
            {assemblyPlugins
              .filter((x) => selected.includes(x.id))
              .map((p, i) => (
                <article key={p.id}>
                  <span>{i + 1}</span>
                  <div>
                    <b>{p.name}</b>
                    <small>
                      {p.depends.length
                        ? `依赖：${p.depends.map((d) => assemblyPlugins.find((x) => x.id === d)?.name).join('、')}`
                        : '无依赖'}
                    </small>
                  </div>
                  {p.builtin ? (
                    <em>内置</em>
                  ) : (
                    <button onClick={() => remove(p.id)}>
                      <Trash2 size={13} />
                    </button>
                  )}
                </article>
              ))}
          </div>
          <footer>
            <textarea
              value={meta.description}
              onChange={(e) =>
                setMeta({ ...meta, description: e.target.value })
              }
              placeholder="项目目标与使用范围"
            />
            <button onClick={create}>
              生成可运行项目
              <ChevronRight size={15} />
            </button>
          </footer>
        </section>
      </div>
    </section>
  );
}
