import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Field, FormErrors, FormPage, Input, useToast } from '@/components/ui'

export function ExampleResetPasswordPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const next: string[] = []
    if (!email.trim()) next.push('请输入邮箱')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.push('邮箱格式不正确')
    setErrors(next)
    if (next.length) return
    toast('重置链接已发送（示例）', 'success')
  }

  return (
    <FormPage title="重置密码" description="输入注册邮箱，我们将发送重置链接。">
      <form className="stack" onSubmit={submit}>
        <FormErrors errors={errors} />
        <Field label="邮箱" htmlFor="reset-email" error={errors.length ? ' ' : undefined}>
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
            发送重置链接
          </Button>
        </div>
        <p className="muted" style={{ margin: 0, fontSize: 13 }}>
          想起密码了？{' '}
          <Link className="text-link" to="/examples/login">
            返回登录
          </Link>
        </p>
      </form>
    </FormPage>
  )
}
