import { useState } from 'react'
import { Transfer } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('transfer')
const props: PropDef[] = [{ name: 'data', type: 'TransferItem[]', desc: { en: "All items; can be disabled", zh: "全部项；可 disabled" } }, { name: 'targetKeys', type: 'string[]', desc: { en: "Selected on the right", zh: "右侧选中" } }, { name: 'titles', type: '[string, string]', desc: { en: "Titles for both sides", zh: "两侧标题" } }, { name: 'searchable', type: 'boolean', default: 'true', desc: { en: "Search", zh: "搜索" } }]

export function TransferDoc() {
  const d = useDemoT()
  const [keys, setKeys] = useState(['b'])
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} wide code={`<Transfer
  data={[
    { key: 'a', label: 'Node A' },
    { key: 'b', label: 'Node B' },
    { key: 'c', label: 'Node C' },
    { key: 'd', label: 'Under maintenance', disabled: true },
  ]}
  targetKeys={keys}
  onChange={setKeys}
  titles={['Available nodes', 'Selected']}
/>`}>
        <Transfer data={[{ key: 'a', label: d("Node A", "节点 A") }, { key: 'b', label: d("Node B", "节点 B") }, { key: 'c', label: d("Node C", "节点 C") }, { key: 'd', label: d("Under maintenance", "维护中"), disabled: true }]} targetKeys={keys} onChange={setKeys} titles={[d("Available nodes", "可选节点"), d("Selected", "已选")]} />
      </DocDemo>
      <DocDemo title={d("No search", "无搜索")} wide code={`<Transfer
  searchable={false}
  data={[
    { key: 'a', label: 'A' },
    { key: 'b', label: 'B' },
  ]}
  targetKeys={keys}
  onChange={setKeys}
/>`}>
        <Transfer searchable={false} data={[{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }]} targetKeys={keys} onChange={setKeys} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
