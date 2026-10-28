import { WallpaperPicker } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('wallpaper-picker')
const props: PropDef[] = [{ name: 'value', type: 'WallpaperId', desc: '受控壁纸' }, { name: 'onChange', type: '(id: WallpaperId) => void', desc: '变更' }]

export function WallpaperPickerDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" description="通常配合 glass 主题使用。" code={`<WallpaperPicker />`}>
        <WallpaperPicker />
      </DocDemo>
    </ComponentDocLayout>
  )
}
