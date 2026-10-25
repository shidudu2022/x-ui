import { AreaChart, BarChart, ChartContainer, CHART_STATUS } from '@/components/charts'
import { Button, Card, MetricGrid, PageHeader, Stat, Table, Tag } from '@/components/ui'

const trend = [
  { d: 'Mon', v: 120 },
  { d: 'Tue', v: 180 },
  { d: 'Wed', v: 150 },
  { d: 'Thu', v: 220 },
  { d: 'Fri', v: 260 },
  { d: 'Sat', v: 190 },
  { d: 'Sun', v: 210 },
]

const bars = [
  { name: 'API', ok: 120, fail: 8 },
  { name: 'Worker', ok: 90, fail: 12 },
  { name: 'Cache', ok: 150, fail: 3 },
]

const jobs = [
  { id: '1', name: 'sync-users', status: 'running' },
  { id: '2', name: 'backup-db', status: 'queued' },
  { id: '3', name: 'reindex', status: 'failed' },
]

export function ExampleDashboardPage() {
  return (
    <div>
      <PageHeader
        title="仪表盘"
        description="Metric + Chart + 列表组合。"
        actions={<Button variant="primary">新建作业</Button>}
      />
      <MetricGrid>
        <Stat label="今日请求" value="48.2k" delta="+12%" data={[3, 5, 4, 8, 7, 9, 11]} />
        <Stat label="错误率" value="0.42%" delta="-0.1%" data={[8, 7, 6, 5, 4, 5, 3]} />
        <Stat label="活跃节点" value="12" delta="+1" data={[10, 10, 11, 11, 12, 12, 12]} />
        <Stat label="队列积压" value="86" delta="+4" data={[40, 50, 55, 60, 70, 80, 86]} />
      </MetricGrid>
      <div className="grid-2" style={{ marginTop: 16 }}>
        <ChartContainer title="流量趋势">
          <AreaChart data={trend} xKey="d" series={[{ dataKey: 'v', name: '请求', color: CHART_STATUS.primary }]} />
        </ChartContainer>
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
      </div>
      <Card padded style={{ marginTop: 16 }}>
        <h3 style={{ margin: '0 0 12px' }}>最近作业</h3>
        <Table
          columns={[
            { key: 'name', header: '名称', render: (r) => r.name },
            {
              key: 'status',
              header: '状态',
              render: (r) => (
                <Tag tone={r.status === 'failed' ? 'danger' : r.status === 'running' ? 'success' : 'info'}>
                  {r.status}
                </Tag>
              ),
            },
          ]}
          rows={jobs}
          rowKey={(r) => r.id}
        />
      </Card>
    </div>
  )
}
