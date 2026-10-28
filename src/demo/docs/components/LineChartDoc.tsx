import { ChartContainer, LineChart, CHART_STATUS } from '@/components/charts'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('line-chart')
const props: PropDef[] = [{ name: 'data', type: 'object[]', desc: '数据' }, { name: 'series', type: 'LineSeries[]', desc: '系列' }]

export function LineChartDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" wide code={`<ChartContainer title="请求量">
  <LineChart
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
        <ChartContainer title="请求量"><LineChart data={[{ month: 'Jan', requests: 400 }, { month: 'Feb', requests: 520 }, { month: 'Mar', requests: 480 }]} xKey="month" series={[{ dataKey: 'requests', name: '请求', color: CHART_STATUS.primary }]} /></ChartContainer>
      </DocDemo>
    </ComponentDocLayout>
  )
}
