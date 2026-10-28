import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { copyToClipboard } from '@/lib/clipboard'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { Button, type ButtonSize, type ButtonVariant } from './Button'

export function CopyButton({
  value,
  label,
  copiedLabel,
  variant = 'ghost',
  size = 'sm',
  className,
  disabled,
  onCopied,
  onFailed,
}: {
  value: string
  label?: string
  copiedLabel?: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  disabled?: boolean
  onCopied?: () => void
  onFailed?: () => void
}) {
  const t = useT()
  const resolvedLabel = label ?? t('copy.label')
  const resolvedCopiedLabel = copiedLabel ?? t('copy.copied')
  const [ok, setOk] = useState(false)

  async function copy() {
    if (disabled) return
    const success = await copyToClipboard(value)
    if (success) {
      setOk(true)
      onCopied?.()
      window.setTimeout(() => setOk(false), 1500)
    } else {
      onFailed?.()
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      disabled={disabled}
      className={cn('copy-btn', className)}
      onClick={copy}
    >
      {ok ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
      <span className="copy-btn-label">{ok ? resolvedCopiedLabel : resolvedLabel}</span>
    </Button>
  )
}
