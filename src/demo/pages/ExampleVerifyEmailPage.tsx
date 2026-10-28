import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Field, LoginCard, PinInput, useToast } from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

const RESEND_SEC = 60
const DEMO_CODE = '123456'

function maskEmail(email: string) {
  const [local, domain] = email.split('@')
  if (!local || !domain) return email
  const head = local.slice(0, Math.min(2, local.length))
  return `${head}${'*'.repeat(Math.max(1, local.length - head.length))}@${domain}`
}

export function ExampleVerifyEmailPage() {
  const t = useDemoT()
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const { toast } = useToast()

  const email = useMemo(() => {
    const fromState = (location.state as { email?: string } | null)?.email
    const fromQuery = params.get('email') ?? ''
    return (fromState || fromQuery || 'you@example.com').trim()
  }, [location.state, params])

  const [code, setCode] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [cooldown, setCooldown] = useState(RESEND_SEC)

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = window.setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [cooldown])

  function resend() {
    if (cooldown > 0) return
    setCooldown(RESEND_SEC)
    setCode('')
    setInvalid(false)
    toast(
      t(`Resent to ${maskEmail(email)} (demo code ${DEMO_CODE})`, `已重新发送至 ${maskEmail(email)}（示例码 ${DEMO_CODE}）`),
      'info',
    )
  }

  return (
    <LoginCard
      subtitle={t('Verify email', '验证邮箱')}
      hint={
        <>
          {t('Wrong email? ', '邮箱填错了？')}{' '}
          <Link className="text-link" to="/examples/register">
            {t('Back to register', '返回注册')}
          </Link>
        </>
      }
      onSubmit={(e) => {
        e.preventDefault()
        if (code.length < 6) {
          setInvalid(true)
          toast(t('Enter the 6-digit code', '请输入 6 位验证码'), 'warn')
          return
        }
        setSubmitting(true)
        window.setTimeout(() => {
          setSubmitting(false)
          if (code !== DEMO_CODE) {
            setInvalid(true)
            toast(t('Incorrect code (demo: use 123456)', '验证码不正确（演示请用 123456）'), 'error')
            return
          }
          setInvalid(false)
          toast(t('Email verified — welcome (demo)', '邮箱已验证，欢迎加入（示例）'), 'success')
          navigate('/examples/login')
        }, 500)
      }}
    >
      <p className="login-verify-lead">
        {t('We sent a 6-digit code to ', '我们已向 ')}
        <strong>{maskEmail(email)}</strong>
        {t('. Check your inbox and enter it below.', ' 发送了 6 位验证码，请查收邮件后填入。')}
      </p>
      <Field
        label={t('Email verification code', '邮箱验证码')}
        htmlFor="verify-code"
        hint={t(`Demo code for any flow: ${DEMO_CODE}`, `演示任意流程可用码：${DEMO_CODE}`)}
        error={invalid ? t('Incorrect or incomplete code', '验证码不正确或未填完整') : undefined}
      >
        <PinInput
          id="verify-code"
          length={6}
          value={code}
          onChange={(v) => {
            setCode(v)
            setInvalid(false)
          }}
          invalid={invalid}
          autoFocus
          aria-label={t('Email verification code', '邮箱验证码')}
        />
      </Field>
      <div className="login-resend-row">
        <Button type="button" variant="ghost" size="sm" disabled={cooldown > 0} onClick={resend}>
          {cooldown > 0
            ? t(`Resend in ${cooldown}s`, `${cooldown}s 后可重发`)
            : t('Resend', '重新发送')}
        </Button>
        <Button variant="primary" size="lg" type="submit" loading={submitting} style={{ flex: 1 }}>
          {t('Verify and continue', '验证并继续')}
        </Button>
      </div>
    </LoginCard>
  )
}
