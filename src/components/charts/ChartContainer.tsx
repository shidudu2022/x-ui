import type { ReactNode } from 'react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'

export function ChartContainer({
  title,
  description,
  action,
  loading,
  empty,
  children,
  className,
  height = 280,
}: {
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
  loading?: boolean
  empty?: boolean
  children?: ReactNode
  className?: string
  height?: number
}) {
  const t = useT()
  return (
    <Card padded className={cn('chart-container', className)}>
      {title || description || action ? (
        <div className="chart-header">
          <div>
            {title ? <h3 className="chart-title">{title}</h3> : null}
            {description ? <p className="chart-desc">{description}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      {loading ? (
        <Skeleton style={{ height, width: '100%', borderRadius: 12 }} />
      ) : empty ? (
        <div className="chart-empty" style={{ minHeight: height }}>
          <EmptyState title={t('common.empty')} description={t('searchResult.empty')} />
        </div>
      ) : (
        <div style={{ width: '100%', height }}>{children}</div>
      )}
    </Card>
  )
}
