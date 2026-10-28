import { useEffect, useState, type ReactNode } from 'react'
import { Alert } from './Alert'
import { Button } from './Button'
import { Drawer, type DrawerSize } from './Drawer'
import { Field, Input } from './Field'
import { useT } from '@/i18n'

export type StrongConfirmDrawerProps = {
  open: boolean
  onClose: () => void
  title: ReactNode
  children?: ReactNode
  /** Highlighted resource id / name */
  resourceName?: string
  /** Exact string the user must type; defaults to resourceName */
  confirmValue?: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
  side?: 'right' | 'left'
  size?: DrawerSize
  onConfirm: () => void
}

/**
 * Typed strong confirm inside a Drawer.
 * Prefer `StrongConfirm` (Modal) for irreversible deletes; use this when the
 * product flow is explicitly drawer-based (review details then type-to-confirm).
 */
export function StrongConfirmDrawer({
  open,
  onClose,
  title,
  children,
  resourceName,
  confirmValue,
  confirmText,
  cancelText,
  danger = true,
  side = 'right',
  size = 'md',
  onConfirm,
}: StrongConfirmDrawerProps) {
  const t = useT()
  const resolvedConfirmText = confirmText ?? t('strongConfirm.delete')
  const resolvedCancelText = cancelText ?? t('strongConfirm.cancel')
  const [typed, setTyped] = useState('')
  useEffect(() => {
    if (open) setTyped('')
  }, [open])

  const expect = confirmValue ?? resourceName
  const canConfirm = expect ? typed === expect : false

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title}
      side={side}
      size={size}
      className={danger ? 'drawer-danger' : undefined}
      footer={
        <div className="actions">
          <Button onClick={onClose}>{resolvedCancelText}</Button>
          <Button
            variant={danger ? 'danger' : 'primary'}
            disabled={!canConfirm}
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            {resolvedConfirmText}
          </Button>
        </div>
      }
    >
      <div className="stack confirm-modal-body">
        {danger ? (
          <Alert tone="danger" title={t('strongConfirm.irreversible')}>
            {children ?? t('strongConfirm.deleteWarning')}
          </Alert>
        ) : (
          children
        )}

        {resourceName ? (
          <p className="confirm-resource">
            {t('confirm.resource')}
            <code className="mono">{resourceName}</code>
          </p>
        ) : null}

        {expect ? (
          <Field
            label={
              <>
                {t('confirm.typeToConfirm', { value: expect })}
              </>
            }
            htmlFor="strong-confirm-drawer-input"
          >
            <Input
              id="strong-confirm-drawer-input"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder={expect}
              autoComplete="off"
              autoFocus
              spellCheck={false}
            />
          </Field>
        ) : null}
      </div>
    </Drawer>
  )
}
