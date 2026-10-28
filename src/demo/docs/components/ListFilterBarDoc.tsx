import { useState } from 'react'
import { ListFilterBar, SearchInput } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('list-filter-bar')
const props: PropDef[] = [{ name: 'query', type: 'string', desc: '当前搜索词；空则不渲染' }, { name: 'total', type: 'number', desc: '总数' }, { name: 'matched', type: 'number', desc: '命中数' }, { name: 'unit', type: 'string', default: "'条'", desc: '单位' }, { name: 'onClear', type: '() => void', desc: '清除' }]

export function ListFilterBarDoc() {
  const [q, setQ] = useState('api')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" wide code={`<ListFilterBar query="api" total={24} matched={3} onClear={() => setQ('')} />`}>
        <div className="stack"><SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="搜索…" /><ListFilterBar query={q} total={24} matched={q ? 3 : 24} onClear={() => setQ('')} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
