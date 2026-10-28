import type { ReactNode } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'

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
  const t = useT()
  return (
    <div className="tree-table-cell" style={{ paddingLeft: depth * 16 }}>
      {expandable ? (
        <button
          type="button"
          className="pod-tree-toggle"
          aria-expanded={expanded}
          aria-label={expanded ? t('treeTable.collapse') : t('treeTable.expand')}
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
