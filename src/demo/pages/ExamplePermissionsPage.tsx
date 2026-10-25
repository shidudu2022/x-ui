import { useMemo, useState } from 'react'
import {
  Alert,
  Button,
  Card,
  PageHeader,
  Segmented,
  SettingsRow,
  Switch,
  Tooltip,
} from '@/components/ui'

type Role = 'viewer' | 'editor' | 'admin'

const CAPS: Record<Role, { edit: boolean; delete: boolean; invite: boolean }> = {
  viewer: { edit: false, delete: false, invite: false },
  editor: { edit: true, delete: false, invite: true },
  admin: { edit: true, delete: true, invite: true },
}

export function ExamplePermissionsPage() {
  const [role, setRole] = useState<Role>('viewer')
  const [hideDenied, setHideDenied] = useState(false)
  const caps = useMemo(() => CAPS[role], [role])

  return (
    <div className="page-narrow">
      <PageHeader
        title="权限与按钮策略"
        description="按角色禁用或隐藏操作；与角色页联动示意。"
        actions={
          <Segmented
            value={role}
            onChange={(v) => setRole(v as Role)}
            options={[
              { value: 'viewer', label: '只读' },
              { value: 'editor', label: '编辑' },
              { value: 'admin', label: '管理' },
            ]}
          />
        }
      />
      <Alert tone="info" title={`当前角色：${role}`}>
        编辑 {caps.edit ? '允许' : '禁止'} · 删除 {caps.delete ? '允许' : '禁止'} · 邀请{' '}
        {caps.invite ? '允许' : '禁止'}
      </Alert>
      <Card padded style={{ marginTop: 16 }}>
        <SettingsRow
          title="隐藏无权限按钮"
          description="开启后无权限操作从界面移除，而不是禁用。"
          control={
            <Switch
              checked={hideDenied}
              onChange={(e) => setHideDenied(e.target.checked)}
              aria-label="隐藏无权限按钮"
            />
          }
        />
        <div className="actions" style={{ marginTop: 16 }}>
          {caps.edit || !hideDenied ? (
            <Tooltip content={caps.edit ? '可编辑' : '当前角色无编辑权限'}>
              <span>
                <Button variant="primary" disabled={!caps.edit}>
                  保存更改
                </Button>
              </span>
            </Tooltip>
          ) : null}
          {caps.invite || !hideDenied ? (
            <Button disabled={!caps.invite}>邀请成员</Button>
          ) : null}
          {caps.delete || !hideDenied ? (
            <Tooltip content={caps.delete ? '危险操作' : '需要管理员'}>
              <span>
                <Button variant="danger" disabled={!caps.delete}>
                  删除资源
                </Button>
              </span>
            </Tooltip>
          ) : null}
        </div>
        <p className="muted" style={{ marginTop: 12 }}>
          演示策略：无权限时优先 disabled + Tooltip；可选完全隐藏。
        </p>
      </Card>
    </div>
  )
}
