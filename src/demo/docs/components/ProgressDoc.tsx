import { Progress } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('progress')
const props: PropDef[] = [{ name: 'value', type: 'number', desc: '0–100' }, { name: 'tone', type: "'default'|'success'|'warn'|'danger'|'info'|'muted'", desc: '色调' }, { name: 'indeterminate', type: 'boolean', desc: '不确定' }, { name: 'label', type: 'string', desc: '标签' }]

export function ProgressDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="色调" code={`<Progress label="default" value={62} />
<Progress label="success" value={62} tone="success" />
<Progress label="warn" value={82} tone="warn" />
<Progress label="danger" value={40} tone="danger" />
<Progress label="info" value={55} tone="info" />
<Progress label="muted" value={30} tone="muted" />`}>
        <div className="stack"><Progress label="default" value={62} /><Progress label="success" value={62} tone="success" /><Progress label="warn" value={82} tone="warn" /><Progress label="danger" value={40} tone="danger" /><Progress label="info" value={55} tone="info" /><Progress label="muted" value={30} tone="muted" /></div>
      </DocDemo>
      <DocDemo title="不确定" code={`<Progress label="处理中" indeterminate />`}>
        <Progress label="处理中" indeterminate />
      </DocDemo>
    </ComponentDocLayout>
  )
}
