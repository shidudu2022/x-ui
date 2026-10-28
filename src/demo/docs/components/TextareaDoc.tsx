import { Textarea } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('textarea')
const props: PropDef[] = [{ name: 'rows', type: 'number', desc: '行数' }, { name: 'size', type: "'sm'|'md'|'lg'", desc: '尺寸' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }]

export function TextareaDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Textarea rows={3} placeholder="备注" />`}>
        <Textarea rows={3} placeholder="备注" />
      </DocDemo>
      <DocDemo title="尺寸" code={`<Textarea size="sm" rows={2} placeholder="sm" />
<Textarea size="lg" rows={2} placeholder="lg" />`}>
        <div className="stack"><Textarea size="sm" rows={2} placeholder="sm" /><Textarea size="lg" rows={2} placeholder="lg" /></div>
      </DocDemo>
      <DocDemo title="增强" code={`<Textarea invalid rows={2} placeholder="invalid" />
<Textarea disabled rows={2} defaultValue="disabled" />`}>
        <div className="stack"><Textarea invalid rows={2} placeholder="invalid" /><Textarea disabled rows={2} defaultValue="disabled" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
