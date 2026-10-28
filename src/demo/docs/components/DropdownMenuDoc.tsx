import { Button, DropdownMenu } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('dropdown-menu')
const props: PropDef[] = [{ name: 'trigger', type: 'ReactNode', desc: '触发器' }, { name: 'items', type: 'DropdownItem[]', desc: '菜单项（danger / disabled / separator）' }, { name: 'align', type: "'start'|'end'", default: "'end'", desc: '对齐' }]

export function DropdownMenuDoc() {
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<DropdownMenu
  trigger={<Button>菜单</Button>}
  items={[
    { id: 'edit', label: '编辑', onSelect: () => {} },
    { id: 'sep', label: '', separator: true },
    { id: 'del', label: '删除', danger: true, onSelect: () => {} },
  ]}
/>`}>
        <DropdownMenu trigger={<Button>菜单</Button>} items={[{ id: 'edit', label: '编辑', onSelect: () => undefined }, { id: 'sep', label: '', separator: true }, { id: 'del', label: '删除', danger: true, onSelect: () => undefined }]} />
      </DocDemo>
      <DocDemo title="增强" description="禁用项与 start 对齐。" code={`<DropdownMenu
  align="start"
  trigger={<Button variant="ghost">更多</Button>}
  items={[
    { id: 'a', label: '查看', onSelect: () => {} },
    { id: 'b', label: '归档', disabled: true },
    { id: 'c', label: '删除', danger: true, onSelect: () => {} },
  ]}
/>`}>
        <DropdownMenu align="start" trigger={<Button variant="ghost">更多</Button>} items={[{ id: 'a', label: '查看', onSelect: () => undefined }, { id: 'b', label: '归档', disabled: true }, { id: 'sep', label: '', separator: true }, { id: 'c', label: '删除', danger: true, onSelect: () => undefined }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
