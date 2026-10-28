import { AreaChart, ChartContainer, CHART_STATUS } from '@/components/charts'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('area-chart')
const props: PropDef[] = []

export function AreaChartDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" wide code={`<ChartContainer title="面积图">
  <AreaChart
    data={[
      { month: 'Jan', requests: 400 },
      { month: 'Feb', requests: 520 },
      { month: 'Mar', requests: 480 },
    ]}
    xKey="month"
    series={[
      {
        dataKey: 'requests',
        name: '请求',
        color: CHART_STATUS.primary,
      },
    ]}
  />
</ChartContainer>`}>
        <ChartContainer title="面积图"><AreaChart data={[{ month: 'Jan', requests: 400 }, { month: 'Feb', requests: 520 }, { month: 'Mar', requests: 480 }]} xKey="month" series={[{ dataKey: 'requests', name: '请求', color: CHART_STATUS.primary }]} /></ChartContainer>
      </DocDemo>
    </ComponentDocLayout>
  )
}
