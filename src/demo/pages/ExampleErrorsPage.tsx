import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Button,
  Card,
  Field,
  FormErrors,
  Input,
  PageHeader,
  ResourceState,
  useToast,
} from '@/components/ui'

export function ExampleErrorsPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [status, setStatus] = useState<'error' | 'offline' | 'empty'>('error')
  const [submitFailed, setSubmitFailed] = useState(true)

  return (
    <div>
      <PageHeader
        title="错误与离线"
        description="403 / 500 / 离线 / 表单提交失败等常见反馈态。"
        actions={
          <Button size="sm" onClick={() => toast('已记录反馈（示例）', 'warn')}>
            反馈问题
          </Button>
        }
      />

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <Card padded>
          <Alert tone="danger" title="403 无权限">
            当前角色无法访问此资源。请联系管理员开通权限，或切换账号后重试。
          </Alert>
          <div className="actions" style={{ marginTop: 12 }}>
            <Button href="/examples/permissions">查看权限示例</Button>
            <Button variant="ghost" onClick={() => navigate('/')}>
              返回首页
            </Button>
          </div>
        </Card>
        <Card padded>
          <Alert tone="danger" title="500 服务异常">
            请求未能完成。请稍后重试；若持续出现，请附上请求 ID 联系支持。
          </Alert>
          <div className="actions" style={{ marginTop: 12 }}>
            <Button variant="primary" onClick={() => toast('已重试（示例）', 'info')}>
              重试
            </Button>
            <Button variant="ghost" onClick={() => toast('已复制请求 ID', 'success')}>
              复制请求 ID
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid-2">
        <Card padded>
          <div className="actions" style={{ marginBottom: 12 }}>
            <Button
              size="sm"
              variant={status === 'error' ? 'primary' : 'secondary'}
              onClick={() => setStatus('error')}
            >
              加载失败
            </Button>
            <Button
              size="sm"
              variant={status === 'offline' ? 'primary' : 'secondary'}
              onClick={() => setStatus('offline')}
            >
              离线
            </Button>
            <Button
              size="sm"
              variant={status === 'empty' ? 'primary' : 'secondary'}
              onClick={() => setStatus('empty')}
            >
              空结果
            </Button>
          </div>
          <ResourceState
            status={status}
            onRetry={() => toast('重新加载（示例）', 'info')}
            emptyTitle="筛选无结果"
            emptyDescription="调整条件后再试。"
            emptyAction={
              <Button size="sm" onClick={() => toast('已清除筛选', 'info')}>
                清除筛选
              </Button>
            }
          />
        </Card>
        <Card padded className="stack">
          <Alert tone="warn" title="表单提交失败">
            服务端校验未通过，请根据下方汇总修改后再次提交。
          </Alert>
          {submitFailed ? (
            <FormErrors errors={['名称已被占用', '回调地址必须使用 HTTPS']} />
          ) : null}
          <Field label="名称" error="名称已被占用" htmlFor="err-name">
            <Input id="err-name" defaultValue="demo" invalid />
          </Field>
          <Field label="回调 URL" error="必须使用 HTTPS" htmlFor="err-url">
            <Input id="err-url" defaultValue="http://example.com/hook" invalid />
          </Field>
          <Button
            variant="primary"
            onClick={() => {
              setSubmitFailed(true)
              toast('提交失败', 'error')
            }}
          >
            再次提交
          </Button>
        </Card>
      </div>
    </div>
  )
}
