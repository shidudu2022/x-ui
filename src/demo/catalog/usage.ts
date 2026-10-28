import type { L10n } from '../i18n/types'

export type UsageGuide = {
  /** When to use this component. */
  when: L10n[]
  /** Don't use it like this / use something else instead. */
  avoid?: L10n[]
  /** Implementation notes (a11y, default behavior, pairing with other components). */
  tips?: L10n[]
}

/** Hand-written guidance for the most-used components. Others fall back to category guidance. */
export const USAGE: Record<string, UsageGuide> = {
  text: {
    when: [
      {
        en: 'All body copy, descriptions, and helper text; use `variant` to express role (body / muted / strong / mono)',
        zh: '所有正文、说明、辅助文案；用 variant 表达角色（正文 / muted / strong / mono）',
      },
      {
        en: 'When you need a consistent size scale, use `size` instead of writing font-size',
        zh: '需要统一字号阶梯时，用 size 而不是写 font-size',
      },
    ],
    avoid: [
      {
        en: 'Use PageHeader / Heading for page titles — don’t simulate one with an oversized Text',
        zh: '页面标题请用 PageHeader / Heading，不要用大号 Text 代替',
      },
    ],
    tips: [
      {
        en: 'size only has six steps — xs / sm / md / base / lg / xl — mapped to the `--fs-*` tokens',
        zh: 'size 只有 xs / sm / md / base / lg / xl 六档，对应 --fs-* 令牌',
      },
      { en: 'Use Mono for numbers, IDs, and paths', zh: '数字、ID、路径使用 Mono' },
    ],
  },
  heading: {
    when: [{ en: 'Section titles within a page: page / section / card / sub levels', zh: '页内分区标题：page / section / card / sub 四级' }],
    avoid: [
      {
        en: 'Prefer PageHeader for the page’s main title; a `page` level should appear only once per page',
        zh: '页面主标题优先交给 PageHeader；一个页面只出现一次 page 级',
      },
    ],
    tips: [
      {
        en: 'level also decides the default tag (h1–h4); use `as` to adjust semantics while keeping heading order',
        zh: 'level 同时决定默认标签（h1–h4），需要调整语义时用 as，保持标题顺序',
      },
    ],
  },
  stack: {
    when: [
      {
        en: 'Consistent vertical spacing; use FormGrid for multi-column forms, CatalogGroup for card catalogs',
        zh: '垂直方向统一间距；表单多列用 FormGrid；卡片目录用 CatalogGroup',
      },
    ],
    avoid: [{ en: 'Don’t hand-roll stacked margins in business code', zh: '不要在业务代码里手写 margin 堆叠间距' }],
    tips: [{ en: 'gap accepts sm / md / lg', zh: 'gap 取 sm / md / lg 三档' }],
  },
  card: {
    when: [
      { en: 'A surface container holding a group of related content', zh: '承载一组相关内容的表面容器' },
      { en: 'Resource cards with a colored status bar (StatusBar)', zh: '带状态色条的资源卡片（StatusBar）' },
    ],
    avoid: [
      {
        en: 'Use SectionCard for settings/detail sections; use TableCard for titled tables',
        zh: '设置 / 详情的分区请用 SectionCard；带标题的表格请用 TableCard',
      },
    ],
    tips: [{ en: 'padded controls inner padding', zh: 'padded 控制内边距' }],
  },
  'section-card': {
    when: [
      {
        en: 'A section block on settings/detail pages (title + description + actions + content)',
        zh: '设置页、详情页中的分区块（标题 + 描述 + 操作 + 内容）',
      },
    ],
    tips: [{ en: 'Organize rows inside with SettingsRow / DescriptionList', zh: '内部用 SettingsRow / DescriptionList 组织行' }],
  },
  'page-header': {
    when: [
      {
        en: 'The top of every content page: title, description, metadata, and primary actions',
        zh: '每个内容页顶部：标题、描述、元信息与主操作',
      },
    ],
    avoid: [{ en: 'Don’t render two PageHeaders on the same page', zh: '不要同页出现两个 PageHeader' }],
    tips: [
      {
        en: 'Put actions on the right; keep only one primary button',
        zh: '操作区放右侧；主操作只放一个 primary 按钮',
      },
      { en: 'Pages with tabs should follow with PageTabs right after', zh: '含 Tab 的页面用 PageTabs 紧跟其后' },
    ],
  },
  button: {
    when: [
      {
        en: 'Triggering actions: one primary action per page, the rest secondary / ghost',
        zh: '触发操作：primary 一页一个主操作，其余 secondary / ghost',
      },
      { en: 'Use danger for destructive actions, paired with a confirmation', zh: '危险操作用 danger，并配合确认' },
    ],
    avoid: [
      {
        en: 'For plain navigation, pass href or use TextLink — don’t navigate manually in onClick',
        zh: '单纯跳转请传 href 或用 TextLink，不要在 onClick 里手写跳转',
      },
    ],
    tips: [
      { en: 'Shows a loading indicator while `loading` is true', zh: 'loading 期间显示加载指示' },
      {
        en: 'Passing href renders it as a link; icon-only buttons must provide aria-label',
        zh: '传 href 渲染为链接；纯图标按钮必须提供 aria-label',
      },
    ],
  },
  badge: {
    when: [
      {
        en: 'Status badges: running / failed / pending — use `tone` to convey meaning',
        zh: '状态徽标：运行中 / 失败 / 待处理，用 tone 表达语义',
      },
    ],
    avoid: [
      {
        en: 'Use Tag for interactive/removable tags; use Pill for lightweight pill actions',
        zh: '可交互、可增删的标签请用 Tag；轻量胶囊操作用 Pill',
      },
    ],
  },
  tag: {
    when: [
      { en: 'Category tags and closable tags; group them with TagGroup', zh: '分类标签、可关闭标签；成组展示用 TagGroup' },
    ],
    avoid: [{ en: 'Use Badge / StatusDot to express status', zh: '表示状态请用 Badge / StatusDot' }],
  },
  field: {
    when: [
      {
        en: 'The shell for any form control: label, hint, error, and required are all provided by Field',
        zh: '任何表单控件的外壳：label、hint、error、required 统一由 Field 提供',
      },
    ],
    avoid: [{ en: 'Don’t hand-write <label> or error copy', zh: '不要手写 <label> 与错误文案' }],
    tips: [
      {
        en: 'When error is present, aria-invalid and the description link are set automatically',
        zh: 'error 存在时自动写入 aria-invalid 与描述关联',
      },
      { en: 'Use FormErrors to summarize multiple errors', zh: '多个错误汇总用 FormErrors' },
    ],
  },
  input: {
    when: [{ en: 'Single-line text, email, password, number, etc.', zh: '单行文本、邮箱、密码、数字等' }],
    avoid: [
      {
        en: 'Use InputGroup for prefix/suffix, SearchInput for search boxes, Textarea for multi-line',
        zh: '需要前后缀用 InputGroup；搜索框用 SearchInput；多行用 Textarea',
      },
    ],
    tips: [{ en: 'Must be placed inside Field to get a label and error display', zh: '必须放进 Field 才有标签与错误展示' }],
  },
  select: {
    when: [
      {
        en: 'Dropdown selection with ≤ 20 options; the menu renders through a Portal to avoid clipping',
        zh: '选项 ≤ 20 的下拉选择，菜单使用 Portal 避免被容器裁剪',
      },
    ],
    avoid: [
      {
        en: 'Use Combobox when there are many/searchable options, NativeSelect for native mobile experience, Cascader for hierarchy',
        zh: '选项很多或需要搜索用 Combobox；移动端原生体验用 NativeSelect；有层级用 Cascader',
      },
    ],
  },
  checkbox: {
    when: [{ en: 'Multi-select, agreeing to terms, list row selection', zh: '多选、条款同意、列表勾选' }],
    avoid: [
      { en: 'Use Switch for immediately-applied toggles; Radio for mutually exclusive choices', zh: '即时生效的开关用 Switch；互斥选择用 Radio' },
    ],
  },
  radio: {
    when: [{ en: 'Mutually exclusive, ≤ 5 options that need to stay visible at once', zh: '互斥且选项 ≤ 5 且需要同时可见' }],
    avoid: [
      {
        en: 'Use Select for more options, ChoiceCard for large card-style choices, Segmented for view switching',
        zh: '选项更多用 Select；大卡片式选择用 ChoiceCard；视图切换用 Segmented',
      },
    ],
  },
  switch: {
    when: [{ en: 'A setting that takes effect immediately on toggle', zh: '设置项即时生效的开 / 关' }],
    avoid: [{ en: 'Use Checkbox for a boolean that only applies after Save', zh: '需要点「保存」才生效的布尔值用 Checkbox' }],
  },
  textarea: {
    when: [{ en: 'Multi-line text, notes, descriptions', zh: '多行文本、备注、描述' }],
    tips: [{ en: 'Pair with Field’s hint to show a character-count limit', zh: '配合 Field 的 hint 展示字数限制' }],
  },
  'date-picker': {
    when: [{ en: 'Selecting a single date or date-time', zh: '选择单个日期或日期时间' }],
    avoid: [{ en: 'Use DateRangePicker for ranges; TimePicker for time only', zh: '区间选择用 DateRangePicker；只选时间用 TimePicker' }],
  },
  'form-page': {
    when: [{ en: 'Create/edit pages: fixed width, centered, top-to-bottom', zh: '创建 / 编辑类页面：定宽、居中、自上而下' }],
    avoid: [{ en: 'Don’t use it for list/table pages — use ListPage instead', zh: '列表与表格页不要使用，请用 ListPage' }],
  },
  'list-page': {
    when: [{ en: 'Full-width list page skeleton: PageHeader + filters + table + pagination', zh: '全宽列表页骨架：PageHeader + 筛选 + 表格 + 分页' }],
    tips: [{ en: 'You can usually drop ResourceList straight in', zh: '通常直接把 ResourceList 放进来' }],
  },
  'resource-list': {
    when: [
      {
        en: 'Standard resource lists: filters + table + pagination + row actions + empty/error state, all in one',
        zh: '标准资源列表：筛选 + 表格 + 分页 + 行操作 + 空/错误态一体',
      },
    ],
    avoid: [{ en: 'Only drop down to DataTable / Table when you need a fully custom layout', zh: '需要完全自定义布局时才下沉到 DataTable / Table' }],
    tips: [
      { en: 'page / pageSize / total / onPageChange are required and controlled', zh: 'page / pageSize / total / onPageChange 为受控必填' },
      { en: 'columns use key + render; filters use key + type', zh: 'columns 使用 key + render；筛选项使用 key + type' },
    ],
  },
  'data-table': {
    when: [{ en: 'A full data table needing sort, pagination, multi-select, and column visibility', zh: '需要排序、分页、多选、列显隐的完整数据表' }],
    avoid: [
      { en: 'Use Table for simple display; use ResourceList for list pages with filters and status', zh: '简单展示用 Table；带筛选与状态的列表页用 ResourceList' },
    ],
    tips: [{ en: 'Cells truncate with CSS by default; use CellEllipsis when needed', zh: '单元格默认 CSS 截断，必要时用 CellEllipsis' }],
  },
  table: {
    when: [{ en: 'A low-level table: pinned columns, sorting, multi-select, empty state', zh: '底层表格：固定列、排序、多选、空态' }],
    tips: [
      {
        en: 'Use a column’s `pinned` property for fixed columns; wide tables scroll horizontally inside a TableCard',
        zh: '固定列用列的 pinned 属性；宽表放在 TableCard 内可横向滚动',
      },
    ],
  },
  tabs: {
    when: [{ en: 'Switching content within the same page, without changing the URL', zh: '同一页面内的内容切换，无需改变 URL' }],
    avoid: [{ en: 'Use PageTabs for page-level navigation that needs deep links', zh: '页面级导航且需要深链时用 PageTabs' }],
  },
  'page-tabs': {
    when: [{ en: 'Page-level section navigation, usually right after a PageHeader', zh: '页面级分区导航，通常紧跟 PageHeader' }],
  },
  segmented: {
    when: [
      {
        en: '2–5 mutually exclusive view/filter switches (density, mode, time range)',
        zh: '2–5 个互斥的视图 / 过滤切换（密度、模式、时间范围）',
      },
    ],
    avoid: [{ en: 'Use Tabs for switching content regions', zh: '内容区域切换用 Tabs' }],
  },
  alert: {
    when: [{ en: 'Static, content-related hints: info / success / warning / error', zh: '与页面内容相关的静态提示：信息 / 成功 / 警告 / 错误' }],
    avoid: [{ en: 'Use Toast for transient action feedback; Banner for site-wide announcements', zh: '操作结果的瞬时反馈用 Toast；全站公告用 Banner' }],
    tips: [{ en: 'Place error messages above the affected content and state the next step', zh: '错误提示放在受影响内容上方，并说明下一步' }],
  },
  toast: {
    when: [{ en: 'Transient feedback after an action: saved, copied, minor errors', zh: '操作后的瞬时反馈：保存成功、复制成功、轻量错误' }],
    avoid: [{ en: 'Don’t use Toast for information the user must act on', zh: '需要用户必须处理的信息不要用 Toast' }],
    tips: [{ en: 'Mount ToastProvider at the app root; use useToast inside components', zh: '应用根部挂 ToastProvider，组件内用 useToast' }],
  },
  'empty-state': {
    when: [{ en: 'An empty list, no search results, nothing created yet', zh: '列表为空、搜索无结果、尚未创建' }],
    tips: [{ en: 'Offer a next action (create / clear filters)', zh: '给出下一步操作（创建 / 清除筛选）' }],
  },
  skeleton: {
    when: [{ en: 'Loading placeholders where the content structure is known: cards, tables, details', zh: '内容结构已知的加载占位：卡片、表格、详情' }],
    avoid: [{ en: 'For sub-300ms operations or unknown structure, use Spinner', zh: '短于 300ms 的操作或不确定结构时用 Spinner' }],
  },
  modal: {
    when: [{ en: 'A short, focused task: confirmation, a simple form', zh: '需要聚焦的短任务：确认、简单表单' }],
    avoid: [
      { en: 'Use Drawer for long forms/details; use ConfirmModal for destructive confirmation', zh: '长表单与详情用 Drawer；破坏性确认用 ConfirmModal' },
    ],
    tips: [{ en: 'Esc closes it; put confirm/cancel in the footer actions', zh: 'Esc 可关闭；底部操作区放确认 / 取消' }],
  },
  drawer: {
    when: [{ en: 'Viewing details, or longer create/edit forms, while keeping the list context', zh: '详情查看、较长的创建 / 编辑表单，保留列表上下文' }],
  },
  'confirm-modal': {
    when: [{ en: 'Secondary confirmation: delete, disable, irreversible actions', zh: '二次确认：删除、停用、不可恢复操作' }],
    avoid: [
      {
        en: 'For very high-risk actions (deleting production resources), require typing the name with StrongConfirm / StrongConfirmDrawer',
        zh: '极高风险（删除生产资源）用 StrongConfirm / StrongConfirmDrawer 要求输入名称',
      },
    ],
  },
  confirm: {
    when: [{ en: 'An await-style confirmation inside an event callback, with no open state to manage', zh: '在事件回调里 await 式确认，无需维护 open 状态' }],
    tips: [{ en: 'Mount ConfirmProvider at the app root; it returns Promise<boolean>', zh: '应用根部挂 ConfirmProvider；返回 Promise<boolean>' }],
  },
  tooltip: {
    when: [{ en: 'Supplementary notes for icon buttons or truncated text', zh: '图标按钮、被截断文本的补充说明' }],
    avoid: [{ en: 'Don’t put critical info or interactive content in a Tooltip — use Popover instead', zh: '关键信息或可交互内容不要放 Tooltip，请用 Popover' }],
  },
  popover: {
    when: [{ en: 'Anchored overlays: quick settings, lightweight forms, more info', zh: '锚点浮层：快捷设置、轻量表单、更多信息' }],
  },
  'dropdown-menu': {
    when: [{ en: 'Row actions, overflow menus, user menus', zh: '行操作、更多菜单、用户菜单' }],
  },
  pagination: {
    when: [
      {
        en: 'Pagination navigation; usually built into DataTable / ResourceList — pass page / total as controlled props when used standalone',
        zh: '分页导航；通常由 DataTable / ResourceList 内置，单独使用时受控传入 page / total',
      },
    ],
  },
  'app-shell': {
    when: [{ en: 'The whole app’s shell: sidebar + topbar + content, including a mobile drawer nav', zh: '整个应用的外壳：侧栏 + 顶栏 + 内容区，含移动端抽屉导航' }],
    tips: [
      { en: 'navGroups support section titles and collapsible groups', zh: 'navGroups 支持分区标题与可折叠分组' },
      { en: 'Sidebar collapsed state persists in localStorage', zh: '侧栏折叠状态持久化在 localStorage' },
    ],
  },
  sidebar: {
    when: [{ en: 'Using the sidebar standalone when you need a custom shell', zh: '需要自定义壳层时单独使用侧栏' }],
    tips: [
      {
        en: 'Collapsible groups are collapsed by default; the group containing the current route expands automatically',
        zh: 'collapsible 分组默认收起，含当前路由的分组自动展开',
      },
    ],
  },
}
