import { Badge, Card, Heading, MetaRow, Muted, StatusDot, Tag, Text } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('meta-row')
const props: PropDef[] = [{ name: 'children', type: 'ReactNode', desc: { en: "Inline mix (text / Badge / Tag / StatusDot)", zh: "行内混排（文字 / Badge / Tag / StatusDot）" } }]

export function MetaRowDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Resource rows", "资源行")} description={d("Common list primary column / page header pattern: name + status + environment.", "列表主列、页头描述常用：名称 + 状态 + 环境。")} code={`<MetaRow>
  <Text variant="strong">api-gateway</Text>
  <Badge tone="success" size="sm">Running</Badge>
  <Muted>cn-east</Muted>
</MetaRow>`}>
        <div className="stack"><MetaRow><Text variant="strong">api-gateway</Text><Badge tone="success" size="sm">Running</Badge><Muted>cn-east</Muted></MetaRow><MetaRow><Text variant="strong">worker</Text><Badge tone="warn" size="sm">Pending</Badge><Muted>cn-north</Muted></MetaRow></div>
      </DocDemo>
      <DocDemo title={d("Status dot & version", "状态点 + 版本")} code={`<MetaRow>
  <StatusDot tone="ok" />
  <span>worker-01</span>
  <Tag tone="info" size="sm">v1.2</Tag>
</MetaRow>`}>
        <Card padded className="stack"><Heading level="card">{d("Node", "节点")}</Heading><MetaRow><StatusDot tone="ok" /><span>worker-01</span><Tag tone="info" size="sm">v1.2</Tag><Badge tone="success" size="sm">Ready</Badge></MetaRow><Text variant="hint">{d("MetaRow only handles horizontal spacing, not wrapping.", "MetaRow 只管横向间距，不负责换行策略。")}</Text></Card>
      </DocDemo>
    </ComponentDocLayout>
  )
}
