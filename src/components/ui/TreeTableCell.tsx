import type { ReactNode } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

/** Indent + expand control for tree DataTable first column. */
export function TreeTableCell({
  depth,
  expandable,
  expanded,
  onToggle,
  children,
}: {
  depth: number
  expandable?: boolean
  expanded?: boolean
  onToggle?: () => void
  children: ReactNode
}) {
  return (
    <div className="tree-table-cell" style={{ paddingLeft: depth * 16 }}>
      {expandable ? (
        <button
          type="button"
          className="pod-tree-toggle"
          aria-expanded={expanded}
          aria-label={expanded ? '折叠' : '展开'}
          onClick={(e) => {
            e.stopPropagation()
            onToggle?.()
          }}
        >
          <span className="pod-tree-chevron" aria-hidden>
            {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </span>
          <span className={cn('tree-table-cell-body')}>{children}</span>
        </button>
      ) : (
        <span className="pod-tree-branch">
          {depth > 0 ? <span className="pod-tree-rail" aria-hidden /> : null}
          <span className="tree-table-cell-body">{children}</span>
        </span>
      )}
    </div>
  )
}
