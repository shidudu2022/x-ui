import { StatusDot } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('status-dot')
const props: PropDef[] = [{ name: 'tone', type: "'ok'|'bad'|'warn'|'neutral'|'info'", desc: '色调' }, { name: 'ok', type: 'boolean', desc: '快捷映射 ok/bad' }, { name: 'label', type: 'string', desc: '无障碍名称' }]

export function StatusDotDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="色调" code={`<StatusDot tone="ok" />
<StatusDot tone="warn" />
<StatusDot tone="bad" />
<StatusDot tone="info" />
<StatusDot tone="neutral" />`}>
        <div className="showcase-row"><StatusDot tone="ok" /><StatusDot tone="warn" /><StatusDot tone="bad" /><StatusDot tone="info" /><StatusDot tone="neutral" /></div>
      </DocDemo>
      <DocDemo title="快捷 ok" code={`<StatusDot ok />
<StatusDot ok={false} />`}>
        <div className="showcase-row"><StatusDot ok /><StatusDot ok={false} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
