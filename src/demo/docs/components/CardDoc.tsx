import { Badge, Button, Card, Heading, StatusBar, Text } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('card')
const props: PropDef[] = [{ name: 'padded', type: 'boolean', default: 'false', desc: '内边距（card-pad）' }, { name: 'children', type: 'ReactNode', desc: '内容' }, { name: 'StatusBar', type: 'left / right', desc: '同文件导出的底栏' }]

export function CardDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="内容卡片" description="padded 交给卡片统一留白；内用 Heading + Text 建立层级。" code={`<Card padded>
  <Heading level="card">部署摘要</Heading>
  <Text variant="muted" as="p">
    最近一次发布已完成，流量已切到绿色组。
  </Text>
</Card>`}>
        <Card padded className="stack"><Heading level="card">部署摘要</Heading><Text variant="muted" as="p">最近一次发布已完成，流量已切到绿色组。</Text></Card>
      </DocDemo>
      <DocDemo title="自管间距" description="默认无 padded，适合表格 / 列表等顶满边缘的内容。" code={`<Card>
  <div style={{ padding: 12 }}>自定义内边距</div>
</Card>`}>
        <Card><div style={{ padding: '12px 14px' }}><Text size="sm">未 padded：内容自己控制留白（常见于表格外框）。</Text></div></Card>
      </DocDemo>
      <DocDemo title="StatusBar" description="卡片底栏：左侧状态、右侧操作。" code={`<Card>
  <div style={{ padding: 14 }}>主体内容</div>
  <StatusBar
    left={<Badge tone="success" size="sm">Healthy</Badge>}
    right={<Button size="sm">详情</Button>}
  />
</Card>`}>
        <Card><div style={{ padding: 14 }}><Text>主体内容区</Text></div><StatusBar left={<Badge tone="success" size="sm">Healthy</Badge>} right={<Button size="sm">详情</Button>} /></Card>
      </DocDemo>
    </ComponentDocLayout>
  )
}
