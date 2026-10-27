import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Badge } from './Badge'

export function ChoiceCardGrid({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('choice-card-grid', className)} role="list">
      {children}
    </div>
  )
}

/**
 * Large path / method picker card (import, create, onboarding).
 * Prefer over CatalogTile when the choice itself is the page’s main action.
 *
 * `recommended` adds a Badge only — card chrome stays equal so it does not
 * look pre-selected.
 */
export function ChoiceCard({
  title,
  description,
  meta,
  icon,
  recommended,
  recommendedLabel = 'Recommended',
  onClick,
  className,
  disabled,
}: {
  title: ReactNode
  description?: ReactNode
  meta?: ReactNode
  icon?: ReactNode
  /** Badge hint only; does not change border/fill (avoids looking selected). */
  recommended?: boolean
  recommendedLabel?: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="listitem"
      className={cn('choice-card', className)}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="choice-card-top">
        {icon ? (
          <span className="choice-card-icon" aria-hidden>
            {icon}
          </span>
        ) : (
          <span />
        )}
        {recommended ? (
          <Badge tone="info" className="choice-card-badge">
            {recommendedLabel}
          </Badge>
        ) : null}
      </span>
      <span className="choice-card-copy">
        <span className="choice-card-title">{title}</span>
        {description ? <span className="choice-card-desc">{description}</span> : null}
        {meta ? <span className="choice-card-meta">{meta}</span> : null}
      </span>
    </button>
  )
}
