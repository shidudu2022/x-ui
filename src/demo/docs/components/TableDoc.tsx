import { useState } from 'react'
import { Table, type TableColumn } from '@/components/ui'
import { useDemoT } from '../../i18n/useDemoT'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('table')
const props: PropDef[] = [{ name: 'columns', type: 'TableColumn<T>[]', desc: { en: "Columns; sortable enables sorting", zh: "列；sortable 开启排序" } }, { name: 'selectable', type: 'boolean', desc: { en: "Multi-select", zh: "多选" } }, { name: 'sortKey/sortDir/onSort', type: 'controlled sort', desc: { en: "Sorting", zh: "排序" } }]

export function TableDoc() {
  const d = useDemoT()
  type Row = { id: string; name: string; region: string }
  const rows: Row[] = [
    { id: '1', name: 'api-gateway', region: 'cn-east' },
    { id: '2', name: 'worker', region: 'cn-north' },
    { id: '3', name: 'cache', region: 'cn-east' },
  ]
  const columns: TableColumn<Row>[] = [
    { key: 'name', header: d("Name", "名称"), sortable: true, render: (r) => r.name },
    { key: 'region', header: d("Region", "区域"), sortable: true, render: (r) => r.region },
  ]
  const [sortKey, setSortKey] = useState<string | null>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>('asc')
  const [selected, setSelected] = useState<string[]>([])
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title={d("Basic", "基础")} wide code={`<Table columns={columns} rows={rows} rowKey={(r) => r.id} />`}>
        <Table columns={columns} rows={rows} rowKey={(r) => r.id} />
      </DocDemo>
      <DocDemo title={d("Sorting", "排序")} wide code={`<Table
  columns={columns}
  rows={rows}
  rowKey={(r) => r.id}
  sortKey={sortKey}
  sortDir={sortDir}
  onSort={(key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }}
/>`}>
        <Table columns={columns} rows={rows} rowKey={(r) => r.id} sortKey={sortKey} sortDir={sortDir} onSort={(key) => { if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc')); else { setSortKey(key); setSortDir('asc') } }} />
      </DocDemo>
      <DocDemo title={d("Multi-select", "多选")} wide code={`<Table
  columns={columns}
  rows={rows}
  rowKey={(r) => r.id}
  selectable
  selectedKeys={selected}
  onSelectedChange={setSelected}
/>`}>
        <Table columns={columns} rows={rows} rowKey={(r) => r.id} selectable selectedKeys={selected} onSelectedChange={setSelected} />
      </DocDemo>
    </ComponentDocLayout>
  )
}
