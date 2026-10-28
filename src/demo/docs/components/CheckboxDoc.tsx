import { Checkbox } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('checkbox')
const props: PropDef[] = [{ name: 'label', type: 'ReactNode', desc: '文案' }, { name: 'checked', type: 'boolean', desc: '受控选中' }, { name: 'disabled', type: 'boolean', desc: '禁用' }]

export function CheckboxDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Checkbox label="未选" />
<Checkbox defaultChecked label="已选" />`}>
        <div className="stack"><Checkbox label="未选" /><Checkbox defaultChecked label="已选" /></div>
      </DocDemo>
      <DocDemo title="禁用" code={`<Checkbox disabled label="禁用未选" />
<Checkbox disabled defaultChecked label="禁用已选" />`}>
        <div className="stack"><Checkbox disabled label="禁用未选" /><Checkbox disabled defaultChecked label="禁用已选" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
