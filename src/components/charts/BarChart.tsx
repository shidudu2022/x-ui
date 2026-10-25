import {
  Bar,
  BarChart as ReBarChart,
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

export type BarSeries = {
  dataKey: string
  name?: string
  color?: string
  stackId?: string
}

export function BarChart({
  data,
  xKey,
  series,
  showLegend = true,
  layout = 'vertical',
}: {
  data: Record<string, string | number>[]
  xKey: string
  series: BarSeries[]
  showLegend?: boolean
  /** vertical = category on X (default); horizontal = category on Y */
  layout?: 'vertical' | 'horizontal'
}) {
  const horizontal = layout === 'horizontal'
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReBarChart
        data={data}
        layout={horizontal ? 'vertical' : 'horizontal'}
        margin={{ top: 8, right: 8, left: horizontal ? 8 : 0, bottom: 0 }}
        barCategoryGap="28%"
      >
        <CartesianGrid {...chartGridProps} horizontal={!horizontal} vertical={horizontal} />
        {horizontal ? (
          <>
            <XAxis type="number" {...chartAxisProps} tickMargin={4} />
            <YAxis type="category" dataKey={xKey} {...chartAxisProps} width={56} tickMargin={4} />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} {...chartAxisProps} tickMargin={8} />
            <YAxis {...chartAxisProps} width={36} tickMargin={4} />
          </>
        )}
        <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'var(--hover)' }} />
        {showLegend ? (
          <Legend content={<ChartLegendContent />} wrapperStyle={chartLegendWrapperStyle} />
        ) : null}
        {series.map((s, i) => {
          const stackPeers = s.stackId ? series.filter((x) => x.stackId === s.stackId) : [s]
          const topOfStack = stackPeers[stackPeers.length - 1]?.dataKey === s.dataKey
          return (
            <Bar
              key={s.dataKey}
              dataKey={s.dataKey}
              name={s.name ?? s.dataKey}
              fill={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
              radius={
                horizontal
                  ? topOfStack
                    ? [0, 6, 6, 0]
                    : [0, 0, 0, 0]
                  : topOfStack
                    ? [6, 6, 0, 0]
                    : [0, 0, 0, 0]
              }
              stackId={s.stackId}
              maxBarSize={36}
            />
          )
        })}
      </ReBarChart>
    </ResponsiveContainer>
  )
}
