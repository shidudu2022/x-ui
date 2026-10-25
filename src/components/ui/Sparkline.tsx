import { cn } from '@/lib/cn'
import { Metric } from './Metric'

export function Sparkline({
  data,
  color = 'var(--primary)',
  className,
  height = 28,
}: {
  data: number[]
  color?: string
  className?: string
  height?: number
}) {
  const w = 80
  const h = height
  const min = Math.min(...data, 0)
  const max = Math.max(...data, 1)
  const span = max - min || 1
  const pts = data
    .map((v, i) => {
      const x = data.length <= 1 ? 0 : (i / (data.length - 1)) * w
      const y = h - ((v - min) / span) * (h - 4) - 2
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg
      className={cn('sparkline', className)}
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden
    >
      <polyline fill="none" stroke={color} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" points={pts} />
    </svg>
  )
}

export function Stat({
  label,
  value,
  delta,
  data,
  className,
}: {
  label: string
  value: string | number
  delta?: string
  data?: number[]
  className?: string
}) {
  return (
    <div className={cn('stat', className)}>
      <Metric label={label} value={value} />
      <div className="stat-foot">
        {delta ? <span className="stat-delta muted">{delta}</span> : <span />}
        {data?.length ? <Sparkline data={data} /> : null}
      </div>
    </div>
  )
}
