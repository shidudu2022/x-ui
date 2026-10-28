import { Badge, Card, DescriptionList, Heading, Mono, SectionCard } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('description-list')
const props: PropDef[] = [{ name: 'items', type: 'DescriptionItem[]', desc: { en: "label / value list (rendered as dl.kv)", zh: "label / value 列表（渲染为 dl.kv）" } }]

export function DescriptionListDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Detail key-value", "详情键值")} description={d("Default read-only property layout for detail pages.", "详情页只读属性的默认排版。")} wide code={`<DescriptionList items={[
  { label: 'Name', value: 'api-gateway' },
  { label: 'Environment', value: 'production' },
  { label: 'Image', value: <Mono>registry/app:1.2.0</Mono> },
  { label: 'Status', value: <Badge tone="success" size="sm">Running</Badge> },
]} />`}>
        <SectionCard title={d("Attributes", "属性")}><DescriptionList items={[{ label: d("Name", "名称"), value: 'api-gateway' }, { label: d("Environment", "环境"), value: 'production' }, { label: d("Image", "镜像"), value: <Mono>registry/app:1.2.0</Mono> }, { label: d("Status", "状态"), value: <Badge tone="success" size="sm">Running</Badge> }]} /></SectionCard>
      </DocDemo>
      <DocDemo title={d("Compact card", "紧凑卡片")} code={`<Card padded>
  <Heading level="card">Connection info</Heading>
  <DescriptionList items={[
    { label: 'Endpoint', value: <Mono>https://api.example.com</Mono> },
    { label: 'Region', value: 'cn-east' },
  ]} />
</Card>`}>
        <Card padded className="stack"><Heading level="card">{d("Connection info", "连接信息")}</Heading><DescriptionList items={[{ label: 'Endpoint', value: <Mono>https://api.example.com</Mono> }, { label: 'Region', value: 'cn-east' }]} /></Card>
      </DocDemo>
    </ComponentDocLayout>
  )
}
