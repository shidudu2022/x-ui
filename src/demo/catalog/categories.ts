import type { Locale } from '@/i18n'
import type { L10n } from '../i18n/types'
import { pickL10n } from '../i18n/types'

export type CategoryId =
  | 'layout'
  | 'general'
  | 'forms'
  | 'data'
  | 'charts'
  | 'feedback'
  | 'overlay'
  | 'navigation'
  | 'shell'

export type Category = {
  id: CategoryId
  label: L10n
  /** One-line positioning shown on index + category headers. */
  description: L10n
  /** Slugs in display order. Every catalog slug must appear exactly once. */
  slugs: string[]
}

/** Component taxonomy — drives sidebar groups, /components index, doc breadcrumbs. */
export const CATEGORIES: Category[] = [
  {
    id: 'layout',
    label: { en: 'Layout & typography', zh: '布局与排版' },
    description: {
      en: 'Text, spacing, cards, and page skeletons. Start a page with these primitives to establish hierarchy, then layer business components on top.',
      zh: '文字、间距、卡片与页面骨架。写页面先用这些原语建立层级，再叠加业务组件。',
    },
    slugs: [
      'text',
      'heading',
      'stack',
      'divider',
      'card',
      'section-card',
      'page-header',
      'description-list',
      'meta-row',
      'text-link',
      'kbd',
      'split-pane',
      'form-page',
      'list-page',
    ],
  },
  {
    id: 'general',
    label: { en: 'General', zh: '通用' },
    description: {
      en: 'Buttons, tags, avatars, progress, and accordions — basic display primitives with no business semantics.',
      zh: '按钮、标记、头像、进度与折叠等无业务语义的基础展示。',
    },
    slugs: [
      'button',
      'toggle-button',
      'copy-button',
      'badge',
      'tag',
      'pill',
      'status-dot',
      'avatar',
      'progress',
      'meter-bar',
      'spinner',
      'accordion',
      'timeline',
      'checklist',
      'code-block',
      'json-viewer',
      'mermaid-diagram',
    ],
  },
  {
    id: 'forms',
    label: { en: 'Forms', zh: '表单' },
    description: {
      en: 'Inputs, selects, dates, uploads, and field containers; use Field uniformly to carry labels, hints, and errors.',
      zh: '输入、选择、日期、上传与字段容器；统一用 Field 承载标签、提示与错误。',
    },
    slugs: [
      'field',
      'input',
      'input-group',
      'textarea',
      'search-input',
      'number-stepper',
      'pin-input',
      'select',
      'native-select',
      'combobox',
      'cascader',
      'checkbox',
      'radio',
      'switch',
      'range-slider',
      'tags-input',
      'key-value-editor',
      'date-picker',
      'date-range-picker',
      'time-picker',
      'color-input',
      'color-field',
      'choice-card',
      'transfer',
      'node-picker',
      'file-upload',
      'image-upload-field',
      'avatar-upload',
      'face-photo-picker',
      'masked-secret-field',
      'settings-row',
      'form-errors',
    ],
  },
  {
    id: 'data',
    label: { en: 'Data display', zh: '数据展示' },
    description: {
      en: 'Tables, lists, metrics, trees, and logs. Prefer ResourceList / DataTable for data pages.',
      zh: '表格、列表、指标、树与日志。数据页优先使用 ResourceList / DataTable。',
    },
    slugs: [
      'resource-list',
      'data-table',
      'table',
      'table-card',
      'tree-table-cell',
      'cell-ellipsis',
      'pagination',
      'filter-bar',
      'list-filter-bar',
      'search-result-list',
      'tree',
      'calendar',
      'metric',
      'stat-card',
      'sparkline',
      'mirror-card',
      'notification-list',
      'log-viewer',
    ],
  },
  {
    id: 'charts',
    label: { en: 'Charts', zh: '图表' },
    description: {
      en: 'Wrappers around recharts; colors follow the theme and accent color.',
      zh: '基于 recharts 的封装，颜色跟随主题与强调色。',
    },
    slugs: ['chart-container', 'line-chart', 'area-chart', 'bar-chart', 'pie-chart', 'radial-progress'],
  },
  {
    id: 'feedback',
    label: { en: 'Feedback', zh: '反馈' },
    description: {
      en: 'Alerts, empty states, loading, and resource states. Choose the right form of feedback based on how disruptive it should be.',
      zh: '提示、空态、加载与资源状态。按「打断程度」选择合适的反馈形式。',
    },
    slugs: ['alert', 'callout', 'banner', 'maintenance-banner', 'toast', 'empty-state', 'resource-state', 'skeleton'],
  },
  {
    id: 'overlay',
    label: { en: 'Overlays & confirmation', zh: '浮层与确认' },
    description: {
      en: 'Dialogs, drawers, popovers, menus, and confirmation for destructive actions.',
      zh: '对话框、抽屉、气泡、菜单与危险操作确认。',
    },
    slugs: [
      'modal',
      'drawer',
      'sheet',
      'popover',
      'tooltip',
      'dropdown-menu',
      'confirm',
      'confirm-modal',
      'strong-confirm-drawer',
      'command-palette',
      'image-preview',
      'pdf-preview',
    ],
  },
  {
    id: 'navigation',
    label: { en: 'Navigation & steps', zh: '导航与步骤' },
    description: {
      en: 'Tabs, segmented controls, breadcrumbs, pagination, and steps.',
      zh: 'Tab、分段、面包屑、分页与步骤。',
    },
    slugs: ['tabs', 'page-tabs', 'segmented', 'breadcrumbs', 'breadcrumb-nav', 'steps', 'step-heading', 'nav-icon'],
  },
  {
    id: 'shell',
    label: { en: 'App shell & account', zh: '应用壳与账户' },
    description: {
      en: 'Sidebar, topbar, user menu, login, and appearance settings.',
      zh: '侧栏、顶栏、用户菜单、登录与外观设置。',
    },
    slugs: [
      'app-shell',
      'sidebar',
      'topbar',
      'brand',
      'user-menu',
      'login-card',
      'totp-bind-panel',
      'theme-drawer',
      'theme-picker',
      'accent-picker',
      'wallpaper-picker',
    ],
  },
]

const SLUG_TO_CATEGORY = new Map<string, CategoryId>()
for (const c of CATEGORIES) for (const s of c.slugs) SLUG_TO_CATEGORY.set(s, c.id)

export function categoryOfSlug(slug: string): Category | undefined {
  const id = SLUG_TO_CATEGORY.get(slug)
  return CATEGORIES.find((c) => c.id === id)
}

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id)
}

/** Locale-resolved { label, description } for a category. */
export function localizedCategory(category: Category, locale: Locale): { label: string; description: string } {
  return { label: pickL10n(locale, category.label), description: pickL10n(locale, category.description) }
}
