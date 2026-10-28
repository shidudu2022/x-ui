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
import { useDemoT } from '@/demo/i18n/useDemoT'

type Role = 'viewer' | 'editor' | 'admin'

const CAPS: Record<Role, { edit: boolean; delete: boolean; invite: boolean }> = {
  viewer: { edit: false, delete: false, invite: false },
  editor: { edit: true, delete: false, invite: true },
  admin: { edit: true, delete: true, invite: true },
}

export function ExamplePermissionsPage() {
  const t = useDemoT()
  const [role, setRole] = useState<Role>('viewer')
  const [hideDenied, setHideDenied] = useState(false)
  const caps = useMemo(() => CAPS[role], [role])

  const allow = (ok: boolean) => (ok ? t('allowed', '允许') : t('denied', '禁止'))

  return (
    <div className="page-narrow">
      <PageHeader
        title={t('Permissions and button policy', '权限与按钮策略')}
        description={t('Disable or hide actions by role; pairs with the roles example.', '按角色禁用或隐藏操作；与角色页联动示意。')}
        actions={
          <Segmented
            value={role}
            onChange={(v) => setRole(v as Role)}
            options={[
              { value: 'viewer', label: t('Viewer', '只读') },
              { value: 'editor', label: t('Editor', '编辑') },
              { value: 'admin', label: t('Admin', '管理') },
            ]}
          />
        }
      />
      <Alert tone="info" title={t(`Current role: ${role}`, `当前角色：${role}`)}>
        {t('Edit', '编辑')} {allow(caps.edit)} · {t('Delete', '删除')} {allow(caps.delete)} ·{' '}
        {t('Invite', '邀请')} {allow(caps.invite)}
      </Alert>
      <Card padded style={{ marginTop: 16 }}>
        <SettingsRow
          title={t('Hide denied actions', '隐藏无权限按钮')}
          description={t('When on, unauthorized actions are removed instead of disabled.', '开启后无权限操作从界面移除，而不是禁用。')}
          control={
            <Switch
              checked={hideDenied}
              onChange={(e) => setHideDenied(e.target.checked)}
              aria-label={t('Hide denied actions', '隐藏无权限按钮')}
            />
          }
        />
        <div className="actions" style={{ marginTop: 16 }}>
          {caps.edit || !hideDenied ? (
            <Tooltip content={caps.edit ? t('Can edit', '可编辑') : t('No edit permission for this role', '当前角色无编辑权限')}>
              <span>
                <Button variant="primary" disabled={!caps.edit}>
                  {t('Save changes', '保存更改')}
                </Button>
              </span>
            </Tooltip>
          ) : null}
          {caps.invite || !hideDenied ? (
            <Button disabled={!caps.invite}>{t('Invite member', '邀请成员')}</Button>
          ) : null}
          {caps.delete || !hideDenied ? (
            <Tooltip content={caps.delete ? t('Dangerous action', '危险操作') : t('Requires admin', '需要管理员')}>
              <span>
                <Button variant="danger" disabled={!caps.delete}>
                  {t('Delete resource', '删除资源')}
                </Button>
              </span>
            </Tooltip>
          ) : null}
        </div>
        <p className="muted" style={{ marginTop: 12 }}>
          {t(
            'Demo policy: prefer disabled + Tooltip when denied; optionally hide entirely.',
            '演示策略：无权限时优先 disabled + Tooltip；可选完全隐藏。',
          )}
        </p>
      </Card>
    </div>
  )
}
