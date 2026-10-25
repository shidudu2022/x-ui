import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts'
import { CHART_STATUS } from './ChartTheme'

export function RadialProgress({
  value,
  label = '完成度',
  color = CHART_STATUS.primary,
}: {
  value: number
  label?: string
  color?: string
}) {
  const pct = Math.max(0, Math.min(100, value))
  const data = [{ name: label, value: pct, fill: color }]

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="72%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
          barSize={14}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar background={{ fill: 'var(--surface-3)' }} dataKey="value" cornerRadius={8} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 650, letterSpacing: '-0.03em' }}>{pct}%</div>
          <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>
            {label}
          </div>
        </div>
      </div>
    </div>
  )
}
