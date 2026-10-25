import { Cell, Legend, Pie, PieChart as RePieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CHART_COLORS, chartLegendWrapperStyle } from './ChartTheme'
import { ChartLegendContent } from './ChartLegend'
import { ChartTooltipContent } from './ChartTooltip'

export type PieDatum = {
  name: string
  value: number
  color?: string
}

export function PieChart({
  data,
  donut = false,
  showLegend = true,
}: {
  data: PieDatum[]
  donut?: boolean
  showLegend?: boolean
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RePieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="46%"
          innerRadius={donut ? '62%' : 0}
          outerRadius="78%"
          paddingAngle={3}
          stroke="var(--surface)"
          strokeWidth={2}
        >
          {data.map((entry, i) => (
            <Cell key={entry.name} fill={entry.color ?? CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltipContent />} />
        {showLegend ? (
          <Legend content={<ChartLegendContent />} wrapperStyle={chartLegendWrapperStyle} />
        ) : null}
      </RePieChart>
    </ResponsiveContainer>
  )
}
