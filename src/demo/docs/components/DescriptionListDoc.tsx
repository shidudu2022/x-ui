import { Badge, Card, DescriptionList, Heading, Mono, SectionCard } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('description-list')
const props: PropDef[] = [{ name: 'items', type: 'DescriptionItem[]', desc: 'label / value 列表（渲染为 dl.kv）' }]

export function DescriptionListDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="详情键值" description="详情页只读属性的默认排版。" wide code={`<DescriptionList items={[
  { label: '名称', value: 'api-gateway' },
  { label: '环境', value: 'production' },
  { label: '镜像', value: <Mono>registry/app:1.2.0</Mono> },
  { label: '状态', value: <Badge tone="success" size="sm">Running</Badge> },
]} />`}>
        <SectionCard title="属性"><DescriptionList items={[{ label: '名称', value: 'api-gateway' }, { label: '环境', value: 'production' }, { label: '镜像', value: <Mono>registry/app:1.2.0</Mono> }, { label: '状态', value: <Badge tone="success" size="sm">Running</Badge> }]} /></SectionCard>
      </DocDemo>
      <DocDemo title="紧凑卡片" code={`<Card padded>
  <Heading level="card">连接信息</Heading>
  <DescriptionList items={[
    { label: 'Endpoint', value: <Mono>https://api.example.com</Mono> },
    { label: 'Region', value: 'cn-east' },
  ]} />
</Card>`}>
        <Card padded className="stack"><Heading level="card">连接信息</Heading><DescriptionList items={[{ label: 'Endpoint', value: <Mono>https://api.example.com</Mono> }, { label: 'Region', value: 'cn-east' }]} /></Card>
      </DocDemo>
    </ComponentDocLayout>
  )
}
