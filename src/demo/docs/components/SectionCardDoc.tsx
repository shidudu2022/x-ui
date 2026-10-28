import { Button, DescriptionList, SectionCard, Text } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('section-card')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'subtitle', type: 'ReactNode', desc: '副标题' }, { name: 'actions', type: 'ReactNode', desc: '右侧操作' }, { name: 'children', type: 'ReactNode', desc: '内容' }]

export function SectionCardDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="设置分区" description="设置页、详情页的标准分区壳。" wide code={`<SectionCard title="基本信息" subtitle="只读" actions={<Button size="sm">编辑</Button>}>
  <DescriptionList items={[
    { label: '名称', value: 'api-gateway' },
    { label: '环境', value: 'production' },
  ]} />
</SectionCard>`}>
        <SectionCard title="基本信息" subtitle="只读" actions={<Button size="sm">编辑</Button>}><DescriptionList items={[{ label: '名称', value: 'api-gateway' }, { label: '环境', value: 'production' }, { label: '区域', value: 'cn-east' }]} /></SectionCard>
      </DocDemo>
      <DocDemo title="说明文案" code={`<SectionCard title="通知偏好">
  <Text as="p">开启后将向绑定邮箱发送变更摘要。</Text>
  <Text variant="hint" as="p">可随时在个人资料中关闭。</Text>
</SectionCard>`}>
        <SectionCard title="通知偏好"><Text as="p">开启后将向绑定邮箱发送变更摘要。</Text><Text variant="hint" as="p">可随时在个人资料中关闭。</Text></SectionCard>
      </DocDemo>
    </ComponentDocLayout>
  )
}
