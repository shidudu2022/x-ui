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

export function ExampleOnboardingPage() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [notify, setNotify] = useState(true)

  if (done) {
    return (
      <FormPage title="开通完成" description="工作区已就绪。">
        <Card padded className="stack">
          <Alert tone="success" title="全部完成">
            已创建工作区并发送邀请邮件。可随时在设置中调整通知偏好。
          </Alert>
          <div className="actions">
            <Button variant="primary" href="/examples/dashboard">
              进入仪表盘
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setDone(false)
                setStep(1)
              }}
            >
              再走一遍
            </Button>
          </div>
        </Card>
      </FormPage>
    )
  }

  return (
    <FormPage title="开通向导" description="组织信息 → 邀请成员 → 偏好 → 确认提交。">
      <Steps
        current={step}
        items={[
          { id: '1', label: '组织' },
          { id: '2', label: '成员' },
          { id: '3', label: '偏好' },
          { id: '4', label: '确认' },
        ]}
      />
      <Card padded className="stack" style={{ marginTop: 16 }}>
        {step === 1 ? (
          <>
            <Field label="组织名称" htmlFor="ob-org" required>
              <Input id="ob-org" defaultValue="Acme Edge" />
            </Field>
            <Field label="简介" htmlFor="ob-bio">
              <Textarea id="ob-bio" rows={3} placeholder="可选" />
            </Field>
          </>
        ) : null}
        {step === 2 ? (
          <Field label="邀请邮箱（逗号分隔）" htmlFor="ob-mails" hint="将发送开通链接">
            <Textarea id="ob-mails" rows={3} defaultValue="bob@example.com, cara@example.com" />
          </Field>
        ) : null}
        {step === 3 ? (
          <Field label="邮件通知" hint="重要变更与安全提醒">
            <Switch
              checked={notify}
              onChange={(e) => setNotify(e.target.checked)}
              aria-label="邮件通知"
            />
          </Field>
        ) : null}
        {step === 4 ? (
          <Alert tone="info" title="确认提交">
            将创建组织、发送 2 封邀请，并{notify ? '开启' : '关闭'}邮件通知。
          </Alert>
        ) : null}
        <div className="actions">
          <Button disabled={step <= 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
            上一步
          </Button>
          {step < 4 ? (
            <Button variant="primary" onClick={() => setStep((s) => s + 1)}>
              下一步
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                setDone(true)
                toast('开通成功', 'success')
              }}
            >
              提交开通
            </Button>
          )}
        </div>
      </Card>
    </FormPage>
  )
}
