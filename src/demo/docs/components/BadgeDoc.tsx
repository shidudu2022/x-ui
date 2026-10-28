import { Badge } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('badge')
const props: PropDef[] = [{ name: 'tone', type: "'success'|'warn'|'danger'|'info'|'neutral'", default: "'neutral'", desc: { en: "Semantic tone", zh: "语义色" } }, { name: 'size', type: "'sm'|'md'", default: "'md'", desc: { en: "Sizes", zh: "尺寸" } }, { name: 'bordered', type: 'boolean', default: 'true', desc: { en: "Stroke", zh: "描边" } }]

export function BadgeDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Tones", "色调")} code={`<Badge>neutral</Badge>
<Badge tone="info">info</Badge>
<Badge tone="success">success</Badge>
<Badge tone="warn">warn</Badge>
<Badge tone="danger">danger</Badge>`}>
        <div className="showcase-row"><Badge>neutral</Badge><Badge tone="info">info</Badge><Badge tone="success">success</Badge><Badge tone="warn">warn</Badge><Badge tone="danger">danger</Badge></div>
      </DocDemo>
      <DocDemo title={d("Sizes", "尺寸")} code={`<Badge size="sm">sm</Badge>
<Badge size="md">md</Badge>`}>
        <div className="showcase-row"><Badge size="sm" tone="success">sm</Badge><Badge size="md" tone="success">md</Badge></div>
      </DocDemo>
      <DocDemo title={d("Enhanced", "增强")} description={d("bordered=false uses a solid fill.", "bordered=false 为纯填充。")} code={`<Badge bordered={false} tone="info">plain</Badge>
<Badge bordered tone="info">bordered</Badge>`}>
        <div className="showcase-row"><Badge bordered={false} tone="info">plain</Badge><Badge bordered tone="info">bordered</Badge></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
