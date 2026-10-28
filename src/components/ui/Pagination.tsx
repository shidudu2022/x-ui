import { cn } from '@/lib/cn'
import { useT } from '@/i18n'

function pageWindow(current: number, total: number): Array<number | '…'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current, current - 1, current + 1])
  if (current <= 3) [2, 3, 4].forEach((p) => pages.add(p))
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((p) => pages.add(p))
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const out: Array<number | '…'> = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i]! - sorted[i - 1]! > 1) out.push('…')
    out.push(sorted[i]!)
  }
  return out
}

export function Pagination({
  page,
  pageCount,
  onChange,
  className,
}: {
  page: number
  pageCount: number
  onChange: (page: number) => void
  className?: string
}) {
  const t = useT()
  const items = pageWindow(page, Math.max(1, pageCount))
  return (
    <nav className={cn('pagination', className)} aria-label={t('pagination.nav')}>
      <button
        type="button"
        className="pagination-btn"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label={t('pagination.prev')}
      >
        ‹
      </button>
      {items.map((item, idx) =>
        item === '…' ? (
          <span key={`e-${idx}`} className="pagination-ellipsis">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={cn('pagination-btn', item === page && 'active')}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        className="pagination-btn"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
        aria-label={t('pagination.next')}
      >
        ›
      </button>
    </nav>
  )
}
