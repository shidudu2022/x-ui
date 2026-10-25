import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Divider({
  label,
  vertical,
  className,
}: {
  label?: ReactNode
  vertical?: boolean
  className?: string
}) {
  if (vertical) {
    return <div className={cn('divider divider-vertical', className)} role="separator" aria-orientation="vertical" />
  }
  if (label) {
    return (
      <div className={cn('divider divider-labeled', className)} role="separator">
        <span>{label}</span>
      </div>
    )
  }
  return <hr className={cn('divider', className)} />
}
