# X-UI 组件与模块参考

Agent 需要具体导出名时查阅本文件。源码以 `src/components/**/index.ts` 为准。能力摘要见仓库 [README.md](../../../README.md)。

## `@/components/ui`

Accordion, AccentPicker, Alert, Avatar, AvatarGroup, AvatarUpload, Badge, Banner, BreadcrumbNav, Button, Calendar, Callout, Card, StatusBar, Cascader, CatalogGroup, CatalogTile, Checkbox, Checklist, CodeBlock, ColorInput, Combobox, CommandPalette, ConfirmModal, StrongConfirm, CopyButton, DangerZone, DataTable, DatePicker, DateRangePicker, DescriptionList, MetaRow, Divider, Drawer, DropdownMenu, EmptyState, Field, FormGrid, Input, InputGroup, NativeSelect, Textarea, FileUpload, FilterBar, FormErrors, FormPage, Heading, ImagePreview, JsonViewer, Kbd, KeyValueEditor, TextLink, ListFilterBar, ListPage, LoginCard, LogViewer, MaintenanceBanner, Metric, MetricGrid, MirrorCard, Modal, NodePicker, NotificationList, NumberStepper, PageHeader, PageTabs, Pagination, PinInput, Pill, Popover, Progress, Radio, RadioGroup, RangeSlider, ResourceState, SearchResultList, SearchResultItem, SectionCard, Segmented, Select, SettingsRow, Sheet, Skeleton, SkeletonCard, SkeletonTable, Sparkline, Stat, StatCard, Spinner, SplitPane, Stack, StepHeading, Steps, Switch, Table, DataTableFooter, Tabs, Tag, TagGroup, TagsInput, Text, Muted, Mono, TimePicker, Timeline, ToastProvider, useToast, ToggleButton, Tooltip, TotpBindPanel, buildTotpOtpauth, Transfer, Tree, TreeTableCell

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
  - `remote` + `total`/`page`/`onPageChange`；`columnVisibility`；`resizableColumns`
  - `defaultSortKey` / 受控 `sortKey`+`onSortChange`；树：`getChildren` + `TreeTableCell`
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

## 演示路由（`src/App.tsx`）

- `/` 概览 · `/foundations` 基础 · `/patterns` 组合
- `/components/{buttons,forms,data,feedback,navigation,charts,advanced}`
- `/examples/{dashboard,settings,empty,search,compare,profile,roles,notifications,skeleton,typography,page,list,form,detail,wizard,log,login,errors,audit,onboarding,i18n,permissions}`
- 列表模板：`/examples/list?tpl=sortable|static|pinned|tree|cards|compact`
