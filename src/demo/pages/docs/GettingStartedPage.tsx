import { Link } from 'react-router-dom'
import { Alert, CodeBlock } from '@/components/ui'
import { DocPage } from '@/demo/docs/DocPage'
import { ShowcaseSection } from '@/demo/ShowcaseSection'

const INSTALL = `npm install @shidudu2022/x-ui
# 或 pnpm add / yarn add

# peerDependencies：react、react-dom ^19
# 使用 AppShell / Sidebar 等壳层组件还需要 react-router-dom ^7`

const ENTRY = `// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {
  AppearanceProvider,
  ConfirmProvider,
  ToastProvider,
} from '@shidudu2022/x-ui'
import '@shidudu2022/x-ui/styles.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppearanceProvider>
      <ToastProvider>
        <ConfirmProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfirmProvider>
      </ToastProvider>
    </AppearanceProvider>
  </StrictMode>,
)`

const SHELL = `// App.tsx
import { Outlet, Route, Routes } from 'react-router-dom'
import { Gauge, List } from 'lucide-react'
import { AppShell, NavIcon } from '@shidudu2022/x-ui'

const navGroups = [
  {
    section: '概览',
    items: [
      { to: '/', label: '仪表盘', icon: <NavIcon icon={Gauge} />, end: true },
    ],
  },
  {
    section: '资源',
    label: '集群',
    collapsible: true, // 可折叠分组，含当前路由时自动展开
    icon: <NavIcon icon={List} />,
    items: [
      { to: '/clusters', label: '集群列表' },
      { to: '/clusters/new', label: '创建集群' },
    ],
  },
]

function Layout() {
  return (
    <AppShell navGroups={navGroups} topbarTitle="我的控制台">
      <Outlet />
    </AppShell>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<div>仪表盘</div>} />
        <Route path="clusters/new" element={<CreateClusterPage />} />
      </Route>
    </Routes>
  )
}`

const PAGE = `// CreateClusterPage.tsx
import { useState } from 'react'
import { Button, Field, FormPage, Input, useToast } from '@shidudu2022/x-ui'

export function CreateClusterPage() {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const error = name && name.length < 3 ? '至少 3 个字符' : undefined

  return (
    <FormPage
      title="创建集群"
      description="填写基础信息后提交。"
      actions={
        <Button variant="primary" disabled={!name || !!error} onClick={() => toast('已提交', 'success')}>
          创建
        </Button>
      }
    >
      <Field label="集群名称" hint="小写字母、数字与连字符" error={error}>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
    </FormPage>
  )
}`

const CONFIRM = `import { Button, useConfirm, useToast } from '@shidudu2022/x-ui'

function DeleteButton({ name }: { name: string }) {
  const { confirm } = useConfirm()
  const { toast } = useToast()

  return (
    <Button
      variant="danger"
      onClick={async () => {
        const ok = await confirm({
          title: '删除集群',
          description: '该操作不可恢复。',
          danger: true,
          resourceName: name,
          confirmValue: name, // 输入名称才可确认
        })
        if (ok) toast('已删除', 'success')
      }}
    >
      删除
    </Button>
  )
}`

const STEPS: Array<{ title: string; desc: string; code: string; language: string }> = [
  {
    title: '安装',
    desc: '包含组件、样式与类型声明。图标使用 lucide-react（已作为依赖安装），图表基于 recharts。',
    code: INSTALL,
    language: 'bash',
  },
  {
    title: '引入样式并挂载 Provider',
    desc: '样式只需引入一次。AppearanceProvider 负责深浅色 / 主题 / 强调色 / 密度；ToastProvider 与 ConfirmProvider 分别支持 useToast 与 useConfirm。',
    code: ENTRY,
    language: 'tsx',
  },
  {
    title: '搭建应用壳',
    desc: 'AppShell 提供侧栏 + 顶栏 + 内容区，移动端自动变为抽屉导航，折叠状态持久化。navGroups 支持分区标题（section）与可折叠分组（collapsible）。',
    code: SHELL,
    language: 'tsx',
  },
  {
    title: '写第一个页面',
    desc: '创建 / 编辑类页面用 FormPage（定宽居中）；列表页用 ListPage + ResourceList。控件统一放进 Field，获得标签、提示与错误。',
    code: PAGE,
    language: 'tsx',
  },
  {
    title: '危险操作确认',
    desc: '在事件回调里 await confirm()；高风险操作用 confirmValue 要求输入资源名。',
    code: CONFIRM,
    language: 'tsx',
  },
]

const FAQ: Array<[string, string]> = [
  ['样式没生效 / 被覆盖', 'x-ui 所有样式位于 CSS @layer 中。你的未分层样式天然优先；不要用 !important 对抗，改用令牌覆盖，见「主题与外观」。'],
  ['部署在子路径（如 GitHub Pages）', '给 BrowserRouter 传 basename，自行为图片等静态资源拼上 base 前缀，并为 SPA 配置 404 回退。'],
  ['只想用部分组件', '包为 ES Module 且标记了 sideEffects 仅 CSS，打包器会对未使用的组件做 tree-shaking；样式文件为整体引入。'],
  ['不使用 react-router', '除 AppShell / Sidebar / Breadcrumbs / BreadcrumbNav 使用 react-router 外，其余组件与图表不依赖路由。'],
]

export function GettingStartedPage() {
  return (
    <DocPage
      eyebrow="开始"
      title="快速开始"
      description="五步把 x-ui 接进一个 React 项目：安装、样式与 Provider、应用壳、第一个页面、危险操作确认。"
    >
      <ShowcaseSection title="接入步骤">
        <div className="guide-steps">
          {STEPS.map((s, i) => (
            <div key={s.title} className="guide-step">
              <span className="guide-step-num">{i + 1}</span>
              <div style={{ minWidth: 0 }}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <CodeBlock className="guide-code" code={s.code} language={s.language} title={s.language} />
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="常见问题">
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead>
              <tr>
                <th>问题</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              {FAQ.map(([q, a]) => (
                <tr key={q}>
                  <td style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>{q}</td>
                  <td>{a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="下一步">
        <div className="guide-cards">
          <Link to="/docs/theming" className="category-card">
            <div className="category-card-head">
              <strong>主题与外观</strong>
            </div>
            <p>深浅色、主题包、强调色、密度，以及用 CSS 变量定制品牌色。</p>
          </Link>
          <Link to="/docs/conventions" className="category-card">
            <div className="category-card-head">
              <strong>开发约定</strong>
            </div>
            <p>布局、排版、表单、列表与反馈的选型规则，写出风格一致的页面。</p>
          </Link>
          <Link to="/components" className="category-card">
            <div className="category-card-head">
              <strong>全部组件</strong>
            </div>
            <p>按分类浏览，每个组件有场景说明、示例源码与 API。</p>
          </Link>
          <Link to="/templates" className="category-card">
            <div className="category-card-head">
              <strong>页面模板</strong>
            </div>
            <p>登录、列表、表单、仪表盘等整页模板，可直接对照复制。</p>
          </Link>
        </div>
        <div style={{ marginTop: 16, maxWidth: 720 }}>
          <Alert tone="info" title="提示">
            本文档站本身就是用 x-ui 搭建的：每个页面的源码位于仓库 <code>src/demo/pages</code>，可直接对照。
          </Alert>
        </div>
      </ShowcaseSection>
    </DocPage>
  )
}
