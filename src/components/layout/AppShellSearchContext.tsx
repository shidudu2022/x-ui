import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/** Full search config used by ListPage (drawer + trigger). */
export type AppShellListSearchConfig = {
  title?: ReactNode
  hasQuery?: boolean
  triggerLabel?: ReactNode
  children: ReactNode
  onClear: () => void
  onSubmit: () => void
  clearLabel?: ReactNode
  submitLabel?: ReactNode
}

type TriggerState = {
  hasQuery: boolean
  triggerLabel?: ReactNode
}

type AppShellSearchContextValue = {
  active: boolean
  hasQuery: boolean
  triggerLabel: ReactNode | undefined
  open: boolean
  setOpen: (open: boolean) => void
  register: (config: TriggerState) => void
  update: (config: TriggerState) => void
  unregister: () => void
}

const AppShellSearchContext = createContext<AppShellSearchContextValue | null>(null)

export function AppShellSearchProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false)
  const [hasQuery, setHasQuery] = useState(false)
  const [triggerLabel, setTriggerLabel] = useState<ReactNode | undefined>(undefined)
  const [open, setOpen] = useState(false)

  const register = useCallback((config: TriggerState) => {
    setActive(true)
    setHasQuery(Boolean(config.hasQuery))
    setTriggerLabel(config.triggerLabel)
  }, [])

  const update = useCallback((config: TriggerState) => {
    setHasQuery((prev) => {
      const next = Boolean(config.hasQuery)
      return prev === next ? prev : next
    })
    setTriggerLabel((prev) => (prev === config.triggerLabel ? prev : config.triggerLabel))
  }, [])

  const unregister = useCallback(() => {
    setActive(false)
    setHasQuery(false)
    setTriggerLabel(undefined)
    setOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      active,
      hasQuery,
      triggerLabel,
      open,
      setOpen,
      register,
      update,
      unregister,
    }),
    [active, hasQuery, triggerLabel, open, register, update, unregister],
  )

  return (
    <AppShellSearchContext.Provider value={value}>{children}</AppShellSearchContext.Provider>
  )
}

export function useAppShellSearch(): AppShellSearchContextValue {
  const ctx = useContext(AppShellSearchContext)
  if (!ctx) {
    throw new Error('useAppShellSearch must be used within AppShell')
  }
  return ctx
}

export function useAppShellSearchOptional(): AppShellSearchContextValue | null {
  return useContext(AppShellSearchContext)
}
