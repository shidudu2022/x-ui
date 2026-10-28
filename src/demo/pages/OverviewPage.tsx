import { Link } from 'react-router-dom'
import { Badge, Card, CodeBlock, Heading, Text } from '@/components/ui'
import { useLocale } from '@/i18n'
import { ACCENTS } from '@/theme/accents'
import { THEMES } from '@/theme/themes'
import { CATEGORIES } from '@/demo/catalog/categories'
import { COMPONENT_CATALOG, entriesOfCategory } from '@/demo/catalog/registry'
import { ALL_TEMPLATES } from '@/demo/catalog/templates'
import { pickL10n, type L10n } from '@/demo/i18n/types'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { ShowcaseSection } from '../ShowcaseSection'

const FEATURES: Array<{ title: L10n; body: L10n }> = [
  {
    title: { en: 'Built for consoles', zh: '为控制台而生' },
    body: {
      en: 'AppShell, ResourceList, DataTable, strong-confirm drawers, wizards, and log viewers — common ops/admin scenarios already have a ready-made skeleton.',
      zh: 'AppShell、ResourceList、DataTable、强确认抽屉、向导与日志——运维 / 管理后台的常见场景都有现成骨架。',
    },
  },
  {
    title: { en: 'Token-driven appearance', zh: '令牌驱动的外观' },
    body: {
      en: `Light/dark × ${THEMES.length} theme packs × ${ACCENTS.length} accent colors × 2 density levels — all driven by CSS variables; override the tokens to customize your brand.`,
      zh: `深浅色 × ${THEMES.length} 个主题包 × ${ACCENTS.length} 种强调色 × 2 档密度，全部由 CSS 变量驱动，覆盖令牌即可定制品牌。`,
    },
  },
  {
    title: { en: 'Examples as documentation', zh: '示例即文档' },
    body: {
      en: 'Every component page has interactive examples with formatted source, usage guidance, and an API reference; full-page templates can be copied directly.',
      zh: '每个组件页都有可交互示例与格式化源码、使用场景和 API；整页模板可直接对照复制。',
    },
  },
  {
    title: { en: 'Light dependencies', zh: '轻依赖' },
    body: {
      en: 'Native CSS + @layer, no Tailwind / UI library dependency; React 19 with complete TypeScript types; charts are based on recharts.',
      zh: '原生 CSS + @layer，无 Tailwind / UI 库依赖；React 19、TypeScript 类型完整，图表基于 recharts。',
    },
  },
]

const START_HERE: Array<{ to: string; title: L10n; desc: L10n }> = [
  {
    to: '/docs/getting-started',
    title: { en: 'Getting started', zh: '快速开始' },
    desc: { en: 'Install, providers, app shell, first page', zh: '安装、Provider、应用壳、第一个页面' },
  },
  {
    to: '/docs/theming',
    title: { en: 'Theming', zh: '主题与外观' },
    desc: { en: 'Light/dark, theme, accent color, density', zh: '深浅色 / 主题 / 强调色 / 品牌色' },
  },
  {
    to: '/docs/conventions',
    title: { en: 'Conventions', zh: '开发约定' },
    desc: { en: 'Choice rules for layout, forms, lists, and feedback', zh: '布局、表单、列表与反馈的选型规则' },
  },
  {
    to: '/foundations',
    title: { en: 'Design tokens', zh: '设计令牌' },
    desc: { en: 'Color, type scale, radius, and chart palette', zh: '颜色、字号、圆角与图表色板' },
  },
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
  const { locale } = useLocale()
  const t = useDemoT()
  const featured = FEATURED_TEMPLATES.map((to) => ALL_TEMPLATES.find((tpl) => tpl.to === to)).filter(
    (tpl): tpl is NonNullable<typeof tpl> => Boolean(tpl),
  )

  return (
    <div>
      <section className="hero">
        <Badge tone="info" className="hero-badge">
          React 19 · TypeScript · {t('CSS variables', 'CSS 变量')}
        </Badge>
        <h1>{t('X-UI · A React design system for consoles', 'X-UI · 面向控制台的 React 设计系统')}</h1>
        <p>
          {locale === 'zh'
            ? `${COMPONENT_CATALOG.length} 个组件、${ALL_TEMPLATES.length} 个页面模板，覆盖应用壳、表单、数据表、图表与危险操作确认。样式由 CSS 变量驱动，可按模块接入业务项目。`
            : `${COMPONENT_CATALOG.length} components and ${ALL_TEMPLATES.length} page templates covering app shells, forms, data tables, charts, and destructive-action confirmation. Styling is driven by CSS variables and can be adopted module by module in a real project.`}
        </p>
        <CodeBlock
          compact
          className="hero-install"
          language="bash"
          title={t('Install', '安装')}
          code="npm install @shidudu2022/x-ui"
        />
        <div className="hero-actions">
          <Link to="/docs/getting-started" className="btn btn-primary">
            {t('Getting started', '快速开始')}
          </Link>
          <Link to="/components" className="btn btn-secondary">
            {t('Browse components', '浏览组件')}
          </Link>
          <Link to="/templates" className="btn btn-secondary">
            {t('View templates', '查看模板')}
          </Link>
        </div>
      </section>

      <div className="stat-strip">
        <div className="stat-strip-item">
          <strong>{COMPONENT_CATALOG.length}</strong>
          <span>{t('Components', '组件')}</span>
        </div>
        <div className="stat-strip-item">
          <strong>{CATEGORIES.length}</strong>
          <span>{t('Component categories', '组件分类')}</span>
        </div>
        <div className="stat-strip-item">
          <strong>{ALL_TEMPLATES.length}</strong>
          <span>{t('Page templates', '页面模板')}</span>
        </div>
        <div className="stat-strip-item">
          <strong>{THEMES.length * ACCENTS.length * 2}</strong>
          <span>{t('Appearance combinations', '外观组合')}</span>
        </div>
      </div>

      <ShowcaseSection title={t('Start here', '从这里开始')}>
        <div className="category-grid">
          {START_HERE.map((s) => (
            <Link key={s.to} to={s.to} className="category-card">
              <div className="category-card-head">
                <strong>{pickL10n(locale, s.title)}</strong>
              </div>
              <p>{pickL10n(locale, s.desc)}</p>
            </Link>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title={t('Features', '特性')}>
        <div className="category-grid">
          {FEATURES.map((f) => (
            <Card key={f.title.en} padded className="guide-card">
              <Heading level="card" as="h3">
                {pickL10n(locale, f.title)}
              </Heading>
              <Text variant="muted" size="md" as="p" style={{ marginTop: 6 }}>
                {pickL10n(locale, f.body)}
              </Text>
            </Card>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title={t('Component categories', '组件分类')}
        description={t(
          'Every component page includes an import snippet, usage guidance, example source, and an API reference.',
          '每个组件页都包含引入方式、使用场景、示例源码与 API。',
        )}
      >
        <div className="category-grid">
          {CATEGORIES.map((c) => {
            const entries = entriesOfCategory(c)
            return (
              <Link key={c.id} to={`/components#cat-${c.id}`} className="category-card">
                <div className="category-card-head">
                  <strong>{pickL10n(locale, c.label)}</strong>
                  <span>{entries.length}</span>
                </div>
                <p>{pickL10n(locale, c.description)}</p>
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

      <ShowcaseSection
        title={t('Popular page templates', '常用页面模板')}
        description={t('Full-page examples you can copy structure and validation from directly.', '整页示例，可直接对照复制结构与校验方式。')}
      >
        <div className="category-grid">
          {featured.map((tpl) => (
            <Link key={tpl.to} to={tpl.to} className="category-card">
              <div className="category-card-head">
                <strong>{pickL10n(locale, tpl.label)}</strong>
              </div>
              <p>{pickL10n(locale, tpl.desc)}</p>
            </Link>
          ))}
        </div>
        <p className="index-footnote muted">
          {t('See all ', '全部 ')}
          {ALL_TEMPLATES.length}
          {t(' templates in ', ' 个模板见 ')}
          <Link to="/templates" className="text-link">
            {t('Templates', '页面模板')}
          </Link>
          {' · '}
          {t('smaller compositions are in ', '局部组合见 ')}
          <Link to="/patterns" className="text-link">
            {t('Patterns', '组合模式')}
          </Link>
        </p>
      </ShowcaseSection>
    </div>
  )
}
