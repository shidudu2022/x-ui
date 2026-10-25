---
name: x-ui
description: >-
  Build and modify UIs with the x-ui design system (CSS variables, AppShell,
  @/components/ui|layout|charts). Use when creating pages, forms, tables,
  dashboards, dialogs, or styling in this repo; when the user mentions x-ui,
  AppearanceProvider, CHART_STATUS, or asks to follow the design kit.
---

# X-UI 使用规范

在本仓库（或已拷入 x-ui 源码的业务仓）写界面时，**必须**遵循本 Skill。先读本文件；组件清单见 [reference.md](reference.md)。

## 硬性约束

1. **只用本套组件与令牌**，不要另起 Tailwind / Ant Design / MUI / 新设计语言。
2. **样式走 CSS 变量**（`--primary`、`--surface`、`--text-muted`…），新增样式放 `src/styles/` 对应模块，经 `src/styles/index.css` 引入。
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

导入路径：

| 用途 | 路径 |
|------|------|
| 组件 | `@/components/ui` |
| 布局 | `@/components/layout` |
| 图表 | `@/components/charts` |
| 主题 | `@/theme/AppearanceProvider` |
| 类名合并 | `@/lib/cn` |

## 主题

- 用 `useAppearance()` 读写 `modePreference` / `accent` / `density`。
- 视觉状态在 `body[data-mode][data-accent][data-density]`。
- 紧凑密度靠 `density` layer 覆盖，勿手写散落 `!important`。

## 布局与页面

| 场景 | 用法 |
|------|------|
| 带侧栏应用 | `AppShell` + `navGroups` + `sidebarFooter`（`UserMenu`） |
| 页头 | `PageHeader`（`title` / `description` / `actions`） |
| 定宽表单/设置 | 外层 `className="page-narrow"` |
| 全宽列表 | `DataTable` / `ListPage`，搜索进顶栏 `?q=`，勿在页面再放一套搜索框 |
| 分区设置 | `SectionCard` + `Field` / `Switch` |
| 空态 | `EmptyState` |
| 校验汇总 | `FormErrors` |
| 加载 | `Spinner` / `Skeleton` / `SkeletonTable`（跟主色） |

侧栏折叠、滚动箭头、用户菜单 portal 已由 layout 处理，**不要**再造一套。

## 组件选用速查

- **按钮**：`Button`（`variant` / `size` / `loading` / `href`）
- **表单**：`Field` + `Input`/`Textarea`/`Select`/`Combobox`/`DatePicker`/`Switch`/`Checkbox`/`Radio`
- **表格**：`Table` 或带分页的 `DataTable`（多选用 `selectedKeys` + `bulkActions`）
- **反馈**：`Alert` / `Toast`（`useToast`）/ `Modal` / `Drawer` / `Sheet` / `ConfirmModal`
- **标签**：`Tag` / `Badge`（语义 tone：`success` `warn` `danger` `info`…）
- **图表**：包在 `ChartContainer`；系列色用 `CHART_STATUS`（`success`/`danger`/`primary`/…），不要靠调色板顺序碰运气

完整导出列表 → [reference.md](reference.md)。

## 样式约定

- 开发：按组件拆文件（如 `styles/components/alert.css`）。
- 生产：Vite 合并为一个 CSS；勿在每个 TSX 里 `import './Foo.css'`（主题全局入口即可）。
- 新增组件样式：新建 `styles/components/<name>.css`，并在 `styles/index.css` 的 `components` layer 中 `@import`。
- 密度覆盖写在 `styles/tokens/density.css`（`density` layer，优先级最高）。

## 做页面时的检查清单

- [ ] 已用 `PageHeader`，无重复大标题堆叠
- [ ] 颜色来自 token / tone，无硬编码随机色（图表用 `CHART_STATUS`）
- [ ] 表单错误用 `Field` `error` 或 `FormErrors`
- [ ] 弹层（Modal/Drawer/Sheet）可 Esc 关闭；勿破坏现有 focus trap
- [ ] 列表筛选与顶栏搜索模式一致（URL `?q=`）
- [ ] 未引入 Tailwind / 新 UI 库
- [ ] Demo 文案与数据保持通用，无真实密钥

## 反例

```tsx
// ❌
<div className="bg-purple-500 rounded-full shadow-2xl">…

// ✅
<Button variant="primary">保存</Button>
```

```tsx
// ❌ 失败系列用默认 chart-2 蓝色
<BarChart series={[{ dataKey: 'fail' }, { dataKey: 'ok' }]} />

// ✅
import { CHART_STATUS } from '@/components/charts'
series={[
  { dataKey: 'ok', name: '成功', color: CHART_STATUS.success },
  { dataKey: 'fail', name: '失败', color: CHART_STATUS.danger },
]}
```
