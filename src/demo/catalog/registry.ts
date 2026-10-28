import type { Locale } from '@/i18n'
import { categoryOfSlug, type Category, type CategoryId } from './categories'
import type { L10n } from '../i18n/types'
import { pickL10n } from '../i18n/types'

export type CatalogEntry = {
  slug: string
  name: string
  summary: L10n
  related?: string[]
  category: CategoryId
  /** Named exports to show in the import snippet (defaults to [name]). */
  exports: string[]
}

type RawEntry = { slug: string; name: string; summary: L10n; related?: string[] }

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
  'masked-secret-field': ['MaskedSecretField', 'maskSecret'],
}

const RAW_CATALOG: RawEntry[] = [
  { slug: 'accordion', name: 'Accordion', summary: { en: 'Collapsible panels, good for FAQs and section explanations.', zh: '折叠面板，适合 FAQ 与分区说明。' } },
  { slug: 'accent-picker', name: 'AccentPicker', summary: { en: 'Accent color picker that writes to appearance preferences.', zh: '强调色选择，写入外观偏好。' } },
  { slug: 'alert', name: 'Alert', summary: { en: 'Inline alert banner with tone and dismiss support.', zh: '页内提示条，支持 tone 与关闭。' }, related: ['banner', 'toast'] },
  { slug: 'app-shell', name: 'AppShell', summary: { en: 'Sidebar + topbar application shell.', zh: '侧栏 + 顶栏应用壳。' }, related: ['sidebar', 'topbar'] },
  { slug: 'area-chart', name: 'AreaChart', summary: { en: 'Area chart (recharts wrapper).', zh: '面积图（recharts 封装）。' }, related: ['chart-container', 'line-chart'] },
  { slug: 'avatar', name: 'Avatar', summary: { en: 'Avatar and avatar group.', zh: '头像与头像组。' }, related: ['avatar-upload'] },
  { slug: 'avatar-upload', name: 'AvatarUpload', summary: { en: 'Avatar upload with preview.', zh: '头像上传预览。' }, related: ['avatar', 'image-upload-field'] },
  { slug: 'badge', name: 'Badge', summary: { en: 'Status badge.', zh: '状态徽标。' }, related: ['tag', 'pill'] },
  { slug: 'banner', name: 'Banner', summary: { en: 'Full-width banner / maintenance strip.', zh: '通栏提示 / 维护条。' }, related: ['alert', 'maintenance-banner'] },
  { slug: 'bar-chart', name: 'BarChart', summary: { en: 'Bar chart.', zh: '柱状图。' }, related: ['chart-container'] },
  { slug: 'brand', name: 'Brand', summary: { en: 'Sidebar brand area.', zh: '侧栏品牌区。' }, related: ['app-shell'] },
  { slug: 'breadcrumb-nav', name: 'BreadcrumbNav', summary: { en: 'Business-level breadcrumb navigation.', zh: '业务面包屑导航。' }, related: ['breadcrumbs'] },
  { slug: 'breadcrumbs', name: 'Breadcrumbs', summary: { en: 'Shell-level breadcrumbs.', zh: '壳层面包屑。' }, related: ['breadcrumb-nav'] },
  { slug: 'button', name: 'Button', summary: { en: 'Button: variants, sizes, loading, icons, link mode.', zh: '按钮：变体、尺寸、加载、图标、链接。' }, related: ['toggle-button', 'pill'] },
  { slug: 'calendar', name: 'Calendar', summary: { en: 'Month calendar with event dots.', zh: '月历与事件点。' }, related: ['date-picker'] },
  { slug: 'callout', name: 'Callout', summary: { en: 'Emphasized explanatory block.', zh: '强调说明块。' }, related: ['alert'] },
  { slug: 'card', name: 'Card', summary: { en: 'Surface container: padded, StatusBar.', zh: '表面容器：padded、StatusBar。' }, related: ['section-card', 'table-card', 'stack'] },
  { slug: 'cascader', name: 'Cascader', summary: { en: 'Cascading select.', zh: '级联选择。' }, related: ['select', 'combobox'] },
  { slug: 'cell-ellipsis', name: 'CellEllipsis', summary: { en: 'Cell ellipsis; tables already truncate with CSS by default.', zh: '单元格省略；表已默认 CSS 截断。' }, related: ['data-table', 'table'] },
  { slug: 'chart-container', name: 'ChartContainer', summary: { en: 'Chart frame with title.', zh: '图表外框与标题。' }, related: ['area-chart', 'bar-chart'] },
  { slug: 'checkbox', name: 'Checkbox', summary: { en: 'Checkbox.', zh: '复选框。' }, related: ['radio', 'switch'] },
  { slug: 'checklist', name: 'Checklist', summary: { en: 'Checklist.', zh: '检查清单。' }, related: ['checkbox'] },
  { slug: 'choice-card', name: 'ChoiceCard', summary: { en: 'Large-card path selection.', zh: '大卡片路径选择。' }, related: ['segmented'] },
  { slug: 'code-block', name: 'CodeBlock', summary: { en: 'Code block display.', zh: '代码块展示。' }, related: ['copy-button', 'json-viewer'] },
  { slug: 'color-field', name: 'ColorField', summary: { en: 'Labeled color field.', zh: '带标签的颜色字段。' }, related: ['color-input', 'field'] },
  { slug: 'color-input', name: 'ColorInput', summary: { en: 'HSV color picker.', zh: 'HSV 取色器。' }, related: ['color-field'] },
  { slug: 'combobox', name: 'Combobox', summary: { en: 'Searchable dropdown.', zh: '可搜索下拉。' }, related: ['select'] },
  { slug: 'command-palette', name: 'CommandPalette', summary: { en: 'Command palette (⌘K).', zh: '命令面板（⌘K）。' }, related: ['search-input'] },
  { slug: 'confirm', name: 'confirm', summary: { en: 'Imperative confirm (requires ConfirmProvider).', zh: '命令式确认（需 ConfirmProvider）。' }, related: ['confirm-modal', 'strong-confirm-drawer'] },
  { slug: 'confirm-modal', name: 'ConfirmModal', summary: { en: 'Centered confirm dialog / StrongConfirm.', zh: '居中确认弹窗 / StrongConfirm。' }, related: ['confirm', 'modal'] },
  { slug: 'copy-button', name: 'CopyButton', summary: { en: 'One-click copy.', zh: '一键复制。' }, related: ['code-block'] },
  { slug: 'data-table', name: 'DataTable', summary: { en: 'Full data table: sorting, pagination, multi-select, column visibility.', zh: '完整数据表：排序、分页、多选、列显隐。' }, related: ['table', 'resource-list'] },
  { slug: 'date-picker', name: 'DatePicker', summary: { en: 'Date / date-time picker.', zh: '日期 / 日期时间选择。' }, related: ['date-range-picker', 'time-picker'] },
  { slug: 'date-range-picker', name: 'DateRangePicker', summary: { en: 'Date range.', zh: '日期范围。' }, related: ['date-picker'] },
  { slug: 'description-list', name: 'DescriptionList', summary: { en: 'Detail key-value list (dl).', zh: '详情键值列表（dl）。' }, related: ['meta-row', 'section-card'] },
  { slug: 'divider', name: 'Divider', summary: { en: 'Block / inline divider.', zh: '区块 / 行内分隔线。' }, related: ['stack', 'card'] },
  { slug: 'drawer', name: 'Drawer', summary: { en: 'Sliding side drawer.', zh: '侧滑抽屉。' }, related: ['sheet', 'modal'] },
  { slug: 'dropdown-menu', name: 'DropdownMenu', summary: { en: 'Dropdown menu.', zh: '下拉菜单。' }, related: ['popover'] },
  { slug: 'empty-state', name: 'EmptyState', summary: { en: 'Empty-state placeholder.', zh: '空态占位。' }, related: ['resource-state'] },
  { slug: 'field', name: 'Field', summary: { en: 'Form field label, hint, and error.', zh: '表单字段标签、提示与错误。' }, related: ['input', 'textarea'] },
  { slug: 'face-photo-picker', name: 'FacePhotoPicker', summary: { en: 'KYC face photo with oval guide overlay.', zh: 'KYC 人脸照片 + 椭圆引导。' }, related: ['image-upload-field', 'file-upload'] },
  { slug: 'file-upload', name: 'FileUpload', summary: { en: 'File upload list.', zh: '文件上传列表。' }, related: ['image-upload-field'] },
  { slug: 'filter-bar', name: 'FilterBar', summary: { en: 'Generic filter bar container.', zh: '通用筛选条容器。' }, related: ['list-filter-bar'] },
  { slug: 'form-errors', name: 'FormErrors', summary: { en: 'Form error summary.', zh: '表单错误汇总。' }, related: ['field'] },
  { slug: 'form-page', name: 'FormPage', summary: { en: 'Fixed-width form page skeleton.', zh: '定宽表单页骨架。' }, related: ['list-page', 'page-header'] },
  { slug: 'heading', name: 'Heading', summary: { en: 'Heading levels: page / section / card / sub.', zh: '标题层级：page / section / card / sub。' }, related: ['text', 'page-header'] },
  { slug: 'image-preview', name: 'ImagePreview', summary: { en: 'Image preview lightbox.', zh: '图片预览灯箱。' }, related: ['image-upload-field', 'pdf-preview'] },
  { slug: 'image-upload-field', name: 'ImageUploadField', summary: { en: 'Single-image upload field.', zh: '单图上传字段。' }, related: ['file-upload', 'avatar-upload', 'face-photo-picker'] },
  { slug: 'input', name: 'Input', summary: { en: 'Text input.', zh: '文本输入。' }, related: ['field', 'input-group', 'textarea'] },
  { slug: 'input-group', name: 'InputGroup', summary: { en: 'Input group (prefix / suffix).', zh: '输入组合（前后缀）。' }, related: ['input'] },
  { slug: 'json-viewer', name: 'JsonViewer', summary: { en: 'JSON viewer.', zh: 'JSON 查看。' }, related: ['code-block'] },
  { slug: 'kbd', name: 'Kbd', summary: { en: 'Keyboard-shortcut key, embedded inline in copy.', zh: '快捷键键帽，嵌在说明文案中。' }, related: ['text', 'command-palette'] },
  { slug: 'key-value-editor', name: 'KeyValueEditor', summary: { en: 'Key-value pair editor.', zh: '键值对编辑。' }, related: ['tags-input'] },
  { slug: 'line-chart', name: 'LineChart', summary: { en: 'Line chart.', zh: '折线图。' }, related: ['chart-container', 'area-chart'] },
  { slug: 'list-filter-bar', name: 'ListFilterBar', summary: { en: 'List search hit summary.', zh: '列表搜索命中摘要。' }, related: ['resource-list'] },
  { slug: 'list-page', name: 'ListPage', summary: { en: 'Full-width list page skeleton.', zh: '全宽列表页骨架。' }, related: ['form-page', 'page-header'] },
  { slug: 'login-card', name: 'LoginCard', summary: { en: 'Login card container.', zh: '登录卡片容器。' }, related: ['totp-bind-panel'] },
  { slug: 'log-viewer', name: 'LogViewer', summary: { en: 'Log viewer.', zh: '日志查看器。' } },
  { slug: 'maintenance-banner', name: 'MaintenanceBanner', summary: { en: 'Maintenance-mode banner.', zh: '维护模式横幅。' }, related: ['banner'] },
  { slug: 'masked-secret-field', name: 'MaskedSecretField', summary: { en: 'Half-masked secret with reveal and copy.', zh: '半掩码密钥展示（显隐 + 复制）。' }, related: ['copy-button', 'field'] },
  { slug: 'mermaid-diagram', name: 'MermaidDiagram', summary: { en: 'Mermaid flowchart (optional peer mermaid).', zh: 'Mermaid 流程图（可选 peer mermaid）。' }, related: ['code-block'] },
  { slug: 'meta-row', name: 'MetaRow', summary: { en: 'Inline row mixing name, status, and environment.', zh: '行内混排名称、状态、环境。' }, related: ['description-list', 'badge', 'text'] },
  { slug: 'meter-bar', name: 'MeterBar', summary: { en: 'Compact utilization bar.', zh: '紧凑利用率条。' }, related: ['progress', 'status-dot'] },
  { slug: 'metric', name: 'Metric', summary: { en: 'Metric number and grid.', zh: '指标数字与网格。' }, related: ['stat-card', 'sparkline'] },
  { slug: 'mirror-card', name: 'MirrorCard', summary: { en: 'Mirror / source info card.', zh: '镜像 / 源信息卡。' } },
  { slug: 'modal', name: 'Modal', summary: { en: 'Centered modal dialog.', zh: '居中对话框。' }, related: ['drawer', 'confirm-modal'] },
  { slug: 'nav-icon', name: 'NavIcon', summary: { en: 'Unified icon weight for the sidebar.', zh: '侧栏统一图标字重。' }, related: ['sidebar'] },
  { slug: 'node-picker', name: 'NodePicker', summary: { en: 'Node multi-select.', zh: '节点多选。' }, related: ['transfer'] },
  { slug: 'notification-list', name: 'NotificationList', summary: { en: 'Notification list.', zh: '通知列表。' } },
  { slug: 'number-stepper', name: 'NumberStepper', summary: { en: 'Number stepper.', zh: '数字步进器。' }, related: ['input'] },
  { slug: 'page-header', name: 'PageHeader', summary: { en: 'Page-level title, description, and right-side actions.', zh: '页级标题、描述与右侧操作。' }, related: ['heading', 'page-tabs', 'meta-row'] },
  { slug: 'page-tabs', name: 'PageTabs', summary: { en: 'Page-level tabs.', zh: '页面级 Tab。' }, related: ['tabs'] },
  { slug: 'pagination', name: 'Pagination', summary: { en: 'Pagination control.', zh: '分页控件。' }, related: ['data-table'] },
  { slug: 'pdf-preview', name: 'PdfPreview', summary: { en: 'PDF lightbox with download / open-tab.', zh: 'PDF 灯箱（下载 / 新标签页）。' }, related: ['image-preview', 'modal'] },
  { slug: 'pie-chart', name: 'PieChart', summary: { en: 'Pie chart.', zh: '饼图。' }, related: ['chart-container'] },
  { slug: 'pill', name: 'Pill', summary: { en: 'Lightweight pill tag / action.', zh: '轻量胶囊标签 / 操作。' }, related: ['badge', 'tag'] },
  { slug: 'pin-input', name: 'PinInput', summary: { en: 'Segmented PIN / OTP input.', zh: '验证码分位输入。' }, related: ['input'] },
  { slug: 'popover', name: 'Popover', summary: { en: 'Anchored popover.', zh: '锚点浮层。' }, related: ['tooltip', 'dropdown-menu'] },
  { slug: 'progress', name: 'Progress', summary: { en: 'Progress bar.', zh: '进度条。' }, related: ['meter-bar', 'spinner'] },
  { slug: 'radial-progress', name: 'RadialProgress', summary: { en: 'Radial progress.', zh: '环形进度。' }, related: ['progress'] },
  { slug: 'radio', name: 'Radio', summary: { en: 'Radio and RadioGroup.', zh: '单选与 RadioGroup。' }, related: ['checkbox', 'segmented'] },
  { slug: 'range-slider', name: 'RangeSlider', summary: { en: 'Range slider.', zh: '范围滑块。' }, related: ['number-stepper'] },
  { slug: 'resource-list', name: 'ResourceList', summary: { en: 'All-in-one list shell: filters + table + pagination.', zh: '筛选 + 表 + 分页一体列表壳。' }, related: ['data-table', 'list-page'] },
  { slug: 'resource-state', name: 'ResourceState', summary: { en: 'Loading / empty / error resource state.', zh: '加载 / 空 / 错误资源态。' }, related: ['empty-state', 'skeleton'] },
  { slug: 'search-input', name: 'SearchInput', summary: { en: 'Search input.', zh: '搜索输入。' }, related: ['input'] },
  { slug: 'search-result-list', name: 'SearchResultList', summary: { en: 'Search result list.', zh: '搜索结果列表。' }, related: ['search-input'] },
  { slug: 'section-card', name: 'SectionCard', summary: { en: 'Settings / detail section card.', zh: '设置 / 详情分区卡片。' }, related: ['card', 'description-list', 'settings-row'] },
  { slug: 'segmented', name: 'Segmented', summary: { en: 'Segmented control.', zh: '分段控件。' }, related: ['tabs', 'radio'] },
  { slug: 'select', name: 'Select', summary: { en: 'Dropdown select (portal menu).', zh: '下拉选择（Portal 菜单）。' }, related: ['combobox', 'native-select'] },
  { slug: 'settings-row', name: 'SettingsRow', summary: { en: 'Settings row and DangerZone.', zh: '设置行与 DangerZone。' }, related: ['section-card'] },
  { slug: 'sheet', name: 'Sheet', summary: { en: 'Bottom / side sheet.', zh: '底部/侧向薄板。' }, related: ['drawer'] },
  { slug: 'sidebar', name: 'Sidebar', summary: { en: 'Application sidebar navigation.', zh: '应用侧栏导航。' }, related: ['app-shell', 'nav-icon'] },
  { slug: 'skeleton', name: 'Skeleton', summary: { en: 'Skeleton loading placeholder.', zh: '骨架屏。' }, related: ['spinner', 'resource-state'] },
  { slug: 'sparkline', name: 'Sparkline', summary: { en: 'Mini trend line and Stat.', zh: '迷你趋势与 Stat。' }, related: ['metric'] },
  { slug: 'spinner', name: 'Spinner', summary: { en: 'Loading indicator.', zh: '加载指示。' }, related: ['progress', 'skeleton'] },
  { slug: 'split-pane', name: 'SplitPane', summary: { en: 'Draggable split panes.', zh: '可拖分栏。' } },
  { slug: 'stack', name: 'Stack', summary: { en: 'Vertical spacing; includes FormGrid / Catalog.', zh: '垂直间距；含 FormGrid / Catalog。' }, related: ['card', 'divider', 'field'] },
  { slug: 'stat-card', name: 'StatCard', summary: { en: 'Stat card.', zh: '统计卡片。' }, related: ['metric'] },
  { slug: 'status-dot', name: 'StatusDot', summary: { en: 'Health status dot.', zh: '健康状态圆点。' }, related: ['meter-bar', 'badge'] },
  { slug: 'step-heading', name: 'StepHeading', summary: { en: 'Step heading.', zh: '步骤标题。' }, related: ['steps'] },
  { slug: 'steps', name: 'Steps', summary: { en: 'Step bar.', zh: '步骤条。' }, related: ['step-heading'] },
  { slug: 'strong-confirm-drawer', name: 'StrongConfirmDrawer', summary: { en: 'Strong-confirm drawer requiring a matching typed string.', zh: '输入匹配字符串强确认抽屉。' }, related: ['confirm-modal'] },
  { slug: 'switch', name: 'Switch', summary: { en: 'Switch.', zh: '开关。' }, related: ['checkbox', 'toggle-button'] },
  { slug: 'table', name: 'Table', summary: { en: 'Low-level table (sorting, pinned columns, multi-select).', zh: '底层表格（排序、固定列、多选）。' }, related: ['data-table', 'table-card'] },
  { slug: 'table-card', name: 'TableCard', summary: { en: 'Table shell with a title.', zh: '带标题的表壳。' }, related: ['table', 'card'] },
  { slug: 'tabs', name: 'Tabs', summary: { en: 'Content tabs.', zh: '内容 Tab。' }, related: ['page-tabs', 'segmented'] },
  { slug: 'tag', name: 'Tag', summary: { en: 'Tag and TagGroup.', zh: '标签与 TagGroup。' }, related: ['badge', 'tags-input'] },
  { slug: 'tags-input', name: 'TagsInput', summary: { en: 'Tags input.', zh: '标签输入。' }, related: ['tag'] },
  { slug: 'text', name: 'Text', summary: { en: 'Body text roles and sizes; Muted / Mono.', zh: '正文角色与字号；Muted / Mono。' }, related: ['heading', 'text-link'] },
  { slug: 'text-link', name: 'TextLink', summary: { en: 'Inline text link.', zh: '句中文本链接。' }, related: ['text', 'button'] },
  { slug: 'textarea', name: 'Textarea', summary: { en: 'Multi-line input.', zh: '多行输入。' }, related: ['input', 'field'] },
  { slug: 'theme-drawer', name: 'ThemeDrawer', summary: { en: 'Appearance drawer.', zh: '外观抽屉。' }, related: ['theme-picker', 'accent-picker'] },
  { slug: 'theme-picker', name: 'ThemePicker', summary: { en: 'Theme pack picker.', zh: '主题包选择。' }, related: ['wallpaper-picker'] },
  { slug: 'time-picker', name: 'TimePicker', summary: { en: 'Time picker.', zh: '时间选择。' }, related: ['date-picker'] },
  { slug: 'timeline', name: 'Timeline', summary: { en: 'Timeline.', zh: '时间线。' } },
  { slug: 'toast', name: 'Toast', summary: { en: 'ToastProvider / useToast.', zh: 'ToastProvider / useToast。' }, related: ['alert'] },
  { slug: 'toggle-button', name: 'ToggleButton', summary: { en: 'Toggle button.', zh: '切换按钮。' }, related: ['button', 'switch'] },
  { slug: 'tooltip', name: 'Tooltip', summary: { en: 'Hover tooltip.', zh: '悬停提示。' }, related: ['popover'] },
  { slug: 'topbar', name: 'Topbar', summary: { en: 'Topbar.', zh: '顶栏。' }, related: ['app-shell'] },
  { slug: 'totp-bind-panel', name: 'TotpBindPanel', summary: { en: 'TOTP binding with QR code.', zh: 'TOTP 绑定与二维码。' }, related: ['login-card', 'pin-input'] },
  { slug: 'transfer', name: 'Transfer', summary: { en: 'Left-right transfer selection.', zh: '左右穿梭选择。' }, related: ['node-picker'] },
  { slug: 'tree', name: 'Tree', summary: { en: 'Tree selection.', zh: '树形选择。' }, related: ['tree-table-cell'] },
  { slug: 'tree-table-cell', name: 'TreeTableCell', summary: { en: 'Tree-table cell.', zh: '树表单元格。' }, related: ['data-table', 'tree'] },
  { slug: 'user-menu', name: 'UserMenu', summary: { en: 'User menu.', zh: '用户菜单。' }, related: ['app-shell'] },
  { slug: 'wallpaper-picker', name: 'WallpaperPicker', summary: { en: 'Wallpaper picker (glass theme).', zh: '壁纸选择（透明主题）。' }, related: ['theme-picker'] },
  { slug: 'native-select', name: 'NativeSelect', summary: { en: 'Native <select> wrapper.', zh: '原生 select 封装。' }, related: ['select', 'field'] },
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

/** Locale-resolved summary for a catalog entry. */
export function entrySummary(entry: CatalogEntry, locale: Locale): string {
  return pickL10n(locale, entry.summary)
}

export function catalogTitles(): Record<string, string> {
  const map: Record<string, string> = {}
  for (const c of COMPONENT_CATALOG) {
    map[`/components/${c.slug}`] = c.name
  }
  return map
}
