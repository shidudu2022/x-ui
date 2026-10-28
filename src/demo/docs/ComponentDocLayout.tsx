import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check, X, Lightbulb, ArrowLeft, ArrowRight } from 'lucide-react'
import { CodeBlock, Text } from '@/components/ui'
import { useLocale } from '@/i18n'
import { categoryOfSlug } from '../catalog/categories'
import { entriesOfCategory, entrySummary, getCatalogEntry } from '../catalog/registry'
import { USAGE } from '../catalog/usage'
import type { L10n } from '../i18n/types'
import { pickL10n } from '../i18n/types'
import { useDemoMessages } from '../i18n/useDemoT'
import { ShowcaseSection } from '../ShowcaseSection'
import { DocPage } from './DocPage'
import { PropTable, type PropDef } from './PropTable'

export type ComponentMeta = {
  slug: string
  name: string
  summary: L10n
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
  const { locale } = useLocale()
  const dt = useDemoMessages()
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
  const categoryLabel = category ? pickL10n(locale, category.label) : undefined

  return (
    <DocPage
      className="component-doc"
      eyebrow={
        <>
          <Link to="/components">{dt('doc.components')}</Link>
          {category ? (
            <>
              <span className="doc-eyebrow-sep">/</span>
              <Link to={`/components#cat-${category.id}`}>{categoryLabel}</Link>
            </>
          ) : null}
        </>
      }
      title={meta.name}
      description={pickL10n(locale, meta.summary)}
    >
      <CodeBlock
        compact
        className="doc-import"
        language="tsx"
        title={dt('doc.import')}
        code={importSnippet(entry?.exports ?? [meta.name])}
      />

      {usage ? (
        <ShowcaseSection title={dt('doc.whenToUse')}>
          <div className="usage-grid">
            <UsageList
              icon={<Check size={14} />}
              tone="ok"
              title={dt('doc.suitableFor')}
              items={usage.when.map((v) => pickL10n(locale, v))}
            />
            {usage.avoid?.length ? (
              <UsageList
                icon={<X size={14} />}
                tone="no"
                title={dt('doc.avoidUseInstead')}
                items={usage.avoid.map((v) => pickL10n(locale, v))}
              />
            ) : null}
            {usage.tips?.length ? (
              <UsageList
                icon={<Lightbulb size={14} />}
                tone="tip"
                title={dt('doc.tips')}
                items={usage.tips.map((v) => pickL10n(locale, v))}
              />
            ) : null}
          </div>
        </ShowcaseSection>
      ) : null}

      {children}

      <ShowcaseSection title={dt('doc.api')} description={props.length ? dt('doc.apiDescription') : undefined}>
        {props.length ? (
          <PropTable props={props} />
        ) : (
          <Text variant="muted" size="md">
            {dt('doc.apiFallback')}
          </Text>
        )}
      </ShowcaseSection>

      {related.length ? (
        <ShowcaseSection title={dt('doc.related')}>
          <div className="related-grid">
            {related.map((r) => (
              <Link key={r.slug} to={`/components/${r.slug}`} className="component-index-link">
                <strong>{r.name}</strong>
                <span>{entrySummary(r, locale)}</span>
              </Link>
            ))}
          </div>
        </ShowcaseSection>
      ) : null}

      {prev || next ? (
        <nav className="doc-pager" aria-label={dt('doc.pagerNavLabel', { category: categoryLabel ?? dt('doc.components') })}>
          {prev ? (
            <Link to={`/components/${prev.slug}`} className="doc-pager-link">
              <span className="doc-pager-hint">
                <ArrowLeft size={12} /> {dt('doc.previous')}
              </span>
              <strong>{prev.name}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/components/${next.slug}`} className="doc-pager-link is-next">
              <span className="doc-pager-hint">
                {dt('doc.next')} <ArrowRight size={12} />
              </span>
              <strong>{next.name}</strong>
            </Link>
          ) : null}
        </nav>
      ) : null}
    </DocPage>
  )
}
