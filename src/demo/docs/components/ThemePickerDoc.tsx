import { ThemePicker } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('theme-picker')
const props: PropDef[] = [{ name: 'value', type: 'ThemeId', desc: { en: "Controlled theme", zh: "受控主题" } }, { name: 'onChange', type: '(theme: ThemeId) => void', desc: { en: "Change", zh: "变更" } }]

export function ThemePickerDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<ThemePicker />`}>
        <ThemePicker />
      </DocDemo>
    </ComponentDocLayout>
  )
}
