import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Field, LoginCard, PinInput, useToast } from '@/components/ui'

const RESEND_SEC = 60
const DEMO_CODE = '123456'

function maskEmail(email: string) {
  const [local, domain] = email.split('@')
  if (!local || !domain) return email
  const head = local.slice(0, Math.min(2, local.length))
  return `${head}${'*'.repeat(Math.max(1, local.length - head.length))}@${domain}`
}

export function ExampleVerifyEmailPage() {
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
    const t = window.setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => window.clearTimeout(t)
  }, [cooldown])

  function resend() {
    if (cooldown > 0) return
    setCooldown(RESEND_SEC)
    setCode('')
    setInvalid(false)
    toast(`已重新发送至 ${maskEmail(email)}（示例码 ${DEMO_CODE}）`, 'info')
  }

  return (
    <LoginCard
      subtitle="验证邮箱"
      hint={
        <>
          邮箱填错了？{' '}
          <Link className="text-link" to="/examples/register">
            返回注册
          </Link>
        </>
      }
      onSubmit={(e) => {
        e.preventDefault()
        if (code.length < 6) {
          setInvalid(true)
          toast('请输入 6 位验证码', 'warn')
          return
        }
        setSubmitting(true)
        window.setTimeout(() => {
          setSubmitting(false)
          if (code !== DEMO_CODE) {
            setInvalid(true)
            toast('验证码不正确（演示请用 123456）', 'error')
            return
          }
          setInvalid(false)
          toast('邮箱已验证，欢迎加入（示例）', 'success')
          navigate('/examples/login')
        }, 500)
      }}
    >
      <p className="login-verify-lead">
        我们已向 <strong>{maskEmail(email)}</strong> 发送了 6 位验证码，请查收邮件后填入。
      </p>
      <Field
        label="邮箱验证码"
        htmlFor="verify-code"
        hint={`演示任意流程可用码：${DEMO_CODE}`}
        error={invalid ? '验证码不正确或未填完整' : undefined}
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
          aria-label="邮箱验证码"
        />
      </Field>
      <div className="login-resend-row">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={cooldown > 0}
          onClick={resend}
        >
          {cooldown > 0 ? `${cooldown}s 后可重发` : '重新发送'}
        </Button>
        <Button variant="primary" size="lg" type="submit" loading={submitting} style={{ flex: 1 }}>
          验证并继续
        </Button>
      </div>
    </LoginCard>
  )
}
