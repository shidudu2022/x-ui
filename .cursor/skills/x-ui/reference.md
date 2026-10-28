# X-UI 组件与模块参考

Agent 需要具体导出名时查阅本文件。源码以 `src/components/**/index.ts` 为准。能力摘要见仓库 [README.md](../../../README.md)。

## `@/components/ui`

Accordion, AccentPicker, Alert, Avatar, AvatarGroup, AvatarUpload, Badge, Banner, BreadcrumbNav, Button, Calendar, Callout, Card, StatusBar, Cascader, CatalogGroup, CatalogTile, Checkbox, Checklist, ChoiceCard, ChoiceCardGrid, CodeBlock, ColorInput, Combobox, CommandPalette, ConfirmModal, StrongConfirm, StrongConfirmDrawer, CopyButton, DangerZone, DataTable, DatePicker, DateRangePicker, DescriptionList, MetaRow, Divider, Drawer, DropdownMenu, EmptyState, FacePhotoPicker, Field, FormGrid, Input, InputGroup, NativeSelect, Textarea, FileUpload, FilterBar, FormErrors, FormPage, Heading, ImagePreview, JsonViewer, Kbd, KeyValueEditor, TextLink, ListFilterBar, ListPage, LoginCard, LogViewer, MaintenanceBanner, MaskedSecretField, maskSecret, MermaidDiagram, Metric, MetricGrid, MirrorCard, Modal, NodePicker, NotificationList, NumberStepper, PageHeader, PageTabs, Pagination, PdfPreview, PinInput, Pill, Popover, Progress, Radio, RadioGroup, RangeSlider, ResourceState, SearchInput, SearchResultList, SearchResultItem, SectionCard, TableCard, Segmented, Select, SettingsRow, Sheet, Skeleton, SkeletonCard, SkeletonTable, Sparkline, Stat, StatCard, Spinner, SplitPane, Stack, StepHeading, Steps, Switch, Table, DataTableFooter, Tabs, Tag, TagGroup, TagsInput, Text, Muted, Mono, ThemePicker, TimePicker, Timeline, ToastProvider, useToast, ToggleButton, Tooltip, TotpBindPanel, buildTotpOtpauth, Transfer, Tree, TreeTableCell

### 常用 tone / variant / 行为

- **Button** `variant`: `primary` | `secondary` | `danger` | `ghost`；`size`: `sm` | `md` | `lg`；`block` / `iconOnly`
- **Input / Textarea / Select trigger** `size`: `sm` | `md` | `lg`；字号令牌 `--control-fs`（默认 13px）
- **Alert** `tone`: `info` | `success` | `warn` | `danger`（`error` 别名）
- **Toast** `tone`: `info` | `success` | `warn` | `error`（`danger` 别名）
- **Steps** `size`: `sm` | `md`
- **Badge**: tone `success` | `warn` | `danger` | `info` | `neutral`；`size` `sm` | `md`；`bordered` 默认 `true`
- **Tag**: tone `neutral` | `primary` | `info` | `success` | `warn` | `danger`；`size` `sm` | `md`
- **MetaRow**：文字与 Badge/Tag 横排混用（`align-items: center`）；列表单元格 / 详情顶栏优先用它，勿手写 column flex 以免标签被拉宽
- **DatePicker / DateRangePicker** `mode`: `date` | `datetime`；`minuteStep`；`disabledDate`；范围双月；datetime：双日历 + 右侧开始/结束时间滚轮；`DateRangePicker` `block?: boolean`（默认占满；工具栏用 `false`）；起止同一天时触发器只显示一天
- **TimePicker**：`HH:mm`，`minuteStep`
- **ColorInput**：自定义 HSV（非原生 color）；受控 `value` / `onChange`（`#rrggbb`）
- **Drawer** `size`: `sm` | `md` | `lg` | `xl`；`side`: `left` | `right`；进场 `usePresence`
- **Table / DataTable**
  - 列 `sortable` + `sortValue`；`pinned: 'left'|'right'`（名称等建议 `width`；操作列可省略以按按钮自适应）
  - 左固定 + 多选：`__select` 自动左固定并参与 sticky 偏移
  - 边缘列 `is-pinned-edge` 用边框分隔（无阴影）；背景不透明
  - 空单元格默认 `—`（`emptyCell` / `EMPTY_CELL`）；列可设 `emptyPlaceholder` 或 `false` 关闭
  - `remote` + `total`/`page`/`onPageChange`；`columnVisibility`；`resizableColumns`
  - `hideFooter`：隐藏底栏；本地模式同时展示全部行（不分页切片）
  - `hideHeader`：隐藏列头行（`thead`）；`Table` / `DataTable` 均可
  - `defaultSortKey` / 受控 `sortKey`+`onSortChange`；树：`getChildren` + `TreeTableCell`
- **SearchInput**：左侧搜索图标；`allowClear` / `loading` / `size` sm\|md\|lg；CommandPalette 已改用此组件
- **ThemePicker**：主题包（经典 / 透明）；写入 `body[data-theme]`
- **Select**：长列表可搜索；触控/窄屏可原生兜底（`nativeOnMobile`）
- **Tree / Transfer**：`searchable`
- **FileUpload**：`files` 进度、`maxSizeMb`
- **CommandPalette**：最近使用、`onQueryChange` / `loading`
- **SectionCard**：`title`；`subtitle`（标题右侧小号灰色字）；`actions`
- **TableCard**：带标题的单层卡片，内嵌 `Table` / `EmptyState` / `SkeletonTable`（`subtitle` / `actions` / `footer`）；标题栏小号字 + `--surface-2` 底
- **DataTable** `framed={false}`：去掉外层 Card，便于嵌进 `TableCard`
- **PageHeader**：`actionItems?: PageHeaderActionItem[]`（`overflow?: true` 收进菜单）；`overflowActions`；`overflowLabel` / `overflowIconOnly`；主操作按钮默认 `md`
- **PageTabs**：详情子导航（无面板内容）
- **ResourceState**：`idle` | `loading` | `empty` | `error` | `offline`
- **ImagePreview**：`src` 等；部署子路径配合 `withBase`
- **PdfPreview**：PDF 灯箱；`src`（http/blob/data）；受控 `open`/`onOpenChange`（拉取后打开）；下载 / 新标签页
- **MaskedSecretField**：半掩码密钥只读展示；`maskRatio` 默认 0.5；显隐 + `CopyButton`；工具函数 `maskSecret`
- **FacePhotoPicker**：3:4 取景 + 椭圆引导；`onFileSelect` 由调用方管文件；可选确认勾选
- **MermaidDiagram**：动态 `import('mermaid')`；宿主需安装可选 peer `mermaid`
- **TotpBindPanel**：`secret` / `account` / `issuer`；可选 `qrSrc`，默认本地 SVG QR（`uqr`）
- **MetricGrid** `columns?: 2 | 3 | 4`（默认 2；窄屏仍 1 列）
- **Stack / FormGrid / CatalogTile / CatalogGroup**：间距与目录布局原语
- **ChoiceCard / ChoiceCardGrid**：大卡片路径选择（导入/创建/开通）；`recommended` 用 `Badge`（不改描边/底，避免像选中）；勿与小链 `CatalogTile` 混用

## `@/components/layout`

AppShell, Brand, Breadcrumbs, NavIcon, Sidebar, ThemeDrawer, Topbar, UserMenu

- `AppShell`：侧栏折叠 `localStorage` key `x-ui.sidebar-collapsed`；窄屏抽屉导航
- `NavGroup` / `NavItem`：`{ label?, section?, collapsible?, defaultOpen?, icon?, items: { to, label, icon?, end? }[] }`；`section` 在首个同名分组前渲染分区标题；`collapsible` 渲染可折叠分组（含当前路由自动展开；侧栏折叠成图标栏时变为单个分组图标）
- `ThemeDrawer`：深浅色 / 主题（`ThemePicker`）/ 强调色（`AccentPicker`）/ 密度；无「完成」按钮

## `@/components/charts`

AreaChart, BarChart (`layout?: 'vertical'|'horizontal'`), ChartContainer, ChartLegendContent, ChartTooltipContent, LineChart, PieChart, RadialProgress, CHART_COLORS, CHART_STATUS, chartAxisProps, chartGridProps

```ts
CHART_STATUS = { success, warn, danger, info, neutral, primary }
```

## `@/theme` / `@/lib`

- `AppearanceProvider`, `useAppearance`, `ACCENTS`, `ACCENT_COLORS`, `resolveColorMode`
- `THEMES`, `THEME_IDS`, `getTheme`, `ThemeId`（`classic` | `glass`）
- Types: `Accent`, `ColorMode`, `ColorModePreference`, `Density`, `ThemeId`
- Body：`data-theme` + `data-mode` + `data-accent` + `data-density`；storage `xui-theme`
- 加主题：`themes.ts` 注册 + `styles/tokens/themes/<id>.css` 引入 `index.css`
- `cn`, `useFocusTrap`, `usePresence`, `useListSearch`, `qrSvgDataUri`, `withBase`

## 样式目录

```text
src/styles/
  index.css          # @layer + @import
  tokens/            # base, accents, typography, charts, density, themes/
  reset.css
  layout/            # shell, brand, nav, breadcrumbs, user-menu, responsive
  components/        # 按组件拆分（含 resource.css、table 固定列）
  charts/
  demo/
```

## 示例页面索引

Agent 实现业务页时：**先按场景打开对应文件照抄结构**，再改文案与数据。权威流程见 [SKILL.md](SKILL.md)「示例优先」。

路径均相对 `src/demo/pages/`。

| 场景 | 路由 | 源码 |
|------|------|------|
| 概览（落地页） | `/` | `OverviewPage.tsx` |
| 快速开始 | `/docs/getting-started` | `docs/GettingStartedPage.tsx` |
| 主题与外观 | `/docs/theming` | `docs/ThemingPage.tsx` |
| 开发约定 | `/docs/conventions` | `docs/ConventionsPage.tsx` |
| 设计令牌 | `/foundations` | `FoundationsPage.tsx` |
| 页面模板总览 | `/templates` | `TemplatesIndexPage.tsx` |
| 组合模式 | `/patterns` | `PatternsPage.tsx` |
| 登录 + TOTP | `/examples/login` | `ExampleLoginPage.tsx` |
| 注册 | `/examples/register` | `ExampleRegisterPage.tsx` |
| 邮箱验证码 | `/examples/verify-email` | `ExampleVerifyEmailPage.tsx` |
| 强确认（抽屉） | `/examples/strong-confirm` | `ExampleStrongConfirmPage.tsx` |
| 强确认（Modal） | `/components/confirm-modal` | `docs/components/ConfirmModalDoc.tsx` |
| 定宽表单 | `/examples/form` | `ExampleFormPage.tsx` |
| 路径选择 / ChoiceCard | `/examples/choice` | `ExampleChoicePage.tsx` |
| 设置 / DangerZone | `/examples/settings` | `ExampleSettingsPage.tsx` |
| 列表入口 | `/examples/list` | `ExampleListPage.tsx` |
| 列表 → 抽屉详情 | `/examples/list-detail` | `ExampleListDetailPage.tsx` |
| 列表·可排序 | `?tpl=sortable` | `list/ListTableTemplate.tsx` |
| 列表·不可排序 | `?tpl=static` | `list/ListTableTemplate.tsx` |
| 列表·固定列 | `?tpl=pinned` | `list/ListPinnedTemplate.tsx` |
| 列表·树表 | `?tpl=tree` | `list/ListTreeTemplate.tsx` |
| 列表·卡片 | `?tpl=cards` | `list/ListCardsTemplate.tsx` |
| 列表·紧凑 | `?tpl=compact` | `list/ListCompactTemplate.tsx` |
| 列表·ResourceList | `?tpl=resource` | `list/ListResourceTemplate.tsx` |
| 组件索引（按分类） | `/components` | `ComponentIndexPage.tsx` |
| 单组件文档 | `/components/<slug>` | `docs/components/*Doc.tsx` |
| 重置密码 | `/examples/reset-password` | `ExampleResetPasswordPage.tsx` |
| 邀请成员 | `/examples/invite` | `ExampleInvitePage.tsx` |
| API Key | `/examples/api-keys` | `ExampleApiKeysPage.tsx` |
| 详情 / 页头溢出 | `/examples/detail` | `ExampleDetailPage.tsx` |
| 页头 | `/examples/page` | `ExamplePageHeaderPage.tsx` |
| 仪表盘 | `/examples/dashboard` | `ExampleDashboardPage.tsx` |
| 向导 | `/examples/wizard` | `ExampleWizardPage.tsx` |
| 开通 | `/examples/onboarding` | `ExampleOnboardingPage.tsx` |
| 搜索结果 | `/examples/search` | `ExampleSearchPage.tsx` |
| 空态 | `/examples/empty` | `ExampleEmptyPage.tsx` |
| 错误 / 离线 | `/examples/errors` | `ExampleErrorsPage.tsx` |
| 资料 + Drawer | `/examples/profile` | `ExampleProfilePage.tsx` |
| 通知 | `/examples/notifications` | `ExampleNotificationsPage.tsx` |
| 角色多选 | `/examples/roles` | `ExampleRolesPage.tsx` |
| 审计 | `/examples/audit` | `ExampleAuditPage.tsx` |
| Diff | `/examples/compare` | `ExampleComparePage.tsx` |
| 骨架 | `/examples/skeleton` | `ExampleSkeletonPage.tsx` |
| 权限 | `/examples/permissions` | `ExamplePermissionsPage.tsx` |
| 文案密度 | `/examples/i18n` | `ExampleI18nPage.tsx` |
| 日志 | `/examples/log` | `ExampleLogPage.tsx` |
| 字体 | `/examples/typography` | `ExampleTypographyPage.tsx` |
| 组件文档 | `/components/<slug>` | `docs/components/*Doc.tsx`（由 `scripts/gen-component-docs.mjs` 生成） |

路由注册：`src/App.tsx`。侧栏与面包屑：`src/demo/DemoShell.tsx`。

## 文档站信息架构（数据源）

| 数据 | 文件 | 说明 |
|------|------|------|
| 组件分类 | `src/demo/catalog/categories.ts` | 9 个分类 + slug 顺序；**每个 slug 必须恰好出现一次** |
| 组件目录 | `src/demo/catalog/registry.ts` | `slug / name / summary / related`；`category`、`exports` 自动派生（`EXPORT_OVERRIDES` 补充多导出） |
| 使用指南 | `src/demo/catalog/usage.ts` | 「何时使用 / 不适用 / 要点」，按 slug 手写，缺省则不显示该区块 |
| 页面模板 | `src/demo/catalog/templates.ts` | 模板分组 / 描述 / 图标；侧栏、`/templates`、⌘K 共用 |
| 组件页框架 | `src/demo/docs/ComponentDocLayout.tsx` + `DocPage.tsx` | 引入 → 何时使用 → 示例 → API → 相关 → 上下篇；右侧「本页目录」自动扫描 h2 |

新增组件：`registry.ts` 加条目 → `categories.ts` 归类 → `gen-component-docs.mjs` 加 demo → `node scripts/gen-component-docs.mjs --force` → `npx tsc -b`。
新增模板：写页面 → `App.tsx` 注册路由 → `templates.ts` 加条目（侧栏自动出现）。

**StrongConfirmDrawer**：抽屉内输入 `confirmValue` / `resourceName` 完全匹配后才能确认。
