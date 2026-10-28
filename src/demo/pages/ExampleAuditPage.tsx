import {
  Card,
  CodeBlock,
  DescriptionList,
  LogViewer,
  PageHeader,
  Timeline,
} from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

const LOG = `[10:01:12] INFO  user=alice action=update.cluster id=demo-cluster
[10:01:13] INFO  diff keys=labels,replicas
[10:01:14] WARN  rate-limit remaining=2
[10:01:15] INFO  audit written id=aud_8f2a
`

export function ExampleAuditPage() {
  const t = useDemoT()

  return (
    <div>
      <PageHeader
        title={t('Audit detail', '审计详情')}
        description={t('Timeline + DescriptionList + log snippet.', 'Timeline + DescriptionList + 日志片段。')}
      />
      <div className="grid-2">
        <Card padded className="stack">
          <DescriptionList
            items={[
              { label: t('Event ID', '事件 ID'), value: 'aud_8f2a' },
              { label: t('Actor', '操作者'), value: 'alice@example.com' },
              { label: t('Resource', '资源'), value: 'cluster / demo-cluster' },
              { label: t('Result', '结果'), value: t('Success', '成功') },
              { label: t('Source IP', '来源 IP'), value: '203.0.113.10' },
            ]}
          />
          <CodeBlock
            language="json"
            code={`{
  "action": "update.cluster",
  "diff": { "replicas": [2, 3] }
}`}
          />
        </Card>
        <Card padded>
          <Timeline
            items={[
              {
                id: '1',
                title: t('Submit change', '提交变更'),
                meta: 'alice · 10:01',
                content: t('Labels and replica count', '标签与副本数'),
              },
              {
                id: '2',
                title: t('Policy check passed', '策略校验通过'),
                meta: '10:01',
                content: t('Within change window', '变更窗口内'),
              },
              {
                id: '3',
                title: t('Audit log written', '写入审计日志'),
                meta: '10:01',
                content: 'aud_8f2a',
              },
              {
                id: '4',
                title: t('Sync complete', '同步完成'),
                meta: '10:02',
                content: 'replicas=3',
              },
            ]}
          />
        </Card>
      </div>
      <div style={{ marginTop: 16 }}>
        <LogViewer>{LOG}</LogViewer>
      </div>
    </div>
  )
}
