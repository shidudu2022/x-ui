import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Sidebar brand — left mark + right product name (k3s-start layout) */
export function Brand({
  mark = 'X',
  text = 'X-UI',
  showText = true,
  className,
}: {
  mark?: ReactNode
  text?: ReactNode
  showText?: boolean
  className?: string
}) {
  return (
    <div className={cn('brand', className)}>
      <div className="brand-mark">{mark}</div>
      {showText && text ? (
        <div className="brand-text">
          <strong>{text}</strong>
        </div>
      ) : null}
    </div>
  )
}
