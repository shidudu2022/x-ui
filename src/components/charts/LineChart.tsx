import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  CHART_COLORS,
  chartAxisProps,
  chartGridProps,
  chartLegendWrapperStyle,
} from './ChartTheme'
import { ChartLegendContent } from './ChartLegend'
import { ChartTooltipContent } from './ChartTooltip'

export type LineSeries = {
  dataKey: string
  name?: string
  color?: string
  dashed?: boolean
}

export function LineChart({
  data,
  xKey,
  series,
  showLegend = true,
}: {
  data: Record<string, string | number>[]
  xKey: string
  series: LineSeries[]
  showLegend?: boolean
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReLineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid {...chartGridProps} />
        <XAxis dataKey={xKey} {...chartAxisProps} tickMargin={8} />
        <YAxis {...chartAxisProps} width={36} tickMargin={4} />
        <Tooltip content={<ChartTooltipContent />} />
        {showLegend ? (
          <Legend content={<ChartLegendContent />} wrapperStyle={chartLegendWrapperStyle} />
        ) : null}
        {series.map((s, i) => (
          <Line
            key={s.dataKey}
            type="monotone"
            dataKey={s.dataKey}
            name={s.name ?? s.dataKey}
            stroke={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
            strokeWidth={2.25}
            strokeDasharray={s.dashed ? '5 4' : undefined}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  )
}
