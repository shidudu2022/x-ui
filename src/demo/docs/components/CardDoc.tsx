import { Badge, Button, Card, Heading, StatusBar, Text } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('card')
const props: PropDef[] = [{ name: 'padded', type: 'boolean', default: 'false', desc: { en: "Padding (card-pad)", zh: "内边距（card-pad）" } }, { name: 'children', type: 'ReactNode', desc: { en: "Content", zh: "内容" } }, { name: 'StatusBar', type: 'left / right', desc: { en: "Footer bar exported from the same file", zh: "同文件导出的底栏" } }]

export function CardDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Content card", "内容卡片")} description={d("Use padded for card spacing; Heading + Text for hierarchy inside.", "padded 交给卡片统一留白；内用 Heading + Text 建立层级。")} code={`<Card padded>
  <Heading level="card">Deployment summary</Heading>
  <Text variant="muted" as="p">
    The latest release has completed; traffic has shifted to the green group.
  </Text>
</Card>`}>
        <Card padded className="stack"><Heading level="card">{d("Deployment summary", "部署摘要")}</Heading><Text variant="muted" as="p">{d("The latest release has completed; traffic has shifted to the green group.", "最近一次发布已完成，流量已切到绿色组。")}</Text></Card>
      </DocDemo>
      <DocDemo title={d("Self-managed spacing", "自管间距")} description={d("No padded by default — good for edge-to-edge tables / lists.", "默认无 padded，适合表格 / 列表等顶满边缘的内容。")} code={`<Card>
  <div style={{ padding: 12 }}>Custom padding</div>
</Card>`}>
        <Card><div style={{ padding: '12px 14px' }}><Text size="sm">{d("No padded: content controls its own spacing (common for table frames).", "未 padded：内容自己控制留白（常见于表格外框）。")}</Text></div></Card>
      </DocDemo>
      <DocDemo title={d("StatusBar", "StatusBar")} description={d("Card footer: status on the left, actions on the right.", "卡片底栏：左侧状态、右侧操作。")} code={`<Card>
  <div style={{ padding: 14 }}>Main content</div>
  <StatusBar
    left={<Badge tone="success" size="sm">Healthy</Badge>}
    right={<Button size="sm">Details</Button>}
  />
</Card>`}>
        <Card><div style={{ padding: 14 }}><Text>{d("Main content area", "主体内容区")}</Text></div><StatusBar left={<Badge tone="success" size="sm">Healthy</Badge>} right={<Button size="sm">{d("Details", "详情")}</Button>} /></Card>
      </DocDemo>
    </ComponentDocLayout>
  )
}
