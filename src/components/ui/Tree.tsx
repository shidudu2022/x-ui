import { useState, type ReactNode } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

export type TreeNodeData = {
  id: string
  label: ReactNode
  children?: TreeNodeData[]
}

function Node({
  node,
  depth,
  activeId,
  onSelect,
}: {
  node: TreeNodeData
  depth: number
  activeId?: string
  onSelect?: (id: string) => void
}) {
  const [open, setOpen] = useState(depth < 1)
  const hasChildren = Boolean(node.children?.length)

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
          aria-label={open ? '折叠' : '展开'}
          onClick={(e) => {
            e.stopPropagation()
            setOpen((v) => !v)
          }}
          style={{ visibility: hasChildren ? 'visible' : 'hidden', border: 0, background: 'transparent' }}
        >
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <span>{node.label}</span>
      </div>
      {hasChildren && open ? (
        <div className="tree-children">
          {node.children!.map((child) => (
            <Node key={child.id} node={child} depth={depth + 1} activeId={activeId} onSelect={onSelect} />
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
  className,
}: {
  nodes: TreeNodeData[]
  activeId?: string
  onSelect?: (id: string) => void
  className?: string
}) {
  return (
    <div className={cn('tree', className)} role="tree">
      {nodes.map((node) => (
        <Node key={node.id} node={node} depth={0} activeId={activeId} onSelect={onSelect} />
      ))}
    </div>
  )
}
