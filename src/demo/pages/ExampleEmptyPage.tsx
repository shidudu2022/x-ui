import { useNavigate } from 'react-router-dom'
import { Button, Card, EmptyState, PageHeader } from '@/components/ui'

export function ExampleEmptyPage() {
  const navigate = useNavigate()
  return (
    <div>
      <PageHeader title="空态 / 404" description="EmptyState 组合示例。" />
      <div className="grid-2">
        <Card padded>
          <EmptyState
            title="还没有项目"
            description="创建第一个项目开始使用。"
            action={
              <Button variant="primary" onClick={() => navigate('/examples/form')}>
                新建项目
              </Button>
            }
          />
        </Card>
        <Card padded>
          <EmptyState
            title="404"
            description="页面不存在或已被移动。"
            action={
              <Button href="/">返回首页</Button>
            }
          />
        </Card>
      </div>
    </div>
  )
}
