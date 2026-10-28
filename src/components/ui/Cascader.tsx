import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'

export type CascaderOption = {
  value: string
  label: string
  children?: CascaderOption[]
  disabled?: boolean
}

export function Cascader({
  options,
  value = [],
  onChange,
  placeholder,
  className,
}: {
  options: CascaderOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  className?: string
}) {
  const t = useT()
  const resolvedPlaceholder = placeholder ?? t('cascader.placeholder')
  const [open, setOpen] = useState(false)
  const [path, setPath] = useState<string[]>(value)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const columns = useMemo(() => {
    const cols: CascaderOption[][] = [options]
    let level = options
    for (const v of path) {
      const node = level.find((o) => o.value === v)
      if (!node?.children?.length) break
      cols.push(node.children)
      level = node.children
    }
    return cols
  }, [options, path])

  const labels = useMemo(() => {
    const out: string[] = []
    let level = options
    for (const v of value) {
      const node = level.find((o) => o.value === v)
      if (!node) break
      out.push(node.label)
      level = node.children ?? []
    }
    return out
  }, [options, value])

  return (
    <div className={cn('cascader', open && 'open', className)} ref={rootRef}>
      <button type="button" className="cascader-trigger" onClick={() => setOpen((v) => !v)}>
        <span className={cn(!labels.length && 'muted')}>{labels.length ? labels.join(' / ') : resolvedPlaceholder}</span>
        <ChevronDown size={16} />
      </button>
      {open ? (
        <div className="cascader-menu">
          {columns.map((col, ci) => (
            <ul key={ci} className="cascader-col">
              {col.map((opt) => {
                const active = path[ci] === opt.value
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      className={cn('cascader-option', active && 'active')}
                      disabled={opt.disabled}
                      onClick={() => {
                        const next = [...path.slice(0, ci), opt.value]
                        setPath(next)
                        if (!opt.children?.length) {
                          onChange?.(next)
                          setOpen(false)
                        }
                      }}
                    >
                      <span>{opt.label}</span>
                      {opt.children?.length ? <ChevronRight size={14} /> : null}
                    </button>
                  </li>
                )
              })}
            </ul>
          ))}
        </div>
      ) : null}
    </div>
  )
}
