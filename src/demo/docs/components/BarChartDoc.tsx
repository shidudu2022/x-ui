import { BarChart, ChartContainer, CHART_STATUS } from '@/components/charts'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('bar-chart')
const props: PropDef[] = []

export function BarChartDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} wide code={`<ChartContainer title="Service health">
  <BarChart
    data={[
      { name: 'API', ok: 120, fail: 8 },
      { name: 'Worker', ok: 90, fail: 12 },
    ]}
    xKey="name"
    series={[
      {
        dataKey: 'ok',
        name: 'Success',
        stackId: 'a',
        color: CHART_STATUS.success,
      },
      {
        dataKey: 'fail',
        name: 'Failed',
        stackId: 'a',
        color: CHART_STATUS.danger,
      },
    ]}
  />
</ChartContainer>`}>
        <ChartContainer title={d("Service health", "服务健康")}><BarChart data={[{ name: 'API', ok: 120, fail: 8 }, { name: 'Worker', ok: 90, fail: 12 }]} xKey="name" series={[{ dataKey: 'ok', name: d("Success", "成功"), stackId: 'a', color: CHART_STATUS.success }, { dataKey: 'fail', name: d("Failed", "失败"), stackId: 'a', color: CHART_STATUS.danger }]} /></ChartContainer>
      </DocDemo>
    </ComponentDocLayout>
  )
}
