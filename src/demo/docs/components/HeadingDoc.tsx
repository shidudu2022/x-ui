import { Card, Heading, Text } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('heading')
const props: PropDef[] = [{ name: 'level', type: "'page'|'section'|'card'|'sub'", default: "'card'", desc: { en: "Semantic level (maps to h1–h4)", zh: "语义层级（映射 h1–h4）" } }, { name: 'as', type: 'ElementType', desc: { en: "Override label", zh: "覆盖标签" } }]

export function HeadingDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Levels", "层级")} description={d("page → section → card → sub maps page title down to step subheads.", "page → section → card → sub，对应页面主标题到步骤小标题。")} code={`<Heading level="page">Workloads</Heading>
<Heading level="section">Runtime overview</Heading>
<Heading level="card">Replica set</Heading>
<Heading level="sub">Health check</Heading>`}>
        <div className="stack"><Heading level="page">{d("Workloads", "工作负载")}</Heading><Heading level="section">{d("Runtime overview", "运行概况")}</Heading><Heading level="card">{d("Replica set", "副本集")}</Heading><Heading level="sub">{d("Health check", "健康检查")}</Heading></div>
      </DocDemo>
      <DocDemo title={d("Title & description", "标题 + 说明")} description={d("Section title followed by muted body copy — typical detail/settings layout.", "区块标题下接 muted 正文，是详情/设置最常见的排版。")} code={`<Heading level="section">Access control</Heading>
<Text variant="muted" as="p">
  Defines who can read and change this resource. Changes are written to the audit log.
</Text>`}>
        <Card padded className="stack"><Heading level="section">{d("Access control", "访问控制")}</Heading><Text variant="muted" as="p">{d("Defines who can read and change this resource. Changes are written to the audit log.", "定义谁可以读取与变更此资源。更改将写入审计日志。")}</Text><Heading level="card">{d("Members", "成员")}</Heading><Text as="p">{d("Currently 3 admins and 12 read-only members.", "当前 3 位管理员、12 位只读成员。")}</Text></Card>
      </DocDemo>
    </ComponentDocLayout>
  )
}
