import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Field,
  FormErrors,
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
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [totp, setTotp] = useState('')
  const [totpBound, setTotpBound] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [fieldErrors, setFieldErrors] = useState<{
    user?: string
    password?: string
    totp?: string
  }>({})

  function validate() {
    const list: string[] = []
    const fields: typeof fieldErrors = {}

    if (!user.trim()) {
      fields.user = '请输入用户名'
      list.push('请输入用户名')
    }
    if (!password) {
      fields.password = '请输入密码'
      list.push('请输入密码')
    } else if (password.length < 6) {
      fields.password = '密码至少 6 位'
      list.push('密码至少 6 位')
    }
    if (!totpBound) {
      list.push('请先完成谷歌验证器绑定')
    } else if (totp.length < 6) {
      fields.totp = '请输入 6 位验证码'
      list.push('请输入 6 位谷歌验证码')
    }

    setFieldErrors(fields)
    setErrors(list)
    return list.length === 0
  }

  return (
    <LoginCard
      hint={
        <>
          演示账号 admin / admin123 · 无真实鉴权
          <br />
          还没有账号？{' '}
          <Link className="text-link" to="/examples/register">
            注册
          </Link>
        </>
      }
      onSubmit={(e) => {
        e.preventDefault()
        if (!validate()) {
          toast('请完善登录信息', 'warn')
          return
        }
        setSubmitting(true)
        window.setTimeout(() => {
          setSubmitting(false)
          toast('登录成功（示例）', 'success')
        }, 450)
      }}
    >
      {errors.length ? <FormErrors errors={errors} title="无法登录" /> : null}
      <Field label="用户名" htmlFor="login-user" error={fieldErrors.user}>
        <Input
          id="login-user"
          value={user}
          onChange={(e) => {
            setUser(e.target.value)
            setFieldErrors((f) => ({ ...f, user: undefined }))
          }}
          placeholder="例如：admin"
          autoComplete="username"
          invalid={Boolean(fieldErrors.user)}
        />
      </Field>
      <Field label="密码" htmlFor="login-pass" error={fieldErrors.password}>
        <Input
          id="login-pass"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setFieldErrors((f) => ({ ...f, password: undefined }))
          }}
          placeholder="输入密码"
          autoComplete="current-password"
          invalid={Boolean(fieldErrors.password)}
        />
      </Field>

      {!totpBound ? (
        <TotpBindPanel
          secret={DEMO_TOTP_SECRET}
          account={user.trim() || 'admin'}
          issuer="X-UI"
          onBound={() => {
            setTotpBound(true)
            setErrors([])
            toast('已标记为绑定（示例）', 'success')
          }}
        />
      ) : null}

      <Field
        label="谷歌验证码"
        htmlFor="login-totp"
        hint={totpBound ? '演示任意 6 位数字可通过。' : '绑定完成后输入 6 位动态码。'}
        error={fieldErrors.totp}
      >
        <PinInput
          id="login-totp"
          length={6}
          value={totp}
          onChange={(v) => {
            setTotp(v)
            setFieldErrors((f) => ({ ...f, totp: undefined }))
          }}
          invalid={Boolean(fieldErrors.totp)}
          autoFocus={false}
          aria-label="谷歌验证码"
        />
      </Field>
      <Button variant="primary" type="submit" loading={submitting} style={{ width: '100%' }}>
        登录
      </Button>
    </LoginCard>
  )
}
