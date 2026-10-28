import { AccentPicker } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('accent-picker')
const props: PropDef[] = [{ name: 'value', type: 'Accent', desc: '受控强调色' }, { name: 'onChange', type: '(accent: Accent) => void', desc: '变更；默认写入 Appearance' }]

export function AccentPickerDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" description="未传 value 时读写 AppearanceProvider。" code={`<AccentPicker />`}>
        <AccentPicker />
      </DocDemo>
    </ComponentDocLayout>
  )
}
