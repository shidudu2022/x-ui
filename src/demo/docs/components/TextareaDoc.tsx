import { Textarea } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('textarea')
const props: PropDef[] = [{ name: 'rows', type: 'number', desc: { en: "Rows", zh: "行数" } }, { name: 'size', type: "'sm'|'md'|'lg'", desc: { en: "Sizes", zh: "尺寸" } }, { name: 'invalid', type: 'boolean', desc: { en: "Validation failed", zh: "校验失败" } }]

export function TextareaDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Textarea rows={3} placeholder="Notes" />`}>
        <Textarea rows={3} placeholder={d("Notes", "备注")} />
      </DocDemo>
      <DocDemo title={d("Sizes", "尺寸")} code={`<Textarea size="sm" rows={2} placeholder="sm" />
<Textarea size="lg" rows={2} placeholder="lg" />`}>
        <div className="stack"><Textarea size="sm" rows={2} placeholder="sm" /><Textarea size="lg" rows={2} placeholder="lg" /></div>
      </DocDemo>
      <DocDemo title={d("Enhanced", "增强")} code={`<Textarea invalid rows={2} placeholder="invalid" />
<Textarea disabled rows={2} defaultValue="disabled" />`}>
        <div className="stack"><Textarea invalid rows={2} placeholder="invalid" /><Textarea disabled rows={2} defaultValue="disabled" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
