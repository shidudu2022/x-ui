import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check, X, Lightbulb, ArrowLeft, ArrowRight } from 'lucide-react'
import { CodeBlock, Text } from '@/components/ui'
import { categoryOfSlug } from '../catalog/categories'
import { entriesOfCategory, getCatalogEntry } from '../catalog/registry'
import { USAGE } from '../catalog/usage'
import { ShowcaseSection } from '../ShowcaseSection'
import { DocPage } from './DocPage'
import { PropTable, type PropDef } from './PropTable'

export type ComponentMeta = {
  slug: string
  name: string
  summary: string
  related?: string[]
}

function importSnippet(exports: string[]) {
  const line = `import { ${exports.join(', ')} } from '@shidudu2022/x-ui'`
  if (line.length <= 78) return line
  return `import {\n${exports.map((e) => `  ${e},`).join('\n')}\n} from '@shidudu2022/x-ui'`
}

function UsageList({
  icon,
  tone,
  title,
  items,
}: {
  icon: ReactNode
  tone: 'ok' | 'no' | 'tip'
  title: string
  items: string[]
}) {
  return (
    <div className={`usage-col usage-${tone}`}>
      <div className="usage-col-head">
        <span className="usage-col-icon">{icon}</span>
        {title}
      </div>
      <ul>
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  )
}

export function ComponentDocLayout({
  meta,
  props = [],
  children,
}: {
  meta: ComponentMeta
  props?: PropDef[]
  children: ReactNode
}) {
  const entry = getCatalogEntry(meta.slug)
  const category = categoryOfSlug(meta.slug)
  const siblings = category ? entriesOfCategory(category) : []
  const idx = siblings.findIndex((s) => s.slug === meta.slug)
  const prev = idx > 0 ? siblings[idx - 1] : undefined
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined
  const usage = USAGE[meta.slug]
  const related = (meta.related ?? [])
    .map((slug) => getCatalogEntry(slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))

  return (
    <DocPage
      className="component-doc"
      eyebrow={
        <>
          <Link to="/components">组件</Link>
          {category ? (
            <>
              <span className="doc-eyebrow-sep">/</span>
              <Link to={`/components#cat-${category.id}`}>{category.label}</Link>
            </>
          ) : null}
        </>
      }
      title={meta.name}
      description={meta.summary}
    >
      <CodeBlock
        compact
        className="doc-import"
        language="tsx"
        title="引入"
        code={importSnippet(entry?.exports ?? [meta.name])}
      />

      {usage ? (
        <ShowcaseSection title="何时使用">
          <div className="usage-grid">
            <UsageList icon={<Check size={14} />} tone="ok" title="适用场景" items={usage.when} />
            {usage.avoid?.length ? (
              <UsageList icon={<X size={14} />} tone="no" title="不适用 / 请换用" items={usage.avoid} />
            ) : null}
            {usage.tips?.length ? (
              <UsageList icon={<Lightbulb size={14} />} tone="tip" title="使用要点" items={usage.tips} />
            ) : null}
          </div>
        </ShowcaseSection>
      ) : null}

      {children}

      <ShowcaseSection title="API" description={props.length ? '常用属性；完整类型见包内导出的 .d.ts。' : undefined}>
        {props.length ? (
          <PropTable props={props} />
        ) : (
          <Text variant="muted" size="md">
            见包内类型导出；本页以交互示例为主。
          </Text>
        )}
      </ShowcaseSection>

      {related.length ? (
        <ShowcaseSection title="相关组件">
          <div className="related-grid">
            {related.map((r) => (
              <Link key={r.slug} to={`/components/${r.slug}`} className="component-index-link">
                <strong>{r.name}</strong>
                <span>{r.summary}</span>
              </Link>
            ))}
          </div>
        </ShowcaseSection>
      ) : null}

      {prev || next ? (
        <nav className="doc-pager" aria-label={`${category?.label ?? '组件'}内导航`}>
          {prev ? (
            <Link to={`/components/${prev.slug}`} className="doc-pager-link">
              <span className="doc-pager-hint">
                <ArrowLeft size={12} /> 上一个
              </span>
              <strong>{prev.name}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/components/${next.slug}`} className="doc-pager-link is-next">
              <span className="doc-pager-hint">
                下一个 <ArrowRight size={12} />
              </span>
              <strong>{next.name}</strong>
            </Link>
          ) : null}
        </nav>
      ) : null}
    </DocPage>
  )
}
