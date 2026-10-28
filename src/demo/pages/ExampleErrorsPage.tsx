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
import { useDemoT } from '@/demo/i18n/useDemoT'

export function ExampleErrorsPage() {
  const t = useDemoT()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [status, setStatus] = useState<'error' | 'offline' | 'empty'>('error')
  const [submitFailed, setSubmitFailed] = useState(true)

  return (
    <div>
      <PageHeader
        title={t('Errors and offline', '错误与离线')}
        description={t('403 / 500 / offline / form submit failure patterns.', '403 / 500 / 离线 / 表单提交失败等常见反馈态。')}
        actions={
          <Button size="sm" onClick={() => toast(t('Feedback recorded (demo)', '已记录反馈（示例）'), 'warn')}>
            {t('Report issue', '反馈问题')}
          </Button>
        }
      />

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <Card padded>
          <Alert tone="danger" title={t('403 Forbidden', '403 无权限')}>
            {t(
              'Your role cannot access this resource. Contact an admin or switch accounts and try again.',
              '当前角色无法访问此资源。请联系管理员开通权限，或切换账号后重试。',
            )}
          </Alert>
          <div className="actions" style={{ marginTop: 12 }}>
            <Button href="/examples/permissions">{t('Permissions example', '查看权限示例')}</Button>
            <Button variant="ghost" onClick={() => navigate('/')}>
              {t('Back to home', '返回首页')}
            </Button>
          </div>
        </Card>
        <Card padded>
          <Alert tone="danger" title={t('500 Server error', '500 服务异常')}>
            {t(
              'The request could not be completed. Retry later; if it persists, contact support with the request ID.',
              '请求未能完成。请稍后重试；若持续出现，请附上请求 ID 联系支持。',
            )}
          </Alert>
          <div className="actions" style={{ marginTop: 12 }}>
            <Button variant="primary" onClick={() => toast(t('Retried (demo)', '已重试（示例）'), 'info')}>
              {t('Retry', '重试')}
            </Button>
            <Button variant="ghost" onClick={() => toast(t('Request ID copied', '已复制请求 ID'), 'success')}>
              {t('Copy request ID', '复制请求 ID')}
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
              {t('Load failed', '加载失败')}
            </Button>
            <Button
              size="sm"
              variant={status === 'offline' ? 'primary' : 'secondary'}
              onClick={() => setStatus('offline')}
            >
              {t('Offline', '离线')}
            </Button>
            <Button
              size="sm"
              variant={status === 'empty' ? 'primary' : 'secondary'}
              onClick={() => setStatus('empty')}
            >
              {t('Empty result', '空结果')}
            </Button>
          </div>
          <ResourceState
            status={status}
            onRetry={() => toast(t('Reloading (demo)', '重新加载（示例）'), 'info')}
            emptyTitle={t('No filter matches', '筛选无结果')}
            emptyDescription={t('Adjust filters and try again.', '调整条件后再试。')}
            emptyAction={
              <Button size="sm" onClick={() => toast(t('Filters cleared', '已清除筛选'), 'info')}>
                {t('Clear filters', '清除筛选')}
              </Button>
            }
          />
        </Card>
        <Card padded className="stack">
          <Alert tone="warn" title={t('Form submit failed', '表单提交失败')}>
            {t('Server validation failed. Fix the issues below and submit again.', '服务端校验未通过，请根据下方汇总修改后再次提交。')}
          </Alert>
          {submitFailed ? (
            <FormErrors
              errors={[
                t('Name is already taken', '名称已被占用'),
                t('Callback URL must use HTTPS', '回调地址必须使用 HTTPS'),
              ]}
            />
          ) : null}
          <Field
            label={t('Name', '名称')}
            error={t('Name is already taken', '名称已被占用')}
            htmlFor="err-name"
          >
            <Input id="err-name" defaultValue="demo" invalid />
          </Field>
          <Field
            label={t('Callback URL', '回调 URL')}
            error={t('Must use HTTPS', '必须使用 HTTPS')}
            htmlFor="err-url"
          >
            <Input id="err-url" defaultValue="http://example.com/hook" invalid />
          </Field>
          <Button
            variant="primary"
            onClick={() => {
              setSubmitFailed(true)
              toast(t('Submit failed', '提交失败'), 'error')
            }}
          >
            {t('Submit again', '再次提交')}
          </Button>
        </Card>
      </div>
    </div>
  )
}
