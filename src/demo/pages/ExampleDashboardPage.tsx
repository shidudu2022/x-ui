import { AreaChart, BarChart, ChartContainer, CHART_STATUS } from '@/components/charts'
import { Button, Card, MetricGrid, PageHeader, Stat, Table, Tag } from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

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
  const t = useDemoT()

  return (
    <div>
      <PageHeader
        title={t('Dashboard', '仪表盘')}
        description={t('Metrics, charts, and list composition.', 'Metric + Chart + 列表组合。')}
        actions={<Button variant="primary">{t('New job', '新建作业')}</Button>}
      />
      <MetricGrid>
        <Stat label={t("Today's requests", '今日请求')} value="48.2k" delta="+12%" data={[3, 5, 4, 8, 7, 9, 11]} />
        <Stat label={t('Error rate', '错误率')} value="0.42%" delta="-0.1%" data={[8, 7, 6, 5, 4, 5, 3]} />
        <Stat label={t('Active nodes', '活跃节点')} value="12" delta="+1" data={[10, 10, 11, 11, 12, 12, 12]} />
        <Stat label={t('Queue backlog', '队列积压')} value="86" delta="+4" data={[40, 50, 55, 60, 70, 80, 86]} />
      </MetricGrid>
      <div className="grid-2" style={{ marginTop: 16 }}>
        <ChartContainer title={t('Traffic trend', '流量趋势')}>
          <AreaChart
            data={trend}
            xKey="d"
            series={[{ dataKey: 'v', name: t('Requests', '请求'), color: CHART_STATUS.primary }]}
          />
        </ChartContainer>
        <ChartContainer title={t('Service health', '服务健康')}>
          <BarChart
            data={bars}
            xKey="name"
            series={[
              { dataKey: 'ok', name: t('Success', '成功'), stackId: 'a', color: CHART_STATUS.success },
              { dataKey: 'fail', name: t('Failure', '失败'), stackId: 'a', color: CHART_STATUS.danger },
            ]}
          />
        </ChartContainer>
      </div>
      <Card padded style={{ marginTop: 16 }}>
        <h3 style={{ margin: '0 0 12px' }}>{t('Recent jobs', '最近作业')}</h3>
        <Table
          columns={[
            { key: 'name', header: t('Name', '名称'), render: (r) => r.name },
            {
              key: 'status',
              header: t('Status', '状态'),
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
