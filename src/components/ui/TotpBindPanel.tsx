import { useMemo, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { qrSvgDataUri } from '@/lib/qrSvg'
import { Button } from './Button'
import { CopyButton } from './CopyButton'

export function buildTotpOtpauth({
  secret,
  account,
  issuer = 'X-UI',
}: {
  secret: string
  account: string
  issuer?: string
}) {
  const label = `${encodeURIComponent(issuer)}:${encodeURIComponent(account)}`
  return `otpauth://totp/${label}?secret=${encodeURIComponent(secret)}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`
}

/** Setup panel shown when TOTP is not yet bound — QR + manual secret. */
export function TotpBindPanel({
  secret,
  account,
  issuer = 'X-UI',
  qrSrc,
  title = '绑定谷歌验证器',
  description = '使用 Google Authenticator / 1Password 等扫码，或手动输入密钥。',
  actionLabel = '我已完成绑定',
  onBound,
  className,
  footer,
}: {
  /** Base32 secret (also used to build otpauth when `qrSrc` omitted) */
  secret: string
  account?: string
  issuer?: string
  /** Optional pre-built QR image; defaults to local SVG from otpauth URI */
  qrSrc?: string
  title?: ReactNode
  description?: ReactNode
  actionLabel?: ReactNode
  onBound?: () => void
  className?: string
  footer?: ReactNode
}) {
  const src = useMemo(() => {
    if (qrSrc) return qrSrc
    const otpauth = buildTotpOtpauth({
      secret,
      account: account ?? 'user',
      issuer,
    })
    return qrSvgDataUri(otpauth)
  }, [account, issuer, qrSrc, secret])

  return (
    <div className={cn('totp-bind', className)}>
      <div className="totp-bind-copy">
        <strong className="totp-bind-title">{title}</strong>
        {description ? <p className="totp-bind-desc muted">{description}</p> : null}
      </div>
      <div className="totp-qr-wrap">
        <img className="totp-qr" src={src} width={168} height={168} alt="谷歌验证器绑定二维码" />
      </div>
      <div className="totp-secret-row">
        <code className="totp-secret mono">{secret}</code>
        <CopyButton value={secret} label="复制" />
      </div>
      {onBound ? (
        <Button type="button" size="sm" variant="secondary" block onClick={onBound}>
          {actionLabel}
        </Button>
      ) : null}
      {footer}
    </div>
  )
}
