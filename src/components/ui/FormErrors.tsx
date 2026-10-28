import type { ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'

export function FormErrors({
  errors,
  title,
  className,
}: {
  errors: ReactNode[]
  title?: ReactNode
  className?: string
}) {
  const t = useT()
  const resolvedTitle = title ?? t('formErrors.title')
  const list = errors.filter(Boolean)
  if (!list.length) return null
  return (
    <div className={cn('form-errors', className)} role="alert">
      <div className="form-errors-title">
        <AlertCircle size={16} aria-hidden />
        <strong>{resolvedTitle}</strong>
      </div>
      <ul>
        {list.map((err, i) => (
          <li key={i}>{err}</li>
        ))}
      </ul>
    </div>
  )
}
