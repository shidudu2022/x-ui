import type { ReactNode } from 'react'
import { AlertCircle, Inbox, WifiOff } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from './Button'
import { EmptyState } from './EmptyState'
import { Skeleton, SkeletonCard, SkeletonTable } from './Skeleton'
import { Spinner } from './Spinner'

export type ResourceStatus = 'idle' | 'loading' | 'empty' | 'error' | 'offline'

/** Unified empty / loading / error shell for list & card surfaces. */
export function ResourceState({
  status,
  loadingVariant = 'spinner',
  emptyTitle = '暂无数据',
  emptyDescription,
  emptyAction,
  errorTitle = '加载失败',
  errorDescription = '请稍后重试。',
  onRetry,
  offlineTitle = '网络不可用',
  offlineDescription = '检查连接后重试。',
  children,
  className,
}: {
  status: ResourceStatus
  loadingVariant?: 'spinner' | 'skeleton' | 'table' | 'card'
  emptyTitle?: ReactNode
  emptyDescription?: ReactNode
  emptyAction?: ReactNode
  errorTitle?: ReactNode
  errorDescription?: ReactNode
  onRetry?: () => void
  offlineTitle?: ReactNode
  offlineDescription?: ReactNode
  children?: ReactNode
  className?: string
}) {
  if (status === 'idle' || status === 'loading') {
    if (status === 'idle') return children ? <>{children}</> : null
    return (
      <div className={cn('resource-state is-loading', className)}>
        {loadingVariant === 'table' ? (
          <SkeletonTable rows={5} />
        ) : loadingVariant === 'card' ? (
          <SkeletonCard />
        ) : loadingVariant === 'skeleton' ? (
          <Skeleton style={{ height: 120 }} />
        ) : (
          <div className="resource-state-spinner">
            <Spinner />
          </div>
        )}
      </div>
    )
  }

  if (status === 'empty') {
    return (
      <EmptyState
        className={cn('resource-state', className)}
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    )
  }

  const isOffline = status === 'offline'
  const Icon = isOffline ? WifiOff : AlertCircle
  return (
    <EmptyState
      className={cn('resource-state', className)}
      title={
        <span className="resource-state-title">
          <Icon size={18} aria-hidden />
          {isOffline ? offlineTitle : errorTitle}
        </span>
      }
      description={isOffline ? offlineDescription : errorDescription}
      action={
        onRetry ? (
          <Button size="sm" variant="secondary" onClick={onRetry}>
            重试
          </Button>
        ) : undefined
      }
    />
  )
}

export function ResourceEmptyIcon() {
  return <Inbox size={18} aria-hidden />
}
