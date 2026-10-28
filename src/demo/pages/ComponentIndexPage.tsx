import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { EmptyState, PageHeader, SearchInput } from '@/components/ui'
import { CATEGORIES } from '@/demo/catalog/categories'
import { COMPONENT_CATALOG, entriesOfCategory } from '@/demo/catalog/registry'

export function ComponentIndexPage() {
  const { hash } = useLocation()
  const [q, setQ] = useState('')

  const sections = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return CATEGORIES.map((category) => {
      const all = entriesOfCategory(category)
      const items = needle
        ? all.filter(
            (c) =>
              c.name.toLowerCase().includes(needle) ||
              c.slug.includes(needle) ||
              c.summary.toLowerCase().includes(needle),
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
        title="全部组件"
        description={`${COMPONENT_CATALOG.length} 个组件，分 ${CATEGORIES.length} 类。每个组件页包含引入方式、使用场景、可交互示例（含源码）与 API。`}
      />

      <div style={{ maxWidth: 420 }}>
        <SearchInput
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onClear={() => setQ('')}
          placeholder="按名称或用途过滤，例如 表格 / modal"
          aria-label="过滤组件"
        />
      </div>

      {!q ? (
        <nav className="component-index-chips" aria-label="分类">
          {CATEGORIES.map((c) => (
            <a key={c.id} href={`#cat-${c.id}`} className="pill pill-action" style={{ textDecoration: 'none' }}>
              {c.label}
              <span style={{ opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>{c.slugs.length}</span>
            </a>
          ))}
        </nav>
      ) : null}

      {sections.length === 0 ? (
        <EmptyState title="没有匹配的组件" description="换个关键词试试，或清除过滤。" />
      ) : null}

      {sections.map(({ category, items, total }) => (
        <section key={category.id} id={`cat-${category.id}`} className="component-index-letter component-index-cat">
          <header className="component-index-cat-head">
            <h3>{category.label}</h3>
            <span>{q ? `${items.length} / ${total}` : total}</span>
          </header>
          <p>{category.description}</p>
          <div className="component-index-grid">
            {items.map((c) => (
              <Link key={c.slug} to={`/components/${c.slug}`} className="component-index-link">
                <strong>{c.name}</strong>
                <span title={c.summary}>{c.summary}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
