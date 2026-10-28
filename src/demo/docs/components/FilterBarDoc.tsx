import { useState } from 'react'
import { FilterBar, SearchInput, Select } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('filter-bar')
const props: PropDef[] = [{ name: 'children', type: 'ReactNode', desc: '筛选控件' }]

export function FilterBarDoc() {
  const [q, setQ] = useState('')
  const [region, setRegion] = useState('all')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" wide code={`<FilterBar>
  <SearchInput
    value={q}
    onChange={(e) => setQ(e.target.value)}
    onClear={() => setQ('')}
    placeholder="搜索…"
  />
  <Select
    value={region}
    onChange={setRegion}
    options={[
      { value: 'all', label: '全部区域' },
      { value: 'cn-east', label: '华东' },
    ]}
  />
</FilterBar>`}>
        <FilterBar><SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="搜索…" /><Select value={region} onChange={setRegion} options={[{ value: 'all', label: '全部区域' }, { value: 'cn-east', label: '华东' }]} /></FilterBar>
      </DocDemo>
    </ComponentDocLayout>
  )
}
