import { Badge, Button, MetaRow, Muted, PageHeader } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('page-header')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: { en: "Title (page-level h1)", zh: "标题（页级 h1）" } }, { name: 'description', type: 'ReactNode', desc: { en: "Secondary text; can mix in MetaRow", zh: "副文案，可混排 MetaRow" } }, { name: 'actions', type: 'ReactNode', desc: { en: "Custom right-side actions", zh: "右侧自定义操作" } }, { name: 'actionItems', type: 'PageHeaderActionItem[]', desc: { en: "Declarative actions (can overflow)", zh: "声明式操作（可 overflow）" } }, { name: 'overflowActions', type: 'DropdownItem[]', desc: { en: "Menu items only", zh: "仅菜单项" } }]

export function PageHeaderDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Page header typography", "页头排版")} description={d("One primary title per page; keep description to one or two lines; actions on the right.", "一页一个主标题；描述保持一两句，操作靠右。")} wide code={`<PageHeader
  title="Workloads"
  description="Manage Deployments and status across the cluster."
  actions={<Button variant="primary">Create</Button>}
/>`}>
        <PageHeader title={d("Workloads", "工作负载")} description={d("Manage Deployments and status across the cluster.", "管理集群中的 Deployment 与状态。")} actions={<Button variant="primary">{d("Create", "创建")}</Button>} />
      </DocDemo>
      <DocDemo title={d("Mixed description", "描述混排")} description={d("description can sit in MetaRow with status and environment.", "description 可放 MetaRow，携带状态与环境。")} wide code={`<PageHeader
  title="api-gateway"
  description={
    <MetaRow>
      <Badge tone="success" size="sm">Running</Badge>
      <Muted>production</Muted>
      <Muted>cn-east</Muted>
    </MetaRow>
  }
  actionItems={[
    { id: 'edit', label: 'Edit', onClick: () => {} },
    { id: 'more', label: 'More', overflow: true, onClick: () => {} },
  ]}
/>`}>
        <PageHeader title="api-gateway" description={<MetaRow><Badge tone="success" size="sm">Running</Badge><Muted>production</Muted><Muted>cn-east</Muted></MetaRow>} actionItems={[{ id: 'edit', label: d("Edit", "编辑"), onClick: () => undefined }, { id: 'refresh', label: d("Refresh", "刷新"), onClick: () => undefined }, { id: 'more', label: d("Clone", "克隆"), overflow: true, onClick: () => undefined }]} overflowActions={[{ id: 'del', label: d("Delete", "删除"), danger: true, onSelect: () => undefined }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
