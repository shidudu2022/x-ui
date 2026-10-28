import { useState, type ReactNode } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { Button } from './Button'
import { CopyButton } from './CopyButton'
import { Field } from './Field'
import { Mono } from './Text'

/** When hidden, keep the first half visible and mask the rest with bullets. */
export function maskSecret(value: string, visible: boolean, ratio = 0.5): string {
  if (!value) return ''
  if (visible) return value
  const r = Math.min(1, Math.max(0, ratio))
  const headLen = Math.ceil(value.length * r)
  return value.slice(0, headLen) + '•'.repeat(value.length - headLen)
}

/**
 * Read-only secret display: half-masked by default, reveal + copy actions.
 * For editable passwords use `Input type="password"`.
 */
export function MaskedSecretField({
  label,
  value,
  hint,
  disabled,
  extraActions,
  emptyText = '—',
  maskRatio = 0.5,
  className,
}: {
  label?: ReactNode
  value: string
  hint?: ReactNode
  disabled?: boolean
  extraActions?: ReactNode
  emptyText?: string
  /** Fraction of characters kept visible when masked (default 0.5). */
  maskRatio?: number
  className?: string
}) {
  const t = useT()
  const [visible, setVisible] = useState(false)
  const shown = value ? maskSecret(value, visible, maskRatio) : emptyText

  return (
    <Field label={label} hint={hint} className={cn('masked-secret-field', className)}>
      <div className="masked-secret-row">
        <Mono className="masked-secret-value" title={visible ? value : undefined}>
          {shown}
        </Mono>
        <div className="masked-secret-actions">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            iconOnly
            disabled={disabled || !value}
            aria-label={visible ? t('maskedSecret.hide') : t('maskedSecret.show')}
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? <EyeOff size={14} aria-hidden /> : <Eye size={14} aria-hidden />}
          </Button>
          <CopyButton value={value} disabled={disabled || !value} size="sm" variant="ghost" />
          {extraActions}
        </div>
      </div>
    </Field>
  )
}
