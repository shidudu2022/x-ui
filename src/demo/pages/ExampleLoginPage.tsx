import { useState } from 'react'
import { Button, Field, Input, LoginCard, PinInput, useToast } from '@/components/ui'

export function ExampleLoginPage() {
  const { toast } = useToast()
  const [totp, setTotp] = useState('')

  return (
    <LoginCard
      hint="演示账号 admin / admin123 · 无真实鉴权"
      onSubmit={(e) => {
        e.preventDefault()
        toast('登录成功（示例）', 'success')
      }}
    >
      <Field label="用户名" htmlFor="login-user">
        <Input id="login-user" defaultValue="admin" autoComplete="username" />
      </Field>
      <Field label="密码" htmlFor="login-pass">
        <Input
          id="login-pass"
          type="password"
          defaultValue="admin123"
          autoComplete="current-password"
        />
      </Field>
      <Field label="谷歌验证码" htmlFor="login-totp" hint="演示任意 6 位数字可通过。">
        <PinInput
          id="login-totp"
          length={6}
          value={totp}
          onChange={setTotp}
          autoFocus={false}
          aria-label="谷歌验证码"
        />
      </Field>
      <Button variant="primary" type="submit" style={{ width: '100%' }}>
        登录
      </Button>
    </LoginCard>
  )
}
