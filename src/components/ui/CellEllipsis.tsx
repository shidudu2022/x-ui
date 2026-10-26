import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Tooltip } from './Tooltip'

function tipFrom(children: ReactNode, title?: string) {
  if (title != null && title !== '') return title
  if (typeof children === 'string' || typeof children === 'number') return String(children)
  return undefined
}

/** Single-line truncate for table cells; full text via tooltip when provided / inferred. */
export function CellEllipsis({
  children,
  title,
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode
  /** Tooltip text; defaults to string children */
  title?: string
}) {
  const tip = tipFrom(children, title)
  const el = (
    <span className={cn('cell-ellipsis', className)} {...rest}>
      {children}
    </span>
  )
  if (!tip || tip === '—' || tip === '-' || tip === '–') return el
  return (
    <Tooltip content={tip} className="cell-ellipsis-tip">
      {el}
    </Tooltip>
  )
}

/** Name + secondary line stack that keeps row height stable. */
export function CellStack({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  return (
    <div className={cn('cell-stack', className)} {...rest}>
      {children}
    </div>
  )
}
