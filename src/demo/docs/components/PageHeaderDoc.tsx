import { Badge, Button, MetaRow, Muted, PageHeader } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('page-header')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: '标题（页级 h1）' }, { name: 'description', type: 'ReactNode', desc: '副文案，可混排 MetaRow' }, { name: 'actions', type: 'ReactNode', desc: '右侧自定义操作' }, { name: 'actionItems', type: 'PageHeaderActionItem[]', desc: '声明式操作（可 overflow）' }, { name: 'overflowActions', type: 'DropdownItem[]', desc: '仅菜单项' }]

export function PageHeaderDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="页头排版" description="一页一个主标题；描述保持一两句，操作靠右。" wide code={`<PageHeader
  title="工作负载"
  description="管理集群中的 Deployment 与状态。"
  actions={<Button variant="primary">创建</Button>}
/>`}>
        <PageHeader title="工作负载" description="管理集群中的 Deployment 与状态。" actions={<Button variant="primary">创建</Button>} />
      </DocDemo>
      <DocDemo title="描述混排" description="description 可放 MetaRow，携带状态与环境。" wide code={`<PageHeader
  title="api-gateway"
  description={
    <MetaRow>
      <Badge tone="success" size="sm">Running</Badge>
      <Muted>production</Muted>
      <Muted>cn-east</Muted>
    </MetaRow>
  }
  actionItems={[
    { id: 'edit', label: '编辑', onClick: () => {} },
    { id: 'more', label: '更多', overflow: true, onClick: () => {} },
  ]}
/>`}>
        <PageHeader title="api-gateway" description={<MetaRow><Badge tone="success" size="sm">Running</Badge><Muted>production</Muted><Muted>cn-east</Muted></MetaRow>} actionItems={[{ id: 'edit', label: '编辑', onClick: () => undefined }, { id: 'refresh', label: '刷新', onClick: () => undefined }, { id: 'more', label: '克隆', overflow: true, onClick: () => undefined }]} overflowActions={[{ id: 'del', label: '删除', danger: true, onSelect: () => undefined }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
