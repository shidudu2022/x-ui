import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { PageHeader } from './PageHeader'

/**
 * Narrow form/settings page — matches k3s-start/web `page page-narrow`
 * (max-width 760px, centered).
 */
export function FormPage({
  title,
  description,
  actions,
  children,
  className,
}: {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('page', 'page-narrow', 'active', className)}>
      <PageHeader title={title} description={description} actions={actions} />
      {children}
    </section>
  )
}
