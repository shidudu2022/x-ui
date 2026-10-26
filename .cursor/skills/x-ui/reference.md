# X-UI 组件与模块参考

Agent 需要具体导出名时查阅本文件。源码以 `src/components/**/index.ts` 为准。能力摘要见仓库 [README.md](../../../README.md)。

## `@/components/ui`

Accordion, AccentPicker, Alert, Avatar, AvatarGroup, AvatarUpload, Badge, Banner, BreadcrumbNav, Button, Calendar, Callout, Card, StatusBar, Cascader, CatalogGroup, CatalogTile, Checkbox, Checklist, CodeBlock, ColorInput, Combobox, CommandPalette, ConfirmModal, StrongConfirm, StrongConfirmDrawer, CopyButton, DangerZone, DataTable, DatePicker, DateRangePicker, DescriptionList, MetaRow, Divider, Drawer, DropdownMenu, EmptyState, Field, FormGrid, Input, InputGroup, NativeSelect, Textarea, FileUpload, FilterBar, FormErrors, FormPage, Heading, ImagePreview, JsonViewer, Kbd, KeyValueEditor, TextLink, ListFilterBar, ListPage, LoginCard, LogViewer, MaintenanceBanner, Metric, MetricGrid, MirrorCard, Modal, NodePicker, NotificationList, NumberStepper, PageHeader, PageTabs, Pagination, PinInput, Pill, Popover, Progress, Radio, RadioGroup, RangeSlider, ResourceState, SearchInput, SearchResultList, SearchResultItem, SectionCard, Segmented, Select, SettingsRow, Sheet, Skeleton, SkeletonCard, SkeletonTable, Sparkline, Stat, StatCard, Spinner, SplitPane, Stack, StepHeading, Steps, Switch, Table, DataTableFooter, Tabs, Tag, TagGroup, TagsInput, Text, Muted, Mono, TimePicker, Timeline, ToastProvider, useToast, ToggleButton, Tooltip, TotpBindPanel, buildTotpOtpauth, Transfer, Tree, TreeTableCell

### 常用 tone / variant / 行为

- **Button** `variant`: `primary` | `secondary` | `danger` | `ghost`；`size`: `sm` | `md` | `lg`；`block` / `iconOnly`
- **Input / Textarea / Select trigger** `size`: `sm` | `md` | `lg`；字号令牌 `--control-fs`（默认 13px）
- **Alert** `tone`: `info` | `success` | `warn` | `danger`（`error` 别名）
- **Toast** `tone`: `info` | `success` | `warn` | `error`（`danger` 别名）
- **Steps** `size`: `sm` | `md`
- **Tag / Badge**: `neutral` | `primary` | `info` | `success` | `warn` | `danger`
- **DatePicker / DateRangePicker** `mode`: `date` | `datetime`；`minuteStep`；`disabledDate`；范围双月；datetime：双日历 + 右侧开始/结束时间滚轮
- **TimePicker**：`HH:mm`，`minuteStep`
- **ColorInput**：自定义 HSV（非原生 color）；受控 `value` / `onChange`（`#rrggbb`）
- **Drawer** `size`: `sm` | `md` | `lg` | `xl`；`side`: `left` | `right`；进场 `usePresence`
- **Table / DataTable**
  - 列 `sortable` + `sortValue`；`pinned: 'left'|'right'`（建议 `width`）
  - 左固定 + 多选：`__select` 自动左固定并参与 sticky 偏移
  - 边缘列 `is-pinned-edge` 轻量渐变阴影；背景不透明
  - 空单元格默认 `—`（`emptyCell` / `EMPTY_CELL`）；列可设 `emptyPlaceholder` 或 `false` 关闭
  - `remote` + `total`/`page`/`onPageChange`；`columnVisibility`；`resizableColumns`
  - `defaultSortKey` / 受控 `sortKey`+`onSortChange`；树：`getChildren` + `TreeTableCell`
- **SearchInput**：左侧搜索图标；`allowClear` / `loading` / `size` sm\|md\|lg；CommandPalette 已改用此组件
- **Select**：长列表可搜索；触控/窄屏可原生兜底（`nativeOnMobile`）
- **Tree / Transfer**：`searchable`
- **FileUpload**：`files` 进度、`maxSizeMb`
- **CommandPalette**：最近使用、`onQueryChange` / `loading`
- **PageHeader**：`actionItems?: PageHeaderActionItem[]`（`overflow?: true` 收进菜单）；`overflowActions`；`overflowLabel` / `overflowIconOnly`；主操作按钮默认 `md`
- **PageTabs**：详情子导航（无面板内容）
- **ResourceState**：`idle` | `loading` | `empty` | `error` | `offline`
- **ImagePreview**：`src` 等；部署子路径配合 `withBase`
- **TotpBindPanel**：`secret` / `account` / `issuer`；可选 `qrSrc`，默认本地 SVG QR（`uqr`）
- **Stack / FormGrid / CatalogTile / CatalogGroup**：间距与目录布局原语

## `@/components/layout`

AppShell, Brand, Breadcrumbs, NavIcon, Sidebar, ThemeDrawer, Topbar, UserMenu

- `AppShell`：侧栏折叠 `localStorage` key `x-ui.sidebar-collapsed`；窄屏抽屉导航
- `NavGroup` / `NavItem`：`{ label?, items: { to, label, icon?, end? }[] }`
- `ThemeDrawer`：内置 `AccentPicker`

## `@/components/charts`

AreaChart, BarChart (`layout?: 'vertical'|'horizontal'`), ChartContainer, ChartLegendContent, ChartTooltipContent, LineChart, PieChart, RadialProgress, CHART_COLORS, CHART_STATUS, chartAxisProps, chartGridProps

```ts
CHART_STATUS = { success, warn, danger, info, neutral, primary }
```

## `@/theme` / `@/lib`

- `AppearanceProvider`, `useAppearance`, `ACCENTS`, `ACCENT_COLORS`, `resolveColorMode`
- Types: `Accent`, `ColorMode`, `ColorModePreference`, `Density`
- `cn`, `useFocusTrap`, `usePresence`, `useListSearch`, `qrSvgDataUri`, `withBase`

## 样式目录

```text
src/styles/
  index.css          # @layer + @import
  tokens/            # base (--control-fs), accents, typography, charts, density
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
| 概览 | `/` | `OverviewPage.tsx` |
| 基础令牌 | `/foundations` | `FoundationsPage.tsx` |
| 组合模式 | `/patterns` | `PatternsPage.tsx` |
| 登录 + TOTP | `/examples/login` | `ExampleLoginPage.tsx` |
| 注册 | `/examples/register` | `ExampleRegisterPage.tsx` |
| 邮箱验证码 | `/examples/verify-email` | `ExampleVerifyEmailPage.tsx` |
| 强确认（抽屉） | `/examples/strong-confirm` | `ExampleStrongConfirmPage.tsx` |
| 强确认（Modal） | `/components/feedback` | `FeedbackPage.tsx` |
| 定宽表单 | `/examples/form` | `ExampleFormPage.tsx` |
| 设置 / DangerZone | `/examples/settings` | `ExampleSettingsPage.tsx` |
| 列表入口 | `/examples/list` | `ExampleListPage.tsx` |
| 列表 → 抽屉详情 | `/examples/list-detail` | `ExampleListDetailPage.tsx` |
| 列表·可排序 | `?tpl=sortable` | `list/ListTableTemplate.tsx` |
| 列表·不可排序 | `?tpl=static` | `list/ListTableTemplate.tsx` |
| 列表·固定列 | `?tpl=pinned` | `list/ListPinnedTemplate.tsx` |
| 列表·树表 | `?tpl=tree` | `list/ListTreeTemplate.tsx` |
| 列表·卡片 | `?tpl=cards` | `list/ListCardsTemplate.tsx` |
| 列表·紧凑 | `?tpl=compact` | `list/ListCompactTemplate.tsx` |
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
| 组件馆 | `/components/*` | `ButtonsPage` / `FormsPage` / `DataPage` / `FeedbackPage` / `NavigationPage` / `ChartsPage` / `AdvancedPage` |

路由注册：`src/App.tsx`。侧栏标题：`src/demo/DemoShell.tsx`。

**StrongConfirmDrawer**：抽屉内输入 `confirmValue` / `resourceName` 完全匹配后才能确认。
