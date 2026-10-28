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
import type { Locale } from '@/i18n'
import type { L10n } from '../i18n/types'
import { pickL10n } from '../i18n/types'

export type TemplateItem = {
  to: string
  label: L10n
  /** One-line description: what scenario + which components. */
  desc: L10n
  icon: LucideIcon
}

export type TemplateGroup = {
  id: string
  label: L10n
  description: L10n
  icon: LucideIcon
  items: TemplateItem[]
}

/** Full-page templates — single source for the sidebar, /templates index, and ⌘K. */
export const TEMPLATE_GROUPS: TemplateGroup[] = [
  {
    id: 'auth',
    label: { en: 'Auth & account', zh: '认证与账户' },
    description: { en: 'Login, registration, password recovery, and profile.', zh: '登录、注册、找回密码与个人资料。' },
    icon: UserCog,
    items: [
      {
        to: '/examples/login',
        label: { en: 'Login page', zh: '登录页' },
        desc: { en: 'LoginCard + PinInput / TOTP binding', zh: 'LoginCard + PinInput / TOTP 绑定' },
        icon: LogIn,
      },
      {
        to: '/examples/register',
        label: { en: 'Register page', zh: '注册页' },
        desc: { en: 'LoginCard + form validation, verify email after submit', zh: 'LoginCard + 表单校验，完成后验证邮箱' },
        icon: UserPlus,
      },
      {
        to: '/examples/verify-email',
        label: { en: 'Verify email', zh: '邮箱验证' },
        desc: { en: 'PinInput verification code', zh: 'PinInput 验证码' },
        icon: MailCheck,
      },
      {
        to: '/examples/reset-password',
        label: { en: 'Reset password', zh: '重置密码' },
        desc: { en: 'FormPage + FormErrors', zh: 'FormPage + FormErrors' },
        icon: KeyRound,
      },
      {
        to: '/examples/profile',
        label: { en: 'Profile', zh: '个人资料' },
        desc: { en: 'AvatarUpload + SectionCard', zh: 'AvatarUpload + SectionCard' },
        icon: UserRound,
      },
    ],
  },
  {
    id: 'data',
    label: { en: 'Lists & data', zh: '列表与数据' },
    description: { en: 'Resource lists, detail drawers, search, and logs.', zh: '资源列表、详情抽屉、搜索与日志。' },
    icon: LayoutList,
    items: [
      {
        to: '/examples/list',
        label: { en: 'List page', zh: '列表页' },
        desc: { en: 'ResourceList · multiple templates', zh: 'ResourceList · 多模板' },
        icon: List,
      },
      {
        to: '/examples/list-detail',
        label: { en: 'List + detail', zh: '列表详情' },
        desc: { en: 'Row click → detail drawer', zh: '行点击 → 详情抽屉' },
        icon: PanelRight,
      },
      {
        to: '/examples/search',
        label: { en: 'Search results', zh: '搜索结果' },
        desc: { en: 'SearchResultList', zh: 'SearchResultList' },
        icon: Search,
      },
      {
        to: '/examples/roles',
        label: { en: 'Roles & permissions', zh: '角色权限' },
        desc: { en: 'DataTable + Checkbox permission matrix', zh: 'DataTable + Checkbox 权限矩阵' },
        icon: Shield,
      },
      {
        to: '/examples/audit',
        label: { en: 'Audit detail', zh: '审计详情' },
        desc: { en: 'Timeline + DescriptionList + LogViewer', zh: 'Timeline + DescriptionList + LogViewer' },
        icon: ListTodo,
      },
      {
        to: '/examples/log',
        label: { en: 'Log page', zh: '日志页' },
        desc: { en: 'LogViewer + filters', zh: 'LogViewer + 过滤' },
        icon: ListTodo,
      },
      {
        to: '/examples/api-keys',
        label: { en: 'API keys', zh: 'API Key' },
        desc: { en: 'ResourceList + Drawer', zh: 'ResourceList + Drawer' },
        icon: KeyRound,
      },
    ],
  },
  {
    id: 'forms',
    label: { en: 'Forms & flows', zh: '表单与流程' },
    description: { en: 'Fixed-width forms, settings, wizards, and detail pages.', zh: '定宽表单、设置、向导与详情。' },
    icon: FileText,
    items: [
      {
        to: '/examples/form',
        label: { en: 'Form page', zh: '表单页' },
        desc: { en: 'FormPage fixed-width form', zh: 'FormPage 定宽表单' },
        icon: FileText,
      },
      {
        to: '/examples/settings',
        label: { en: 'Settings page', zh: '设置页' },
        desc: { en: 'SectionCard sections', zh: 'SectionCard 分区' },
        icon: Settings,
      },
      {
        to: '/examples/choice',
        label: { en: 'Path selection', zh: '路径选择' },
        desc: { en: 'ChoiceCard large cards', zh: 'ChoiceCard 大卡片' },
        icon: LayoutGrid,
      },
      {
        to: '/examples/wizard',
        label: { en: 'Wizard page', zh: '向导页' },
        desc: { en: 'Steps + StepHeading multi-step form', zh: 'Steps + StepHeading 多步表单' },
        icon: Workflow,
      },
      {
        to: '/examples/onboarding',
        label: { en: 'Onboarding wizard', zh: '开通向导' },
        desc: { en: 'Steps + FormPage', zh: 'Steps + FormPage' },
        icon: Workflow,
      },
      {
        to: '/examples/invite',
        label: { en: 'Invite member', zh: '邀请成员' },
        desc: { en: 'TagsInput + roles', zh: 'TagsInput + 角色' },
        icon: Users,
      },
      {
        to: '/examples/detail',
        label: { en: 'Detail page', zh: '详情页' },
        desc: { en: 'PageHeader + PageTabs + SectionCard', zh: 'PageHeader + PageTabs + SectionCard' },
        icon: Boxes,
      },
    ],
  },
  {
    id: 'feedback',
    label: { en: 'State & feedback', zh: '状态与反馈' },
    description: { en: 'Empty, error, loading, confirmation, and permission hints.', zh: '空态、错误、加载、确认与权限提示。' },
    icon: ShieldCheck,
    items: [
      {
        to: '/examples/empty',
        label: { en: 'Empty / 404', zh: '空态 / 404' },
        desc: { en: 'EmptyState', zh: 'EmptyState' },
        icon: CircleSlash,
      },
      {
        to: '/examples/errors',
        label: { en: 'Errors & offline', zh: '错误与离线' },
        desc: { en: 'Alert + ResourceState + FormErrors', zh: 'Alert + ResourceState + FormErrors' },
        icon: CircleSlash,
      },
      {
        to: '/examples/skeleton',
        label: { en: 'Loading skeletons', zh: '加载骨架' },
        desc: { en: 'Skeleton family', zh: 'Skeleton 系列' },
        icon: Loader,
      },
      {
        to: '/examples/strong-confirm',
        label: { en: 'Strong confirm', zh: '强确认' },
        desc: { en: 'StrongConfirmDrawer', zh: 'StrongConfirmDrawer' },
        icon: ShieldAlert,
      },
      {
        to: '/examples/notifications',
        label: { en: 'Notification center', zh: '通知中心' },
        desc: { en: 'NotificationList', zh: 'NotificationList' },
        icon: Bell,
      },
      {
        to: '/examples/permissions',
        label: { en: 'Permission policy', zh: '权限策略' },
        desc: { en: 'SettingsRow + Switch + Tooltip', zh: 'SettingsRow + Switch + Tooltip' },
        icon: Shield,
      },
    ],
  },
  {
    id: 'misc',
    label: { en: 'Dashboards & typography', zh: '仪表盘与排版' },
    description: {
      en: 'Dashboards, comparisons, and page titles / type scale / copy density.',
      zh: '仪表盘、对比，以及页面标题 / 字号 / 文案密度。',
    },
    icon: Gauge,
    items: [
      {
        to: '/examples/dashboard',
        label: { en: 'Dashboard', zh: '仪表盘' },
        desc: { en: 'MetricGrid + AreaChart / BarChart', zh: 'MetricGrid + AreaChart / BarChart' },
        icon: Gauge,
      },
      {
        to: '/examples/compare',
        label: { en: 'Compare / diff', zh: '对比 / Diff' },
        desc: { en: 'SplitPane + CodeBlock', zh: 'SplitPane + CodeBlock' },
        icon: Columns2,
      },
      {
        to: '/examples/page',
        label: { en: 'Page title', zh: '页面标题' },
        desc: { en: 'PageHeader, every shape', zh: 'PageHeader 全形态' },
        icon: Heading,
      },
      {
        to: '/examples/typography',
        label: { en: 'Typography', zh: '字体字号' },
        desc: { en: 'Type scale and roles', zh: '字号阶梯与角色' },
        icon: Type,
      },
      {
        to: '/examples/i18n',
        label: { en: 'Copy & density', zh: '文案与密度' },
        desc: { en: 'Long copy + comfortable / compact density', zh: '长文案 + 紧凑 / 舒适密度' },
        icon: Type,
      },
    ],
  },
]

export const ALL_TEMPLATES: TemplateItem[] = TEMPLATE_GROUPS.flatMap((g) => g.items)

export function templateTitles(locale: Locale): Record<string, string> {
  const map: Record<string, string> = {}
  for (const t of ALL_TEMPLATES) map[t.to] = pickL10n(locale, t.label)
  return map
}
