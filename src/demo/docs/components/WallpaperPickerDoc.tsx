import { WallpaperPicker } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('wallpaper-picker')
const props: PropDef[] = [{ name: 'value', type: 'WallpaperId', desc: { en: "Controlled wallpaper", zh: "受控壁纸" } }, { name: 'onChange', type: '(id: WallpaperId) => void', desc: { en: "Change", zh: "变更" } }]

export function WallpaperPickerDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} description={d("Usually paired with the glass theme.", "通常配合 glass 主题使用。")} code={`<WallpaperPicker />`}>
        <WallpaperPicker />
      </DocDemo>
    </ComponentDocLayout>
  )
}
