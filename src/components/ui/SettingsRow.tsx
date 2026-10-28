import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'

export function SettingsRow({
  title,
  description,
  control,
  className,
}: {
  title: ReactNode
  description?: ReactNode
  control: ReactNode
  className?: string
}) {
  return (
    <div className={cn('settings-row', className)}>
      <div className="settings-row-copy">
        <div className="settings-row-title">{title}</div>
        {description ? <p className="settings-row-desc muted">{description}</p> : null}
      </div>
      <div className="settings-row-control">{control}</div>
    </div>
  )
}

export function DangerZone({
  title,
  description,
  children,
  className,
}: {
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
}) {
  const t = useT()
  const resolvedTitle = title ?? t('settingsRow.danger')
  return (
    <div className={cn('card card-pad danger-zone', className)}>
      <strong className="danger-zone-title">{resolvedTitle}</strong>
      {description ? <p className="danger-zone-desc muted">{description}</p> : null}
      <div className="danger-zone-actions actions">{children}</div>
    </div>
  )
}
