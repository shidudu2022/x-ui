import type { FormEvent, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'

/** Centered login card — matches `.login-screen` / `.login-card` */
export function LoginCard({
  brandMark = 'X',
  title = 'X-UI',
  subtitle,
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
  const t = useT()
  const resolvedSubtitle = subtitle ?? t('login.title')
  return (
    <div className={cn('login-screen', className)} style={{ minHeight, borderRadius: 12 }}>
      <div className="login-card">
        <div className="login-brand">
          <div className="brand-mark">{brandMark}</div>
          <div>
            <strong>{title}</strong>
            {resolvedSubtitle ? <p>{resolvedSubtitle}</p> : null}
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
