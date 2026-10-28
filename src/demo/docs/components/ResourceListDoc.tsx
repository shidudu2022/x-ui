import { useState } from 'react'
import { Button, ResourceList, type ResourceColumn } from '@/components/ui'
import { DocDemo } from '../DocDemo'
import { ComponentDocLayout } from '../ComponentDocLayout'
import { docMeta, type PropDef } from '../docMeta'

const meta = docMeta('resource-list')
const props: PropDef[] = [{ name: 'loading', type: 'boolean', desc: '骨架' }, { name: 'emptyTitle', type: 'string', desc: '空态标题' }, { name: 'filters', type: 'ResourceFilter[]', desc: '筛选' }]

export function ResourceListDoc() {
  type Row = { id: string; name: string; region: string }
  const rows: Row[] = [
    { id: '1', name: 'prod-api', region: 'cn-east' },
    { id: '2', name: 'staging', region: 'cn-north' },
  ]
  const columns: ResourceColumn<Row>[] = [
    { key: 'name', header: '名称', render: (r) => r.name },
    { key: 'region', header: '区域', render: (r) => r.region, muted: true },
  ]
  const [loading, setLoading] = useState(false)
  return (
    <ComponentDocLayout meta={meta} props={props}>
      <DocDemo title="基础" description="筛选条 + 表格 + 行操作。" wide code={`<ResourceList
  framed={false}
  columns={columns}
  rows={rows}
  rowKey={(r) => r.id}
  filters={[
    {
      key: 'region',
      label: '区域',
      type: 'select',
      options: [
        { value: 'cn-east', label: '华东' },
        { value: 'cn-north', label: '华北' },
      ],
    },
  ]}
  filterValues={{}}
  onFilterChange={() => undefined}
  onSearch={() => undefined}
  onRefresh={() => undefined}
  page={1}
  pageSize={10}
  total={rows.length}
  onPageChange={() => undefined}
  rowActions={[{ key: 'edit', label: '编辑', onClick: () => undefined }]}
  toolbar={<Button variant="primary">新建</Button>}
/>`}>
        <ResourceList framed={false} columns={columns} rows={rows} rowKey={(r) => r.id} filters={[{ key: 'region', label: '区域', type: 'select', options: [{ value: 'cn-east', label: '华东' }, { value: 'cn-north', label: '华北' }] }]} filterValues={{}} onFilterChange={() => undefined} onSearch={() => undefined} onRefresh={() => undefined} page={1} pageSize={10} total={rows.length} onPageChange={() => undefined} rowActions={[{ key: 'edit', label: '编辑', onClick: () => undefined }]} toolbar={<Button variant="primary">新建</Button>} />
      </DocDemo>
      <DocDemo title="加载" wide code={`<Button size="sm" onClick={() => setLoading((v) => !v)}>
  {loading ? '显示空态' : '显示加载'}
</Button>
<ResourceList
  framed={false}
  columns={columns}
  rows={[]}
  rowKey={(r) => r.id}
  loading={loading}
  emptyTitle="暂无资源"
  emptyDesc="创建第一条开始。"
  page={1}
  pageSize={10}
  total={0}
  onPageChange={() => undefined}
  onRefresh={() => undefined}
/>`}>
        <div className="stack"><Button size="sm" onClick={() => setLoading((v) => !v)}>{loading ? '显示空态' : '显示加载'}</Button><ResourceList framed={false} columns={columns} rows={[]} rowKey={(r) => r.id} loading={loading} emptyTitle="暂无资源" emptyDesc="创建第一条开始。" page={1} pageSize={10} total={0} onPageChange={() => undefined} onRefresh={() => undefined} /></div>
      </DocDemo>
    </ComponentDocLayout>
  )
}
