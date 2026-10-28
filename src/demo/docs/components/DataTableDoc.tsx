import { useState } from 'react'
import { DataTable, type DataTableColumn } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('data-table')
const props: PropDef[] = [{ name: 'columns', type: 'DataTableColumn<T>[]', desc: { en: "Columns", zh: "列" } }, { name: 'loading', type: 'boolean', desc: { en: "Skeleton loading", zh: "骨架加载" } }, { name: 'selectedKeys', type: 'string[]', desc: { en: "Multi-select", zh: "多选" } }, { name: 'defaultSortKey', type: 'string', desc: { en: "Default sort", zh: "默认排序" } }]

export function DataTableDoc() {
  const d = useDemoT()
  type Row = { id: string; name: string; status: string }
  const rows: Row[] = [
    { id: '1', name: 'api-gateway', status: 'Running' },
    { id: '2', name: 'worker', status: 'Pending' },
    { id: '3', name: 'cache', status: 'Running' },
  ]
  const columns: DataTableColumn<Row>[] = [
    { key: 'name', header: d("Name", "名称"), sortable: true, render: (r) => r.name },
    { key: 'status', header: d("Status", "状态"), sortable: true, render: (r) => r.status },
  ]
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} description={d("Built-in pagination and sorting. See the List example page for the full scenario.", "内置分页与排序。完整场景见「列表」示例页。")} wide code={`<DataTable columns={columns} rows={rows} rowKey={(r) => r.id} defaultSortKey="name" />`}>
        <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} defaultSortKey="name" framed={false} />
      </DocDemo>
      <DocDemo title={d("Multi-select", "多选")} wide code={`<DataTable
  columns={columns}
  rows={rows}
  rowKey={(r) => r.id}
  framed={false}
  selectedKeys={selectedKeys}
  onSelectedKeysChange={setSelectedKeys}
  bulkActions={<span className="muted">Selected {selectedKeys.length}</span>}
/>`}>
        <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} framed={false} selectedKeys={selectedKeys} onSelectedKeysChange={setSelectedKeys} bulkActions={<span className="muted">{d('Selected', '已选')} {selectedKeys.length}</span>} />
      </DocDemo>
      <DocDemo title={d("Loading", "加载")} wide code={`<button
  type="button"
  className="btn btn-sm"
  onClick={() => setLoading((v) => !v)}
>
  {loading ? 'Show data' : 'Show loading'}
</button>
<DataTable
  columns={columns}
  rows={loading ? [] : rows}
  rowKey={(r) => r.id}
  loading={loading}
  framed={false}
/>`}>
        <div className="stack"><button type="button" className="btn btn-sm" onClick={() => setLoading((v) => !v)}>{loading ? d("Show data", "显示数据") : d("Show loading", "显示加载")}</button><DataTable columns={columns} rows={loading ? [] : rows} rowKey={(r) => r.id} loading={loading} framed={false} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
