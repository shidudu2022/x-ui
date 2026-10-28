import { Table, TableCard, type TableColumn } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('table-card')
const props: PropDef[] = [{ name: 'title', type: 'ReactNode', desc: { en: "Title", zh: "标题" } }, { name: 'subtitle', type: 'ReactNode', desc: { en: "Subtitle", zh: "副标题" } }, { name: 'actions', type: 'ReactNode', desc: { en: "Action", zh: "操作" } }, { name: 'footer', type: 'ReactNode', desc: { en: "Footer", zh: "页脚" } }, { name: 'children', type: 'ReactNode', desc: { en: "Usually a Table", zh: "通常为 Table" } }]

export function TableCardDoc() {
  const d = useDemoT()
  type Row = { id: string; name: string }
  const rows: Row[] = [{ id: '1', name: 'api-gateway' }, { id: '2', name: 'worker' }]
  const columns: TableColumn<Row>[] = [{ key: 'name', header: d("Name", "名称"), render: (r) => r.name }]
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} wide code={`<TableCard title="Workloads" subtitle="2">
  <Table columns={columns} rows={rows} rowKey={(r) => r.id} />
</TableCard>`}>
        <TableCard title={d("Workloads", "工作负载")} subtitle="2"><Table columns={columns} rows={rows} rowKey={(r) => r.id} /></TableCard>
      </DocDemo>
    </ComponentDocLayout>
  )
}
