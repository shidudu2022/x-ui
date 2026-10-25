import { useState } from 'react'
import {
  Button,
  Field,
  Input,
  LoginCard,
  PinInput,
  TotpBindPanel,
  useToast,
} from '@/components/ui'

/** Demo Base32 secret — not a real credential */
const DEMO_TOTP_SECRET = 'JBSWY3DPEHPK3PXP'

export function ExampleLoginPage() {
  const { toast } = useToast()
  const [totp, setTotp] = useState('')
  const [totpBound, setTotpBound] = useState(false)
  const [user, setUser] = useState('admin')

  return (
    <LoginCard
      hint="演示账号 admin / admin123 · 无真实鉴权"
      onSubmit={(e) => {
        e.preventDefault()
        toast(
          totpBound ? '登录成功（示例）' : '请先完成谷歌验证器绑定（示例）',
          totpBound ? 'success' : 'info',
        )
      }}
    >
      <Field label="用户名" htmlFor="login-user">
        <Input
          id="login-user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          autoComplete="username"
        />
      </Field>
      <Field label="密码" htmlFor="login-pass">
        <Input
          id="login-pass"
          type="password"
          defaultValue="admin123"
          autoComplete="current-password"
        />
      </Field>

      {!totpBound ? (
        <TotpBindPanel
          secret={DEMO_TOTP_SECRET}
          account={user || 'admin'}
          issuer="X-UI"
          onBound={() => {
            setTotpBound(true)
            toast('已标记为绑定（示例）', 'success')
          }}
        />
      ) : null}

      <Field
        label="谷歌验证码"
        htmlFor="login-totp"
        hint={totpBound ? '演示任意 6 位数字可通过。' : '绑定完成后输入 6 位动态码。'}
      >
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
