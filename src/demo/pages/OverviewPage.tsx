import { Link } from 'react-router-dom'
import { Badge, Card, CodeBlock, Heading, Text } from '@/components/ui'
import { ACCENTS } from '@/theme/accents'
import { THEMES } from '@/theme/themes'
import { CATEGORIES } from '@/demo/catalog/categories'
import { COMPONENT_CATALOG, entriesOfCategory } from '@/demo/catalog/registry'
import { ALL_TEMPLATES } from '@/demo/catalog/templates'
import { ShowcaseSection } from '../ShowcaseSection'

const FEATURES = [
  {
    title: '为控制台而生',
    body: 'AppShell、ResourceList、DataTable、强确认抽屉、向导与日志——运维 / 管理后台的常见场景都有现成骨架。',
  },
  {
    title: '令牌驱动的外观',
    body: `深浅色 × ${THEMES.length} 个主题包 × ${ACCENTS.length} 种强调色 × 2 档密度，全部由 CSS 变量驱动，覆盖令牌即可定制品牌。`,
  },
  {
    title: '示例即文档',
    body: '每个组件页都有可交互示例与格式化源码、使用场景和 API；整页模板可直接对照复制。',
  },
  {
    title: '轻依赖',
    body: '原生 CSS + @layer，无 Tailwind / UI 库依赖；React 19、TypeScript 类型完整，图表基于 recharts。',
  },
]

const START_HERE = [
  { to: '/docs/getting-started', title: '快速开始', desc: '安装、Provider、应用壳、第一个页面' },
  { to: '/docs/theming', title: '主题与外观', desc: '深浅色 / 主题 / 强调色 / 品牌色' },
  { to: '/docs/conventions', title: '开发约定', desc: '布局、表单、列表与反馈的选型规则' },
  { to: '/foundations', title: '设计令牌', desc: '颜色、字号、圆角与图表色板' },
]

const FEATURED_TEMPLATES = [
  '/examples/list',
  '/examples/form',
  '/examples/settings',
  '/examples/dashboard',
  '/examples/login',
  '/examples/strong-confirm',
]

export function OverviewPage() {
  const featured = FEATURED_TEMPLATES.map((to) => ALL_TEMPLATES.find((t) => t.to === to)).filter(
    (t): t is NonNullable<typeof t> => Boolean(t),
  )

  return (
    <div>
      <section className="hero">
        <Badge tone="info" className="hero-badge">
          React 19 · TypeScript · CSS 变量
        </Badge>
        <h1>X-UI · 面向控制台的 React 设计系统</h1>
        <p>
          {COMPONENT_CATALOG.length} 个组件、{ALL_TEMPLATES.length} 个页面模板，覆盖应用壳、表单、数据表、图表与危险操作确认。
          样式由 CSS 变量驱动，可按模块接入业务项目。
        </p>
        <CodeBlock
          compact
          className="hero-install"
          language="bash"
          title="安装"
          code="npm install @shidudu2022/x-ui"
        />
        <div className="hero-actions">
          <Link to="/docs/getting-started" className="btn btn-primary">
            快速开始
          </Link>
          <Link to="/components" className="btn btn-secondary">
            浏览组件
          </Link>
          <Link to="/templates" className="btn btn-secondary">
            查看模板
          </Link>
        </div>
      </section>

      <div className="stat-strip">
        <div className="stat-strip-item">
          <strong>{COMPONENT_CATALOG.length}</strong>
          <span>组件</span>
        </div>
        <div className="stat-strip-item">
          <strong>{CATEGORIES.length}</strong>
          <span>组件分类</span>
        </div>
        <div className="stat-strip-item">
          <strong>{ALL_TEMPLATES.length}</strong>
          <span>页面模板</span>
        </div>
        <div className="stat-strip-item">
          <strong>{THEMES.length * ACCENTS.length * 2}</strong>
          <span>外观组合</span>
        </div>
      </div>

      <ShowcaseSection title="从这里开始">
        <div className="category-grid">
          {START_HERE.map((s) => (
            <Link key={s.to} to={s.to} className="category-card">
              <div className="category-card-head">
                <strong>{s.title}</strong>
              </div>
              <p>{s.desc}</p>
            </Link>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="特性">
        <div className="category-grid">
          {FEATURES.map((f) => (
            <Card key={f.title} padded className="guide-card">
              <Heading level="card" as="h3">
                {f.title}
              </Heading>
              <Text variant="muted" size="md" as="p" style={{ marginTop: 6 }}>
                {f.body}
              </Text>
            </Card>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="组件分类" description="每个组件页都包含引入方式、使用场景、示例源码与 API。">
        <div className="category-grid">
          {CATEGORIES.map((c) => {
            const entries = entriesOfCategory(c)
            return (
              <Link key={c.id} to={`/components#cat-${c.id}`} className="category-card">
                <div className="category-card-head">
                  <strong>{c.label}</strong>
                  <span>{entries.length}</span>
                </div>
                <p>{c.description}</p>
                <div className="category-card-sample">
                  {entries
                    .slice(0, 5)
                    .map((e) => e.name)
                    .join(' · ')}
                  …
                </div>
              </Link>
            )
          })}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="常用页面模板" description="整页示例，可直接对照复制结构与校验方式。">
        <div className="category-grid">
          {featured.map((t) => (
            <Link key={t.to} to={t.to} className="category-card">
              <div className="category-card-head">
                <strong>{t.label}</strong>
              </div>
              <p>{t.desc}</p>
            </Link>
          ))}
        </div>
        <p className="index-footnote muted">
          全部 {ALL_TEMPLATES.length} 个模板见 <Link to="/templates" className="text-link">页面模板</Link>
          {' · '}
          局部组合见 <Link to="/patterns" className="text-link">组合模式</Link>
        </p>
      </ShowcaseSection>
    </div>
  )
}
