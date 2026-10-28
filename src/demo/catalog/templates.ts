import {
  Bell,
  Boxes,
  CircleSlash,
  Columns2,
  FileText,
  Gauge,
  Heading,
  KeyRound,
  LayoutGrid,
  List,
  ListTodo,
  Loader,
  LogIn,
  MailCheck,
  PanelRight,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  Type,
  UserPlus,
  UserRound,
  Users,
  Workflow,
  UserCog,
  LayoutList,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

export type TemplateItem = {
  to: string
  label: string
  /** One-line description: what scenario + which components. */
  desc: string
  icon: LucideIcon
}

export type TemplateGroup = {
  id: string
  label: string
  description: string
  icon: LucideIcon
  items: TemplateItem[]
}

/** Full-page templates — single source for the sidebar, /templates index, and ⌘K. */
export const TEMPLATE_GROUPS: TemplateGroup[] = [
  {
    id: 'auth',
    label: '认证与账户',
    description: '登录、注册、找回密码与个人资料。',
    icon: UserCog,
    items: [
      { to: '/examples/login', label: '登录页', desc: 'LoginCard + PinInput / TOTP 绑定', icon: LogIn },
      { to: '/examples/register', label: '注册页', desc: 'LoginCard + 表单校验，完成后验证邮箱', icon: UserPlus },
      { to: '/examples/verify-email', label: '邮箱验证', desc: 'PinInput 验证码', icon: MailCheck },
      { to: '/examples/reset-password', label: '重置密码', desc: 'FormPage + FormErrors', icon: KeyRound },
      { to: '/examples/profile', label: '个人资料', desc: 'AvatarUpload + SectionCard', icon: UserRound },
    ],
  },
  {
    id: 'data',
    label: '列表与数据',
    description: '资源列表、详情抽屉、搜索与日志。',
    icon: LayoutList,
    items: [
      { to: '/examples/list', label: '列表页', desc: 'ResourceList · 多模板', icon: List },
      { to: '/examples/list-detail', label: '列表详情', desc: '行点击 → 详情抽屉', icon: PanelRight },
      { to: '/examples/search', label: '搜索结果', desc: 'SearchResultList', icon: Search },
      { to: '/examples/roles', label: '角色权限', desc: 'DataTable + Checkbox 权限矩阵', icon: Shield },
      { to: '/examples/audit', label: '审计详情', desc: 'Timeline + DescriptionList + LogViewer', icon: ListTodo },
      { to: '/examples/log', label: '日志页', desc: 'LogViewer + 过滤', icon: ListTodo },
      { to: '/examples/api-keys', label: 'API Key', desc: 'ResourceList + Drawer', icon: KeyRound },
    ],
  },
  {
    id: 'forms',
    label: '表单与流程',
    description: '定宽表单、设置、向导与详情。',
    icon: FileText,
    items: [
      { to: '/examples/form', label: '表单页', desc: 'FormPage 定宽表单', icon: FileText },
      { to: '/examples/settings', label: '设置页', desc: 'SectionCard 分区', icon: Settings },
      { to: '/examples/choice', label: '路径选择', desc: 'ChoiceCard 大卡片', icon: LayoutGrid },
      { to: '/examples/wizard', label: '向导页', desc: 'Steps + StepHeading 多步表单', icon: Workflow },
      { to: '/examples/onboarding', label: '开通向导', desc: 'Steps + FormPage', icon: Workflow },
      { to: '/examples/invite', label: '邀请成员', desc: 'TagsInput + 角色', icon: Users },
      { to: '/examples/detail', label: '详情页', desc: 'PageHeader + PageTabs + SectionCard', icon: Boxes },
    ],
  },
  {
    id: 'feedback',
    label: '状态与反馈',
    description: '空态、错误、加载、确认与权限提示。',
    icon: ShieldCheck,
    items: [
      { to: '/examples/empty', label: '空态 / 404', desc: 'EmptyState', icon: CircleSlash },
      { to: '/examples/errors', label: '错误与离线', desc: 'Alert + ResourceState + FormErrors', icon: CircleSlash },
      { to: '/examples/skeleton', label: '加载骨架', desc: 'Skeleton 系列', icon: Loader },
      { to: '/examples/strong-confirm', label: '强确认', desc: 'StrongConfirmDrawer', icon: ShieldAlert },
      { to: '/examples/notifications', label: '通知中心', desc: 'NotificationList', icon: Bell },
      { to: '/examples/permissions', label: '权限策略', desc: 'SettingsRow + Switch + Tooltip', icon: Shield },
    ],
  },
  {
    id: 'misc',
    label: '仪表盘与排版',
    description: '仪表盘、对比，以及页面标题 / 字号 / 文案密度。',
    icon: Gauge,
    items: [
      { to: '/examples/dashboard', label: '仪表盘', desc: 'MetricGrid + AreaChart / BarChart', icon: Gauge },
      { to: '/examples/compare', label: '对比 / Diff', desc: 'SplitPane + CodeBlock', icon: Columns2 },
      { to: '/examples/page', label: '页面标题', desc: 'PageHeader 全形态', icon: Heading },
      { to: '/examples/typography', label: '字体字号', desc: '字号阶梯与角色', icon: Type },
      { to: '/examples/i18n', label: '文案与密度', desc: '长文案 + 紧凑 / 舒适密度', icon: Type },
    ],
  },
]

export const ALL_TEMPLATES: TemplateItem[] = TEMPLATE_GROUPS.flatMap((g) => g.items)

export function templateTitles(): Record<string, string> {
  const map: Record<string, string> = {}
  for (const t of ALL_TEMPLATES) map[t.to] = t.label
  return map
}
