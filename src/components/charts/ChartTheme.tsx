export const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--chart-6)',
] as const

/** Semantic status colors for dashboards */
export const CHART_STATUS = {
  success: 'var(--chart-success)',
  warn: 'var(--chart-warn)',
  danger: 'var(--chart-danger)',
  info: 'var(--chart-2)',
  neutral: 'var(--chart-6)',
  primary: 'var(--chart-1)',
} as const

export const chartAxisProps = {
  stroke: 'var(--chart-axis)',
  tick: { fill: 'var(--chart-muted)', fontSize: 12 },
  axisLine: { stroke: 'var(--chart-grid)' },
  tickLine: false,
} as const

export const chartGridProps = {
  stroke: 'var(--chart-grid)',
  strokeDasharray: '4 4',
  vertical: false,
} as const

export const chartLegendWrapperStyle = {
  paddingTop: 12,
} as const

