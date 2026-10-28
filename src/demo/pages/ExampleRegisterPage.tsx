import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Button,
  Checkbox,
  Field,
  FormErrors,
  Input,
  LoginCard,
  useToast,
} from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function ExampleRegisterPage() {
  const t = useDemoT()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agree, setAgree] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  function validate() {
    const next: string[] = []
    if (!name.trim()) next.push(t('Enter a display name', '请填写显示名称'))
    if (!email.trim()) next.push(t('Enter an email', '请填写邮箱'))
    else if (!isEmail(email)) next.push(t('Invalid email format', '邮箱格式不正确'))
    if (password.length < 8) next.push(t('Password must be at least 8 characters', '密码至少 8 位'))
    if (password !== confirm) next.push(t('Passwords do not match', '两次输入的密码不一致'))
    if (!agree) next.push(t('Read and accept the terms of service', '请阅读并同意服务条款'))
    return next
  }

  return (
    <LoginCard
      subtitle={t('Create account', '创建账号')}
      hint={
        <>
          {t('Already have an account? ', '已有账号？')}{' '}
          <Link className="text-link" to="/examples/login">
            {t('Sign in', '去登录')}
          </Link>
        </>
      }
      onSubmit={(e) => {
        e.preventDefault()
        const next = validate()
        setErrors(next)
        if (next.length) return
        setSubmitting(true)
        window.setTimeout(() => {
          setSubmitting(false)
          toast(t('Verification code sent (demo)', '验证码已发送（示例）'), 'success')
          navigate(`/examples/verify-email?email=${encodeURIComponent(email.trim())}`, {
            state: { email: email.trim() },
          })
        }, 600)
      }}
    >
      {errors.length ? <FormErrors errors={errors} /> : null}
      <Field label={t('Display name', '显示名称')} htmlFor="reg-name">
        <Input
          id="reg-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="nickname"
          placeholder={t('e.g. Alex Ops', '例如：运维小王')}
        />
      </Field>
      <Field
        label={t('Email', '邮箱')}
        htmlFor="reg-email"
        hint={t('Used for verification codes and notifications', '用于接收验证码与通知')}
      >
        <Input
          id="reg-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="you@example.com"
        />
      </Field>
      <Field label={t('Password', '密码')} htmlFor="reg-pass" hint={t('At least 8 characters', '至少 8 位')}>
        <Input
          id="reg-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </Field>
      <Field label={t('Confirm password', '确认密码')} htmlFor="reg-pass2">
        <Input
          id="reg-pass2"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />
      </Field>
      <Checkbox
        className="login-agree"
        checked={agree}
        onChange={(e) => setAgree(e.target.checked)}
        label={
          <>
            {t('I have read and agree to the ', '我已阅读并同意')}{' '}
            <span className="text-link" role="link" tabIndex={0}>
              {t('Terms of Service', '服务条款')}
            </span>{' '}
            {t('and', '与')}{' '}
            <span className="text-link" role="link" tabIndex={0}>
              {t('Privacy Policy', '隐私政策')}
            </span>
          </>
        }
      />
      <Button variant="primary" size="lg" block type="submit" loading={submitting}>
        {t('Register and verify email', '注册并验证邮箱')}
      </Button>
    </LoginCard>
  )
}
