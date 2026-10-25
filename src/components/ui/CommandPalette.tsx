import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Drawer } from './Drawer'
import { Input } from './Field'
import { Spinner } from './Spinner'

export type CommandItem = {
  id: string
  label: string
  type?: string
  group?: string
  onSelect?: () => void
}

const RECENT_KEY = 'x-ui.cmdk.recent'

function readRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

function pushRecent(id: string) {
  const next = [id, ...readRecent().filter((x) => x !== id)].slice(0, 8)
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next))
  } catch {
    /* ignore */
  }
}

export function CommandPalette({
  open,
  onClose,
  items,
  placeholder = '搜索…',
  title = '搜索',
  /** Async / remote results; when provided, replaces local filter for non-empty query */
  onQueryChange,
  loading = false,
  recent = true,
}: {
  open: boolean
  onClose: () => void
  items: CommandItem[]
  placeholder?: string
  title?: string
  onQueryChange?: (query: string) => void
  loading?: boolean
  recent?: boolean
}) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [recentIds, setRecentIds] = useState<string[]>([])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      if (recent) setRecentIds(readRecent())
    }
  }, [open, recent])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (onQueryChange) return items
    if (!q) {
      if (!recent || !recentIds.length) return items
      const map = new Map(items.map((i) => [i.id, i]))
      const recentItems = recentIds.map((id) => map.get(id)).filter(Boolean) as CommandItem[]
      const rest = items.filter((i) => !recentIds.includes(i.id))
      return [
        ...recentItems.map((i) => ({ ...i, group: i.group ?? '最近使用' })),
        ...rest,
      ]
    }
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.type?.toLowerCase().includes(q) ||
        item.group?.toLowerCase().includes(q),
    )
  }, [items, onQueryChange, query, recent, recentIds])

  const groups = useMemo(() => {
    const map = new Map<string, CommandItem[]>()
    for (const item of filtered) {
      const g = item.group ?? '结果'
      if (!map.has(g)) map.set(g, [])
      map.get(g)!.push(item)
    }
    return [...map.entries()].sort(([a], [b]) => {
      if (a === '最近使用') return -1
      if (b === '最近使用') return 1
      return a.localeCompare(b, 'zh')
    })
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
          if (recent) {
            pushRecent(item.id)
            setRecentIds(readRecent())
          }
          item.onSelect?.()
          onClose()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, flat, active, onClose, recent])

  let flatIndex = -1

  return (
    <Drawer open={open} onClose={onClose} title={title} size="md">
      <div className="stack search-drawer">
        <div className="cmdk-search">
          <span className="cmdk-search-icon" aria-hidden>
            <Search size={15} strokeWidth={2} />
          </span>
          <Input
            autoFocus
            value={query}
            onChange={(e) => {
              const next = e.target.value
              setQuery(next)
              setActive(0)
              onQueryChange?.(next)
            }}
            placeholder={placeholder}
            aria-label={placeholder}
          />
        </div>
        <div className="search-drawer-results">
          {loading ? (
            <div className="resource-state-spinner">
              <Spinner />
            </div>
          ) : groups.length === 0 ? (
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
                          if (recent) {
                            pushRecent(item.id)
                            setRecentIds(readRecent())
                          }
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
