import { useState } from 'react'
import {
  Badge,
  Banner,
  Button,
  Card,
  Field,
  Input,
  Metric,
  MetricGrid,
  Mono,
  Muted,
  PageHeader,
  PageTabs,
  SectionCard,
  StatusBar,
  Table,
  Text,
  Textarea,
  ToggleButton,
  useToast,
} from '@/components/ui'

export function ExampleDetailPage() {
  const { toast } = useToast()
  const [tab, setTab] = useState<'overview' | 'workloads' | 'meta'>('overview')
  const [autoRefresh, setAutoRefresh] = useState(true)

  return (
    <section className="page active">
      <PageHeader
        title="demo-cluster"
        description={
          <>
            生产边缘节点 · <Badge tone="warn">degraded</Badge>
            <Mono> · v1.31.3+k3s1</Mono>
          </>
        }
        actions={
          <ToggleButton checked={autoRefresh} onClick={() => setAutoRefresh((v) => !v)}>
            自动刷新
          </ToggleButton>
        }
        actionItems={[
          {
            id: 'retry',
            label: '安装/重试',
            variant: 'primary',
            onClick: () => toast('安装/重试（示例）', 'info'),
          },
          {
            id: 'delete',
            label: '删除',
            variant: 'danger',
            onClick: () => toast('打开删除确认（示例）', 'error'),
          },
          {
            id: 'kubeconfig',
            label: 'kubeconfig',
            overflow: true,
            onClick: () => toast('下载 kubeconfig（示例）', 'info'),
          },
          {
            id: 'diagnose',
            label: '诊断',
            overflow: true,
            onClick: () => toast('诊断已开始（示例）', 'success'),
          },
          {
            id: 'upgrade',
            label: '升级',
            overflow: true,
            onClick: () => toast('打开升级（示例）', 'info'),
          },
        ]}
        overflowLabel="更多"
      />

      <div style={{ marginBottom: 16 }}>
        <Banner>维护模式进行中，危险操作已锁定。</Banner>
      </div>

      <PageTabs
        value={tab}
        onChange={(id) => setTab(id as typeof tab)}
        items={[
          { id: 'overview', label: '概览' },
          { id: 'workloads', label: '工作负载' },
          { id: 'meta', label: '元数据' },
        ]}
      />

      {tab === 'overview' ? (
        <div className="grid-2">
          <Card>
            <StatusBar
              left={
                <>
                  <Text variant="strong">节点</Text>
                  <Muted style={{ marginLeft: 8 }}>实时状态</Muted>
                </>
              }
              right={
                <>
                  <Button size="sm">添加 Server</Button>
                  <Button size="sm">添加 Agent</Button>
                </>
              }
            />
            <Table
              rows={[
                { id: '1', role: 'server', host: '10.0.0.1', status: 'Ready' },
                { id: '2', role: 'agent', host: '10.0.0.2', status: 'NotReady' },
              ]}
              rowKey={(r) => r.id}
              columns={[
                { key: 'role', header: '角色', render: (r) => r.role },
                { key: 'host', header: '主机', render: (r) => <Mono>{r.host}</Mono> },
                {
                  key: 'status',
                  header: '状态',
                  render: (r) => (
                    <Badge tone={r.status === 'Ready' ? 'success' : 'danger'}>{r.status}</Badge>
                  ),
                },
              ]}
            />
          </Card>
          <div className="stack">
            <SectionCard title="概要">
              <MetricGrid>
                <Metric label="API" value="https://10.0.0.1:6443" />
                <Metric label="标签" value="prod, edge" />
              </MetricGrid>
            </SectionCard>
            <Card>
              <StatusBar left={<Text variant="strong">最近作业</Text>} />
              <Table
                rows={[
                  { id: 'j1', type: 'diagnose', status: 'success' },
                  { id: 'j2', type: 'scale', status: 'running' },
                ]}
                rowKey={(r) => r.id}
                columns={[
                  { key: 'type', header: '类型', render: (r) => r.type },
                  {
                    key: 'status',
                    header: '状态',
                    render: (r) => (
                      <Badge tone={r.status === 'success' ? 'success' : 'info'}>{r.status}</Badge>
                    ),
                  },
                ]}
              />
            </Card>
          </div>
        </div>
      ) : null}

      {tab === 'workloads' ? (
        <Card>
          <StatusBar left={<Text variant="strong">Pods</Text>} />
          <Table
            rows={[
              { id: 'p1', ns: 'default', name: 'api-7d9f', status: 'Running' },
              { id: 'p2', ns: 'kube-system', name: 'coredns', status: 'Running' },
            ]}
            rowKey={(r) => r.id}
            columns={[
              { key: 'ns', header: 'Namespace', render: (r) => r.ns },
              { key: 'name', header: 'Name', render: (r) => r.name },
              {
                key: 'status',
                header: 'Status',
                render: (r) => <Badge tone="success">{r.status}</Badge>,
              },
            ]}
          />
        </Card>
      ) : null}

      {tab === 'meta' ? (
        <div className="page-narrow" style={{ margin: 0 }}>
          <SectionCard>
            <Field label="显示名" htmlFor="meta-name">
              <Input id="meta-name" defaultValue="生产边缘" />
            </Field>
            <Field label="标签" htmlFor="meta-tags" hint="逗号分隔">
              <Input id="meta-tags" defaultValue="prod, edge" />
            </Field>
            <Field label="备注" htmlFor="meta-notes">
              <Textarea id="meta-notes" rows={3} defaultValue="机房 A" />
            </Field>
            <div className="actions">
              <Button variant="primary" onClick={() => toast('元数据已保存（示例）', 'success')}>
                保存
              </Button>
            </div>
          </SectionCard>
        </div>
      ) : null}
    </section>
  )
}
