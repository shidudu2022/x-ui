import { useState } from 'react'
import { FilterBar, SearchInput, Select } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('filter-bar')
const props: PropDef[] = [{ name: 'children', type: 'ReactNode', desc: { en: "Filter controls", zh: "筛选控件" } }]

export function FilterBarDoc() {
  const d = useDemoT()
  const [q, setQ] = useState('')
  const [region, setRegion] = useState('all')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} wide code={`<FilterBar>
  <SearchInput
    value={q}
    onChange={(e) => setQ(e.target.value)}
    onClear={() => setQ('')}
    placeholder="Search…"
  />
  <Select
    value={region}
    onChange={setRegion}
    options={[
      { value: 'all', label: 'All regions' },
      { value: 'cn-east', label: 'East China' },
    ]}
  />
</FilterBar>`}>
        <FilterBar><SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder={d("Search…", "搜索…")} /><Select value={region} onChange={setRegion} options={[{ value: 'all', label: d("All regions", "全部区域") }, { value: 'cn-east', label: d("East China", "华东") }]} /></FilterBar>
      </DocDemo>
    </ComponentDocLayout>
  )
}
