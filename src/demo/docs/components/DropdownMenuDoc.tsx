import { Button, DropdownMenu } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('dropdown-menu')
const props: PropDef[] = [{ name: 'trigger', type: 'ReactNode', desc: { en: "Trigger", zh: "触发器" } }, { name: 'items', type: 'DropdownItem[]', desc: { en: "Menu items (danger / disabled / separator)", zh: "菜单项（danger / disabled / separator）" } }, { name: 'align', type: "'start'|'end'", default: "'end'", desc: { en: "Alignment", zh: "对齐" } }]

export function DropdownMenuDoc() {
  const d = useDemoT()
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<DropdownMenu
  trigger={<Button>Menu</Button>}
  items={[
    { id: 'edit', label: 'Edit', onSelect: () => {} },
    { id: 'sep', label: '', separator: true },
    { id: 'del', label: 'Delete', danger: true, onSelect: () => {} },
  ]}
/>`}>
        <DropdownMenu trigger={<Button>{d("Menu", "菜单")}</Button>} items={[{ id: 'edit', label: d("Edit", "编辑"), onSelect: () => undefined }, { id: 'sep', label: '', separator: true }, { id: 'del', label: d("Delete", "删除"), danger: true, onSelect: () => undefined }]} />
      </DocDemo>
      <DocDemo title={d("Enhanced", "增强")} description={d("Disabled items align with start.", "禁用项与 start 对齐。")} code={`<DropdownMenu
  align="start"
  trigger={<Button variant="ghost">More</Button>}
  items={[
    { id: 'a', label: 'View', onSelect: () => {} },
    { id: 'b', label: 'Archive', disabled: true },
    { id: 'c', label: 'Delete', danger: true, onSelect: () => {} },
  ]}
/>`}>
        <DropdownMenu align="start" trigger={<Button variant="ghost">{d("More", "更多")}</Button>} items={[{ id: 'a', label: d("View", "查看"), onSelect: () => undefined }, { id: 'b', label: d("Archive", "归档"), disabled: true }, { id: 'sep', label: '', separator: true }, { id: 'c', label: d("Delete", "删除"), danger: true, onSelect: () => undefined }]} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
