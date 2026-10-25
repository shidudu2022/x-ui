import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { PageHeader } from './PageHeader'

/**
 * Full-width list page — matches k3s-start/web list screens
 * (`page` without `page-narrow`; table stretches with content).
 */
export function ListPage({
  title,
  description,
  actions,
  toolbar,
  children,
  className,
}: {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  /** Optional filter / search bar under the header */
  toolbar?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('page', 'active', className)}>
      <PageHeader title={title} description={description} actions={actions} />
      {toolbar}
      {children}
    </section>
  )
}
