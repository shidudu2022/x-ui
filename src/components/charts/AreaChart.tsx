import {
  Area,
  AreaChart as ReAreaChart,
  CartesianGrid,
  Legend,
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

export type AreaSeries = {
  dataKey: string
  name?: string
  color?: string
}

export function AreaChart({
  data,
  xKey,
  series,
  showLegend = true,
}: {
  data: Record<string, string | number>[]
  xKey: string
  series: AreaSeries[]
  showLegend?: boolean
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReAreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid {...chartGridProps} />
        <XAxis dataKey={xKey} {...chartAxisProps} tickMargin={8} />
        <YAxis {...chartAxisProps} width={36} tickMargin={4} />
        <Tooltip content={<ChartTooltipContent />} />
        {showLegend ? (
          <Legend content={<ChartLegendContent />} wrapperStyle={chartLegendWrapperStyle} />
        ) : null}
        {series.map((s, i) => {
          const color = s.color ?? CHART_COLORS[i % CHART_COLORS.length]
          return (
            <Area
              key={s.dataKey}
              type="monotone"
              dataKey={s.dataKey}
              name={s.name ?? s.dataKey}
              stroke={color}
              fill={color}
              fillOpacity={0.16}
              strokeWidth={2.25}
            />
          )
        })}
      </ReAreaChart>
    </ResponsiveContainer>
  )
}
