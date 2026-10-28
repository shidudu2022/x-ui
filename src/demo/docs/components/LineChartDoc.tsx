import { ChartContainer, LineChart, CHART_STATUS } from '@/components/charts'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('line-chart')
const props: PropDef[] = [{ name: 'data', type: 'object[]', desc: { en: "Data", zh: "数据" } }, { name: 'series', type: 'LineSeries[]', desc: { en: "Series", zh: "系列" } }]

export function LineChartDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} wide code={`<ChartContainer title="Request volume">
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
        name: 'Requests',
        color: CHART_STATUS.primary,
      },
    ]}
  />
</ChartContainer>`}>
        <ChartContainer title={d("Request volume", "请求量")}><LineChart data={[{ month: 'Jan', requests: 400 }, { month: 'Feb', requests: 520 }, { month: 'Mar', requests: 480 }]} xKey="month" series={[{ dataKey: 'requests', name: d("Requests", "请求"), color: CHART_STATUS.primary }]} /></ChartContainer>
      </DocDemo>
    </ComponentDocLayout>
  )
}
