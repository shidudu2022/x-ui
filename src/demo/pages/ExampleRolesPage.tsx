import { useState } from 'react'
import { Button, Checkbox, DataTable, PageHeader, Tag } from '@/components/ui'

type RoleRow = {
  id: string
  name: string
  users: number
  perms: string[]
}

const ROWS: RoleRow[] = [
  { id: '1', name: 'Owner', users: 2, perms: ['read', 'write', 'admin'] },
  { id: '2', name: 'Developer', users: 8, perms: ['read', 'write'] },
  { id: '3', name: 'Viewer', users: 21, perms: ['read'] },
]

export function ExampleRolesPage() {
  const [selected, setSelected] = useState<string[]>([])
  return (
    <div>
      <PageHeader title="角色权限" description="表格多选 + 批量操作栏。" />
      <DataTable
        rows={ROWS}
        rowKey={(r) => r.id}
        selectedKeys={selected}
        onSelectedKeysChange={setSelected}
        bulkActions={
          <>
            <Button size="sm">导出</Button>
            <Button size="sm" variant="danger">
              停用
            </Button>
          </>
        }
        toolbar={
          <div className="actions">
            <Button size="sm" variant="primary">
              新建角色
            </Button>
          </div>
        }
        columns={[
          { key: 'name', header: '角色', render: (r) => <strong>{r.name}</strong> },
          { key: 'users', header: '用户数', render: (r) => r.users },
          {
            key: 'perms',
            header: '权限',
            render: (r) => (
              <span className="showcase-row">
                {r.perms.map((p) => (
                  <Tag key={p} tone="info">
                    {p}
                  </Tag>
                ))}
              </span>
            ),
          },
          {
            key: 'admin',
            header: '管理',
            render: (r) => (
              <Checkbox checked={r.perms.includes('admin')} disabled label="admin" />
            ),
          },
        ]}
      />
    </div>
  )
}
