import { Checkbox } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('checkbox')
const props: PropDef[] = [{ name: 'label', type: 'ReactNode', desc: { en: "Copy text", zh: "文案" } }, { name: 'checked', type: 'boolean', desc: { en: "Controlled checked state", zh: "受控选中" } }, { name: 'disabled', type: 'boolean', desc: { en: "Disabled", zh: "禁用" } }]

export function CheckboxDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Checkbox label="Unchecked" />
<Checkbox defaultChecked label="Selected" />`}>
        <div className="stack"><Checkbox label={d("Unchecked", "未选")} /><Checkbox defaultChecked label={d("Selected", "已选")} /></div>
      </DocDemo>
      <DocDemo title={d("Disabled", "禁用")} code={`<Checkbox disabled label="Disabled, unchecked" />
<Checkbox disabled defaultChecked label="Disabled, checked" />`}>
        <div className="stack"><Checkbox disabled label={d("Disabled, unchecked", "禁用未选")} /><Checkbox disabled defaultChecked label={d("Disabled, checked", "禁用已选")} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
