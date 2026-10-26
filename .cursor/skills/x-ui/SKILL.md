---
name: x-ui
description: >-
  Build and modify UIs with the x-ui design system (CSS variables, AppShell,
  @/components/ui|layout|charts). Prefer implementing by copying the matching
  demo under src/demo/pages. Use when creating pages, forms, tables, login,
  register, drawers, strong-confirm, dashboards, or styling in this repo; when
  the user mentions x-ui, AppearanceProvider, CHART_STATUS, or asks to follow
  the design kit / example pages.
---

# X-UI 使用规范

在本仓库（或已拷入 x-ui 源码的业务仓）写界面时，**必须**遵循本 Skill。

1. 先读本文件硬性约束与「示例优先」流程。  
2. 用下方 **场景 → 示例索引** 定位最接近的 demo，**打开并阅读对应源码**，再按同样结构实现。  
3. 组件 API / 导出名见 [reference.md](reference.md)；能力摘要见 [README.md](../../../README.md)。

## 示例优先（强制）

实现或改写任何页面 / 交互时：

1. **查索引**：在本文件「场景 → 示例」表中匹配用户意图（登录、列表、强确认、设置…）。  
2. **读示例**：打开表中的 `src/demo/pages/...`（列表再读 `list/*Template.tsx`）。不要凭记忆重造布局与校验。  
3. **对齐实现**：复用同一套组件（`LoginCard`、`PageHeader`、`DataTable`、`StrongConfirmDrawer`…）、校验方式（`Field.error` / `FormErrors`）、样式类名与路由习惯。  
4. **无匹配时**：读最近邻示例 + `/components/*` 馆页；仍缺口则按硬性约束 mixed，并同步更新本索引与 `reference.md`。

不要跳过示例直接「自由发挥」新页面骨架。

## 场景 → 示例索引

| 用户要做… | 路由 | 先读源码 |
|-----------|------|----------|
| 登录 / TOTP 绑定 | `/examples/login` | `ExampleLoginPage.tsx` |
| 注册表单 | `/examples/register` | `ExampleRegisterPage.tsx` |
| 邮箱验证码 | `/examples/verify-email` | `ExampleVerifyEmailPage.tsx` |
| 输入匹配字符强确认（抽屉） | `/examples/strong-confirm` | `ExampleStrongConfirmPage.tsx` |
| 居中强确认 / Modal 确认 | `/components/feedback` | `FeedbackPage.tsx`（`StrongConfirm`） |
| 定宽业务表单 | `/examples/form` | `ExampleFormPage.tsx` |
| 分区设置 / DangerZone | `/examples/settings` | `ExampleSettingsPage.tsx` |
| 列表（排序/固定列/树/卡片） | `/examples/list?tpl=` | `ExampleListPage.tsx` + `list/List*Template.tsx` |
| 列表点详情 → 抽屉 | `/examples/list-detail` | `ExampleListDetailPage.tsx` |
| 详情 + 页头溢出菜单 | `/examples/detail` | `ExampleDetailPage.tsx` |
| 页头 actions / overflow | `/examples/page` | `ExamplePageHeaderPage.tsx` |
| 仪表盘指标图 | `/examples/dashboard` | `ExampleDashboardPage.tsx` |
| 多步向导 | `/examples/wizard` | `ExampleWizardPage.tsx` |
| 开通向导完成态 | `/examples/onboarding` | `ExampleOnboardingPage.tsx` |
| 搜索结果列表 | `/examples/search` | `ExampleSearchPage.tsx` |
| 空态 / 404 | `/examples/empty` | `ExampleEmptyPage.tsx` |
| 403 / 500 / 离线 | `/examples/errors` | `ExampleErrorsPage.tsx` |
| 个人资料 + 编辑抽屉 | `/examples/profile` | `ExampleProfilePage.tsx` |
| 通知中心抽屉 | `/examples/notifications` | `ExampleNotificationsPage.tsx` |
| 角色多选表 | `/examples/roles` | `ExampleRolesPage.tsx` |
| 审计时间线 / 日志 | `/examples/audit` | `ExampleAuditPage.tsx` |
| 对比 Diff | `/examples/compare` | `ExampleComparePage.tsx` |
| 加载骨架 | `/examples/skeleton` | `ExampleSkeletonPage.tsx` |
| 权限禁用隐藏 | `/examples/permissions` | `ExamplePermissionsPage.tsx` |
| 长文案 / 密度 | `/examples/i18n` | `ExampleI18nPage.tsx` |
| 日志页 | `/examples/log` | `ExampleLogPage.tsx` |
| 字体字号 | `/examples/typography` | `ExampleTypographyPage.tsx` |
| 组合模式 | `/patterns` | `PatternsPage.tsx` |
| 令牌 / 色 / 字 | `/foundations` | `FoundationsPage.tsx` |
| 单组件 API 演示 | `/components/{buttons,forms,data,feedback,navigation,charts,advanced}` | 同名 `*Page.tsx` |

列表 `tpl`：`sortable` \| `static` \| `pinned` \| `tree` \| `cards` \| `compact`。  
完整路径均在 `src/demo/pages/`（组件馆页同目录）。更细的文件表见 [reference.md](reference.md)#示例页面索引。

## 硬性约束

1. **只用本套组件与令牌**，不要另起 Tailwind / Ant Design / MUI / 新设计语言。  
2. **样式走 CSS 变量**（`--primary`、`--surface`、`--text-muted`、`--control-fs`…），新增样式放 `src/styles/` 对应模块，经 `src/styles/index.css` 引入。  
3. **图标用 `lucide-react`**，侧栏/面包屑用 `NavIcon` 统一字重。  
4. **不要**在 kit 里塞业务实体（集群、Job 等）；demo 数据保持通用。  
5. **避免** AI 默认审美：紫渐变、奶油底+陶土色、报纸风、过度 glow / pill。

## 接入骨架

```tsx
import '@/styles/index.css'
import { AppearanceProvider } from '@/theme/AppearanceProvider'
import { ToastProvider } from '@/components/ui'
import { AppShell } from '@/components/layout'

<AppearanceProvider>
  <ToastProvider>
    <AppShell navGroups={…} topbarTitle={…} sidebarFooter={…}>
      {children}
    </AppShell>
  </ToastProvider>
</AppearanceProvider>
```

GitHub Pages / 子路径：`withBase()`（`@/lib/baseUrl`）；`npm run build:pages`（`VITE_BASE=/x-ui/`）。

| 用途 | 路径 |
|------|------|
| 组件 | `@/components/ui` |
| 布局 | `@/components/layout` |
| 图表 | `@/components/charts` |
| 主题 | `@/theme/AppearanceProvider` |
| 类名合并 | `@/lib/cn` |
| 子路径 | `@/lib/baseUrl` → `withBase` |

## 主题与令牌

- `useAppearance()` → `modePreference`（深浅色）/ `theme`（主题包）/ `accent`（强调色）/ `density`。  
- 文档属性：`body[data-theme][data-mode][data-accent][data-density]`。  
- **主题包**（可扩展）：注册表 `src/theme/themes.ts` + CSS `src/styles/tokens/themes/<id>.css`。内置 `classic`（经典，默认）与 `glass`（透明）。新主题只加注册项与 CSS，勿散改组件。  
- **深浅色** ≠ 主题包：`system` / `light` / `dark` 只控制明暗。外观抽屉：`ThemeDrawer`（`ThemePicker` + `AccentPicker`）。  
- 紧凑密度：`styles/tokens/density.css`，勿散落 `!important`。  
- **控件字号**：`--control-fs: 13px`（及 sm/lg），勿按断点在 13↔16 间切换。  
- 弹层进场：`usePresence`（Drawer/Modal）。

## 布局与页面

| 场景 | 用法 |
|------|------|
| 带侧栏应用 | `AppShell` + `navGroups` + `sidebarFooter`（`UserMenu`） |
| 页头 | `PageHeader`：`actions` 常显；`actionItems` + `overflow` 收进「更多」；主按钮默认 `md` |
| 定宽表单/设置 | `className="page-narrow"` |
| 全宽列表 | `DataTable` / `ListPage`；顶栏 `?q=`；列表 `?tpl=` |
| 分区设置 | `SectionCard` + `SettingsRow` / `Field` / `Switch`；`DangerZone`；`AccentPicker` |
| 空态 / 加载 | `EmptyState` · `Spinner` / `Skeleton*` / `ResourceState` |
| 校验 | `Field.error` + `FormErrors`（对照登录/注册示例） |

## 组件选用速查

- **按钮** `Button` · **表单** `Field` + Input/Select/… · **搜索框** `SearchInput`（图标 + 清除，勿手拼）· **颜色** `ColorInput`（非原生 color）  
- **登录** `LoginCard` + `TotpBindPanel` / `PinInput` → 读 `ExampleLoginPage`  
- **注册 / 验证码** → `ExampleRegisterPage` / `ExampleVerifyEmailPage`  
- **日期** `DatePicker` / `DateRangePicker`（双月；datetime：日历\|日历\|开始\|结束）  
- **表格** `DataTable`：`pinned` / `remote` / `hideFooter` / `hideHeader` / `columnVisibility` / 树 → 读 list 模板；空值（空串 / 空 TagGroup 等）默认显示 `—`（`emptyCell`）；操作列设 `emptyPlaceholder: false`  
- **带标题表** `TableCard` + `Table`（详情内嵌表，勿再套 `SectionCard`）  
- **强确认** Modal：`StrongConfirm`；抽屉：`StrongConfirmDrawer` → `ExampleStrongConfirmPage`  
- **图表** `CHART_STATUS` · 完整导出 → [reference.md](reference.md)

## 样式约定

- `styles/components/<name>.css`，经 `styles/index.css` `@import`；勿在 TSX 里 import CSS。  
- 密度只写 `density.css`。固定列背景用不透明 `--surface` / `--surface-2`。

## 做页面检查清单

- [ ] 已按索引打开并对照过最近邻示例源码  
- [ ] `PageHeader`；溢出用 `actionItems` + `overflow`  
- [ ] 校验：`placeholder` + `Field.error` / `FormErrors`（鉴权类页面必有）  
- [ ] 色与图表令牌正确；取色用 `ColorInput`  
- [ ] Modal/Drawer Esc + focus trap / 进场动画  
- [ ] 未引入 Tailwind / 新 UI 库；demo 无真实密钥  

## 缺口

仍按需：Mention / 重型 RichText、虚拟长列表、Playwright 视觉回归。新示例必须挂进本索引 + `reference.md` + 侧栏/概览。

## 反例

```tsx
// ❌ 跳过示例、另起一套布局 / 校验
// ✅ 读 ExampleLoginPage 后再做登录

// ❌ <input type="color" /> / type="date"
// ✅ <ColorInput /> / <DatePicker />

// ❌ 图表靠 series 顺序碰颜色
// ✅ color: CHART_STATUS.success
```
