import { categoryOfSlug, type Category, type CategoryId } from './categories'

export type CatalogEntry = {
  slug: string
  name: string
  summary: string
  related?: string[]
  category: CategoryId
  /** Named exports to show in the import snippet (defaults to [name]). */
  exports: string[]
}

type RawEntry = { slug: string; name: string; summary: string; related?: string[] }

/** Named exports that differ from the doc `name`. */
const EXPORT_OVERRIDES: Record<string, string[]> = {
  avatar: ['Avatar', 'AvatarGroup'],
  card: ['Card', 'StatusBar'],
  'cell-ellipsis': ['CellEllipsis', 'CellStack'],
  'choice-card': ['ChoiceCard', 'ChoiceCardGrid'],
  confirm: ['ConfirmProvider', 'useConfirm', 'confirm'],
  'confirm-modal': ['ConfirmModal', 'StrongConfirm'],
  'description-list': ['DescriptionList'],
  'meta-row': ['MetaRow'],
  metric: ['Metric', 'MetricGrid'],
  radio: ['Radio', 'RadioGroup'],
  'resource-state': ['ResourceState', 'ResourceEmptyIcon'],
  'search-result-list': ['SearchResultList', 'SearchResultItem'],
  'settings-row': ['SettingsRow', 'DangerZone'],
  skeleton: ['Skeleton', 'SkeletonCard', 'SkeletonTable'],
  sparkline: ['Sparkline', 'Stat'],
  stack: ['Stack', 'FormGrid', 'CatalogGroup', 'CatalogTile'],
  table: ['Table', 'DataTableFooter'],
  tag: ['Tag', 'TagGroup'],
  text: ['Text', 'Muted', 'Mono'],
  toast: ['ToastProvider', 'useToast'],
  'date-range-picker': ['DateRangePicker'],
  'date-picker': ['DatePicker'],
  field: ['Field'],
  input: ['Input'],
  'input-group': ['InputGroup'],
  textarea: ['Textarea'],
  'native-select': ['NativeSelect'],
}

const RAW_CATALOG: RawEntry[] = [
  { slug: 'accordion', name: 'Accordion', summary: '折叠面板，适合 FAQ 与分区说明。' },
  { slug: 'accent-picker', name: 'AccentPicker', summary: '强调色选择，写入外观偏好。' },
  { slug: 'alert', name: 'Alert', summary: '页内提示条，支持 tone 与关闭。', related: ['banner', 'toast'] },
  { slug: 'app-shell', name: 'AppShell', summary: '侧栏 + 顶栏应用壳。', related: ['sidebar', 'topbar'] },
  { slug: 'area-chart', name: 'AreaChart', summary: '面积图（recharts 封装）。', related: ['chart-container', 'line-chart'] },
  { slug: 'avatar', name: 'Avatar', summary: '头像与头像组。', related: ['avatar-upload'] },
  { slug: 'avatar-upload', name: 'AvatarUpload', summary: '头像上传预览。', related: ['avatar', 'image-upload-field'] },
  { slug: 'badge', name: 'Badge', summary: '状态徽标。', related: ['tag', 'pill'] },
  { slug: 'banner', name: 'Banner', summary: '通栏提示 / 维护条。', related: ['alert', 'maintenance-banner'] },
  { slug: 'bar-chart', name: 'BarChart', summary: '柱状图。', related: ['chart-container'] },
  { slug: 'brand', name: 'Brand', summary: '侧栏品牌区。', related: ['app-shell'] },
  { slug: 'breadcrumb-nav', name: 'BreadcrumbNav', summary: '业务面包屑导航。', related: ['breadcrumbs'] },
  { slug: 'breadcrumbs', name: 'Breadcrumbs', summary: '壳层面包屑。', related: ['breadcrumb-nav'] },
  { slug: 'button', name: 'Button', summary: '按钮：变体、尺寸、加载、图标、链接。', related: ['toggle-button', 'pill'] },
  { slug: 'calendar', name: 'Calendar', summary: '月历与事件点。', related: ['date-picker'] },
  { slug: 'callout', name: 'Callout', summary: '强调说明块。', related: ['alert'] },
  { slug: 'card', name: 'Card', summary: '表面容器：padded、StatusBar。', related: ['section-card', 'table-card', 'stack'] },
  { slug: 'cascader', name: 'Cascader', summary: '级联选择。', related: ['select', 'combobox'] },
  { slug: 'cell-ellipsis', name: 'CellEllipsis', summary: '单元格省略；表已默认 CSS 截断。', related: ['data-table', 'table'] },
  { slug: 'chart-container', name: 'ChartContainer', summary: '图表外框与标题。', related: ['area-chart', 'bar-chart'] },
  { slug: 'checkbox', name: 'Checkbox', summary: '复选框。', related: ['radio', 'switch'] },
  { slug: 'checklist', name: 'Checklist', summary: '检查清单。', related: ['checkbox'] },
  { slug: 'choice-card', name: 'ChoiceCard', summary: '大卡片路径选择。', related: ['segmented'] },
  { slug: 'code-block', name: 'CodeBlock', summary: '代码块展示。', related: ['copy-button', 'json-viewer'] },
  { slug: 'color-field', name: 'ColorField', summary: '带标签的颜色字段。', related: ['color-input', 'field'] },
  { slug: 'color-input', name: 'ColorInput', summary: 'HSV 取色器。', related: ['color-field'] },
  { slug: 'combobox', name: 'Combobox', summary: '可搜索下拉。', related: ['select'] },
  { slug: 'command-palette', name: 'CommandPalette', summary: '命令面板（⌘K）。', related: ['search-input'] },
  { slug: 'confirm', name: 'confirm', summary: '命令式确认（需 ConfirmProvider）。', related: ['confirm-modal', 'strong-confirm-drawer'] },
  { slug: 'confirm-modal', name: 'ConfirmModal', summary: '居中确认弹窗 / StrongConfirm。', related: ['confirm', 'modal'] },
  { slug: 'copy-button', name: 'CopyButton', summary: '一键复制。', related: ['code-block'] },
  { slug: 'data-table', name: 'DataTable', summary: '完整数据表：排序、分页、多选、列显隐。', related: ['table', 'resource-list'] },
  { slug: 'date-picker', name: 'DatePicker', summary: '日期 / 日期时间选择。', related: ['date-range-picker', 'time-picker'] },
  { slug: 'date-range-picker', name: 'DateRangePicker', summary: '日期范围。', related: ['date-picker'] },
  { slug: 'description-list', name: 'DescriptionList', summary: '详情键值列表（dl）。', related: ['meta-row', 'section-card'] },
  { slug: 'divider', name: 'Divider', summary: '区块 / 行内分隔线。', related: ['stack', 'card'] },
  { slug: 'drawer', name: 'Drawer', summary: '侧滑抽屉。', related: ['sheet', 'modal'] },
  { slug: 'dropdown-menu', name: 'DropdownMenu', summary: '下拉菜单。', related: ['popover'] },
  { slug: 'empty-state', name: 'EmptyState', summary: '空态占位。', related: ['resource-state'] },
  { slug: 'field', name: 'Field', summary: '表单字段标签、提示与错误。', related: ['input', 'textarea'] },
  { slug: 'file-upload', name: 'FileUpload', summary: '文件上传列表。', related: ['image-upload-field'] },
  { slug: 'filter-bar', name: 'FilterBar', summary: '通用筛选条容器。', related: ['list-filter-bar'] },
  { slug: 'form-errors', name: 'FormErrors', summary: '表单错误汇总。', related: ['field'] },
  { slug: 'form-page', name: 'FormPage', summary: '定宽表单页骨架。', related: ['list-page', 'page-header'] },
  { slug: 'heading', name: 'Heading', summary: '标题层级：page / section / card / sub。', related: ['text', 'page-header'] },
  { slug: 'image-preview', name: 'ImagePreview', summary: '图片预览灯箱。', related: ['image-upload-field'] },
  { slug: 'image-upload-field', name: 'ImageUploadField', summary: '单图上传字段。', related: ['file-upload', 'avatar-upload'] },
  { slug: 'input', name: 'Input', summary: '文本输入。', related: ['field', 'input-group', 'textarea'] },
  { slug: 'input-group', name: 'InputGroup', summary: '输入组合（前后缀）。', related: ['input'] },
  { slug: 'json-viewer', name: 'JsonViewer', summary: 'JSON 查看。', related: ['code-block'] },
  { slug: 'kbd', name: 'Kbd', summary: '快捷键键帽，嵌在说明文案中。', related: ['text', 'command-palette'] },
  { slug: 'key-value-editor', name: 'KeyValueEditor', summary: '键值对编辑。', related: ['tags-input'] },
  { slug: 'line-chart', name: 'LineChart', summary: '折线图。', related: ['chart-container', 'area-chart'] },
  { slug: 'list-filter-bar', name: 'ListFilterBar', summary: '列表搜索命中摘要。', related: ['resource-list'] },
  { slug: 'list-page', name: 'ListPage', summary: '全宽列表页骨架。', related: ['form-page', 'page-header'] },
  { slug: 'login-card', name: 'LoginCard', summary: '登录卡片容器。', related: ['totp-bind-panel'] },
  { slug: 'log-viewer', name: 'LogViewer', summary: '日志查看器。' },
  { slug: 'maintenance-banner', name: 'MaintenanceBanner', summary: '维护模式横幅。', related: ['banner'] },
  { slug: 'meta-row', name: 'MetaRow', summary: '行内混排名称、状态、环境。', related: ['description-list', 'badge', 'text'] },
  { slug: 'meter-bar', name: 'MeterBar', summary: '紧凑利用率条。', related: ['progress', 'status-dot'] },
  { slug: 'metric', name: 'Metric', summary: '指标数字与网格。', related: ['stat-card', 'sparkline'] },
  { slug: 'mirror-card', name: 'MirrorCard', summary: '镜像 / 源信息卡。' },
  { slug: 'modal', name: 'Modal', summary: '居中对话框。', related: ['drawer', 'confirm-modal'] },
  { slug: 'nav-icon', name: 'NavIcon', summary: '侧栏统一图标字重。', related: ['sidebar'] },
  { slug: 'node-picker', name: 'NodePicker', summary: '节点多选。', related: ['transfer'] },
  { slug: 'notification-list', name: 'NotificationList', summary: '通知列表。' },
  { slug: 'number-stepper', name: 'NumberStepper', summary: '数字步进器。', related: ['input'] },
  { slug: 'page-header', name: 'PageHeader', summary: '页级标题、描述与右侧操作。', related: ['heading', 'page-tabs', 'meta-row'] },
  { slug: 'page-tabs', name: 'PageTabs', summary: '页面级 Tab。', related: ['tabs'] },
  { slug: 'pagination', name: 'Pagination', summary: '分页控件。', related: ['data-table'] },
  { slug: 'pie-chart', name: 'PieChart', summary: '饼图。', related: ['chart-container'] },
  { slug: 'pill', name: 'Pill', summary: '轻量胶囊标签 / 操作。', related: ['badge', 'tag'] },
  { slug: 'pin-input', name: 'PinInput', summary: '验证码分位输入。', related: ['input'] },
  { slug: 'popover', name: 'Popover', summary: '锚点浮层。', related: ['tooltip', 'dropdown-menu'] },
  { slug: 'progress', name: 'Progress', summary: '进度条。', related: ['meter-bar', 'spinner'] },
  { slug: 'radial-progress', name: 'RadialProgress', summary: '环形进度。', related: ['progress'] },
  { slug: 'radio', name: 'Radio', summary: '单选与 RadioGroup。', related: ['checkbox', 'segmented'] },
  { slug: 'range-slider', name: 'RangeSlider', summary: '范围滑块。', related: ['number-stepper'] },
  { slug: 'resource-list', name: 'ResourceList', summary: '筛选 + 表 + 分页一体列表壳。', related: ['data-table', 'list-page'] },
  { slug: 'resource-state', name: 'ResourceState', summary: '加载 / 空 / 错误资源态。', related: ['empty-state', 'skeleton'] },
  { slug: 'search-input', name: 'SearchInput', summary: '搜索输入。', related: ['input'] },
  { slug: 'search-result-list', name: 'SearchResultList', summary: '搜索结果列表。', related: ['search-input'] },
  { slug: 'section-card', name: 'SectionCard', summary: '设置 / 详情分区卡片。', related: ['card', 'description-list', 'settings-row'] },
  { slug: 'segmented', name: 'Segmented', summary: '分段控件。', related: ['tabs', 'radio'] },
  { slug: 'select', name: 'Select', summary: '下拉选择（Portal 菜单）。', related: ['combobox', 'native-select'] },
  { slug: 'settings-row', name: 'SettingsRow', summary: '设置行与 DangerZone。', related: ['section-card'] },
  { slug: 'sheet', name: 'Sheet', summary: '底部/侧向薄板。', related: ['drawer'] },
  { slug: 'sidebar', name: 'Sidebar', summary: '应用侧栏导航。', related: ['app-shell', 'nav-icon'] },
  { slug: 'skeleton', name: 'Skeleton', summary: '骨架屏。', related: ['spinner', 'resource-state'] },
  { slug: 'sparkline', name: 'Sparkline', summary: '迷你趋势与 Stat。', related: ['metric'] },
  { slug: 'spinner', name: 'Spinner', summary: '加载指示。', related: ['progress', 'skeleton'] },
  { slug: 'split-pane', name: 'SplitPane', summary: '可拖分栏。' },
  { slug: 'stack', name: 'Stack', summary: '垂直间距；含 FormGrid / Catalog。', related: ['card', 'divider', 'field'] },
  { slug: 'stat-card', name: 'StatCard', summary: '统计卡片。', related: ['metric'] },
  { slug: 'status-dot', name: 'StatusDot', summary: '健康状态圆点。', related: ['meter-bar', 'badge'] },
  { slug: 'step-heading', name: 'StepHeading', summary: '步骤标题。', related: ['steps'] },
  { slug: 'steps', name: 'Steps', summary: '步骤条。', related: ['step-heading'] },
  { slug: 'strong-confirm-drawer', name: 'StrongConfirmDrawer', summary: '输入匹配字符串强确认抽屉。', related: ['confirm-modal'] },
  { slug: 'switch', name: 'Switch', summary: '开关。', related: ['checkbox', 'toggle-button'] },
  { slug: 'table', name: 'Table', summary: '底层表格（排序、固定列、多选）。', related: ['data-table', 'table-card'] },
  { slug: 'table-card', name: 'TableCard', summary: '带标题的表壳。', related: ['table', 'card'] },
  { slug: 'tabs', name: 'Tabs', summary: '内容 Tab。', related: ['page-tabs', 'segmented'] },
  { slug: 'tag', name: 'Tag', summary: '标签与 TagGroup。', related: ['badge', 'tags-input'] },
  { slug: 'tags-input', name: 'TagsInput', summary: '标签输入。', related: ['tag'] },
  { slug: 'text', name: 'Text', summary: '正文角色与字号；Muted / Mono。', related: ['heading', 'text-link'] },
  { slug: 'text-link', name: 'TextLink', summary: '句中文本链接。', related: ['text', 'button'] },
  { slug: 'textarea', name: 'Textarea', summary: '多行输入。', related: ['input', 'field'] },
  { slug: 'theme-drawer', name: 'ThemeDrawer', summary: '外观抽屉。', related: ['theme-picker', 'accent-picker'] },
  { slug: 'theme-picker', name: 'ThemePicker', summary: '主题包选择。', related: ['wallpaper-picker'] },
  { slug: 'time-picker', name: 'TimePicker', summary: '时间选择。', related: ['date-picker'] },
  { slug: 'timeline', name: 'Timeline', summary: '时间线。' },
  { slug: 'toast', name: 'Toast', summary: 'ToastProvider / useToast。', related: ['alert'] },
  { slug: 'toggle-button', name: 'ToggleButton', summary: '切换按钮。', related: ['button', 'switch'] },
  { slug: 'tooltip', name: 'Tooltip', summary: '悬停提示。', related: ['popover'] },
  { slug: 'topbar', name: 'Topbar', summary: '顶栏。', related: ['app-shell'] },
  { slug: 'totp-bind-panel', name: 'TotpBindPanel', summary: 'TOTP 绑定与二维码。', related: ['login-card', 'pin-input'] },
  { slug: 'transfer', name: 'Transfer', summary: '左右穿梭选择。', related: ['node-picker'] },
  { slug: 'tree', name: 'Tree', summary: '树形选择。', related: ['tree-table-cell'] },
  { slug: 'tree-table-cell', name: 'TreeTableCell', summary: '树表单元格。', related: ['data-table', 'tree'] },
  { slug: 'user-menu', name: 'UserMenu', summary: '用户菜单。', related: ['app-shell'] },
  { slug: 'wallpaper-picker', name: 'WallpaperPicker', summary: '壁纸选择（透明主题）。', related: ['theme-picker'] },
  { slug: 'native-select', name: 'NativeSelect', summary: '原生 select 封装。', related: ['select', 'field'] },
]

export const COMPONENT_CATALOG: CatalogEntry[] = RAW_CATALOG.map((e) => {
  const category = categoryOfSlug(e.slug)
  if (!category) throw new Error(`Catalog slug "${e.slug}" has no category`)
  return { ...e, category: category.id, exports: EXPORT_OVERRIDES[e.slug] ?? [e.name] }
})

export function getCatalogEntry(slug: string): CatalogEntry | undefined {
  return COMPONENT_CATALOG.find((c) => c.slug === slug)
}

/** Entries of a category in its curated order. */
export function entriesOfCategory(category: Category): CatalogEntry[] {
  return category.slugs
    .map((slug) => getCatalogEntry(slug))
    .filter((e): e is CatalogEntry => Boolean(e))
}

export function catalogTitles(): Record<string, string> {
  const map: Record<string, string> = {
    '/components': '全部组件',
  }
  for (const c of COMPONENT_CATALOG) {
    map[`/components/${c.slug}`] = c.name
  }
  return map
}
