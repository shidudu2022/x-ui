import { Radio, RadioGroup } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('radio')
const props: PropDef[] = [{ name: 'label', type: 'ReactNode', desc: { en: "Copy text", zh: "文案" } }, { name: 'disabled', type: 'boolean', desc: { en: "Disabled", zh: "禁用" } }]

export function RadioDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<RadioGroup>
  <Radio name="demo" value="a" defaultChecked label="Option A" />
  <Radio name="demo" value="b" label="Option B" />
</RadioGroup>`}>
        <RadioGroup><Radio name="doc-radio" value="a" defaultChecked label={d("Option A", "选项 A")} /><Radio name="doc-radio" value="b" label={d("Option B", "选项 B")} /></RadioGroup>
      </DocDemo>
      <DocDemo title={d("Disabled", "禁用")} code={`<Radio name="x" value="a" disabled label="Disabled" />
<Radio name="x" value="b" disabled defaultChecked label="Disabled, checked" />`}>
        <RadioGroup><Radio name="doc-radio-dis" value="a" disabled label={d("Disabled", "禁用")} /><Radio name="doc-radio-dis" value="b" disabled defaultChecked label={d("Disabled, checked", "禁用已选")} /></RadioGroup>
      </DocDemo>
    </ComponentDocLayout>
  )
}
