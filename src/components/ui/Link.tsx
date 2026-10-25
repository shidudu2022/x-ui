import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ExternalLink } from 'lucide-react'
import { withBase } from '@/lib/baseUrl'
import { cn } from '@/lib/cn'

export function TextLink({
  href,
  children,
  external,
  muted,
  className,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode
  external?: boolean
  muted?: boolean
}) {
  const isExt = external ?? Boolean(href && /^https?:\/\//i.test(href))
  const resolved = href && !isExt ? withBase(href) : href
  return (
    <a
      href={resolved}
      className={cn('text-link', muted && 'is-muted', className)}
      {...(isExt ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
      {isExt ? (
        <ExternalLink size={12} className="text-link-icon" aria-hidden />
      ) : null}
    </a>
  )
}
