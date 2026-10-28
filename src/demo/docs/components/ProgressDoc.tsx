import { Progress } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('progress')
const props: PropDef[] = [{ name: 'value', type: 'number', desc: '0–100' }, { name: 'tone', type: "'default'|'success'|'warn'|'danger'|'info'|'muted'", desc: { en: "Tones", zh: "色调" } }, { name: 'indeterminate', type: 'boolean', desc: { en: "Indeterminate", zh: "不确定" } }, { name: 'label', type: 'string', desc: { en: "Label", zh: "标签" } }]

export function ProgressDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Tones", "色调")} code={`<Progress label="default" value={62} />
<Progress label="success" value={62} tone="success" />
<Progress label="warn" value={82} tone="warn" />
<Progress label="danger" value={40} tone="danger" />
<Progress label="info" value={55} tone="info" />
<Progress label="muted" value={30} tone="muted" />`}>
        <div className="stack"><Progress label="default" value={62} /><Progress label="success" value={62} tone="success" /><Progress label="warn" value={82} tone="warn" /><Progress label="danger" value={40} tone="danger" /><Progress label="info" value={55} tone="info" /><Progress label="muted" value={30} tone="muted" /></div>
      </DocDemo>
      <DocDemo title={d("Indeterminate", "不确定")} code={`<Progress label="Processing" indeterminate />`}>
        <Progress label={d("Processing", "处理中")} indeterminate />
      </DocDemo>
    </ComponentDocLayout>
  )
}
