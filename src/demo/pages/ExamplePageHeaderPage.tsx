import { Button, Card, PageHeader, useToast } from '@/components/ui'

/**
 * Page chrome example — main title + subtitle (+ optional actions),
 * same structure as k3s-start/web list/detail headers.
 */
export function ExamplePageHeaderPage() {
  const { toast } = useToast()

  return (
    <section className="page active">
      <PageHeader
        title="资源概览"
        description="主标题 + 副标题；右侧可用 actionItems 指定哪些收入「更多」菜单。"
        actionItems={[
          {
            id: 'primary',
            label: '主要操作',
            variant: 'primary',
            onClick: () => toast('主要操作', 'info'),
          },
          {
            id: 'export',
            label: '导出',
            overflow: true,
            onClick: () => toast('导出', 'info'),
          },
          {
            id: 'archive',
            label: '归档',
            overflow: true,
            onClick: () => toast('归档', 'info'),
          },
        ]}
      />

      <Card padded className="stack">
        <p className="muted" style={{ margin: 0 }}>
          使用 <code>actionItems</code>，给次要项加 <code>overflow: true</code> 即可收进菜单；自定义控件仍放{' '}
          <code>actions</code>。也可用 <code>overflowActions</code> 直接塞菜单项。
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
          <Card padded className="full" style={{ gridColumn: '1 / -1' }}>
            <strong style={{ fontSize: 14 }}>图标「更多」（overflowIconOnly）</strong>
            <div style={{ marginTop: 12 }}>
              <PageHeader
                title="作业"
                description="主按钮外露，其余进 ⋯ 菜单。"
                actionItems={[
                  {
                    id: 'run',
                    label: '运行',
                    variant: 'primary',
                    onClick: () => toast('运行', 'success'),
                  },
                  {
                    id: 'clone',
                    label: '克隆',
                    overflow: true,
                    onClick: () => toast('克隆', 'info'),
                  },
                  {
                    id: 'delete',
                    label: '删除',
                    variant: 'danger',
                    overflow: true,
                    onClick: () => toast('删除', 'error'),
                  },
                ]}
                overflowIconOnly
              />
            </div>
          </Card>
        </div>
      </Card>
    </section>
  )
}
