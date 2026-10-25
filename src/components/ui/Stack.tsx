import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type StackGap = 'sm' | 'md' | 'lg'

export function Stack({
  gap = 'md',
  className,
  children,
}: {
  gap?: StackGap
  className?: string
  children: ReactNode
}) {
  return <div className={cn('stack', gap === 'sm' && 'stack-sm', gap === 'lg' && 'stack-lg', className)}>{children}</div>
}

export function FormGrid({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={cn('form-grid', className)}>{children}</div>
}

export function CatalogTile({
  label,
  description,
  href,
  className,
}: {
  label: ReactNode
  description?: ReactNode
  href: string
  className?: string
}) {
  return (
    <a className={cn('index-tile', className)} href={href}>
      <span className="index-tile-label">{label}</span>
      {description ? <span className="index-tile-desc">{description}</span> : null}
    </a>
  )
}

export function CatalogGroup({
  title,
  children,
  className,
}: {
  title: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('index-group', className)}>
      <div className="index-group-head">{title}</div>
      <div className="index-grid">{children}</div>
    </section>
  )
}
