import { ThemePicker } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('theme-picker')
const props: PropDef[] = [{ name: 'value', type: 'ThemeId', desc: '受控主题' }, { name: 'onChange', type: '(theme: ThemeId) => void', desc: '变更' }]

export function ThemePickerDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<ThemePicker />`}>
        <ThemePicker />
      </DocDemo>
    </ComponentDocLayout>
  )
}
