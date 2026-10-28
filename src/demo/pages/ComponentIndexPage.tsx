import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { EmptyState, PageHeader, SearchInput } from '@/components/ui'
import { useLocale } from '@/i18n'
import { CATEGORIES } from '@/demo/catalog/categories'
import { COMPONENT_CATALOG, entriesOfCategory, entrySummary } from '@/demo/catalog/registry'
import { pickL10n } from '@/demo/i18n/types'
import { useDemoMessages } from '@/demo/i18n/useDemoT'

export function ComponentIndexPage() {
  const { hash } = useLocation()
  const [q, setQ] = useState('')
  const { locale } = useLocale()
  const dt = useDemoMessages()

  const sections = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return CATEGORIES.map((category) => {
      const all = entriesOfCategory(category)
      const items = needle
        ? all.filter(
            (c) =>
              c.name.toLowerCase().includes(needle) ||
              c.slug.includes(needle) ||
              c.summary.en.toLowerCase().includes(needle) ||
              c.summary.zh.toLowerCase().includes(needle),
          )
        : all
      return { category, items, total: all.length }
    }).filter((s) => s.items.length > 0)
  }, [q])

  useEffect(() => {
    if (!hash) return
    document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' })
  }, [hash])

  return (
    <div className="component-index">
      <PageHeader
        title={dt('page.allComponents')}
        description={
          locale === 'zh'
            ? `${COMPONENT_CATALOG.length} 个组件，分 ${CATEGORIES.length} 类。每个组件页包含引入方式、使用场景、可交互示例（含源码）与 API。`
            : `${COMPONENT_CATALOG.length} components in ${CATEGORIES.length} categories. Each component page includes an import snippet, usage guidance, interactive examples (with source), and an API reference.`
        }
      />

      <div style={{ maxWidth: 420 }}>
        <SearchInput
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onClear={() => setQ('')}
          placeholder={dt('componentIndex.filterPlaceholder')}
          aria-label={dt('componentIndex.filterAriaLabel')}
        />
      </div>

      {!q ? (
        <nav className="component-index-chips" aria-label={dt('componentIndex.categories')}>
          {CATEGORIES.map((c) => (
            <a key={c.id} href={`#cat-${c.id}`} className="pill pill-action" style={{ textDecoration: 'none' }}>
              {pickL10n(locale, c.label)}
              <span style={{ opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>{c.slugs.length}</span>
            </a>
          ))}
        </nav>
      ) : null}

      {sections.length === 0 ? (
        <EmptyState title={dt('componentIndex.emptyTitle')} description={dt('componentIndex.emptyDesc')} />
      ) : null}

      {sections.map(({ category, items, total }) => (
        <section key={category.id} id={`cat-${category.id}`} className="component-index-letter component-index-cat">
          <header className="component-index-cat-head">
            <h3>{pickL10n(locale, category.label)}</h3>
            <span>{q ? `${items.length} / ${total}` : total}</span>
          </header>
          <p>{pickL10n(locale, category.description)}</p>
          <div className="component-index-grid">
            {items.map((c) => (
              <Link key={c.slug} to={`/components/${c.slug}`} className="component-index-link">
                <strong>{c.name}</strong>
                <span title={entrySummary(c, locale)}>{entrySummary(c, locale)}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
