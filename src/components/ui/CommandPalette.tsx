import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Drawer } from './Drawer'
import { Input } from './Field'

export type CommandItem = {
  id: string
  label: string
  type?: string
  group?: string
  onSelect?: () => void
}

export function CommandPalette({
  open,
  onClose,
  items,
  placeholder = '搜索…',
  title = '搜索',
}: {
  open: boolean
  onClose: () => void
  items: CommandItem[]
  placeholder?: string
  title?: string
}) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
    }
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.type?.toLowerCase().includes(q) ||
        item.group?.toLowerCase().includes(q),
    )
  }, [items, query])

  const groups = useMemo(() => {
    const map = new Map<string, CommandItem[]>()
    for (const item of filtered) {
      const g = item.group ?? '结果'
      if (!map.has(g)) map.set(g, [])
      map.get(g)!.push(item)
    }
    return [...map.entries()]
  }, [filtered])

  const flat = filtered

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((i) => Math.min(flat.length - 1, i + 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((i) => Math.max(0, i - 1))
      }
      if (e.key === 'Enter') {
        const item = flat[active]
        if (item) {
          item.onSelect?.()
          onClose()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, flat, active, onClose])

  let flatIndex = -1

  return (
    <Drawer open={open} onClose={onClose} title={title}>
      <div className="stack search-drawer">
        <div className="field">
          <div className="input-group">
            <span className="input-group-affix" aria-hidden>
              <Search size={14} strokeWidth={2} />
            </span>
            <Input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setActive(0)
              }}
              placeholder={placeholder}
              aria-label={placeholder}
            />
          </div>
        </div>
        <div className="search-drawer-results">
          {groups.length === 0 ? (
            <p className="muted">无匹配结果</p>
          ) : (
            groups.map(([group, groupItems]) => (
              <div key={group}>
                <div className="cmdk-group-label">{group}</div>
                <div className="search-result-list">
                  {groupItems.map((item) => {
                    flatIndex += 1
                    const index = flatIndex
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={cn('search-result-item', index === active && 'active')}
                        onMouseEnter={() => setActive(index)}
                        onClick={() => {
                          item.onSelect?.()
                          onClose()
                        }}
                      >
                        {item.type ? <span className="search-result-type">{item.type}</span> : null}
                        <span className="search-result-main">{item.label as ReactNode}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Drawer>
  )
}
