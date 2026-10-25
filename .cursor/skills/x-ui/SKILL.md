---
name: x-ui
description: >-
  Build and modify UIs with the x-ui design system (CSS variables, AppShell,
  @/components/ui|layout|charts). Use when creating pages, forms, tables,
  dashboards, dialogs, or styling in this repo; when the user mentions x-ui,
  AppearanceProvider, CHART_STATUS, or asks to follow the design kit.
---

# X-UI 使用规范

在本仓库（或已拷入 x-ui 源码的业务仓）写界面时，**必须**遵循本 Skill。先读本文件；组件清单见 [reference.md](reference.md)。能力与示例见仓库根目录 [README.md](../../../README.md)。

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

GitHub Pages / 子路径部署：静态资源与 demo 图用 `withBase()`（`@/lib/baseUrl`），构建用 `npm run build:pages`（`VITE_BASE=/x-ui/`）。

| 用途 | 路径 |
|------|------|
| 组件 | `@/components/ui` |
| 布局 | `@/components/layout` |
| 图表 | `@/components/charts` |
| 主题 | `@/theme/AppearanceProvider` |
| 类名合并 | `@/lib/cn` |
| 子路径 | `@/lib/baseUrl` → `withBase` |

## 主题与令牌

- `useAppearance()` → `modePreference` / `accent` / `density`；状态在 `body[data-mode][data-accent][data-density]`。
- 紧凑密度：`styles/tokens/density.css`（`density` layer），勿散落 `!important`。
- **表单控件字号**：`--control-fs: 13px`（及 sm/lg），桌面/移动端一致，**不要**按断点在 13↔16 间切换。
- 弹层进场：`usePresence`（Drawer/Modal），勿 `open` 时直接挂载成最终态导致无滑动动画。

## 布局与页面

| 场景 | 用法 |
|------|------|
| 带侧栏应用 | `AppShell` + `navGroups` + `sidebarFooter`（`UserMenu`） |
| 页头 | `PageHeader`：`actions` 常显；`actionItems` 可设 `overflow` 收进「更多」；勿混用导致主按钮尺寸不一致（默认 `md`） |
| 定宽表单/设置 | `className="page-narrow"` |
| 全宽列表 | `DataTable` / `ListPage`；搜索进顶栏 `?q=`；列表 demo 多模板 `?tpl=` |
| 分区设置 | `SectionCard` + `SettingsRow` / `Field` / `Switch`；危险区 `DangerZone`；外观 `AccentPicker` |
| 空态 / 加载 | `EmptyState` · `Spinner` / `Skeleton` / `SkeletonTable` / `ResourceState` |
| 校验汇总 | `FormErrors` |

侧栏折叠、用户菜单 portal、**≤960px 顶栏菜单 + 抽屉导航** 已由 layout 处理。移动端：`styles/layout/responsive.css`。

## 组件选用速查

- **按钮**：`Button`（`variant` / `size` sm\|md\|lg / `block` / `iconOnly` / `loading` / `href`）
- **表单**：`Field` + `Input`/`Textarea`/`Select`/`Combobox`/`PinInput`/`Switch`/`Checkbox`/`Radio`；`size` sm\|md\|lg
- **颜色**：`ColorInput`（自定义 HSV，**不要**原生 `type="color"`）；文本色值框排除全局 `Field input` 双边框（用 `.color-input-text`）
- **登录 TOTP**：未绑定 `TotpBindPanel`（`secret`/`account`，本地 QR）；已绑定只用 `PinInput`
- **日期**：`DatePicker` / `DateRangePicker`，`mode="date"|"datetime"`。范围：**双月日历**；datetime：**左月 \| 右月 \| 开始时间 \| 结束时间**。弹层选择，勿原生 `type="date"`
- **时间**：独立 `TimePicker`；`DatePicker` 支持 `minuteStep` / `disabledDate`
- **向导**：`Steps`（`size` sm\|md）自带左右指示器，勿再包滚动层
- **表格**：`Table` / `DataTable`
  - 列 `sortable` + 可选 `sortValue`
  - **`pinned: 'left'|'right'`**（建议设 `width`）；左固定时多选勾选列自动一并固定；边缘轻量渐变阴影
  - 多选 `selectedKeys` + `bulkActions`；可选 `remote` / `columnVisibility` / `resizableColumns` / `getChildren`
  - 树行用 `TreeTableCell`
- **搜索结果**：`SearchResultList`
- **布局原语**：`Stack` / `FormGrid` / `CatalogTile` / `CatalogGroup`
- **外观**：`AccentPicker`；设置行 `SettingsRow` + `DangerZone`
- **反馈**：`Alert`（`danger`，`error` 别名）/ `Toast`（`info`\|`success`\|`warn`\|`error`）/ `Modal` / `Drawer`（`size`）/ `Sheet`
- **资源态**：`ResourceState`；指标卡 `StatCard`；详情子页 `PageTabs`
- **运维编辑**：`JsonViewer` / `KeyValueEditor` / `ColorInput` / `ImagePreview`（资源用 `withBase`）
- **强删除确认**：`StrongConfirm` / `ConfirmModal`，**不要**用 Drawer 做删除确认
- **图表**：`ChartContainer` + `CHART_STATUS`，勿靠调色板顺序碰运气

完整导出 → [reference.md](reference.md)。

## 样式约定

- 按组件拆 `styles/components/<name>.css`，在 `styles/index.css` 的 `components` layer `@import`（含 `resource.css`）。
- 勿在 TSX 里 `import './Foo.css'`（走全局入口）。
- 密度覆盖只写在 `density.css`。
- 固定列：不透明 `--surface` / hover `--surface-2`；勿用半透明 `--hover` 当 sticky 背景。

## 做页面检查清单

- [ ] `PageHeader`，无重复大标题；溢出操作用 `actionItems` + `overflow`
- [ ] 色来自 token / tone；图表用 `CHART_STATUS`；取色用 `ColorInput`
- [ ] 错误用 `Field.error` 或 `FormErrors`
- [ ] Modal/Drawer/Sheet 可 Esc；不破坏 focus trap / 进场动画
- [ ] 列表筛选与顶栏 `?q=` 一致；固定列设 `width` 且不穿透
- [ ] 未引入 Tailwind / 新 UI 库
- [ ] Demo 无真实密钥；子路径资源用 `withBase`

## 示例与缺口

常用示例与列表 `?tpl=` 见 README。仍按需、勿假装已有：Mention / 重型 RichText、虚拟长列表、Playwright 视觉回归。新组件同步 `reference.md`。

## 反例

```tsx
// ❌
<div className="bg-purple-500 rounded-full shadow-2xl">…

// ✅
<Button variant="primary">保存</Button>
```

```tsx
// ❌
<input type="color" />
<input type="date" />

// ✅
<ColorInput value={hex} onChange={setHex} />
<DatePicker value={iso} onChange={setIso} />
```

```tsx
// ❌
<BarChart series={[{ dataKey: 'fail' }, { dataKey: 'ok' }]} />

// ✅
import { CHART_STATUS } from '@/components/charts'
series={[
  { dataKey: 'ok', name: '成功', color: CHART_STATUS.success },
  { dataKey: 'fail', name: '失败', color: CHART_STATUS.danger },
]}
```
