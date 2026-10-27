import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { copyToClipboard } from '@/lib/clipboard'
import { cn } from '@/lib/cn'
import { Button, type ButtonSize, type ButtonVariant } from './Button'

export function CopyButton({
  value,
  label = '复制',
  copiedLabel = '已复制',
  variant = 'ghost',
  size = 'sm',
  className,
  onCopied,
  onFailed,
}: {
  value: string
  label?: string
  copiedLabel?: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  onCopied?: () => void
  onFailed?: () => void
}) {
  const [ok, setOk] = useState(false)

  async function copy() {
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
      className={cn('copy-btn', className)}
      onClick={copy}
    >
      {ok ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
      <span className="copy-btn-label">{ok ? copiedLabel : label}</span>
    </Button>
  )
}
