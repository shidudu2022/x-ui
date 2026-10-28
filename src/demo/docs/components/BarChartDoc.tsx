import { BarChart, ChartContainer, CHART_STATUS } from '@/components/charts'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('bar-chart')
const props: PropDef[] = []

export function BarChartDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" wide code={`<ChartContainer title="服务健康">
  <BarChart
    data={[
      { name: 'API', ok: 120, fail: 8 },
      { name: 'Worker', ok: 90, fail: 12 },
    ]}
    xKey="name"
    series={[
      {
        dataKey: 'ok',
        name: '成功',
        stackId: 'a',
        color: CHART_STATUS.success,
      },
      {
        dataKey: 'fail',
        name: '失败',
        stackId: 'a',
        color: CHART_STATUS.danger,
      },
    ]}
  />
</ChartContainer>`}>
        <ChartContainer title="服务健康"><BarChart data={[{ name: 'API', ok: 120, fail: 8 }, { name: 'Worker', ok: 90, fail: 12 }]} xKey="name" series={[{ dataKey: 'ok', name: '成功', stackId: 'a', color: CHART_STATUS.success }, { dataKey: 'fail', name: '失败', stackId: 'a', color: CHART_STATUS.danger }]} /></ChartContainer>
      </DocDemo>
    </ComponentDocLayout>
  )
}
