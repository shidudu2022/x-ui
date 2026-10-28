import { Button, DescriptionList, SectionCard, Text } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('section-card')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'subtitle', type: 'ReactNode', desc: { en: "Subtitle", zh: "副标题" } }, { name: 'actions', type: 'ReactNode', desc: { en: "Right-side actions", zh: "右侧操作" } }, { name: 'children', type: 'ReactNode', desc: { en: "Content", zh: "内容" } }]

export function SectionCardDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Settings sections", "设置分区")} description={d("Standard section shell for settings and detail pages.", "设置页、详情页的标准分区壳。")} wide code={`<SectionCard title="Basic info" subtitle="Read-only" actions={<Button size="sm">Edit</Button>}>
  <DescriptionList items={[
    { label: 'Name', value: 'api-gateway' },
    { label: 'Environment', value: 'production' },
  ]} />
</SectionCard>`}>
        <SectionCard title={d("Basic info", "基本信息")} subtitle={d("Read-only", "只读")} actions={<Button size="sm">{d("Edit", "编辑")}</Button>}><DescriptionList items={[{ label: d("Name", "名称"), value: 'api-gateway' }, { label: d("Environment", "环境"), value: 'production' }, { label: d("Region", "区域"), value: 'cn-east' }]} /></SectionCard>
      </DocDemo>
      <DocDemo title={d("Description copy", "说明文案")} code={`<SectionCard title="Notification preferences">
  <Text as="p">When enabled, a change summary is sent to the linked email.</Text>
  <Text variant="hint" as="p">Can be turned off anytime in your profile.</Text>
</SectionCard>`}>
        <SectionCard title={d("Notification preferences", "通知偏好")}><Text as="p">{d("When enabled, a change summary is sent to the linked email.", "开启后将向绑定邮箱发送变更摘要。")}</Text><Text variant="hint" as="p">{d("Can be turned off anytime in your profile.", "可随时在个人资料中关闭。")}</Text></SectionCard>
      </DocDemo>
    </ComponentDocLayout>
  )
}
