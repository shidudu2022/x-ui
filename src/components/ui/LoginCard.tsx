import type { FormEvent, ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Centered login card — matches `.login-screen` / `.login-card` */
export function LoginCard({
  brandMark = 'X',
  title = 'X-UI',
  subtitle = '管理员登录',
  hint,
  children,
  onSubmit,
  className,
  minHeight = 'calc(100vh - 120px)',
}: {
  brandMark?: ReactNode
  title?: ReactNode
  subtitle?: ReactNode
  hint?: ReactNode
  children: ReactNode
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
  className?: string
  minHeight?: string | number
}) {
  return (
    <div className={cn('login-screen', className)} style={{ minHeight, borderRadius: 12 }}>
      <div className="login-card">
        <div className="login-brand">
          <div className="brand-mark">{brandMark}</div>
          <div>
            <strong>{title}</strong>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
        </div>
        <form className="stack" onSubmit={onSubmit}>
          {children}
        </form>
        {hint ? <p className="login-hint muted">{hint}</p> : null}
      </div>
    </div>
  )
}
