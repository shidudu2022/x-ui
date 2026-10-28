import { Link } from 'react-router-dom'
import { Alert, CodeBlock } from '@/components/ui'
import { useLocale } from '@/i18n'
import { pickL10n, type L10n } from '@/demo/i18n/types'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { DocPage } from '@/demo/docs/DocPage'
import { ShowcaseSection } from '@/demo/ShowcaseSection'

const INSTALL = `npm install @shidudu2022/x-ui
# or pnpm add / yarn add

# peerDependencies: react, react-dom ^19
# AppShell / Sidebar and other shell components also need react-router-dom ^7`

const ENTRY = `// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {
  AppearanceProvider,
  LocaleProvider,
  ConfirmProvider,
  ToastProvider,
} from '@shidudu2022/x-ui'
import '@shidudu2022/x-ui/styles.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider defaultLocale="en">
      <AppearanceProvider>
        <ToastProvider>
          <ConfirmProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ConfirmProvider>
        </ToastProvider>
      </AppearanceProvider>
    </LocaleProvider>
  </StrictMode>,
)`

const SHELL = `// App.tsx
import { Outlet, Route, Routes } from 'react-router-dom'
import { Gauge, List } from 'lucide-react'
import { AppShell, NavIcon } from '@shidudu2022/x-ui'

const navGroups = [
  {
    section: 'Overview',
    items: [
      { to: '/', label: 'Dashboard', icon: <NavIcon icon={Gauge} />, end: true },
    ],
  },
  {
    section: 'Resources',
    label: 'Clusters',
    collapsible: true, // collapsible group, auto-expands when it contains the current route
    icon: <NavIcon icon={List} />,
    items: [
      { to: '/clusters', label: 'Cluster list' },
      { to: '/clusters/new', label: 'Create cluster' },
    ],
  },
]

function Layout() {
  return (
    <AppShell navGroups={navGroups} topbarTitle="My Console">
      <Outlet />
    </AppShell>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<div>Dashboard</div>} />
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
  const error = name && name.length < 3 ? 'At least 3 characters' : undefined

  return (
    <FormPage
      title="Create cluster"
      description="Fill in the basic info and submit."
      actions={
        <Button variant="primary" disabled={!name || !!error} onClick={() => toast('Submitted', 'success')}>
          Create
        </Button>
      }
    >
      <Field label="Cluster name" hint="Lowercase letters, digits, and hyphens" error={error}>
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
          title: 'Delete cluster',
          description: 'This action cannot be undone.',
          danger: true,
          resourceName: name,
          confirmValue: name, // require typing the name to confirm
        })
        if (ok) toast('Deleted', 'success')
      }}
    >
      Delete
    </Button>
  )
}`

const STEPS: Array<{ title: L10n; desc: L10n; code: string; language: string }> = [
  {
    title: { en: 'Install', zh: '安装' },
    desc: {
      en: 'Includes components, styles, and type declarations. Icons use lucide-react (already installed as a dependency); charts are based on recharts.',
      zh: '包含组件、样式与类型声明。图标使用 lucide-react（已作为依赖安装），图表基于 recharts。',
    },
    code: INSTALL,
    language: 'bash',
  },
  {
    title: { en: 'Import styles and mount providers', zh: '引入样式并挂载 Provider' },
    desc: {
      en: 'Import the styles once. LocaleProvider sets English/Chinese UI strings (default en). AppearanceProvider handles light/dark, theme, accent, and density; ToastProvider and ConfirmProvider back useToast and useConfirm.',
      zh: '样式只需引入一次。LocaleProvider 负责组件内置文案的中英文（默认 en）。AppearanceProvider 负责深浅色 / 主题 / 强调色 / 密度；ToastProvider 与 ConfirmProvider 分别支持 useToast 与 useConfirm。',
    },
    code: ENTRY,
    language: 'tsx',
  },
  {
    title: { en: 'Build the app shell', zh: '搭建应用壳' },
    desc: {
      en: 'AppShell provides a sidebar + topbar + content area, which turns into a mobile drawer nav automatically, with the collapsed state persisted. navGroups supports section headings and collapsible groups.',
      zh: 'AppShell 提供侧栏 + 顶栏 + 内容区，移动端自动变为抽屉导航，折叠状态持久化。navGroups 支持分区标题（section）与可折叠分组（collapsible）。',
    },
    code: SHELL,
    language: 'tsx',
  },
  {
    title: { en: 'Write your first page', zh: '写第一个页面' },
    desc: {
      en: 'Use FormPage (fixed-width, centered) for create/edit pages; use ListPage + ResourceList for list pages. Put controls inside Field to get labels, hints, and errors.',
      zh: '创建 / 编辑类页面用 FormPage（定宽居中）；列表页用 ListPage + ResourceList。控件统一放进 Field，获得标签、提示与错误。',
    },
    code: PAGE,
    language: 'tsx',
  },
  {
    title: { en: 'Confirm destructive actions', zh: '危险操作确认' },
    desc: {
      en: 'Await confirm() inside an event callback; for high-risk actions, use confirmValue to require typing the resource name.',
      zh: '在事件回调里 await confirm()；高风险操作用 confirmValue 要求输入资源名。',
    },
    code: CONFIRM,
    language: 'tsx',
  },
]

const FAQ: Array<[q: L10n, a: L10n]> = [
  [
    { en: 'Styles aren’t applying / get overridden', zh: '样式没生效 / 被覆盖' },
    {
      en: 'All x-ui styles live inside a CSS @layer. Your unlayered styles naturally take precedence; don’t fight it with !important — override tokens instead, see "Theming".',
      zh: 'x-ui 所有样式位于 CSS @layer 中。你的未分层样式天然优先；不要用 !important 对抗，改用令牌覆盖，见「主题与外观」。',
    },
  ],
  [
    { en: 'Deploying under a subpath (e.g. GitHub Pages)', zh: '部署在子路径（如 GitHub Pages）' },
    {
      en: 'Pass basename to BrowserRouter, prefix static assets like images with the base path yourself, and configure a 404 fallback for the SPA.',
      zh: '给 BrowserRouter 传 basename，自行为图片等静态资源拼上 base 前缀，并为 SPA 配置 404 回退。',
    },
  ],
  [
    { en: 'I only want to use some of the components', zh: '只想用部分组件' },
    {
      en: 'The package is an ES Module and marks sideEffects as CSS-only, so bundlers tree-shake unused components; the stylesheet is imported as a whole.',
      zh: '包为 ES Module 且标记了 sideEffects 仅 CSS，打包器会对未使用的组件做 tree-shaking；样式文件为整体引入。',
    },
  ],
  [
    { en: 'I don’t use react-router', zh: '不使用 react-router' },
    {
      en: 'Besides AppShell / Sidebar / Breadcrumbs / BreadcrumbNav, which use react-router, the rest of the components and charts don’t depend on routing.',
      zh: '除 AppShell / Sidebar / Breadcrumbs / BreadcrumbNav 使用 react-router 外，其余组件与图表不依赖路由。',
    },
  ],
]

export function GettingStartedPage() {
  const { locale } = useLocale()
  const t = useDemoT()

  return (
    <DocPage
      eyebrow={t('Start', '开始')}
      title={t('Getting started', '快速开始')}
      description={t(
        'Five steps to wire x-ui into a React project: install, styles & providers, app shell, first page, and destructive-action confirmation.',
        '五步把 x-ui 接进一个 React 项目：安装、样式与 Provider、应用壳、第一个页面、危险操作确认。',
      )}
    >
      <ShowcaseSection title={t('Setup steps', '接入步骤')}>
        <div className="guide-steps">
          {STEPS.map((s, i) => (
            <div key={s.title.en} className="guide-step">
              <span className="guide-step-num">{i + 1}</span>
              <div style={{ minWidth: 0 }}>
                <h3>{pickL10n(locale, s.title)}</h3>
                <p>{pickL10n(locale, s.desc)}</p>
                <CodeBlock className="guide-code" code={s.code} language={s.language} title={s.language} />
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title={t('FAQ', '常见问题')}>
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead>
              <tr>
                <th>{t('Question', '问题')}</th>
                <th>{t('Answer', '说明')}</th>
              </tr>
            </thead>
            <tbody>
              {FAQ.map(([q, a]) => (
                <tr key={q.en}>
                  <td style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>{pickL10n(locale, q)}</td>
                  <td>{pickL10n(locale, a)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title={t('Next steps', '下一步')}>
        <div className="guide-cards">
          <Link to="/docs/theming" className="category-card">
            <div className="category-card-head">
              <strong>{t('Theming', '主题与外观')}</strong>
            </div>
            <p>{t('Light/dark, theme packs, accent color, density, and customizing brand color via CSS variables.', '深浅色、主题包、强调色、密度，以及用 CSS 变量定制品牌色。')}</p>
          </Link>
          <Link to="/docs/conventions" className="category-card">
            <div className="category-card-head">
              <strong>{t('Conventions', '开发约定')}</strong>
            </div>
            <p>{t('Choice rules for layout, typography, forms, lists, and feedback, so pages stay consistent across authors.', '布局、排版、表单、列表与反馈的选型规则，写出风格一致的页面。')}</p>
          </Link>
          <Link to="/components" className="category-card">
            <div className="category-card-head">
              <strong>{t('All components', '全部组件')}</strong>
            </div>
            <p>{t('Browse by category — every component has usage guidance, example source, and an API reference.', '按分类浏览，每个组件有场景说明、示例源码与 API。')}</p>
          </Link>
          <Link to="/templates" className="category-card">
            <div className="category-card-head">
              <strong>{t('Templates', '页面模板')}</strong>
            </div>
            <p>{t('Full-page templates for login, lists, forms, dashboards, and more that you can copy directly.', '登录、列表、表单、仪表盘等整页模板，可直接对照复制。')}</p>
          </Link>
        </div>
        <div style={{ marginTop: 16, maxWidth: 720 }}>
          <Alert tone="info" title={t('Tip', '提示')}>
            {t(
              'This documentation site is itself built with x-ui: the source for every page lives in ',
              '本文档站本身就是用 x-ui 搭建的：每个页面的源码位于仓库 ',
            )}
            <code>src/demo/pages</code>
            {t(' in the repo — feel free to use it as a reference.', '，可直接对照。')}
          </Alert>
        </div>
      </ShowcaseSection>
    </DocPage>
  )
}
