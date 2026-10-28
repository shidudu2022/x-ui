import { Card, Divider, Stack, Text, TextLink } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('divider')
const props: PropDef[] = [{ name: 'label', type: 'ReactNode', desc: { en: "Middle text", zh: "中间文案" } }, { name: 'vertical', type: 'boolean', desc: { en: "Vertical divider", zh: "竖向分隔" } }]

export function DividerDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Section divider", "区块分隔")} description={d("Split top and bottom content within one card.", "同一卡片内切开上下内容。")} code={`<Stack>
  <Text>Above: summary info</Text>
  <Divider />
  <Text variant="muted">Below: supplementary note</Text>
</Stack>`}>
        <Card padded><Stack><Text>{d("Above: summary info", "上方：概要信息")}</Text><Divider /><Text variant="muted">{d("Below: supplementary note or secondary actions.", "下方：补充说明或次要操作区。")}</Text></Stack></Card>
      </DocDemo>
      <DocDemo title={d("With label", "带标签")} description={d("The “or” divider between login and register.", "登录 / 注册中间的「或者」。")} code={`<Divider label="or" />`}>
        <Stack gap="sm"><Text size="sm">{d("Continue with username and password", "使用账号密码继续")}</Text><Divider label={d("or", "或者")} /><TextLink href="/examples/login">{d("Sign in with SSO", "使用 SSO 登录")}</TextLink></Stack>
      </DocDemo>
      <DocDemo title={d("Vertical", "竖向")} description={d("Inline meta separator.", "行内元信息分隔。")} code={`<Text>Production</Text>
<Divider vertical />
<Text variant="muted">cn-east</Text>`}>
        <div className="showcase-row" style={{ alignItems: 'center', height: 32 }}><Text>{d("Production", "生产")}</Text><Divider vertical /><Text variant="muted">cn-east</Text><Divider vertical /><Text variant="muted">v1.2.0</Text></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
