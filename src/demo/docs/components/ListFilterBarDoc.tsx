import { useState } from 'react'
import { ListFilterBar, SearchInput } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('list-filter-bar')
const props: PropDef[] = [{ name: 'query', type: 'string', desc: { en: "Current search term; renders nothing when empty", zh: "当前搜索词；空则不渲染" } }, { name: 'total', type: 'number', desc: { en: "Total", zh: "总数" } }, { name: 'matched', type: 'number', desc: { en: "Matched count", zh: "命中数" } }, { name: 'unit', type: 'string', default: "'items'", desc: { en: "Unit", zh: "单位" } }, { name: 'onClear', type: '() => void', desc: { en: "Clear", zh: "清除" } }]

export function ListFilterBarDoc() {
  const d = useDemoT()
  const [q, setQ] = useState('api')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} wide code={`<ListFilterBar query="api" total={24} matched={3} onClear={() => setQ('')} />`}>
        <div className="stack"><SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder={d("Search…", "搜索…")} /><ListFilterBar query={q} total={24} matched={q ? 3 : 24} onClear={() => setQ('')} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
