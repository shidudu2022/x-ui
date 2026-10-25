# X-UI 组件与模块参考

Agent 需要具体导出名时查阅本文件。源码以 `src/components/**/index.ts` 为准。

## `@/components/ui`

Accordion, Alert, Avatar, AvatarGroup, AvatarUpload, Badge, Banner, BreadcrumbNav, Button, Calendar, Callout, Card, StatusBar, Cascader, Checkbox, Checklist, CodeBlock, Combobox, CommandPalette, ConfirmModal, CopyButton, DataTable, DatePicker, DateRangePicker, DescriptionList, MetaRow, Divider, Drawer, DropdownMenu, EmptyState, Field, Input, InputGroup, NativeSelect, Textarea, FileUpload, FilterBar, FormErrors, FormPage, Heading, Kbd, TextLink, ListFilterBar, ListPage, LoginCard, LogViewer, MaintenanceBanner, Metric, MetricGrid, MirrorCard, Modal, NodePicker, NotificationList, NumberStepper, PageHeader, Pagination, Pill, Popover, Progress, Radio, RadioGroup, RangeSlider, SectionCard, Segmented, Select, Sheet, Skeleton, SkeletonCard, SkeletonTable, Sparkline, Stat, Spinner, SplitPane, StepHeading, Steps, Switch, Table, DataTableFooter, Tabs, Tag, TagGroup, TagsInput, Text, Muted, Mono, Timeline, ToastProvider, useToast, ToggleButton, Tooltip, Transfer, Tree

### 常用 tone / variant

- **Button** `variant`: `primary` | `secondary` | `danger` | `ghost`；`size`: `md` | `sm`
- **Alert** `tone`: `info` | `success` | `warn` | `error`
- **Tag / Badge**: `neutral` | `primary` | `info` | `success` | `warn` | `danger`

## `@/components/layout`

AppShell, Brand, Breadcrumbs, NavIcon, Sidebar, ThemeDrawer, Topbar, UserMenu

- `AppShell`：侧栏折叠状态持久化 `localStorage` key `x-ui.sidebar-collapsed`
- `NavGroup` / `NavItem`：`{ label?, items: { to, label, icon?, end? }[] }`

## `@/components/charts`

AreaChart, BarChart (`layout?: 'vertical'|'horizontal'`), ChartContainer, ChartLegendContent, ChartTooltipContent, LineChart, PieChart, RadialProgress, CHART_COLORS, CHART_STATUS, chartAxisProps, chartGridProps

```ts
CHART_STATUS = {
  success, warn, danger, info, neutral, primary
}
```

## `@/theme`

- `AppearanceProvider`, `useAppearance`
- `ACCENTS`, `ACCENT_COLORS`, `resolveColorMode`
- Types: `Accent`, `ColorMode`, `ColorModePreference`, `Density`

## 样式目录

```text
src/styles/
  index.css          # @layer + @import 入口
  tokens/            # base, accents, typography, charts, density
  reset.css
  layout/            # shell, brand, nav, breadcrumbs, user-menu
  components/        # 按组件拆分的 CSS
  charts/
  demo/
```

## 演示路由（`src/App.tsx`）

- `/` 概览 · `/foundations` 基础
- `/components/{buttons,forms,data,feedback,navigation,charts,advanced}`
- `/examples/{dashboard,settings,empty,search,compare,profile,roles,notifications,skeleton,typography,page,list,form,detail,wizard,log,login}`
- `/patterns` 组合模式
