import { Card, Mono, Muted, Text } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('text')
const props: PropDef[] = [{ name: 'variant', type: "'body'|'muted'|'faint'|'strong'|'mono'|'label'|'hint'|'caption'", default: "'body'", desc: '角色（颜色 / 字重）' }, { name: 'size', type: "'xs'|'sm'|'md'|'base'|'lg'|'xl'", desc: '字号阶梯' }, { name: 'as', type: 'ElementType', desc: '渲染标签，默认 span（hint/caption 为 p）' }]

export function TextDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="角色" description="按信息权重选 variant，而不是手写颜色。" code={`<Text>正文说明当前状态与下一步操作。</Text>
<Text variant="muted">次要说明、时间、归属。</Text>
<Text variant="faint">占位或分隔性文案。</Text>
<Text variant="strong">需要扫读的关键数字或名称。</Text>
<Text variant="mono">ns/default/api-gateway</Text>
<Text variant="label">字段标签</Text>
<Text variant="hint">输入提示，放在控件下方。</Text>
<Text variant="caption">脚注、版权或补充说明。</Text>`}>
        <div className="stack"><Text>正文说明当前状态与下一步操作。</Text><Text variant="muted">次要说明、时间、归属。</Text><Text variant="faint">占位或分隔性文案。</Text><Text variant="strong">需要扫读的关键数字或名称。</Text><Text variant="mono">ns/default/api-gateway</Text><Text variant="label">字段标签</Text><Text variant="hint">输入提示，放在控件下方。</Text><Text variant="caption">脚注、版权或补充说明。</Text></div>
      </DocDemo>
      <DocDemo title="字号" description="对应 --fs-xs … --fs-xl；业务文案优先用 size，少写 inline fontSize。" code={`<Text size="xs">xs · 辅助标注</Text>
<Text size="sm">sm · 提示 / 次要</Text>
<Text size="md">md · 表头邻近密度</Text>
<Text size="base">base · 正文默认</Text>
<Text size="lg">lg · 小标题感</Text>
<Text size="xl">xl · 卡片强调</Text>`}>
        <div className="stack"><Text size="xs">xs · 辅助标注 / Badge 邻近</Text><Text size="sm">sm · 提示、次要文案</Text><Text size="md">md · 表头、KV 密度</Text><Text size="base">base · 正文默认（14px）</Text><Text size="lg">lg · 略强调的正文</Text><Text size="xl">xl · 卡片内强调句</Text></div>
      </DocDemo>
      <DocDemo title="段落组合" description="strong 标题句 + muted 说明 + mono 标识。" code={`<Text variant="strong" as="p">api-gateway</Text>
<Text variant="muted" as="p">生产环境 · cn-east</Text>
<Mono>deploy/2026-10-28-a1</Mono>`}>
        <Card padded className="stack"><Text variant="strong" as="p">api-gateway</Text><Text variant="muted" as="p">生产环境 · cn-east · 最近同步 2 分钟前</Text><Mono>deploy/2026-10-28-a1</Mono><Muted as="p">Muted / Mono 是常用快捷封装。</Muted></Card>
      </DocDemo>
    </ComponentDocLayout>
  )
}
