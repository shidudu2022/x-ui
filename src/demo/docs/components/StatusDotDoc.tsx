import { StatusDot } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('status-dot')
const props: PropDef[] = [{ name: 'tone', type: "'ok'|'bad'|'warn'|'neutral'|'info'", desc: { en: "Tones", zh: "色调" } }, { name: 'ok', type: 'boolean', desc: { en: "Shortcut mapping for ok/bad", zh: "快捷映射 ok/bad" } }, { name: 'label', type: 'string', desc: { en: "Accessible name", zh: "无障碍名称" } }]

export function StatusDotDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Tones", "色调")} code={`<StatusDot tone="ok" />
<StatusDot tone="warn" />
<StatusDot tone="bad" />
<StatusDot tone="info" />
<StatusDot tone="neutral" />`}>
        <div className="showcase-row"><StatusDot tone="ok" /><StatusDot tone="warn" /><StatusDot tone="bad" /><StatusDot tone="info" /><StatusDot tone="neutral" /></div>
      </DocDemo>
      <DocDemo title={d("Quick OK", "快捷 ok")} code={`<StatusDot ok />
<StatusDot ok={false} />`}>
        <div className="showcase-row"><StatusDot ok /><StatusDot ok={false} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
