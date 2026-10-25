import { Button, Card, PageHeader } from '@/components/ui'

/**
 * Page chrome example — main title + subtitle (+ optional actions),
 * same structure as k3s-start/web list/detail headers.
 */
export function ExamplePageHeaderPage() {
  return (
    <section className="page active">
      <PageHeader
        title="资源概览"
        description="主标题 + 副标题说明页面用途；右侧可放主要操作。"
        actions={
          <>
            <Button>次要操作</Button>
            <Button variant="primary">主要操作</Button>
          </>
        }
      />

      <Card padded className="stack">
        <p className="muted" style={{ margin: 0 }}>
          对应 k3s-start/web 的 <code>.page-header</code>：左侧 <code>h1</code> +{' '}
          <code>p</code>，右侧 <code>.actions</code>。内容区默认随主栏自动撑满宽度。
        </p>
        <div className="grid-2">
          <Card padded>
            <strong style={{ fontSize: 14 }}>仅标题</strong>
            <div style={{ marginTop: 12 }}>
              <PageHeader title="集群" description="创建、扩缩、升级与卸载远程 k3s 集群。" />
            </div>
          </Card>
          <Card padded>
            <strong style={{ fontSize: 14 }}>标题 + 操作</strong>
            <div style={{ marginTop: 12 }}>
              <PageHeader
                title="服务器"
                description="录入 SSH 主机，凭证加密存储。"
                actions={<Button variant="primary">添加服务器</Button>}
              />
            </div>
          </Card>
        </div>
      </Card>
    </section>
  )
}
