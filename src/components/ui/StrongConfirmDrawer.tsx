import { useEffect, useState, type ReactNode } from 'react'
import { Alert } from './Alert'
import { Button } from './Button'
import { Drawer, type DrawerSize } from './Drawer'
import { Field, Input } from './Field'

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
  confirmText = '删除',
  cancelText = '取消',
  danger = true,
  side = 'right',
  size = 'md',
  onConfirm,
}: StrongConfirmDrawerProps) {
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
