import { Button, Card, PageHeader, useToast } from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

/**
 * Page chrome example — main title + subtitle (+ optional actions),
 * same structure as k3s-start/web list/detail headers.
 */
export function ExamplePageHeaderPage() {
  const t = useDemoT()
  const { toast } = useToast()

  return (
    <section className="page active">
      <PageHeader
        title={t('Resource overview', '资源概览')}
        description={t(
          'Main title + subtitle; use actionItems to choose what goes in the overflow menu.',
          '主标题 + 副标题；右侧可用 actionItems 指定哪些收入「更多」菜单。',
        )}
        actionItems={[
          {
            id: 'primary',
            label: t('Primary action', '主要操作'),
            variant: 'primary',
            onClick: () => toast(t('Primary action', '主要操作'), 'info'),
          },
          {
            id: 'export',
            label: t('Export', '导出'),
            overflow: true,
            onClick: () => toast(t('Export', '导出'), 'info'),
          },
          {
            id: 'archive',
            label: t('Archive', '归档'),
            overflow: true,
            onClick: () => toast(t('Archive', '归档'), 'info'),
          },
        ]}
      />

      <Card padded className="stack">
        <p className="muted" style={{ margin: 0 }}>
          {t('Use ', '使用 ')}
          <code>actionItems</code>
          {t(' with ', '，给次要项加 ')}
          <code>overflow: true</code>
          {t(' for the menu; custom controls still go in ', ' 即可收进菜单；自定义控件仍放 ')}
          <code>actions</code>
          {t('. Or pass ', '。也可用 ')}
          <code>overflowActions</code>
          {t(' directly.', ' 直接塞菜单项。')}
        </p>
        <div className="grid-2">
          <Card padded>
            <strong style={{ fontSize: 14 }}>{t('Title only', '仅标题')}</strong>
            <div style={{ marginTop: 12 }}>
              <PageHeader
                title={t('Clusters', '集群')}
                description={t('Create, scale, upgrade, and remove remote k3s clusters.', '创建、扩缩、升级与卸载远程 k3s 集群。')}
              />
            </div>
          </Card>
          <Card padded>
            <strong style={{ fontSize: 14 }}>{t('Title + actions', '标题 + 操作')}</strong>
            <div style={{ marginTop: 12 }}>
              <PageHeader
                title={t('Servers', '服务器')}
                description={t('Register SSH hosts; credentials stored encrypted.', '录入 SSH 主机，凭证加密存储。')}
                actions={<Button variant="primary">{t('Add server', '添加服务器')}</Button>}
              />
            </div>
          </Card>
          <Card padded className="full" style={{ gridColumn: '1 / -1' }}>
            <strong style={{ fontSize: 14 }}>{t('Icon-only “More” (overflowIconOnly)', '图标「更多」（overflowIconOnly）')}</strong>
            <div style={{ marginTop: 12 }}>
              <PageHeader
                title={t('Jobs', '作业')}
                description={t('Primary button visible; the rest in a ⋯ menu.', '主按钮外露，其余进 ⋯ 菜单。')}
                actionItems={[
                  {
                    id: 'run',
                    label: t('Run', '运行'),
                    variant: 'primary',
                    onClick: () => toast(t('Run', '运行'), 'success'),
                  },
                  {
                    id: 'clone',
                    label: t('Clone', '克隆'),
                    overflow: true,
                    onClick: () => toast(t('Clone', '克隆'), 'info'),
                  },
                  {
                    id: 'delete',
                    label: t('Delete', '删除'),
                    variant: 'danger',
                    overflow: true,
                    onClick: () => toast(t('Delete', '删除'), 'error'),
                  },
                ]}
                overflowIconOnly
              />
            </div>
          </Card>
        </div>
      </Card>
    </section>
  )
}
