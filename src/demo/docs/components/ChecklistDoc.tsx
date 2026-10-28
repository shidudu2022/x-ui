import { useState } from 'react'
import { Checklist } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('checklist')
const props: PropDef[] = [{ name: 'items', type: 'ChecklistItem[]', desc: '项；可含 description / disabled' }, { name: 'onChange', type: '(id, checked) => void', desc: '变更' }]

export function ChecklistDoc() {
  const [items, setItems] = useState([
    { id: 'a', title: '配置网络', description: 'VPC / 子网', checked: true },
    { id: 'b', title: '绑定域名', checked: false },
    { id: 'c', title: '开启 TLS', checked: false, disabled: true },
  ])
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础 / 禁用项" description="含 description 与 disabled 项。" code={`<Checklist
  items={items}
  onChange={(id, checked) =>
    setItems((list) =>
      list.map((it) => (it.id === id ? { ...it, checked } : it)),
    )
  }
/>`}>
        <Checklist items={items} onChange={(id, checked) => setItems((list) => list.map((it) => (it.id === id ? { ...it, checked } : it)))} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
