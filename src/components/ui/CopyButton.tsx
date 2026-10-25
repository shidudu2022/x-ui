import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button, type ButtonSize, type ButtonVariant } from './Button'

export function CopyButton({
  value,
  label = '复制',
  copiedLabel = '已复制',
  variant = 'ghost',
  size = 'sm',
  className,
}: {
  value: string
  label?: string
  copiedLabel?: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}) {
  const [ok, setOk] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setOk(true)
      window.setTimeout(() => setOk(false), 1500)
    } catch {
      /* ignore */
    }
  }

  return (
    <Button type="button" variant={variant} size={size} className={cn(className)} onClick={copy}>
      {ok ? <Check size={14} /> : <Copy size={14} />}
      <span style={{ marginLeft: 6 }}>{ok ? copiedLabel : label}</span>
    </Button>
  )
}
