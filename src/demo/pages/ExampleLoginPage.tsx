import { useState } from 'react'
import { Button, Field, Input, LoginCard, useToast } from '@/components/ui'

export function ExampleLoginPage() {
  const { toast } = useToast()
  const [needTotp, setNeedTotp] = useState(false)

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
      {needTotp ? (
        <Field label="谷歌验证码" htmlFor="login-totp" hint="设计稿任意 6 位数字可通过。">
          <Input id="login-totp" inputMode="numeric" maxLength={6} placeholder="6 位动态码" />
        </Field>
      ) : null}
      <Button variant="primary" type="submit" style={{ width: '100%' }}>
        登录
      </Button>
      <Button
        variant="ghost"
        type="button"
        style={{ width: '100%' }}
        onClick={() => setNeedTotp((v) => !v)}
      >
        {needTotp ? '隐藏验证码' : '演示：需要验证码'}
      </Button>
    </LoginCard>
  )
}
