import {
  Card,
  CodeBlock,
  DescriptionList,
  LogViewer,
  PageHeader,
  Timeline,
} from '@/components/ui'

const LOG = `[10:01:12] INFO  user=alice action=update.cluster id=demo-cluster
[10:01:13] INFO  diff keys=labels,replicas
[10:01:14] WARN  rate-limit remaining=2
[10:01:15] INFO  audit written id=aud_8f2a
`

export function ExampleAuditPage() {
  return (
    <div>
      <PageHeader title="审计详情" description="Timeline + DescriptionList + 日志片段。" />
      <div className="grid-2">
        <Card padded className="stack">
          <DescriptionList
            items={[
              { label: '事件 ID', value: 'aud_8f2a' },
              { label: '操作者', value: 'alice@example.com' },
              { label: '资源', value: 'cluster / demo-cluster' },
              { label: '结果', value: '成功' },
              { label: '来源 IP', value: '203.0.113.10' },
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
                title: '提交变更',
                meta: 'alice · 10:01',
                content: '标签与副本数',
              },
              {
                id: '2',
                title: '策略校验通过',
                meta: '10:01',
                content: '变更窗口内',
              },
              {
                id: '3',
                title: '写入审计日志',
                meta: '10:01',
                content: 'aud_8f2a',
              },
              {
                id: '4',
                title: '同步完成',
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
