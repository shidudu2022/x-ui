import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'

export function NumberStepper({
  value,
  onChange,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  className,
}: {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
}) {
  const t = useT()
  function set(next: number) {
    onChange(Math.min(max, Math.max(min, next)))
  }

  return (
    <div className={cn('number-stepper', className)}>
      <button type="button" aria-label={t('numberStepper.dec')} disabled={value <= min} onClick={() => set(value - step)}>
        <Minus size={14} />
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => set(Number(e.target.value))}
      />
      <button type="button" aria-label={t('numberStepper.inc')} disabled={value >= max} onClick={() => set(value + step)}>
        <Plus size={14} />
      </button>
    </div>
  )
}
