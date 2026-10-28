import { useState, useEffect, type ReactNode } from 'react'
import { Modal } from './Modal'
import { Button } from './Button'
import { Alert } from './Alert'
import { Field, Input } from './Field'
import { useT } from '@/i18n'

export type ConfirmModalProps = {
  open: boolean
  onClose: () => void
  title: ReactNode
  children?: ReactNode
  /** Highlighted resource id / name */
  resourceName?: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
  /** Require typing this exact string (强确认); defaults to resourceName when set */
  confirmValue?: string
  onConfirm: () => void
}

/**
 * High-risk confirm dialog — prefer Modal over Drawer.
 * Pass `confirmValue` or `resourceName` for typed strong confirm.
 */
export function ConfirmModal({
  open,
  onClose,
  title,
  children,
  resourceName,
  confirmText,
  cancelText,
  danger,
  confirmValue,
  onConfirm,
}: ConfirmModalProps) {
  const t = useT()
  const resolvedConfirmText = confirmText ?? t('confirm.confirm')
  const resolvedCancelText = cancelText ?? t('confirm.cancel')
  const [typed, setTyped] = useState('')
  useEffect(() => {
    if (open) setTyped('')
  }, [open])

  const expect = confirmValue ?? resourceName
  const canConfirm = expect ? typed === expect : true

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      className={danger ? 'modal-danger' : undefined}
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
          <Alert tone="danger" title={t('confirm.irreversible')}>
            {children ?? t('confirm.deleteWarning')}
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
            htmlFor="confirm-name"
          >
            <Input
              id="confirm-name"
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
    </Modal>
  )
}

/** Typed delete / irreversible action — danger defaults on */
export function StrongConfirm({
  confirmText,
  danger = true,
  ...rest
}: ConfirmModalProps) {
  const t = useT()
  return (
    <ConfirmModal
      {...rest}
      danger={danger}
      confirmText={confirmText ?? t('confirm.delete')}
    />
  )
}
