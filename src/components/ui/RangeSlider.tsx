import { cn } from '@/lib/cn'

export function RangeSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  className,
}: {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  className?: string
}) {
  return (
    <div className={cn('range-field field', className)}>
      {label ? (
        <label>
          {label}
          <span className="muted" style={{ marginLeft: 8 }}>
            {value}
          </span>
        </label>
      ) : null}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}
