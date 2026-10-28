import { useMemo, useState, type ReactNode } from 'react'
import { ChevronDown, ChevronRight, Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { Input } from './Field'

export type TreeNodeData = {
  id: string
  label: ReactNode
  children?: TreeNodeData[]
}

function nodeText(node: TreeNodeData): string {
  if (typeof node.label === 'string' || typeof node.label === 'number') return String(node.label)
  return node.id
}

function filterNodes(nodes: TreeNodeData[], q: string): TreeNodeData[] {
  if (!q) return nodes
  const out: TreeNodeData[] = []
  for (const node of nodes) {
    const kids = node.children ? filterNodes(node.children, q) : []
    if (nodeText(node).toLowerCase().includes(q) || kids.length) {
      out.push({ ...node, children: kids.length ? kids : node.children })
    }
  }
  return out
}

function Node({
  node,
  depth,
  activeId,
  onSelect,
  forceOpen,
}: {
  node: TreeNodeData
  depth: number
  activeId?: string
  onSelect?: (id: string) => void
  forceOpen?: boolean
}) {
  const t = useT()
  const [open, setOpen] = useState(depth < 1 || Boolean(forceOpen))
  const hasChildren = Boolean(node.children?.length)
  const expanded = forceOpen || open

  return (
    <div className="tree-node">
      <div
        className={cn('tree-row', activeId === node.id && 'active')}
        style={{ paddingLeft: 8 + depth * 12 }}
        onClick={() => onSelect?.(node.id)}
      >
        <button
          type="button"
          className="tree-chevron"
          aria-label={expanded ? t('tree.collapse') : t('tree.expand')}
          onClick={(e) => {
            e.stopPropagation()
            setOpen((v) => !v)
          }}
          style={{ visibility: hasChildren ? 'visible' : 'hidden', border: 0, background: 'transparent' }}
        >
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <span>{node.label}</span>
      </div>
      {hasChildren && expanded ? (
        <div className="tree-children">
          {node.children!.map((child) => (
            <Node
              key={child.id}
              node={child}
              depth={depth + 1}
              activeId={activeId}
              onSelect={onSelect}
              forceOpen={forceOpen}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function Tree({
  nodes,
  activeId,
  onSelect,
  searchable = false,
  searchPlaceholder,
  className,
}: {
  nodes: TreeNodeData[]
  activeId?: string
  onSelect?: (id: string) => void
  searchable?: boolean
  searchPlaceholder?: string
  className?: string
}) {
  const t = useT()
  const resolvedSearchPlaceholder = searchPlaceholder ?? t('tree.search')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const filtered = useMemo(() => filterNodes(nodes, q), [nodes, q])

  return (
    <div className={cn('tree', searchable && 'has-search', className)} role="tree">
      {searchable ? (
        <div className="tree-search">
          <Search size={14} aria-hidden />
          <Input
            size="sm"
            value={query}
            placeholder={resolvedSearchPlaceholder}
            aria-label={resolvedSearchPlaceholder}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      ) : null}
      {filtered.length === 0 ? (
        <p className="muted tree-empty">{t('tree.noMatch')}</p>
      ) : (
        filtered.map((node) => (
          <Node
            key={node.id}
            node={node}
            depth={0}
            activeId={activeId}
            onSelect={onSelect}
            forceOpen={Boolean(q)}
          />
        ))
      )}
    </div>
  )
}
