import { useState, type ReactNode } from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { cn } from '@/lib/cn'

/** Prefer `danger`; `error` kept as alias for compatibility */
export type AlertTone = 'info' | 'success' | 'warn' | 'danger' | 'error'

const icons = {
  info: Info,
  success: CheckCircle2,
  warn: AlertTriangle,
  danger: AlertCircle,
  error: AlertCircle,
}

export function Alert({
  tone = 'info',
  title,
  children,
  dismissible,
  onDismiss,
  className,
}: {
  tone?: AlertTone
  title?: ReactNode
  children?: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}) {
  const [open, setOpen] = useState(true)
  if (!open) return null
  const resolved = tone === 'error' ? 'danger' : tone
  const Icon = icons[tone]

  function dismiss() {
    setOpen(false)
    onDismiss?.()
  }

  return (
    <div className={cn('alert', `alert-${resolved}`, className)} role="alert">
      <span className="alert-icon" aria-hidden>
        <Icon size={16} />
      </span>
      <div className="alert-body">
        {title ? <p className="alert-title">{title}</p> : null}
        {children ? <div className="alert-desc">{children}</div> : null}
      </div>
      {dismissible ? (
        <button type="button" className="alert-close" aria-label="关闭" onClick={dismiss}>
          <X size={14} />
        </button>
      ) : null}
    </div>
  )
}
