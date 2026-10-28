import { useState } from 'react'
import { SearchInput } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('search-input')
const props: PropDef[] = [{ name: 'value', type: 'string', desc: { en: "Controlled value", zh: "受控值" } }, { name: 'size', type: "'sm'|'md'|'lg'", desc: { en: "Sizes", zh: "尺寸" } }, { name: 'allowClear', type: 'boolean', default: 'true', desc: { en: "Clear button", zh: "清除按钮" } }, { name: 'loading', type: 'boolean', desc: { en: "Loading", zh: "加载" } }, { name: 'invalid', type: 'boolean', desc: { en: "Validation failed", zh: "校验失败" } }]

export function SearchInputDoc() {
  const d = useDemoT()
  const [q, setQ] = useState('api')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<SearchInput
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onClear={() => setQ('')}
  placeholder="Name / tag…"
/>`}>
        <SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder={d("Name / tag…", "名称 / 标签…")} />
      </DocDemo>
      <DocDemo title={d("Sizes", "尺寸")} code={`<SearchInput
  size="sm"
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onClear={() => setQ('')}
  placeholder="sm"
/>
<SearchInput
  size="lg"
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onClear={() => setQ('')}
  placeholder="lg"
/>`}>
        <div className="stack" style={{ maxWidth: 320 }}><SearchInput size="sm" value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="sm" /><SearchInput size="lg" value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="lg" /></div>
      </DocDemo>
      <DocDemo title={d("Loading & validation", "加载 / 校验")} code={`<SearchInput
  loading
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onClear={() => setQ('')}
  placeholder="Searching…"
/>
<SearchInput
  invalid
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onClear={() => setQ('')}
  placeholder="invalid"
/>`}>
        <div className="stack" style={{ maxWidth: 320 }}><SearchInput loading value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder={d("Searching…", "搜索中…")} /><SearchInput invalid value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="invalid" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
