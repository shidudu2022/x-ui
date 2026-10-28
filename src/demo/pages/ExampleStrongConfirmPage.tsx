import { useState } from 'react'
import {
  Button,
  DescriptionList,
  PageHeader,
  SectionCard,
  StrongConfirmDrawer,
  Tag,
  useToast,
} from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

const RESOURCE = 'prod-cluster-07'

export function ExampleStrongConfirmPage() {
  const t = useDemoT()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  return (
    <div className="stack">
      <PageHeader
        title={t('Strong confirm (drawer)', '强确认（抽屉）')}
        description={t(
          'Dangerous actions open a side drawer; you must type a matching string to continue.',
          '点击危险操作后从右侧拉出确认面板，需输入匹配字符串才能继续。',
        )}
      />

      <SectionCard title={t('Resource overview', '资源概览')}>
        <DescriptionList
          items={[
            { label: t('Name', '名称'), value: RESOURCE },
            { label: t('Environment', '环境'), value: <Tag tone="warn">{t('Production', '生产')}</Tag> },
            { label: t('Nodes', '节点'), value: '12' },
            { label: t('Region', '区域'), value: 'cn-east-1' },
          ]}
        />
        <div className="actions" style={{ marginTop: 16 }}>
          <Button variant="danger" onClick={() => setOpen(true)}>
            {t('Delete cluster…', '删除集群…')}
          </Button>
        </div>
        <p className="muted" style={{ margin: '12px 0 0', fontSize: 12 }}>
          {t('For centered dialogs use ', '居中弹窗请用 ')}
          <code>StrongConfirm</code>
          {t('; this page demos typed confirmation in a drawer.', '；本页演示抽屉内输入匹配确认。')}
        </p>
      </SectionCard>

      <StrongConfirmDrawer
        open={open}
        onClose={() => setOpen(false)}
        title={t('Delete cluster', '删除集群')}
        resourceName={RESOURCE}
        confirmValue={RESOURCE}
        confirmText={t('Delete permanently', '永久删除')}
        onConfirm={() => toast(t(`Deleted ${RESOURCE} (demo)`, `已删除 ${RESOURCE}（示例）`), 'success')}
      >
        {t(
          'This permanently deletes the cluster, nodes, jobs, and audit links. This cannot be undone.',
          '将永久删除该集群及其节点、作业与审计关联数据，此操作不可恢复。',
        )}
      </StrongConfirmDrawer>
    </div>
  )
}
