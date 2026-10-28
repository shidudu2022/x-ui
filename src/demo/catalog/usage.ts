export type UsageGuide = {
  /** 何时使用 */
  when: string[]
  /** 不要这样用 / 请换成别的组件 */
  avoid?: string[]
  /** 实现要点（a11y、默认行为、与其它组件配合） */
  tips?: string[]
}

/** Hand-written guidance for the most-used components. Others fall back to category guidance. */
export const USAGE: Record<string, UsageGuide> = {
  text: {
    when: ['所有正文、说明、辅助文案；用 variant 表达角色（正文 / muted / strong / mono）', '需要统一字号阶梯时，用 size 而不是写 font-size'],
    avoid: ['页面标题请用 PageHeader / Heading，不要用大号 Text 代替'],
    tips: ['size 只有 xs / sm / md / base / lg / xl 六档，对应 --fs-* 令牌', '数字、ID、路径使用 Mono'],
  },
  heading: {
    when: ['页内分区标题：page / section / card / sub 四级'],
    avoid: ['页面主标题优先交给 PageHeader；一个页面只出现一次 page 级'],
    tips: ['level 同时决定默认标签（h1–h4），需要调整语义时用 as，保持标题顺序'],
  },
  stack: {
    when: ['垂直方向统一间距；表单多列用 FormGrid；卡片目录用 CatalogGroup'],
    avoid: ['不要在业务代码里手写 margin 堆叠间距'],
    tips: ['gap 取 sm / md / lg 三档'],
  },
  card: {
    when: ['承载一组相关内容的表面容器', '带状态色条的资源卡片（StatusBar）'],
    avoid: ['设置 / 详情的分区请用 SectionCard；带标题的表格请用 TableCard'],
    tips: ['padded 控制内边距'],
  },
  'section-card': {
    when: ['设置页、详情页中的分区块（标题 + 描述 + 操作 + 内容）'],
    tips: ['内部用 SettingsRow / DescriptionList 组织行'],
  },
  'page-header': {
    when: ['每个内容页顶部：标题、描述、元信息与主操作'],
    avoid: ['不要同页出现两个 PageHeader'],
    tips: ['操作区放右侧；主操作只放一个 primary 按钮', '含 Tab 的页面用 PageTabs 紧跟其后'],
  },
  button: {
    when: ['触发操作：primary 一页一个主操作，其余 secondary / ghost', '危险操作用 danger，并配合确认'],
    avoid: ['单纯跳转请传 href 或用 TextLink，不要在 onClick 里手写跳转'],
    tips: ['loading 期间显示加载指示', '传 href 渲染为链接；纯图标按钮必须提供 aria-label'],
  },
  badge: {
    when: ['状态徽标：运行中 / 失败 / 待处理，用 tone 表达语义'],
    avoid: ['可交互、可增删的标签请用 Tag；轻量胶囊操作用 Pill'],
  },
  tag: {
    when: ['分类标签、可关闭标签；成组展示用 TagGroup'],
    avoid: ['表示状态请用 Badge / StatusDot'],
  },
  field: {
    when: ['任何表单控件的外壳：label、hint、error、required 统一由 Field 提供'],
    avoid: ['不要手写 <label> 与错误文案'],
    tips: ['error 存在时自动写入 aria-invalid 与描述关联', '多个错误汇总用 FormErrors'],
  },
  input: {
    when: ['单行文本、邮箱、密码、数字等'],
    avoid: ['需要前后缀用 InputGroup；搜索框用 SearchInput；多行用 Textarea'],
    tips: ['必须放进 Field 才有标签与错误展示'],
  },
  select: {
    when: ['选项 ≤ 20 的下拉选择，菜单使用 Portal 避免被容器裁剪'],
    avoid: ['选项很多或需要搜索用 Combobox；移动端原生体验用 NativeSelect；有层级用 Cascader'],
  },
  checkbox: {
    when: ['多选、条款同意、列表勾选'],
    avoid: ['即时生效的开关用 Switch；互斥选择用 Radio'],
  },
  radio: {
    when: ['互斥且选项 ≤ 5 且需要同时可见'],
    avoid: ['选项更多用 Select；大卡片式选择用 ChoiceCard；视图切换用 Segmented'],
  },
  switch: {
    when: ['设置项即时生效的开 / 关'],
    avoid: ['需要点「保存」才生效的布尔值用 Checkbox'],
  },
  textarea: {
    when: ['多行文本、备注、描述'],
    tips: ['配合 Field 的 hint 展示字数限制'],
  },
  'date-picker': {
    when: ['选择单个日期或日期时间'],
    avoid: ['区间选择用 DateRangePicker；只选时间用 TimePicker'],
  },
  'form-page': {
    when: ['创建 / 编辑类页面：定宽、居中、自上而下'],
    avoid: ['列表与表格页不要使用，请用 ListPage'],
  },
  'list-page': {
    when: ['全宽列表页骨架：PageHeader + 筛选 + 表格 + 分页'],
    tips: ['通常直接把 ResourceList 放进来'],
  },
  'resource-list': {
    when: ['标准资源列表：筛选 + 表格 + 分页 + 行操作 + 空/错误态一体'],
    avoid: ['需要完全自定义布局时才下沉到 DataTable / Table'],
    tips: ['page / pageSize / total / onPageChange 为受控必填', 'columns 使用 key + render；筛选项使用 key + type'],
  },
  'data-table': {
    when: ['需要排序、分页、多选、列显隐的完整数据表'],
    avoid: ['简单展示用 Table；带筛选与状态的列表页用 ResourceList'],
    tips: ['单元格默认 CSS 截断，必要时用 CellEllipsis'],
  },
  table: {
    when: ['底层表格：固定列、排序、多选、空态'],
    tips: ['固定列用列的 pinned 属性；宽表放在 TableCard 内可横向滚动'],
  },
  tabs: {
    when: ['同一页面内的内容切换，无需改变 URL'],
    avoid: ['页面级导航且需要深链时用 PageTabs'],
  },
  'page-tabs': {
    when: ['页面级分区导航，通常紧跟 PageHeader'],
  },
  segmented: {
    when: ['2–5 个互斥的视图 / 过滤切换（密度、模式、时间范围）'],
    avoid: ['内容区域切换用 Tabs'],
  },
  alert: {
    when: ['与页面内容相关的静态提示：信息 / 成功 / 警告 / 错误'],
    avoid: ['操作结果的瞬时反馈用 Toast；全站公告用 Banner'],
    tips: ['错误提示放在受影响内容上方，并说明下一步'],
  },
  toast: {
    when: ['操作后的瞬时反馈：保存成功、复制成功、轻量错误'],
    avoid: ['需要用户必须处理的信息不要用 Toast'],
    tips: ['应用根部挂 ToastProvider，组件内用 useToast'],
  },
  'empty-state': {
    when: ['列表为空、搜索无结果、尚未创建'],
    tips: ['给出下一步操作（创建 / 清除筛选）'],
  },
  skeleton: {
    when: ['内容结构已知的加载占位：卡片、表格、详情'],
    avoid: ['短于 300ms 的操作或不确定结构时用 Spinner'],
  },
  modal: {
    when: ['需要聚焦的短任务：确认、简单表单'],
    avoid: ['长表单与详情用 Drawer；破坏性确认用 ConfirmModal'],
    tips: ['Esc 可关闭；底部操作区放确认 / 取消'],
  },
  drawer: {
    when: ['详情查看、较长的创建 / 编辑表单，保留列表上下文'],
  },
  'confirm-modal': {
    when: ['二次确认：删除、停用、不可恢复操作'],
    avoid: ['极高风险（删除生产资源）用 StrongConfirm / StrongConfirmDrawer 要求输入名称'],
  },
  confirm: {
    when: ['在事件回调里 await 式确认，无需维护 open 状态'],
    tips: ['应用根部挂 ConfirmProvider；返回 Promise<boolean>'],
  },
  tooltip: {
    when: ['图标按钮、被截断文本的补充说明'],
    avoid: ['关键信息或可交互内容不要放 Tooltip，请用 Popover'],
  },
  popover: {
    when: ['锚点浮层：快捷设置、轻量表单、更多信息'],
  },
  'dropdown-menu': {
    when: ['行操作、更多菜单、用户菜单'],
  },
  pagination: {
    when: ['分页导航；通常由 DataTable / ResourceList 内置，单独使用时受控传入 page / total'],
  },
  'app-shell': {
    when: ['整个应用的外壳：侧栏 + 顶栏 + 内容区，含移动端抽屉导航'],
    tips: ['navGroups 支持分区标题与可折叠分组', '侧栏折叠状态持久化在 localStorage'],
  },
  sidebar: {
    when: ['需要自定义壳层时单独使用侧栏'],
    tips: ['collapsible 分组默认收起，含当前路由的分组自动展开'],
  },
}
