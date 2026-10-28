import { Input, InputGroup } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('input-group')
const props: PropDef[] = [{ name: 'prefix', type: 'ReactNode', desc: { en: "Prefix", zh: "前缀" } }, { name: 'suffix', type: 'ReactNode', desc: { en: "Suffix", zh: "后缀" } }, { name: 'size', type: "'sm'|'md'|'lg'", desc: { en: "Sizes", zh: "尺寸" } }]

export function InputGroupDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Prefix / suffix", "前缀 / 后缀")} code={`<InputGroup prefix="https://" suffix=".com">
  <Input placeholder="example" />
</InputGroup>`}>
        <InputGroup prefix="https://" suffix=".com"><Input placeholder="example" /></InputGroup>
      </DocDemo>
      <DocDemo title={d("Sizes", "尺寸")} code={`<InputGroup size="sm" prefix="¥"><Input /></InputGroup>
<InputGroup size="lg" suffix="GB"><Input /></InputGroup>`}>
        <div className="stack" style={{ maxWidth: 280 }}><InputGroup size="sm" prefix="¥"><Input placeholder="sm" /></InputGroup><InputGroup size="lg" suffix="GB"><Input placeholder="lg" /></InputGroup></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
