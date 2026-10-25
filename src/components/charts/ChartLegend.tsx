import type { CSSProperties } from 'react'

type LegendPayload = {
  value?: string
  color?: string
  dataKey?: string | number
}

/** Compact round legend markers — clearer than default Recharts squares */
export function ChartLegendContent({
  payload,
}: {
  payload?: readonly LegendPayload[]
}) {
  if (!payload?.length) return null
  return (
    <ul className="chart-legend">
      {payload.map((entry, i) => (
        <li key={`${entry.dataKey ?? entry.value}-${i}`} className="chart-legend-item">
          <span className="chart-legend-swatch" style={{ background: entry.color } as CSSProperties} />
          <span className="chart-legend-label">{entry.value}</span>
        </li>
      ))}
    </ul>
  )
}
