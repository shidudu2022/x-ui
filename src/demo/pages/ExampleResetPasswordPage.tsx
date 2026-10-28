import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Field, FormErrors, FormPage, Input, useToast } from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

export function ExampleResetPasswordPage() {
  const t = useDemoT()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const next: string[] = []
    if (!email.trim()) next.push(t('Enter an email', '请输入邮箱'))
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.push(t('Invalid email format', '邮箱格式不正确'))
    setErrors(next)
    if (next.length) return
    toast(t('Reset link sent (demo)', '重置链接已发送（示例）'), 'success')
  }

  return (
    <FormPage
      title={t('Reset password', '重置密码')}
      description={t('Enter your registered email; we will send a reset link.', '输入注册邮箱，我们将发送重置链接。')}
    >
      <form className="stack" onSubmit={submit}>
        <FormErrors errors={errors} />
        <Field label={t('Email', '邮箱')} htmlFor="reset-email" error={errors.length ? ' ' : undefined}>
          <Input
            id="reset-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <div className="actions">
          <Button type="submit" variant="primary" block>
            {t('Send reset link', '发送重置链接')}
          </Button>
        </div>
        <p className="muted" style={{ margin: 0, fontSize: 13 }}>
          {t('Remember your password? ', '想起密码了？')}{' '}
          <Link className="text-link" to="/examples/login">
            {t('Back to sign in', '返回登录')}
          </Link>
        </p>
      </form>
    </FormPage>
  )
}
