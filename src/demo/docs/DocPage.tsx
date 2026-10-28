import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { PageHeader } from '@/components/ui'
import { useLocale } from '@/i18n'
import { cn } from '@/lib/cn'
import { useDemoMessages } from '../i18n/useDemoT'

type TocItem = { id: string; label: string }

/** Scan `.showcase-section > h2` inside the page and keep the active one in sync with scroll. */
function useToc(rootRef: React.RefObject<HTMLElement | null>, routeKey: string, locale: string) {
  const [items, setItems] = useState<TocItem[]>([])
  const [active, setActive] = useState('')

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    // Defer one frame so locale-switched headings have committed.
    const raf = requestAnimationFrame(() => {
      const heads = Array.from(root.querySelectorAll<HTMLElement>('.showcase-section > h2'))
      const next = heads.map((el, i) => {
        const id = `sec-${i + 1}`
        el.id = id
        return { id, label: el.textContent ?? '' }
      })
      setItems(next)
      setActive((prev) => (next.some((n) => n.id === prev) ? prev : (next[0]?.id ?? '')))
    })
    return () => cancelAnimationFrame(raf)
  }, [rootRef, routeKey, locale])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const heads = Array.from(root.querySelectorAll<HTMLElement>('.showcase-section > h2'))
    if (!heads.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-72px 0px -70% 0px', threshold: 0 },
    )
    heads.forEach((h) => io.observe(h))
    return () => io.disconnect()
  }, [rootRef, routeKey, locale, items])

  return { items, active, setActive }
}

/**
 * Documentation page frame: eyebrow + PageHeader, content, and a sticky
 * "On this page" built from the section headings.
 */
export function DocPage({
  eyebrow,
  title,
  description,
  actions,
  toc = true,
  className,
  children,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  toc?: boolean
  className?: string
  children: ReactNode
}) {
  const { pathname } = useLocation()
  const { locale } = useLocale()
  const mainRef = useRef<HTMLDivElement>(null)
  const { items, active, setActive } = useToc(mainRef, pathname, locale)
  const showToc = toc && items.length > 1
  const dt = useDemoMessages()

  return (
    <div className={cn('doc-page', showToc && 'has-toc', className)}>
      <div className="doc-page-main" ref={mainRef}>
        {eyebrow ? <div className="doc-eyebrow">{eyebrow}</div> : null}
        <PageHeader title={title} description={description} actions={actions} />
        {children}
      </div>
      {showToc ? (
        <nav className="doc-toc" aria-label={dt('doc.toc')}>
          <div className="doc-toc-title">{dt('doc.toc')}</div>
          <ul>
            {items.map((it) => (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  className={cn(active === it.id && 'is-active')}
                  onClick={(e) => {
                    e.preventDefault()
                    document
                      .getElementById(it.id)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    setActive(it.id)
                  }}
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  )
}
