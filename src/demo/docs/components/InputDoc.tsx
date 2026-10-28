import { Input } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('input')
const props: PropDef[] = [{ name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", desc: { en: "Sizes", zh: "尺寸" } }, { name: 'invalid', type: 'boolean', desc: { en: "Validation failed", zh: "校验失败" } }, { name: 'disabled', type: 'boolean', desc: { en: "Disabled", zh: "禁用" } }]

export function InputDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Sizes", "尺寸")} code={`<Input size="sm" placeholder="sm" />
<Input placeholder="md" />
<Input size="lg" placeholder="lg" />`}>
        <div className="stack" style={{ maxWidth: 280 }}><Input size="sm" placeholder="sm" /><Input placeholder="md" /><Input size="lg" placeholder="lg" /></div>
      </DocDemo>
      <DocDemo title={d("Enhanced", "增强")} code={`<Input invalid placeholder="invalid" />
<Input disabled defaultValue="disabled" />`}>
        <div className="stack" style={{ maxWidth: 280 }}><Input invalid placeholder="invalid" /><Input disabled defaultValue="disabled" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
