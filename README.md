# X-UI

通用 React 设计系统：令牌、组件、布局壳、图表封装与演示站。  
从业务设计稿抽离，**不含业务逻辑**，可按模块接入任意中后台项目。

仓库：[github.com/shidudu2022/x-ui](https://github.com/shidudu2022/x-ui)

## 特性

- **CSS 变量主题**：`body[data-mode|data-accent|data-density]`，默认跟随系统 + 蓝色强调色
- **组件齐全**：表单 / 数据表 / 反馈 / 导航 / 进阶（日期、级联、Sheet 等）
- **布局壳**：`AppShell` + 可折叠侧栏 + 顶栏面包屑 + 用户菜单
- **图表**：Recharts 封装，语义色 `CHART_STATUS`，圆点图例
- **演示站**：侧栏分页浏览 Foundations / 组件 / 示例页
- **AI Skill**：`.cursor/skills/x-ui` 约束 Agent 按本套 UI 规范写界面

## 快速开始

```bash
npm install
npm run dev
```

| 命令 | 说明 |
|------|------|
| `npm run dev` | 本地演示站 |
| `npm run build` | 类型检查 + 生产构建 |
| `npm run preview` | 预览构建产物 |
| `npm run lint` | oxlint |

## 接入业务项目

```tsx
import '@/styles/index.css'
import { AppearanceProvider, ToastProvider } from 'x-ui' // 或相对路径导出
import { AppShell, Button, PageHeader } from 'x-ui'

export function App() {
  return (
    <AppearanceProvider>
      <ToastProvider>
        <AppShell navGroups={…} sidebarFooter={…} topbarTitle={…}>
          <PageHeader title="页面" description="说明" />
          <Button variant="primary">操作</Button>
        </AppShell>
      </ToastProvider>
    </AppearanceProvider>
  )
}
```

本仓库目前以源码方式复用为主：把 `src/components`、`src/styles`、`src/theme`、`src/lib` 拷入业务仓，或用路径别名 `@/` 直接引用。

```tsx
import { Button } from '@/components/ui'
import { AppShell } from '@/components/layout'
import { LineChart, ChartContainer, CHART_STATUS } from '@/components/charts'
import { AppearanceProvider, useAppearance } from '@/theme/AppearanceProvider'
```

入口需引入样式：

```ts
import '@/styles/index.css'
```

## 主题

由 `AppearanceProvider` 写入 `document.body`：

| 属性 | 取值 | 说明 |
|------|------|------|
| `data-mode` | `light` \| `dark` | 解析后的明暗（`system` 会跟随 OS） |
| `data-accent` | `teal` `blue` `violet` `rose` `green` `amber` `slate` | 主色 |
| `data-density` | `comfortable` \| `compact` | 间距密度 |

开发时 CSS 按文件拆分；生产由 Vite 打成**单个** CSS。

## 目录结构

```text
src/
  components/
    ui/          # 通用组件（Button、DataTable、Modal…）
    layout/      # AppShell、Sidebar、Brand、UserMenu…
    charts/      # Line/Bar/Pie/Area + ChartContainer
  styles/        # tokens / layout / components / charts / demo
  theme/         # AppearanceProvider、accents
  lib/           # cn、useFocusTrap、useListSearch
  demo/          # 演示站页面（可删，不影响库）
  index.ts       # 统一导出
```

## 页面模式（示例）

演示站侧栏「示例」可对照：

| 模式 | 路径 | 要点 |
|------|------|------|
| 仪表盘 | `/examples/dashboard` | Metric/Stat + Chart |
| 列表 | `/examples/list` | DataTable + 顶栏 `?q=` 搜索 |
| 表单 | `/examples/form` | `page-narrow` + Field |
| 设置 | `/examples/settings` | SectionCard + Switch + FormErrors |
| 登录 | `/examples/login` | LoginCard |
| 向导 | `/examples/wizard` | Steps |

## AI 使用规范

若用 Cursor Agent 基于本套 UI 写页面，请加载项目 Skill：

```text
.cursor/skills/x-ui/SKILL.md
```

约定摘要：只用现有组件与 CSS 变量；不要引入 Tailwind；图表用 `CHART_STATUS`；布局优先 `AppShell` / `PageHeader` / `page-narrow`。

## 技术栈

- Vite 8 + React 19 + TypeScript + React Router 7
- 样式：原生 CSS + `@layer` + CSS 变量（非 Tailwind）
- 图标：`lucide-react`
- 图表：`recharts`

## License

Private / 按仓库所有者约定使用。
