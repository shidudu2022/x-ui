import { useState } from 'react'
import { Checklist } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('checklist')
const props: PropDef[] = [{ name: 'items', type: 'ChecklistItem[]', desc: { en: "Items; may include description / disabled", zh: "项；可含 description / disabled" } }, { name: 'onChange', type: '(id, checked) => void', desc: { en: "Change", zh: "变更" } }]

export function ChecklistDoc() {
  const d = useDemoT()
  const [items, setItems] = useState([
    { id: 'a', title: d("Configure network", "配置网络"), description: d("VPC / subnet", "VPC / 子网"), checked: true },
    { id: 'b', title: d("Bind domain", "绑定域名"), checked: false },
    { id: 'c', title: d("Enable TLS", "开启 TLS"), checked: false, disabled: true },
  ])
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic & disabled items", "基础 / 禁用项")} description={d("Includes description and disabled items.", "含 description 与 disabled 项。")} code={`<Checklist
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
