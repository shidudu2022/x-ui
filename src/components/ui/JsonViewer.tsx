import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { Button } from './Button'
import { CopyButton } from './CopyButton'

function stringify(value: unknown, space: number) {
  try {
    return JSON.stringify(value, null, space)
  } catch {
    return String(value)
  }
}

export function JsonViewer({
  value,
  collapsed = false,
  maxHeight = 320,
  className,
}: {
  value: unknown
  collapsed?: boolean
  maxHeight?: number
  className?: string
}) {
  const t = useT()
  const [open, setOpen] = useState(!collapsed)
  const text = useMemo(() => stringify(value, 2), [value])

  return (
    <div className={cn('json-viewer', className)}>
      <div className="json-viewer-toolbar">
        <Button size="sm" variant="ghost" onClick={() => setOpen((v) => !v)}>
          {open ? t('json.collapse') : t('json.expand')}
        </Button>
        <CopyButton value={text} label={t('json.copy')} />
      </div>
      {open ? (
        <pre className="json-viewer-pre" style={{ maxHeight }}>
          <code>{text}</code>
        </pre>
      ) : (
        <pre className="json-viewer-pre is-collapsed">
          <code>{stringify(value, 0).slice(0, 120)}…</code>
        </pre>
      )}
    </div>
  )
}
