import { useState } from 'react'
import { Pagination } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('pagination')
const props: PropDef[] = [{ name: 'page', type: 'number', desc: { en: "Current page", zh: "当前页" } }, { name: 'pageCount', type: 'number', desc: { en: "Total pages", zh: "总页数" } }, { name: 'onChange', type: '(p:number)=>void', desc: { en: "Page change", zh: "翻页" } }]

export function PaginationDoc() {
  const d = useDemoT()
  const [page, setPage] = useState(2)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} code={`<Pagination page={page} pageCount={8} onChange={setPage} />`}>
        <Pagination page={page} pageCount={8} onChange={setPage} />
      </DocDemo>
      <DocDemo title={d("Multi-page ellipsis", "多页省略")} code={`<Pagination page={12} pageCount={40} onChange={setPage} />`}>
        <Pagination page={page > 40 ? 12 : page} pageCount={40} onChange={setPage} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
