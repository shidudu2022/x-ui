import type { ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'

export function MaintenanceBanner({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  const t = useT()
  const content = children ?? t('maintenance.default')
  return (
    <div className={cn('maintain-banner', className)} role="status">
      <AlertTriangle size={16} aria-hidden />
      <span>{content}</span>
    </div>
  )
}
