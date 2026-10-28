import { ChartContainer, PieChart, CHART_STATUS } from '@/components/charts'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('pie-chart')
const props: PropDef[] = [{ name: 'donut', type: 'boolean', desc: '环形' }]

export function PieChartDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="环形" wide code={`<ChartContainer title="分布" height={280}>
  <PieChart
    donut
    data={[
      { name: '运行中', value: 58, color: CHART_STATUS.success },
      { name: '排队', value: 22, color: CHART_STATUS.info },
      { name: '失败', value: 12, color: CHART_STATUS.danger },
    ]}
  />
</ChartContainer>`}>
        <ChartContainer title="分布" height={280}><PieChart donut data={[{ name: '运行中', value: 58, color: CHART_STATUS.success }, { name: '排队', value: 22, color: CHART_STATUS.info }, { name: '失败', value: 12, color: CHART_STATUS.danger }]} /></ChartContainer>
      </DocDemo>
      <DocDemo title="实心" wide code={`<ChartContainer title="实心饼图" height={280}>
  <PieChart
    data={[
      { name: '运行中', value: 58, color: CHART_STATUS.success },
      { name: '排队', value: 22, color: CHART_STATUS.info },
      { name: '失败', value: 12, color: CHART_STATUS.danger },
    ]}
  />
</ChartContainer>`}>
        <ChartContainer title="实心饼图" height={280}><PieChart data={[{ name: '运行中', value: 58, color: CHART_STATUS.success }, { name: '排队', value: 22, color: CHART_STATUS.info }, { name: '失败', value: 12, color: CHART_STATUS.danger }]} /></ChartContainer>
      </DocDemo>
    </ComponentDocLayout>
  )
}
