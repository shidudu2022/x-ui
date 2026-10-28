import { useMemo, useState } from 'react'
import {
  Button,
  CodeBlock,
  CopyButton,
  Drawer,
  Field,
  Input,
  ListPage,
  ResourceList,
  useToast,
} from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { slicePage } from '@/lib/listQuery'

type ApiKey = { id: string; name: string; prefix: string; createdAt: string }

const SEED: ApiKey[] = [
  { id: '1', name: 'ci-bot', prefix: 'xui_live_ab12…', createdAt: '2026-10-01' },
  { id: '2', name: 'local-dev', prefix: 'xui_test_9f3c…', createdAt: '2026-10-12' },
  { id: '3', name: 'partner-sync', prefix: 'xui_live_77ee…', createdAt: '2026-10-20' },
]

export function ExampleApiKeysPage() {
  const t = useDemoT()
  const { toast } = useToast()
  const [rows, setRows] = useState(SEED)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [createdSecret, setCreatedSecret] = useState<string | null>(null)

  const pageRows = useMemo(() => slicePage(rows, page, pageSize), [rows, page, pageSize])

  function createKey() {
    if (!name.trim()) {
      toast(t('Enter a name', '请填写名称'), 'error')
      return
    }
    const secret = `xui_live_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`
    const next: ApiKey = {
      id: String(Date.now()),
      name: name.trim(),
      prefix: `${secret.slice(0, 14)}…`,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setRows((r) => [next, ...r])
    setCreatedSecret(secret)
    setName('')
    toast(t('API Key created', '已创建 API Key'), 'success')
  }

  return (
    <ListPage
      title="API Key"
      description={t(
        'Create and revoke access keys. The secret is shown in full only once at creation.',
        '创建与撤销访问密钥。密钥仅在创建时完整展示一次。',
      )}
      actions={
        <Button
          variant="primary"
          onClick={() => {
            setCreatedSecret(null)
            setOpen(true)
          }}
        >
          {t('New key', '新建 Key')}
        </Button>
      }
    >
      <ResourceList
        framed={false}
        rows={pageRows}
        rowKey={(r) => r.id}
        page={page}
        pageSize={pageSize}
        total={rows.length}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}
        onRefresh={() => toast(t('Refreshed', '已刷新'), 'info')}
        columns={[
          { key: 'name', header: t('Name', '名称'), render: (r) => r.name },
          { key: 'prefix', header: t('Prefix', '前缀'), muted: true, render: (r) => r.prefix },
          { key: 'createdAt', header: t('Created', '创建'), width: 120, render: (r) => r.createdAt },
        ]}
        rowActions={[
          {
            key: 'revoke',
            label: t('Revoke', '撤销'),
            variant: 'danger',
            onClick: (r) => {
              setRows((list) => list.filter((x) => x.id !== r.id))
              toast(t(`Revoked ${r.name}`, `已撤销 ${r.name}`), 'warn')
            },
          },
        ]}
      />

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={t('New API Key', '新建 API Key')}
        footer={
          <div className="actions">
            <Button onClick={() => setOpen(false)}>{t('Close', '关闭')}</Button>
            {!createdSecret ? (
              <Button variant="primary" onClick={createKey}>
                {t('Create', '创建')}
              </Button>
            ) : null}
          </div>
        }
      >
        {!createdSecret ? (
          <Field label={t('Name', '名称')} htmlFor="key-name">
            <Input
              id="key-name"
              placeholder="ci-bot"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
        ) : (
          <div className="stack">
            <p className="muted" style={{ margin: 0, fontSize: 13 }}>
              {t(
                'Copy and store this now; the full secret cannot be shown again after closing.',
                '请立即复制并妥善保存，关闭后无法再次查看完整密钥。',
              )}
            </p>
            <CodeBlock code={createdSecret} />
            <CopyButton value={createdSecret} />
          </div>
        )}
      </Drawer>
    </ListPage>
  )
}
