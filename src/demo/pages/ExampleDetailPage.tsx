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
import { useDemoT } from '@/demo/i18n/useDemoT'

export function ExampleDetailPage() {
  const t = useDemoT()
  const { toast } = useToast()
  const [tab, setTab] = useState<'overview' | 'workloads' | 'meta'>('overview')
  const [autoRefresh, setAutoRefresh] = useState(true)

  return (
    <section className="page active">
      <PageHeader
        title="demo-cluster"
        description={
          <>
            {t('Production edge node', '生产边缘节点')} · <Badge tone="warn">degraded</Badge>
            <Mono> · v1.31.3+k3s1</Mono>
          </>
        }
        actions={
          <ToggleButton checked={autoRefresh} onClick={() => setAutoRefresh((v) => !v)}>
            {t('Auto refresh', '自动刷新')}
          </ToggleButton>
        }
        actionItems={[
          {
            id: 'retry',
            label: t('Install / retry', '安装/重试'),
            variant: 'primary',
            onClick: () => toast(t('Install / retry (demo)', '安装/重试（示例）'), 'info'),
          },
          {
            id: 'delete',
            label: t('Delete', '删除'),
            variant: 'danger',
            onClick: () => toast(t('Open delete confirm (demo)', '打开删除确认（示例）'), 'error'),
          },
          {
            id: 'kubeconfig',
            label: 'kubeconfig',
            overflow: true,
            onClick: () => toast(t('Download kubeconfig (demo)', '下载 kubeconfig（示例）'), 'info'),
          },
          {
            id: 'diagnose',
            label: t('Diagnose', '诊断'),
            overflow: true,
            onClick: () => toast(t('Diagnose started (demo)', '诊断已开始（示例）'), 'success'),
          },
          {
            id: 'upgrade',
            label: t('Upgrade', '升级'),
            overflow: true,
            onClick: () => toast(t('Open upgrade (demo)', '打开升级（示例）'), 'info'),
          },
        ]}
        overflowLabel={t('More', '更多')}
      />

      <div style={{ marginBottom: 16 }}>
        <Banner>{t('Maintenance in progress; dangerous actions are locked.', '维护模式进行中，危险操作已锁定。')}</Banner>
      </div>

      <PageTabs
        value={tab}
        onChange={(id) => setTab(id as typeof tab)}
        items={[
          { id: 'overview', label: t('Overview', '概览') },
          { id: 'workloads', label: t('Workloads', '工作负载') },
          { id: 'meta', label: t('Metadata', '元数据') },
        ]}
      />

      {tab === 'overview' ? (
        <div className="grid-2">
          <Card>
            <StatusBar
              left={
                <>
                  <Text variant="strong">{t('Nodes', '节点')}</Text>
                  <Muted style={{ marginLeft: 8 }}>{t('Live status', '实时状态')}</Muted>
                </>
              }
              right={
                <>
                  <Button size="sm">{t('Add Server', '添加 Server')}</Button>
                  <Button size="sm">{t('Add Agent', '添加 Agent')}</Button>
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
                { key: 'role', header: t('Role', '角色'), render: (r) => r.role },
                { key: 'host', header: t('Host', '主机'), render: (r) => <Mono>{r.host}</Mono> },
                {
                  key: 'status',
                  header: t('Status', '状态'),
                  render: (r) => (
                    <Badge tone={r.status === 'Ready' ? 'success' : 'danger'}>{r.status}</Badge>
                  ),
                },
              ]}
            />
          </Card>
          <div className="stack">
            <SectionCard title={t('Summary', '概要')}>
              <MetricGrid>
                <Metric label="API" value="https://10.0.0.1:6443" />
                <Metric label={t('Tags', '标签')} value="prod, edge" />
              </MetricGrid>
            </SectionCard>
            <Card>
              <StatusBar left={<Text variant="strong">{t('Recent jobs', '最近作业')}</Text>} />
              <Table
                rows={[
                  { id: 'j1', type: 'diagnose', status: 'success' },
                  { id: 'j2', type: 'scale', status: 'running' },
                ]}
                rowKey={(r) => r.id}
                columns={[
                  { key: 'type', header: t('Type', '类型'), render: (r) => r.type },
                  {
                    key: 'status',
                    header: t('Status', '状态'),
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
            <Field label={t('Display name', '显示名')} htmlFor="meta-name">
              <Input id="meta-name" defaultValue={t('Production edge', '生产边缘')} />
            </Field>
            <Field label={t('Tags', '标签')} htmlFor="meta-tags" hint={t('Comma-separated', '逗号分隔')}>
              <Input id="meta-tags" defaultValue="prod, edge" />
            </Field>
            <Field label={t('Notes', '备注')} htmlFor="meta-notes">
              <Textarea id="meta-notes" rows={3} defaultValue={t('Datacenter A', '机房 A')} />
            </Field>
            <div className="actions">
              <Button variant="primary" onClick={() => toast(t('Metadata saved (demo)', '元数据已保存（示例）'), 'success')}>
                {t('Save', '保存')}
              </Button>
            </div>
          </SectionCard>
        </div>
      ) : null}
    </section>
  )
}
