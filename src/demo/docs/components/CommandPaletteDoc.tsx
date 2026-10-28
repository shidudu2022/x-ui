import { useState } from 'react'
import { Button, CommandPalette } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('command-palette')
const props: PropDef[] = [{ name: 'open', type: 'boolean', desc: { en: "Whether open", zh: "是否打开" } }, { name: 'onClose', type: '() => void', desc: { en: "Close", zh: "关闭" } }, { name: 'items', type: 'CommandItem[]', desc: { en: "Command items", zh: "命令项" } }, { name: 'placeholder', type: 'string', desc: { en: "Search box", zh: "搜索框" } }]

export function CommandPaletteDoc() {
  const d = useDemoT()
  const [open, setOpen] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} description={d("Click to open the command palette.", "点击打开命令面板。")} code={`const [open, setOpen] = useState(false)
<Button onClick={() => setOpen(true)}>Open ⌘K</Button>
<CommandPalette
  open={open}
  onClose={() => setOpen(false)}
  items={[
    { id: 'home', label: 'Home', group: 'Navigation', onSelect: () => {} },
    { id: 'settings', label: 'Settings', group: 'Navigation' },
  ]}
/>`}>
        <><Button onClick={() => setOpen(true)}>{d("Open command palette", "打开命令面板")}</Button><CommandPalette open={open} onClose={() => setOpen(false)} items={[{ id: 'home', label: d("Home", "首页"), group: d("Navigation", "导航"), onSelect: () => setOpen(false) }, { id: 'settings', label: d("Appearance settings", "外观设置"), group: d("Navigation", "导航"), onSelect: () => setOpen(false) }, { id: 'docs', label: d("Component docs", "组件文档"), group: d("Help", "帮助"), onSelect: () => setOpen(false) }]} /></>
      </DocDemo>
    </ComponentDocLayout>
  )
}
