import { Card, Divider, Stack, Text, TextLink } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('divider')
const props: PropDef[] = [{ name: 'label', type: 'ReactNode', desc: '中间文案' }, { name: 'vertical', type: 'boolean', desc: '竖向分隔' }]

export function DividerDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="区块分隔" description="同一卡片内切开上下内容。" code={`<Stack>
  <Text>上方：概要信息</Text>
  <Divider />
  <Text variant="muted">下方：补充说明</Text>
</Stack>`}>
        <Card padded><Stack><Text>上方：概要信息</Text><Divider /><Text variant="muted">下方：补充说明或次要操作区。</Text></Stack></Card>
      </DocDemo>
      <DocDemo title="带标签" description="登录 / 注册中间的「或者」。" code={`<Divider label="或者" />`}>
        <Stack gap="sm"><Text size="sm">使用账号密码继续</Text><Divider label="或者" /><TextLink href="/examples/login">使用 SSO 登录</TextLink></Stack>
      </DocDemo>
      <DocDemo title="竖向" description="行内元信息分隔。" code={`<Text>生产</Text>
<Divider vertical />
<Text variant="muted">cn-east</Text>`}>
        <div className="showcase-row" style={{ alignItems: 'center', height: 32 }}><Text>生产</Text><Divider vertical /><Text variant="muted">cn-east</Text><Divider vertical /><Text variant="muted">v1.2.0</Text></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
