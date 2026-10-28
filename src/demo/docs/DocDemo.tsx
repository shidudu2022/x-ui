import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { CodeBlock } from '@/components/ui'
import { ShowcaseSection } from '../ShowcaseSection'
import { formatExampleCode } from './formatExampleCode'

/** Live preview + source snippet for component docs. */
export function DocDemo({
  title,
  description,
  code,
  wide,
  children,
}: {
  title: string
  description?: string
  code: string
  /** Tables / charts / shells that need the content column width. */
  wide?: boolean
  children: ReactNode
}) {
  return (
    <ShowcaseSection title={title} description={description}>
      <div className={cn('doc-demo', wide && 'doc-demo--wide')}>
        <div className="doc-demo-preview">{children}</div>
        <CodeBlock
          className="doc-demo-code"
          code={formatExampleCode(code)}
          language="tsx"
          title="示例源码"
        />
      </div>
    </ShowcaseSection>
  )
}
