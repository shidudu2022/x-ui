import { Radio, RadioGroup } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('radio')
const props: PropDef[] = [{ name: 'label', type: 'ReactNode', desc: '文案' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]

export function RadioDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<RadioGroup>
  <Radio name="demo" value="a" defaultChecked label="选项 A" />
  <Radio name="demo" value="b" label="选项 B" />
</RadioGroup>`}>
        <RadioGroup><Radio name="doc-radio" value="a" defaultChecked label="选项 A" /><Radio name="doc-radio" value="b" label="选项 B" /></RadioGroup>
      </DocDemo>
      <DocDemo title="禁用" code={`<Radio name="x" value="a" disabled label="禁用" />
<Radio name="x" value="b" disabled defaultChecked label="禁用已选" />`}>
        <RadioGroup><Radio name="doc-radio-dis" value="a" disabled label="禁用" /><Radio name="doc-radio-dis" value="b" disabled defaultChecked label="禁用已选" /></RadioGroup>
      </DocDemo>
    </ComponentDocLayout>
  )
}
