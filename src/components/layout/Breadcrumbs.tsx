import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'

/** Parent segment — matches k3s-start/web AppShell crumb shape */
export type BreadcrumbParent = {
  label: ReactNode
  to: string
  icon?: ReactNode
}

/**
 * Topbar breadcrumb aligned with k3s-start/web:
 * - Root page: icon + current title
 * - Nested: parent (button + icon) › current
 */
export function Breadcrumbs({
  current,
  currentIcon,
  parent,
  className,
}: {
  current: ReactNode
  currentIcon?: ReactNode
  parent?: BreadcrumbParent | null
  className?: string
}) {
  const t = useT()
  const navigate = useNavigate()

  if (parent) {
    return (
      <nav className={cn('breadcrumbs', className)} aria-label={t('breadcrumbs.aria')}>
        <button
          type="button"
          className="crumb-link"
          onClick={() => navigate(parent.to)}
        >
          {parent.icon ? (
            <span className="crumb-icon" aria-hidden>
              {parent.icon}
            </span>
          ) : null}
          {parent.label}
        </button>
        <span className="crumb-sep" aria-hidden="true">
          <ChevronRight size={14} strokeWidth={2} />
        </span>
        <span className="crumb-current">{current}</span>
      </nav>
    )
  }

  return (
    <nav className={cn('breadcrumbs', className)} aria-label={t('breadcrumbs.aria')}>
      <span className="crumb-current">
        {currentIcon ? (
          <span className="crumb-icon" aria-hidden>
            {currentIcon}
          </span>
        ) : null}
        {current}
      </span>
    </nav>
  )
}

/** @deprecated Prefer `BreadcrumbParent` + `current` / `parent` props */
export type Crumb = {
  label: ReactNode
  to?: string
  icon?: ReactNode
}
