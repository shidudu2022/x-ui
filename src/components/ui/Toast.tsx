import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/cn'

export type ToastTone = 'info' | 'success' | 'warn' | 'error' | 'danger'

type ToastItem = {
  id: number
  message: string
  tone: ToastTone
}

type ToastContextValue = {
  toast: (message: string, tone?: ToastTone) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

function resolveTone(tone: ToastTone) {
  if (tone === 'danger') return 'error'
  return tone
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const toast = useCallback((message: string, tone: ToastTone = 'info') => {
    const id = Date.now() + Math.random()
    const resolved = resolveTone(tone)
    setItems((prev) => [...prev, { id, message, tone: resolved }])
    const ms =
      resolved === 'error' || resolved === 'warn' ? 8000 : 2800
    window.setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id))
    }, ms)
  }, [])

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-host" aria-live="polite" aria-relevant="additions">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'toast',
              'show',
              item.tone === 'info' && 'toast-info',
              item.tone === 'success' && 'toast-success',
              item.tone === 'warn' && 'toast-warn',
              item.tone === 'error' && 'toast-error',
            )}
          >
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
