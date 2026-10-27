import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { CopyButton } from './CopyButton'

export function CodeBlock({
  code,
  language,
  title,
  className,
  compact,
  onCopied,
  onCopyFailed,
}: {
  code: string
  language?: string
  title?: ReactNode
  className?: string
  /** Denser padding + wrap long one-liners (install commands). */
  compact?: boolean
  onCopied?: () => void
  onCopyFailed?: () => void
}) {
  return (
    <div className={cn('code-block', compact && 'is-compact', className)}>
      <div className="code-block-bar">
        <span className="code-block-meta">
          {title ?? language ?? 'code'}
        </span>
        <CopyButton value={code} onCopied={onCopied} onFailed={onCopyFailed} />
      </div>
      <pre className="code-block-pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}
