import { useState } from 'react'
import { DataTable, type DataTableColumn } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('data-table')
const props: PropDef[] = [{ name: 'columns', type: 'DataTableColumn<T>[]', desc: '列' }, { name: 'loading', type: 'boolean', desc: '骨架加载' }, { name: 'selectedKeys', type: 'string[]', desc: '多选' }, { name: 'defaultSortKey', type: 'string', desc: '默认排序' }]

export function DataTableDoc() {
  type Row = { id: string; name: string; status: string }
  const rows: Row[] = [
    { id: '1', name: 'api-gateway', status: 'Running' },
    { id: '2', name: 'worker', status: 'Pending' },
    { id: '3', name: 'cache', status: 'Running' },
  ]
  const columns: DataTableColumn<Row>[] = [
    { key: 'name', header: '名称', sortable: true, render: (r) => r.name },
    { key: 'status', header: '状态', sortable: true, render: (r) => r.status },
  ]
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" description="内置分页与排序。完整场景见「列表」示例页。" wide code={`<DataTable columns={columns} rows={rows} rowKey={(r) => r.id} defaultSortKey="name" />`}>
        <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} defaultSortKey="name" framed={false} />
      </DocDemo>
      <DocDemo title="多选" wide code={`<DataTable
  columns={columns}
  rows={rows}
  rowKey={(r) => r.id}
  framed={false}
  selectedKeys={selectedKeys}
  onSelectedKeysChange={setSelectedKeys}
  bulkActions={<span className="muted">已选 {selectedKeys.length}</span>}
/>`}>
        <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} framed={false} selectedKeys={selectedKeys} onSelectedKeysChange={setSelectedKeys} bulkActions={<span className="muted">已选 {selectedKeys.length}</span>} />
      </DocDemo>
      <DocDemo title="加载" wide code={`<button
  type="button"
  className="btn btn-sm"
  onClick={() => setLoading((v) => !v)}
>
  {loading ? '显示数据' : '显示加载'}
</button>
<DataTable
  columns={columns}
  rows={loading ? [] : rows}
  rowKey={(r) => r.id}
  loading={loading}
  framed={false}
/>`}>
        <div className="stack"><button type="button" className="btn btn-sm" onClick={() => setLoading((v) => !v)}>{loading ? '显示数据' : '显示加载'}</button><DataTable columns={columns} rows={loading ? [] : rows} rowKey={(r) => r.id} loading={loading} framed={false} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
