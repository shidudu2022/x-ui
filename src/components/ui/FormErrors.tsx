import type { ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/cn'

export function FormErrors({
  errors,
  title = '请修正以下问题',
  className,
}: {
  errors: ReactNode[]
  title?: ReactNode
  className?: string
}) {
  const list = errors.filter(Boolean)
  if (!list.length) return null
  return (
    <div className={cn('form-errors', className)} role="alert">
      <div className="form-errors-title">
        <AlertCircle size={16} aria-hidden />
        <strong>{title}</strong>
      </div>
      <ul>
        {list.map((err, i) => (
          <li key={i}>{err}</li>
        ))}
      </ul>
    </div>
  )
}
