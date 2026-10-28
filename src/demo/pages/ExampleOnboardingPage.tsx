import { useState } from 'react'
import {
  Alert,
  Button,
  Card,
  Field,
  FormPage,
  Input,
  Steps,
  Switch,
  Textarea,
  useToast,
} from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

export function ExampleOnboardingPage() {
  const t = useDemoT()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [notify, setNotify] = useState(true)

  if (done) {
    return (
      <FormPage title={t('Onboarding complete', '开通完成')} description={t('Your workspace is ready.', '工作区已就绪。')}>
        <Card padded className="stack">
          <Alert tone="success" title={t('All set', '全部完成')}>
            {t(
              'Workspace created and invite emails sent. Adjust notification preferences in Settings anytime.',
              '已创建工作区并发送邀请邮件。可随时在设置中调整通知偏好。',
            )}
          </Alert>
          <div className="actions">
            <Button variant="primary" href="/examples/dashboard">
              {t('Go to dashboard', '进入仪表盘')}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setDone(false)
                setStep(1)
              }}
            >
              {t('Run again', '再走一遍')}
            </Button>
          </div>
        </Card>
      </FormPage>
    )
  }

  return (
    <FormPage
      title={t('Onboarding wizard', '开通向导')}
      description={t('Organization → invite members → preferences → confirm.', '组织信息 → 邀请成员 → 偏好 → 确认提交。')}
    >
      <Steps
        current={step}
        items={[
          { id: '1', label: t('Organization', '组织') },
          { id: '2', label: t('Members', '成员') },
          { id: '3', label: t('Preferences', '偏好') },
          { id: '4', label: t('Confirm', '确认') },
        ]}
      />
      <Card padded className="stack" style={{ marginTop: 16 }}>
        {step === 1 ? (
          <>
            <Field label={t('Organization name', '组织名称')} htmlFor="ob-org" required>
              <Input id="ob-org" defaultValue="Acme Edge" />
            </Field>
            <Field label={t('Bio', '简介')} htmlFor="ob-bio">
              <Textarea id="ob-bio" rows={3} placeholder={t('Optional', '可选')} />
            </Field>
          </>
        ) : null}
        {step === 2 ? (
          <Field
            label={t('Invite emails (comma-separated)', '邀请邮箱（逗号分隔）')}
            htmlFor="ob-mails"
            hint={t('Onboarding links will be emailed', '将发送开通链接')}
          >
            <Textarea id="ob-mails" rows={3} defaultValue="bob@example.com, cara@example.com" />
          </Field>
        ) : null}
        {step === 3 ? (
          <Field label={t('Email notifications', '邮件通知')} hint={t('Important changes and security alerts', '重要变更与安全提醒')}>
            <Switch
              checked={notify}
              onChange={(e) => setNotify(e.target.checked)}
              aria-label={t('Email notifications', '邮件通知')}
            />
          </Field>
        ) : null}
        {step === 4 ? (
          <Alert tone="info" title={t('Confirm submit', '确认提交')}>
            {t(
              `Will create the org, send 2 invites, and ${notify ? 'enable' : 'disable'} email notifications.`,
              `将创建组织、发送 2 封邀请，并${notify ? '开启' : '关闭'}邮件通知。`,
            )}
          </Alert>
        ) : null}
        <div className="actions">
          <Button disabled={step <= 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
            {t('Back', '上一步')}
          </Button>
          {step < 4 ? (
            <Button variant="primary" onClick={() => setStep((s) => s + 1)}>
              {t('Next', '下一步')}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                setDone(true)
                toast(t('Onboarding succeeded', '开通成功'), 'success')
              }}
            >
              {t('Submit onboarding', '提交开通')}
            </Button>
          )}
        </div>
      </Card>
    </FormPage>
  )
}
