import { useNavigate } from 'react-router-dom'
import { Button, Card, EmptyState, PageHeader } from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

export function ExampleEmptyPage() {
  const t = useDemoT()
  const navigate = useNavigate()
  return (
    <div>
      <PageHeader
        title={t('Empty / 404', '空态 / 404')}
        description={t('EmptyState composition examples.', 'EmptyState 组合示例。')}
      />
      <div className="grid-2">
        <Card padded>
          <EmptyState
            title={t('No projects yet', '还没有项目')}
            description={t('Create your first project to get started.', '创建第一个项目开始使用。')}
            action={
              <Button variant="primary" onClick={() => navigate('/examples/form')}>
                {t('New project', '新建项目')}
              </Button>
            }
          />
        </Card>
        <Card padded>
          <EmptyState
            title="404"
            description={t('This page does not exist or was moved.', '页面不存在或已被移动。')}
            action={<Button href="/">{t('Back to home', '返回首页')}</Button>}
          />
        </Card>
      </div>
    </div>
  )
}
