import { ChartContainer, PieChart, CHART_STATUS } from '@/components/charts'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('pie-chart')
const props: PropDef[] = [{ name: 'donut', type: 'boolean', desc: { en: "Radial", zh: "环形" } }]

export function PieChartDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Radial", "环形")} wide code={`<ChartContainer title="Distribution" height={280}>
  <PieChart
    donut
    data={[
      { name: 'Running', value: 58, color: CHART_STATUS.success },
      { name: 'Queued', value: 22, color: CHART_STATUS.info },
      { name: 'Failed', value: 12, color: CHART_STATUS.danger },
    ]}
  />
</ChartContainer>`}>
        <ChartContainer title={d("Distribution", "分布")} height={280}><PieChart donut data={[{ name: d("Running", "运行中"), value: 58, color: CHART_STATUS.success }, { name: d("Queued", "排队"), value: 22, color: CHART_STATUS.info }, { name: d("Failed", "失败"), value: 12, color: CHART_STATUS.danger }]} /></ChartContainer>
      </DocDemo>
      <DocDemo title={d("Solid", "实心")} wide code={`<ChartContainer title="Solid pie chart" height={280}>
  <PieChart
    data={[
      { name: 'Running', value: 58, color: CHART_STATUS.success },
      { name: 'Queued', value: 22, color: CHART_STATUS.info },
      { name: 'Failed', value: 12, color: CHART_STATUS.danger },
    ]}
  />
</ChartContainer>`}>
        <ChartContainer title={d("Solid pie chart", "实心饼图")} height={280}><PieChart data={[{ name: d("Running", "运行中"), value: 58, color: CHART_STATUS.success }, { name: d("Queued", "排队"), value: 22, color: CHART_STATUS.info }, { name: d("Failed", "失败"), value: 12, color: CHART_STATUS.danger }]} /></ChartContainer>
      </DocDemo>
    </ComponentDocLayout>
  )
}
