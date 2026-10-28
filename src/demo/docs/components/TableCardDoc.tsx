import { Table, TableCard, type TableColumn } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('table-card')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: '标题' }, { name: 'subtitle', type: 'ReactNode', desc: '副标题' }, { name: 'actions', type: 'ReactNode', desc: '操作' }, { name: 'footer', type: 'ReactNode', desc: '页脚' }, { name: 'children', type: 'ReactNode', desc: '通常为 Table' }]

export function TableCardDoc() {
  type Row = { id: string; name: string }
  const rows: Row[] = [{ id: '1', name: 'api-gateway' }, { id: '2', name: 'worker' }]
  const columns: TableColumn<Row>[] = [{ key: 'name', header: '名称', render: (r) => r.name }]
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" wide code={`<TableCard title="工作负载" subtitle="2">
  <Table columns={columns} rows={rows} rowKey={(r) => r.id} />
</TableCard>`}>
        <TableCard title="工作负载" subtitle="2"><Table columns={columns} rows={rows} rowKey={(r) => r.id} /></TableCard>
      </DocDemo>
    </ComponentDocLayout>
  )
}
