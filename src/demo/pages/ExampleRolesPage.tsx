import { useState } from 'react'
import { Button, Checkbox, DataTable, PageHeader, Tag } from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

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
  const t = useDemoT()
  const [selected, setSelected] = useState<string[]>([])
  return (
    <div>
      <PageHeader
        title={t('Roles and permissions', '角色权限')}
        description={t('Table multi-select and bulk action bar.', '表格多选 + 批量操作栏。')}
      />
      <DataTable
        rows={ROWS}
        rowKey={(r) => r.id}
        selectedKeys={selected}
        onSelectedKeysChange={setSelected}
        bulkActions={
          <>
            <Button size="sm">{t('Export', '导出')}</Button>
            <Button size="sm" variant="danger">
              {t('Deactivate', '停用')}
            </Button>
          </>
        }
        toolbar={
          <div className="actions">
            <Button size="sm" variant="primary">
              {t('New role', '新建角色')}
            </Button>
          </div>
        }
        columns={[
          { key: 'name', header: t('Role', '角色'), render: (r) => <strong>{r.name}</strong> },
          { key: 'users', header: t('Users', '用户数'), render: (r) => r.users },
          {
            key: 'perms',
            header: t('Permissions', '权限'),
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
            header: t('Admin', '管理'),
            render: (r) => (
              <Checkbox checked={r.perms.includes('admin')} disabled label="admin" />
            ),
          },
        ]}
      />
    </div>
  )
}
