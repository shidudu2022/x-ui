import { AccentPicker } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('accent-picker')
const props: PropDef[] = [{ name: 'value', type: 'Accent', desc: { en: "Controlled accent color", zh: "受控强调色" } }, { name: 'onChange', type: '(accent: Accent) => void', desc: { en: "Change; writes to Appearance by default", zh: "变更；默认写入 Appearance" } }]

export function AccentPickerDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} description={d("When value is omitted, reads/writes AppearanceProvider.", "未传 value 时读写 AppearanceProvider。")} code={`<AccentPicker />`}>
        <AccentPicker />
      </DocDemo>
    </ComponentDocLayout>
  )
}
