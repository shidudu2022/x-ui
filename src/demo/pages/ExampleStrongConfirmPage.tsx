import { useState } from 'react'
import {
  Button,
  DescriptionList,
  PageHeader,
  SectionCard,
  StrongConfirmDrawer,
  Tag,
  useToast,
} from '@/components/ui'

const RESOURCE = 'prod-cluster-07'

export function ExampleStrongConfirmPage() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  return (
    <div className="stack">
      <PageHeader
        title="强确认（抽屉）"
        description="点击危险操作后从右侧拉出确认面板，需输入匹配字符串才能继续。"
      />

      <SectionCard title="资源概览">
        <DescriptionList
          items={[
            { label: '名称', value: RESOURCE },
            { label: '环境', value: <Tag tone="warn">生产</Tag> },
            { label: '节点', value: '12' },
            { label: '区域', value: 'cn-east-1' },
          ]}
        />
        <div className="actions" style={{ marginTop: 16 }}>
          <Button variant="danger" onClick={() => setOpen(true)}>
            删除集群…
          </Button>
        </div>
        <p className="muted" style={{ margin: '12px 0 0', fontSize: 12 }}>
          居中弹窗请用 <code>StrongConfirm</code>；本页演示抽屉内输入匹配确认。
        </p>
      </SectionCard>

      <StrongConfirmDrawer
        open={open}
        onClose={() => setOpen(false)}
        title="删除集群"
        resourceName={RESOURCE}
        confirmValue={RESOURCE}
        confirmText="永久删除"
        onConfirm={() => toast(`已删除 ${RESOURCE}（示例）`, 'success')}
      >
        将永久删除该集群及其节点、作业与审计关联数据，此操作不可恢复。
      </StrongConfirmDrawer>
    </div>
  )
}
