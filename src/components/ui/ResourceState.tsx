import type { ReactNode } from 'react'
import { AlertCircle, Inbox, WifiOff } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { Button } from './Button'
import { EmptyState } from './EmptyState'
import { Skeleton, SkeletonCard, SkeletonTable } from './Skeleton'
import { Spinner } from './Spinner'

export type ResourceStatus = 'idle' | 'loading' | 'empty' | 'error' | 'offline'

/** Unified empty / loading / error shell for list & card surfaces. */
export function ResourceState({
  status,
  loadingVariant = 'spinner',
  emptyTitle,
  emptyDescription,
  emptyAction,
  errorTitle,
  errorDescription,
  onRetry,
  offlineTitle,
  offlineDescription,
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
  const t = useT()
  const resolvedEmptyTitle = emptyTitle ?? t('resourceState.emptyTitle')
  const resolvedErrorTitle = errorTitle ?? t('resourceState.errorTitle')
  const resolvedErrorDescription = errorDescription ?? t('resourceState.errorDescription')
  const resolvedOfflineTitle = offlineTitle ?? t('resourceState.offlineTitle')
  const resolvedOfflineDescription = offlineDescription ?? t('resourceState.offlineDescription')
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
        title={resolvedEmptyTitle}
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
          {isOffline ? resolvedOfflineTitle : resolvedErrorTitle}
        </span>
      }
      description={isOffline ? resolvedOfflineDescription : resolvedErrorDescription}
      action={
        onRetry ? (
          <Button size="sm" variant="secondary" onClick={onRetry}>
            {t('resourceState.retry')}
          </Button>
        ) : undefined
      }
    />
  )
}

export function ResourceEmptyIcon() {
  return <Inbox size={18} aria-hidden />
}
