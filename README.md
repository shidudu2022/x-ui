# x-ui

通用 React UI 框架（设计令牌 + 组件 + 布局壳 + Recharts 图表封装）。演示站按页面分开展示组件，不含业务逻辑。

## 开发

```bash
npm install
npm run dev
```

打开本地地址后，侧栏可浏览 Foundations / Buttons / Forms / Data / Feedback / Navigation / Charts / Patterns。

## 使用

```tsx
import { Button, Drawer, LineChart, ChartContainer } from 'x-ui'
// 或路径别名
import { Button } from '@/components/ui'
import { AppShell } from '@/components/layout'
import { LineChart, ChartContainer } from '@/components/charts'
```

主题通过 `AppearanceProvider` 控制 `body[data-mode|data-accent|data-density]`。

## 技术栈

- Vite + React + TypeScript + React Router
- 样式：CSS 变量（移植自设计稿）
- 图标：lucide-react
- 图表：Recharts + x-ui 封装

## 目录

```
src/
  components/ui       # 通用组件
  components/layout   # AppShell / Sidebar / Topbar …
  components/charts   # 图表封装
  theme               # 外观
  styles              # 令牌与样式
  demo                # 演示站（可独立于业务）
```
