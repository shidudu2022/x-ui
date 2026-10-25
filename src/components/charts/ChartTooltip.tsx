import type { ReactNode } from 'react'

type PayloadItem = {
  name?: string
  value?: number | string
  color?: string
  dataKey?: string | number
}

export function ChartTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: PayloadItem[]
  label?: ReactNode
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      {label != null ? <div className="chart-tooltip-label">{label}</div> : null}
      {payload.map((item, i) => (
        <div key={i} className="chart-tooltip-row">
          <span className="chart-tooltip-swatch" style={{ background: item.color }} />
          <span>
            {item.name}: {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}
