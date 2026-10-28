import { useState } from 'react'
import { Button } from '@/components/ui'
import { ThemeDrawer } from '@/components/layout'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('theme-drawer')
const props: PropDef[] = [{ name: 'open', type: 'boolean', desc: '打开' }, { name: 'onClose', type: '() => void', desc: '关闭' }]

export function ThemeDrawerDoc() {
  const [open, setOpen] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" description="深浅色 / 主题 / 壁纸 / 强调色 / 密度。" code={`<Button onClick={() => setOpen(true)}>外观</Button>
<ThemeDrawer open={open} onClose={() => setOpen(false)} />`}>
        <><Button onClick={() => setOpen(true)}>打开外观抽屉</Button><ThemeDrawer open={open} onClose={() => setOpen(false)} /></>
      </DocDemo>
    </ComponentDocLayout>
  )
}
