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
  label: string
  /** One-line positioning shown on index + category headers. */
  description: string
  /** Slugs in display order. Every catalog slug must appear exactly once. */
  slugs: string[]
}

/** Component taxonomy — drives sidebar groups, /components index, doc breadcrumbs. */
export const CATEGORIES: Category[] = [
  {
    id: 'layout',
    label: '布局与排版',
    description: '文字、间距、卡片与页面骨架。写页面先用这些原语建立层级，再叠加业务组件。',
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
    label: '通用',
    description: '按钮、标记、头像、进度与折叠等无业务语义的基础展示。',
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
    ],
  },
  {
    id: 'forms',
    label: '表单',
    description: '输入、选择、日期、上传与字段容器；统一用 Field 承载标签、提示与错误。',
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
      'settings-row',
      'form-errors',
    ],
  },
  {
    id: 'data',
    label: '数据展示',
    description: '表格、列表、指标、树与日志。数据页优先使用 ResourceList / DataTable。',
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
    label: '图表',
    description: '基于 recharts 的封装，颜色跟随主题与强调色。',
    slugs: [
      'chart-container',
      'line-chart',
      'area-chart',
      'bar-chart',
      'pie-chart',
      'radial-progress',
    ],
  },
  {
    id: 'feedback',
    label: '反馈',
    description: '提示、空态、加载与资源状态。按「打断程度」选择合适的反馈形式。',
    slugs: [
      'alert',
      'callout',
      'banner',
      'maintenance-banner',
      'toast',
      'empty-state',
      'resource-state',
      'skeleton',
    ],
  },
  {
    id: 'overlay',
    label: '浮层与确认',
    description: '对话框、抽屉、气泡、菜单与危险操作确认。',
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
    ],
  },
  {
    id: 'navigation',
    label: '导航与步骤',
    description: 'Tab、分段、面包屑、分页与步骤。',
    slugs: [
      'tabs',
      'page-tabs',
      'segmented',
      'breadcrumbs',
      'breadcrumb-nav',
      'steps',
      'step-heading',
      'nav-icon',
    ],
  },
  {
    id: 'shell',
    label: '应用壳与账户',
    description: '侧栏、顶栏、用户菜单、登录与外观设置。',
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
