import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

export type BreadcrumbNavItem = {
  label: ReactNode
  to?: string
  icon?: ReactNode
}

/** Composable multi-segment breadcrumb (vs shell-oriented Breadcrumbs). */
export function BreadcrumbNav({
  items,
  className,
}: {
  items: BreadcrumbNavItem[]
  className?: string
}) {
  return (
    <nav className={cn('breadcrumbs breadcrumb-nav', className)} aria-label="面包屑">
      {items.map((item, i) => {
        const last = i === items.length - 1
        return (
          <span key={i} className="breadcrumb-nav-seg">
            {i > 0 ? (
              <span className="crumb-sep" aria-hidden>
                <ChevronRight size={14} strokeWidth={2} />
              </span>
            ) : null}
            {last || !item.to ? (
              <span className="crumb-current">
                {item.icon ? <span className="crumb-icon">{item.icon}</span> : null}
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="crumb-link">
                {item.icon ? <span className="crumb-icon">{item.icon}</span> : null}
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
