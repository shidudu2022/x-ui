import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Avatar({
  name,
  src,
  size = 'md',
  className,
}: {
  name?: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const initials = (name ?? '?')
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <span
      className={cn('avatar', size === 'sm' && 'avatar-sm', size === 'lg' && 'avatar-lg', className)}
      title={name}
    >
      {src ? <img src={src} alt={name ?? ''} /> : initials}
    </span>
  )
}

export function AvatarGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('avatar-group', className)}>{children}</div>
}
