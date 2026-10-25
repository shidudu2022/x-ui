import type { ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/cn'

export function MaintenanceBanner({
  children = '系统维护中，部分功能暂不可用。',
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('maintain-banner', className)} role="status">
      <AlertTriangle size={16} aria-hidden />
      <span>{children}</span>
    </div>
  )
}
