import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { CopyButton } from './CopyButton'

export function CodeBlock({
  code,
  language,
  title,
  className,
}: {
  code: string
  language?: string
  title?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('code-block', className)}>
      <div className="code-block-bar">
        <span className="code-block-meta">
          {title ?? language ?? 'code'}
        </span>
        <CopyButton value={code} />
      </div>
      <pre className="code-block-pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}
