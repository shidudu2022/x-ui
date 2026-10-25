import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

const DEFAULT_SIZE = 16
const DEFAULT_STROKE = 1.75

/** Unified sidebar / crumb icon — consistent optical size */
export function NavIcon({
  icon: Icon,
  size = DEFAULT_SIZE,
  strokeWidth = DEFAULT_STROKE,
  className,
}: {
  icon: LucideIcon
  size?: number
  strokeWidth?: number
  className?: string
}) {
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={cn('nav-icon-svg', className)}
      aria-hidden
    />
  )
}
