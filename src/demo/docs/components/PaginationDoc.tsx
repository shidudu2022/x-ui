import { useState } from 'react'
import { Pagination } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('pagination')
const props: PropDef[] = [{ name: 'page', type: 'number', desc: '当前页' }, { name: 'pageCount', type: 'number', desc: '总页数' }, { name: 'onChange', type: '(p:number)=>void', desc: '翻页' }]

export function PaginationDoc() {
  const [page, setPage] = useState(2)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" code={`<Pagination page={page} pageCount={8} onChange={setPage} />`}>
        <Pagination page={page} pageCount={8} onChange={setPage} />
      </DocDemo>
      <DocDemo title="多页省略" code={`<Pagination page={12} pageCount={40} onChange={setPage} />`}>
        <Pagination page={page > 40 ? 12 : page} pageCount={40} onChange={setPage} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
