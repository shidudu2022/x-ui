import { Card, Mono, Muted, Text } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('text')
const props: PropDef[] = [{ name: 'variant', type: "'body'|'muted'|'faint'|'strong'|'mono'|'label'|'hint'|'caption'", default: "'body'", desc: { en: "Role (color / weight)", zh: "角色（颜色 / 字重）" } }, { name: 'size', type: "'xs'|'sm'|'md'|'base'|'lg'|'xl'", desc: { en: "Font-size scale", zh: "字号阶梯" } }, { name: 'as', type: 'ElementType', desc: { en: "Rendered tag, defaults to span (hint/caption use p)", zh: "渲染标签，默认 span（hint/caption 为 p）" } }]

export function TextDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Roles", "角色")} description={d("Pick variant by information weight instead of hand-picking colors.", "按信息权重选 variant，而不是手写颜色。")} code={`<Text>Body copy explains the current state and next action.</Text>
<Text variant="muted">Secondary notes, time, ownership.</Text>
<Text variant="faint">Placeholder or separator copy.</Text>
<Text variant="strong">Key numbers or names meant to be scanned quickly.</Text>
<Text variant="mono">ns/default/api-gateway</Text>
<Text variant="label">Field label</Text>
<Text variant="hint">Input hint, placed below the control.</Text>
<Text variant="caption">Footnotes, copyright, or supplementary notes.</Text>`}>
        <div className="stack"><Text>{d("Body copy explains the current state and next action.", "正文说明当前状态与下一步操作。")}</Text><Text variant="muted">{d("Secondary notes, time, ownership.", "次要说明、时间、归属。")}</Text><Text variant="faint">{d("Placeholder or separator copy.", "占位或分隔性文案。")}</Text><Text variant="strong">{d("Key numbers or names meant to be scanned quickly.", "需要扫读的关键数字或名称。")}</Text><Text variant="mono">ns/default/api-gateway</Text><Text variant="label">{d("Field label", "字段标签")}</Text><Text variant="hint">{d("Input hint, placed below the control.", "输入提示，放在控件下方。")}</Text><Text variant="caption">{d("Footnotes, copyright, or supplementary notes.", "脚注、版权或补充说明。")}</Text></div>
      </DocDemo>
      <DocDemo title={d("Font sizes", "字号")} description={d("Maps to --fs-xs … --fs-xl; prefer size for copy, avoid inline fontSize.", "对应 --fs-xs … --fs-xl；业务文案优先用 size，少写 inline fontSize。")} code={`<Text size="xs">xs · auxiliary annotation</Text>
<Text size="sm">sm · hint / secondary</Text>
<Text size="md">md · header-adjacent density</Text>
<Text size="base">base · body default</Text>
<Text size="lg">lg · subheading feel</Text>
<Text size="xl">xl · card emphasis</Text>`}>
        <div className="stack"><Text size="xs">{d("xs · auxiliary annotation / near a Badge", "xs · 辅助标注 / Badge 邻近")}</Text><Text size="sm">{d("sm · hint, secondary copy", "sm · 提示、次要文案")}</Text><Text size="md">{d("md · header / KV density", "md · 表头、KV 密度")}</Text><Text size="base">{d("base · body default (14px)", "base · 正文默认（14px）")}</Text><Text size="lg">{d("lg · slightly emphasized body", "lg · 略强调的正文")}</Text><Text size="xl">{d("xl · emphasis sentence in a card", "xl · 卡片内强调句")}</Text></div>
      </DocDemo>
      <DocDemo title={d("Paragraph composition", "段落组合")} description={d("Strong title line + muted description + mono identifier.", "strong 标题句 + muted 说明 + mono 标识。")} code={`<Text variant="strong" as="p">api-gateway</Text>
<Text variant="muted" as="p">Production · cn-east</Text>
<Mono>deploy/2026-10-28-a1</Mono>`}>
        <Card padded className="stack"><Text variant="strong" as="p">api-gateway</Text><Text variant="muted" as="p">{d("Production · cn-east · last synced 2 minutes ago", "生产环境 · cn-east · 最近同步 2 分钟前")}</Text><Mono>deploy/2026-10-28-a1</Mono><Muted as="p">{d("Muted / Mono are common shortcut wrappers.", "Muted / Mono 是常用快捷封装。")}</Muted></Card>
      </DocDemo>
    </ComponentDocLayout>
  )
}
