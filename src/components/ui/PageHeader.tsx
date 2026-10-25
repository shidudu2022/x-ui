import type { ReactNode } from 'react'
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button, type ButtonVariant } from './Button'
import { DropdownMenu, type DropdownItem } from './DropdownMenu'

export type PageHeaderActionItem = {
  id: string
  label: ReactNode
  variant?: ButtonVariant
  disabled?: boolean
  /** Hide entirely */
  hidden?: boolean
  /**
   * When true, render inside the overflow menu instead of as a visible button.
   * Prefer keeping primary / danger actions visible.
   */
  overflow?: boolean
  onClick?: () => void
}

export function PageHeader({
  title,
  description,
  actions,
  actionItems,
  overflowActions,
  overflowLabel = '更多',
  overflowIconOnly = false,
  className,
}: {
  title: ReactNode
  description?: ReactNode
  /** Free-form visible actions (legacy / custom controls like ToggleButton) */
  actions?: ReactNode
  /**
   * Declarative actions — set `overflow` on items that should collapse into the menu.
   * Rendered after `actions`.
   */
  actionItems?: PageHeaderActionItem[]
  /** Extra menu-only items (merged after overflow actionItems) */
  overflowActions?: DropdownItem[]
  /** Label on the overflow trigger when not icon-only */
  overflowLabel?: ReactNode
  /** Use “⋯” icon button instead of labeled “更多” */
  overflowIconOnly?: boolean
  className?: string
}) {
  const visibleItems = (actionItems ?? []).filter((a) => !a.hidden && !a.overflow)
  const overflowFromItems: DropdownItem[] = (actionItems ?? [])
    .filter((a) => !a.hidden && a.overflow)
    .map((a) => ({
      id: a.id,
      label: a.label,
      disabled: a.disabled,
      danger: a.variant === 'danger',
      onSelect: a.onClick,
    }))
  const menuItems = [...overflowFromItems, ...(overflowActions ?? [])]
  const hasActions = Boolean(actions) || visibleItems.length > 0 || menuItems.length > 0

  return (
    <div className={cn('page-header', className)}>
      <div className="page-header-copy">
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      {hasActions ? (
        <div className="actions page-header-actions">
          {actions}
          {visibleItems.map((item) => (
            <Button
              key={item.id}
              variant={item.variant ?? 'secondary'}
              disabled={item.disabled}
              onClick={item.onClick}
            >
              {item.label}
            </Button>
          ))}
          {menuItems.length ? (
            <DropdownMenu
              align="end"
              trigger={
                overflowIconOnly ? (
                  <Button variant="ghost" iconOnly aria-label={String(overflowLabel)}>
                    <MoreHorizontal size={18} />
                  </Button>
                ) : (
                  <Button variant="secondary" aria-haspopup="menu">
                    {overflowLabel}
                    <ChevronDown size={16} aria-hidden />
                  </Button>
                )
              }
              items={menuItems}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
