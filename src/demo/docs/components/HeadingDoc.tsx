import { Card, Heading, Text } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('heading')
const props: PropDef[] = [{ name: 'level', type: "'page'|'section'|'card'|'sub'", default: "'card'", desc: '语义层级（映射 h1–h4）' }, { name: 'as', type: 'ElementType', desc: '覆盖标签' }]

export function HeadingDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="层级" description="page → section → card → sub，对应页面主标题到步骤小标题。" code={`<Heading level="page">工作负载</Heading>
<Heading level="section">运行概况</Heading>
<Heading level="card">副本集</Heading>
<Heading level="sub">健康检查</Heading>`}>
        <div className="stack"><Heading level="page">工作负载</Heading><Heading level="section">运行概况</Heading><Heading level="card">副本集</Heading><Heading level="sub">健康检查</Heading></div>
      </DocDemo>
      <DocDemo title="标题 + 说明" description="区块标题下接 muted 正文，是详情/设置最常见的排版。" code={`<Heading level="section">访问控制</Heading>
<Text variant="muted" as="p">
  定义谁可以读取与变更此资源。更改将写入审计日志。
</Text>`}>
        <Card padded className="stack"><Heading level="section">访问控制</Heading><Text variant="muted" as="p">定义谁可以读取与变更此资源。更改将写入审计日志。</Text><Heading level="card">成员</Heading><Text as="p">当前 3 位管理员、12 位只读成员。</Text></Card>
      </DocDemo>
    </ComponentDocLayout>
  )
}
