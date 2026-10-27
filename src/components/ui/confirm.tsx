import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { ConfirmModal, type ConfirmModalProps } from './ConfirmModal'

export type ConfirmOptions = {
  title: ReactNode
  description?: ReactNode
  resourceName?: string
  confirmValue?: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
}

type Pending = ConfirmOptions & {
  resolve: (ok: boolean) => void
}

type ConfirmContextValue = {
  confirm: (options: ConfirmOptions) => Promise<boolean>
}

const ConfirmContext = createContext<ConfirmContextValue | null>(null)

let imperativeConfirm: ((options: ConfirmOptions) => Promise<boolean>) | null = null

/**
 * Imperative confirm — requires {@link ConfirmProvider} in the tree.
 * Resolves `true` on confirm, `false` on cancel / dismiss.
 */
export function confirm(options: ConfirmOptions): Promise<boolean> {
  if (!imperativeConfirm) {
    console.warn('confirm() called without ConfirmProvider')
    return Promise.resolve(false)
  }
  return imperativeConfirm(options)
}

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<Pending | null>(null)
  const pendingRef = useRef(pending)
  pendingRef.current = pending

  const runConfirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setPending((current) => {
        current?.resolve(false)
        return { ...options, resolve }
      })
    })
  }, [])

  useEffect(() => {
    imperativeConfirm = runConfirm
    return () => {
      if (imperativeConfirm === runConfirm) imperativeConfirm = null
    }
  }, [runConfirm])

  const value = useMemo(() => ({ confirm: runConfirm }), [runConfirm])

  function finish(ok: boolean) {
    const current = pendingRef.current
    pendingRef.current = null
    setPending(null)
    current?.resolve(ok)
  }

  const modalProps: ConfirmModalProps | null = pending
    ? {
        open: true,
        onClose: () => finish(false),
        title: pending.title,
        children: pending.description,
        resourceName: pending.resourceName,
        confirmValue: pending.confirmValue,
        confirmText: pending.confirmText,
        cancelText: pending.cancelText,
        danger: pending.danger,
        onConfirm: () => finish(true),
      }
    : null

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {modalProps ? <ConfirmModal {...modalProps} /> : null}
    </ConfirmContext.Provider>
  )
}

/** Hook form of {@link confirm}; same ConfirmProvider requirement. */
export function useConfirm() {
  const ctx = useContext(ConfirmContext)
  if (!ctx) throw new Error('useConfirm must be used within ConfirmProvider')
  return ctx
}
