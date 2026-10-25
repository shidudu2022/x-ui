import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { ACCENT_COLORS } from '@/theme/accents'

const HEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

const PRESETS = [
  ...Object.values(ACCENT_COLORS),
  '#ffffff',
  '#e4e4e7',
  '#71717a',
  '#18181b',
  '#ef4444',
  '#f59e0b',
  '#22c55e',
  '#06b6d4',
]

type Hsv = { h: number; s: number; v: number }

function normalizeHex(value: string) {
  const v = value.trim()
  if (!HEX.test(v)) return v
  if (v.length === 4) {
    return `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`.toLowerCase()
  }
  return v.toLowerCase()
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const n = normalizeHex(hex)
  if (!HEX.test(n)) return null
  const raw = n.slice(1)
  return {
    r: parseInt(raw.slice(0, 2), 16),
    g: parseInt(raw.slice(2, 4), 16),
    b: parseInt(raw.slice(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number) {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)))
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((n) => n.toString(16).padStart(2, '0'))
    .join('')}`
}

function rgbToHsv(r: number, g: number, b: number): Hsv {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  const s = max === 0 ? 0 : d / max
  return { h, s, v: max }
}

function hsvToRgb(h: number, s: number, v: number) {
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c
  let rp = 0
  let gp = 0
  let bp = 0
  if (h < 60) [rp, gp, bp] = [c, x, 0]
  else if (h < 120) [rp, gp, bp] = [x, c, 0]
  else if (h < 180) [rp, gp, bp] = [0, c, x]
  else if (h < 240) [rp, gp, bp] = [0, x, c]
  else if (h < 300) [rp, gp, bp] = [x, 0, c]
  else [rp, gp, bp] = [c, 0, x]
  return {
    r: (rp + m) * 255,
    g: (gp + m) * 255,
    b: (bp + m) * 255,
  }
}

function hexToHsv(hex: string): Hsv {
  const rgb = hexToRgb(hex)
  if (!rgb) return { h: 210, s: 0.7, v: 0.9 }
  return rgbToHsv(rgb.r, rgb.g, rgb.b)
}

function hsvToHex(hsv: Hsv) {
  const { r, g, b } = hsvToRgb(hsv.h, hsv.s, hsv.v)
  return rgbToHex(r, g, b)
}

function hueCss(h: number) {
  const { r, g, b } = hsvToRgb(h, 1, 1)
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
}

/** Relative luminance 0–1 — for contrast on swatches */
function luminance(hex: string) {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0.5
  const lin = [rgb.r, rgb.g, rgb.b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * lin[0]! + 0.7152 * lin[1]! + 0.0722 * lin[2]!
}

function useDismissible(
  open: boolean,
  rootRef: RefObject<HTMLDivElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) onClose()
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, rootRef])
}

function SvPlane({
  hsv,
  onChange,
  disabled,
}: {
  hsv: Hsv
  onChange: (next: Hsv) => void
  disabled?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  function pick(clientX: number, clientY: number) {
    const el = ref.current
    if (!el || disabled) return
    const rect = el.getBoundingClientRect()
    const s = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const v = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height))
    onChange({ ...hsv, s, v })
  }

  function onPointerDown(e: ReactPointerEvent) {
    if (disabled) return
    e.currentTarget.setPointerCapture(e.pointerId)
    pick(e.clientX, e.clientY)
  }

  function onPointerMove(e: ReactPointerEvent) {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
    pick(e.clientX, e.clientY)
  }

  return (
    <div
      ref={ref}
      className="color-sv"
      style={{ '--hue': hueCss(hsv.h) } as CSSProperties}
      role="slider"
      aria-label="饱和度与亮度"
      aria-valuetext={`S ${Math.round(hsv.s * 100)}% V ${Math.round(hsv.v * 100)}%`}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onKeyDown={(e) => {
        if (disabled) return
        const step = e.shiftKey ? 0.05 : 0.02
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          onChange({ ...hsv, s: Math.min(1, hsv.s + step) })
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          onChange({ ...hsv, s: Math.max(0, hsv.s - step) })
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          onChange({ ...hsv, v: Math.min(1, hsv.v + step) })
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          onChange({ ...hsv, v: Math.max(0, hsv.v - step) })
        }
      }}
    >
      <span
        className="color-sv-thumb"
        style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }}
      />
    </div>
  )
}

function HueSlider({
  hue,
  onChange,
  disabled,
}: {
  hue: number
  onChange: (h: number) => void
  disabled?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  function pick(clientX: number) {
    const el = ref.current
    if (!el || disabled) return
    const rect = el.getBoundingClientRect()
    const t = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    onChange(t * 360)
  }

  return (
    <div
      ref={ref}
      className="color-hue"
      role="slider"
      aria-label="色相"
      aria-valuemin={0}
      aria-valuemax={360}
      aria-valuenow={Math.round(hue)}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={(e) => {
        if (disabled) return
        e.currentTarget.setPointerCapture(e.pointerId)
        pick(e.clientX)
      }}
      onPointerMove={(e) => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
        pick(e.clientX)
      }}
      onKeyDown={(e) => {
        if (disabled) return
        const step = e.shiftKey ? 12 : 3
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault()
          onChange(Math.min(360, hue + step))
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault()
          onChange(Math.max(0, hue - step))
        }
      }}
    >
      <span
        className="color-hue-thumb"
        style={{ left: `${(hue / 360) * 100}%`, background: hueCss(hue) }}
      />
    </div>
  )
}

export function ColorInput({
  value = '#3b82f6',
  onChange,
  disabled,
  invalid,
  className,
  id,
  presets = PRESETS,
}: {
  value?: string
  onChange?: (hex: string) => void
  disabled?: boolean
  invalid?: boolean
  className?: string
  id?: string
  /** Quick-pick swatches; pass `[]` to hide */
  presets?: string[]
}) {
  const autoId = useId()
  const inputId = id ?? autoId
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(value)
  const hex = normalizeHex(value)
  const valid = HEX.test(hex)
  const swatch = valid ? hex : '#888888'
  const [hsv, setHsv] = useState(() => hexToHsv(swatch))

  useDismissible(open, rootRef, () => setOpen(false))

  useEffect(() => {
    setDraft(value)
    if (HEX.test(normalizeHex(value))) setHsv(hexToHsv(value))
  }, [value])

  function commitHsv(next: Hsv) {
    setHsv(next)
    const nextHex = hsvToHex(next)
    setDraft(nextHex)
    onChange?.(nextHex)
  }

  function commitHex(raw: string) {
    setDraft(raw)
    const n = normalizeHex(raw)
    if (HEX.test(n)) {
      onChange?.(n)
      setHsv(hexToHsv(n))
    } else {
      onChange?.(raw)
    }
  }

  const liveHex = hsvToHex(hsv)
  const swatchInk = luminance(swatch) > 0.62 ? 'is-light' : 'is-dark'

  return (
    <div
      ref={rootRef}
      className={cn(
        'color-input',
        open && 'open',
        invalid && 'is-invalid',
        disabled && 'is-disabled',
        className,
      )}
    >
      <div className="color-input-control">
        <button
          type="button"
          className={cn('color-input-swatch', swatchInk)}
          style={{ background: swatch }}
          disabled={disabled}
          aria-label="打开取色器"
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={() => setOpen((v) => !v)}
        />
        <input
          id={inputId}
          className="color-input-text"
          type="text"
          spellCheck={false}
          value={draft}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          placeholder="#000000"
          onChange={(e) => commitHex(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            if (HEX.test(normalizeHex(draft))) {
              const n = normalizeHex(draft)
              setDraft(n)
              onChange?.(n)
            }
          }}
        />
        <button
          type="button"
          className="color-input-caret"
          tabIndex={-1}
          disabled={disabled}
          aria-hidden
          onClick={() => setOpen((v) => !v)}
        >
          <ChevronDown size={14} strokeWidth={2.25} />
        </button>
      </div>
      {open && !disabled ? (
        <div className="color-input-panel" role="dialog" aria-label="取色器">
          <SvPlane hsv={hsv} onChange={commitHsv} disabled={disabled} />
          <HueSlider hue={hsv.h} onChange={(h) => commitHsv({ ...hsv, h })} disabled={disabled} />
          <div className="color-input-preview">
            <span
              className={cn(
                'color-input-preview-chip',
                luminance(liveHex) > 0.85 && 'is-light',
              )}
              style={{ background: liveHex }}
            />
            <span className="color-input-preview-hex">{liveHex}</span>
          </div>
          {presets.length ? (
            <div className="color-presets" role="listbox" aria-label="预设颜色">
              {presets.map((p) => {
                const active = normalizeHex(p) === hex
                const light = luminance(p) > 0.85
                return (
                  <button
                    key={p}
                    type="button"
                    role="option"
                    aria-selected={active}
                    className={cn(
                      'color-preset',
                      active && 'active',
                      light && 'is-light',
                      active && (luminance(p) > 0.55 ? 'ink-dark' : 'ink-light'),
                    )}
                    style={{ background: p }}
                    title={p}
                    onClick={() => {
                      commitHex(p)
                      setOpen(false)
                    }}
                  >
                    {active ? <Check size={11} strokeWidth={2.5} aria-hidden /> : null}
                  </button>
                )
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
