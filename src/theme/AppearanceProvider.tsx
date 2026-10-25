import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  ACCENTS,
  STORAGE_KEYS,
  resolveColorMode,
  type Accent,
  type ColorMode,
  type ColorModePreference,
  type Density,
} from './accents'

type AppearanceContextValue = {
  /** User preference (system / light / dark) */
  modePreference: ColorModePreference
  /** Resolved light/dark applied to the document */
  mode: ColorMode
  accent: Accent
  density: Density
  setModePreference: (preference: ColorModePreference) => void
  /** @deprecated use setModePreference — kept for Segmented binding */
  setMode: (preference: ColorModePreference) => void
  setAccent: (accent: Accent) => void
  setDensity: (density: Density) => void
  toggleMode: () => void
}

const AppearanceContext = createContext<AppearanceContextValue | null>(null)

const MODE_PREFERENCES = ['system', 'light', 'dark'] as const

function readStored<T extends string>(key: string, fallback: T, allowed: readonly T[]): T {
  try {
    const value = localStorage.getItem(key) as T | null
    if (value && allowed.includes(value)) return value
  } catch {
    /* ignore */
  }
  return fallback
}

function applyToBody(mode: ColorMode, accent: Accent, density: Density) {
  document.body.dataset.mode = mode
  document.body.dataset.accent = accent
  document.body.dataset.density = density
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [modePreference, setModePreferenceState] = useState<ColorModePreference>(() =>
    readStored(STORAGE_KEYS.mode, 'system', MODE_PREFERENCES),
  )
  const [resolvedMode, setResolvedMode] = useState<ColorMode>(() =>
    resolveColorMode(readStored(STORAGE_KEYS.mode, 'system', MODE_PREFERENCES)),
  )
  const [accent, setAccentState] = useState<Accent>(() =>
    readStored(STORAGE_KEYS.accent, 'blue', ACCENTS),
  )
  const [density, setDensityState] = useState<Density>(() =>
    readStored(STORAGE_KEYS.density, 'comfortable', ['comfortable', 'compact'] as const),
  )

  useEffect(() => {
    const next = resolveColorMode(modePreference)
    setResolvedMode(next)

    if (modePreference !== 'system') return

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setResolvedMode(resolveColorMode('system'))
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [modePreference])

  useEffect(() => {
    applyToBody(resolvedMode, accent, density)
  }, [resolvedMode, accent, density])

  const setModePreference = useCallback((next: ColorModePreference) => {
    setModePreferenceState(next)
    localStorage.setItem(STORAGE_KEYS.mode, next)
  }, [])

  const setAccent = useCallback((next: Accent) => {
    setAccentState(next)
    localStorage.setItem(STORAGE_KEYS.accent, next)
  }, [])

  const setDensity = useCallback((next: Density) => {
    setDensityState(next)
    localStorage.setItem(STORAGE_KEYS.density, next)
  }, [])

  const toggleMode = useCallback(() => {
    // Cycle: system → light → dark → system
    const order: ColorModePreference[] = ['system', 'light', 'dark']
    const idx = order.indexOf(modePreference)
    setModePreference(order[(idx + 1) % order.length]!)
  }, [modePreference, setModePreference])

  const value = useMemo(
    () => ({
      modePreference,
      mode: resolvedMode,
      accent,
      density,
      setModePreference,
      setMode: setModePreference,
      setAccent,
      setDensity,
      toggleMode,
    }),
    [
      modePreference,
      resolvedMode,
      accent,
      density,
      setModePreference,
      setAccent,
      setDensity,
      toggleMode,
    ],
  )

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>
}

export function useAppearance() {
  const ctx = useContext(AppearanceContext)
  if (!ctx) throw new Error('useAppearance must be used within AppearanceProvider')
  return ctx
}
