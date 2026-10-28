import { useState } from 'react'
import { Button } from '@/components/ui'
import { ThemeDrawer } from '@/components/layout'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('theme-drawer')
const props: PropDef[] = [{ name: 'open', type: 'boolean', desc: { en: "Open", zh: "打开" } }, { name: 'onClose', type: '() => void', desc: { en: "Close", zh: "关闭" } }]

export function ThemeDrawerDoc() {
  const d = useDemoT()
  const [open, setOpen] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} description={d("Light/dark, theme, wallpaper, accent, and density.", "深浅色 / 主题 / 壁纸 / 强调色 / 密度。")} code={`<Button onClick={() => setOpen(true)}>Appearance</Button>
<ThemeDrawer open={open} onClose={() => setOpen(false)} />`}>
        <><Button onClick={() => setOpen(true)}>{d("Open appearance drawer", "打开外观抽屉")}</Button><ThemeDrawer open={open} onClose={() => setOpen(false)} /></>
      </DocDemo>
    </ComponentDocLayout>
  )
}
