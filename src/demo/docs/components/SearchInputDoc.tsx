import { useState } from 'react'
import { SearchInput } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('search-input')
const props: PropDef[] = [{ name: 'value', type: 'string', desc: '受控值' }, { name: 'size', type: "'sm'|'md'|'lg'", desc: '尺寸' }, { name: 'allowClear', type: 'boolean', default: 'true', desc: '清除按钮' }, { name: 'loading', type: 'boolean', desc: '加载' }, { name: 'invalid', type: 'boolean', desc: '校验失败' }]

export function SearchInputDoc() {
  const [q, setQ] = useState('api')
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<SearchInput
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onClear={() => setQ('')}
  placeholder="名称 / 标签…"
/>`}>
        <SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="名称 / 标签…" />
      </DocDemo>
      <DocDemo title="尺寸" code={`<SearchInput
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
      <DocDemo title="加载 / 校验" code={`<SearchInput
  loading
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onClear={() => setQ('')}
  placeholder="搜索中…"
/>
<SearchInput
  invalid
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onClear={() => setQ('')}
  placeholder="invalid"
/>`}>
        <div className="stack" style={{ maxWidth: 320 }}><SearchInput loading value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="搜索中…" /><SearchInput invalid value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="invalid" /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
