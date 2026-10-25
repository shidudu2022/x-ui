import { useState, useEffect, type ReactNode } from 'react'
import { Modal } from './Modal'
import { Button } from './Button'
import { Field, Input } from './Field'

export function ConfirmModal({
  open,
  onClose,
  title,
  children,
  confirmText = '确认',
  cancelText = '取消',
  danger,
  confirmValue,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  title: ReactNode
  children?: ReactNode
  confirmText?: string
  cancelText?: string
  danger?: boolean
  confirmValue?: string
  onConfirm: () => void
}) {
  const [typed, setTyped] = useState('')
  useEffect(() => {
    if (open) setTyped('')
  }, [open])

  const canConfirm = confirmValue ? typed === confirmValue : true

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="actions">
          <Button onClick={onClose}>{cancelText}</Button>
          <Button
            variant={danger ? 'danger' : 'primary'}
            disabled={!canConfirm}
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className="stack">
        {children}
        {confirmValue ? (
          <Field label={`请输入 ${confirmValue} 以确认`} htmlFor="confirm-name">
            <Input
              id="confirm-name"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder={confirmValue}
              autoComplete="off"
            />
          </Field>
        ) : null}
      </div>
    </Modal>
  )
}
