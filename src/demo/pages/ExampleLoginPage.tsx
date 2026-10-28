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
import { useDemoT } from '@/demo/i18n/useDemoT'

/** Demo Base32 secret — not a real credential */
const DEMO_TOTP_SECRET = 'JBSWY3DPEHPK3PXP'

export function ExampleLoginPage() {
  const t = useDemoT()
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
      fields.user = t('Enter a username', '请输入用户名')
      list.push(t('Enter a username', '请输入用户名'))
    }
    if (!password) {
      fields.password = t('Enter a password', '请输入密码')
      list.push(t('Enter a password', '请输入密码'))
    } else if (password.length < 6) {
      fields.password = t('Password must be at least 6 characters', '密码至少 6 位')
      list.push(t('Password must be at least 6 characters', '密码至少 6 位'))
    }
    if (!totpBound) {
      list.push(t('Complete Google Authenticator binding first', '请先完成谷歌验证器绑定'))
    } else if (totp.length < 6) {
      fields.totp = t('Enter the 6-digit code', '请输入 6 位验证码')
      list.push(t('Enter the 6-digit Google code', '请输入 6 位谷歌验证码'))
    }

    setFieldErrors(fields)
    setErrors(list)
    return list.length === 0
  }

  return (
    <LoginCard
      hint={
        <>
          {t('Demo account admin / admin123 · no real auth', '演示账号 admin / admin123 · 无真实鉴权')}
          <br />
          {t("Don't have an account? ", '还没有账号？')}{' '}
          <Link className="text-link" to="/examples/register">
            {t('Sign up', '注册')}
          </Link>
        </>
      }
      onSubmit={(e) => {
        e.preventDefault()
        if (!validate()) {
          toast(t('Complete the login form', '请完善登录信息'), 'warn')
          return
        }
        setSubmitting(true)
        window.setTimeout(() => {
          setSubmitting(false)
          toast(t('Signed in (demo)', '登录成功（示例）'), 'success')
        }, 450)
      }}
    >
      {errors.length ? <FormErrors errors={errors} title={t('Unable to sign in', '无法登录')} /> : null}
      <Field label={t('Username', '用户名')} htmlFor="login-user" error={fieldErrors.user}>
        <Input
          id="login-user"
          value={user}
          onChange={(e) => {
            setUser(e.target.value)
            setFieldErrors((f) => ({ ...f, user: undefined }))
          }}
          placeholder={t('e.g. admin', '例如：admin')}
          autoComplete="username"
          invalid={Boolean(fieldErrors.user)}
        />
      </Field>
      <Field label={t('Password', '密码')} htmlFor="login-pass" error={fieldErrors.password}>
        <Input
          id="login-pass"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setFieldErrors((f) => ({ ...f, password: undefined }))
          }}
          placeholder={t('Enter password', '输入密码')}
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
            toast(t('Marked as bound (demo)', '已标记为绑定（示例）'), 'success')
          }}
        />
      ) : null}

      <Field
        label={t('Google Authenticator code', '谷歌验证码')}
        htmlFor="login-totp"
        hint={
          totpBound
            ? t('Any 6 digits pass in this demo.', '演示任意 6 位数字可通过。')
            : t('Enter the 6-digit code after binding.', '绑定完成后输入 6 位动态码。')
        }
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
          aria-label={t('Google Authenticator code', '谷歌验证码')}
        />
      </Field>
      <Button variant="primary" size="lg" block type="submit" loading={submitting}>
        {t('Sign in', '登录')}
      </Button>
    </LoginCard>
  )
}
