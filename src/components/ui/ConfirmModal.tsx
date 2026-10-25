import { useState, useEffect, type ReactNode } from 'react'
import { Modal } from './Modal'
import { Button } from './Button'
import { Alert } from './Alert'
import { Field, Input } from './Field'

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
  confirmText = '确认',
  cancelText = '取消',
  danger,
  confirmValue,
  onConfirm,
}: ConfirmModalProps) {
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
      <div className="stack confirm-modal-body">
        {danger ? (
          <Alert tone="danger" title="此操作不可撤销">
            {children ?? '删除后数据无法恢复，请谨慎确认。'}
          </Alert>
        ) : (
          children
        )}

        {resourceName ? (
          <p className="confirm-resource">
            资源：<code className="mono">{resourceName}</code>
          </p>
        ) : null}

        {expect ? (
          <Field
            label={
              <>
                请输入 <code className="mono confirm-expect">{expect}</code> 以确认
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
  confirmText = '删除',
  danger = true,
  ...rest
}: ConfirmModalProps) {
  return <ConfirmModal {...rest} danger={danger} confirmText={confirmText} />
}
