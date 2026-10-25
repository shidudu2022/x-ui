import {
  AreaChart,
  BarChart,
  ChartContainer,
  CHART_STATUS,
  LineChart,
  PieChart,
  RadialProgress,
} from '@/components/charts'
import { PageHeader } from '@/components/ui'
import { ShowcaseSection } from '../ShowcaseSection'

const trend = [
  { month: 'Jan', requests: 400, errors: 24 },
  { month: 'Feb', requests: 520, errors: 18 },
  { month: 'Mar', requests: 480, errors: 28 },
  { month: 'Apr', requests: 640, errors: 16 },
  { month: 'May', requests: 710, errors: 22 },
  { month: 'Jun', requests: 690, errors: 14 },
]

const bars = [
  { name: 'API', ok: 120, fail: 8 },
  { name: 'Worker', ok: 90, fail: 12 },
  { name: 'Cache', ok: 150, fail: 3 },
  { name: 'Queue', ok: 70, fail: 9 },
]

const pie = [
  { name: '运行中', value: 58, color: CHART_STATUS.success },
  { name: '排队', value: 22, color: CHART_STATUS.info },
  { name: '失败', value: 12, color: CHART_STATUS.danger },
  { name: '完成', value: 38, color: CHART_STATUS.primary },
]

export function ChartsPage() {
  return (
    <div>
      <PageHeader
        title="图表"
        description="基于 Recharts 封装；图例为圆点标记，状态色走语义令牌。"
      />

      <ShowcaseSection title="折线 / 面积">
        <div className="grid-2">
          <ChartContainer title="请求量" description="近 6 个月">
            <LineChart
              data={trend}
              xKey="month"
              series={[
                { dataKey: 'requests', name: '请求', color: CHART_STATUS.primary },
                { dataKey: 'errors', name: '错误', color: CHART_STATUS.danger, dashed: true },
              ]}
            />
          </ChartContainer>
          <ChartContainer title="面积图">
            <AreaChart
              data={trend}
              xKey="month"
              series={[{ dataKey: 'requests', name: '请求', color: CHART_STATUS.primary }]}
            />
          </ChartContainer>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="柱状 / 饼图 / 进度环">
        <div className="grid-2">
          <ChartContainer title="服务健康">
            <BarChart
              data={bars}
              xKey="name"
              series={[
                { dataKey: 'ok', name: '成功', stackId: 'a', color: CHART_STATUS.success },
                { dataKey: 'fail', name: '失败', stackId: 'a', color: CHART_STATUS.danger },
              ]}
            />
          </ChartContainer>
          <ChartContainer title="横向柱状">
            <BarChart
              layout="horizontal"
              data={bars}
              xKey="name"
              series={[{ dataKey: 'ok', name: '成功', color: CHART_STATUS.primary }]}
            />
          </ChartContainer>
          <ChartContainer title="作业分布" height={280}>
            <PieChart data={pie} donut />
          </ChartContainer>
          <ChartContainer title="完成度" height={240}>
            <RadialProgress value={76} label="本周目标" />
          </ChartContainer>
          <ChartContainer title="空态" empty />
          <ChartContainer title="加载中" loading />
        </div>
      </ShowcaseSection>
    </div>
  )
}
