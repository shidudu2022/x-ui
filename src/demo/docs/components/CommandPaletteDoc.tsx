import { useState } from 'react'
import { Button, CommandPalette } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('command-palette')
const props: PropDef[] = [{ name: 'open', type: 'boolean', desc: '是否打开' }, { name: 'onClose', type: '() => void', desc: '关闭' }, { name: 'items', type: 'CommandItem[]', desc: '命令项' }, { name: 'placeholder', type: 'string', desc: '搜索框' }]

export function CommandPaletteDoc() {
  const [open, setOpen] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" description="点击打开命令面板。" code={`const [open, setOpen] = useState(false)
<Button onClick={() => setOpen(true)}>打开 ⌘K</Button>
<CommandPalette
  open={open}
  onClose={() => setOpen(false)}
  items={[
    { id: 'home', label: '首页', group: '导航', onSelect: () => {} },
    { id: 'settings', label: '设置', group: '导航' },
  ]}
/>`}>
        <><Button onClick={() => setOpen(true)}>打开命令面板</Button><CommandPalette open={open} onClose={() => setOpen(false)} items={[{ id: 'home', label: '首页', group: '导航', onSelect: () => setOpen(false) }, { id: 'settings', label: '外观设置', group: '导航', onSelect: () => setOpen(false) }, { id: 'docs', label: '组件文档', group: '帮助', onSelect: () => setOpen(false) }]} /></>
      </DocDemo>
    </ComponentDocLayout>
  )
}
