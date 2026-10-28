import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { Spinner } from './Spinner'
import { Text } from './Text'

type MermaidApi = {
  initialize: (config: Record<string, unknown>) => void
  render: (id: string, text: string) => Promise<{ svg: string }>
}

/**
 * Renders a Mermaid chart via dynamic `import('mermaid')`.
 * Install peer `mermaid` in the host app; without it the component shows an error state.
 */
export function MermaidDiagram({
  chart,
  title,
  className,
}: {
  chart: string
  title?: ReactNode
  className?: string
}) {
  const t = useT()
  const reactId = useId().replace(/:/g, '')
  const hostRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    setReady(false)
    setError(null)

    void (async () => {
      try {
        let mermaidMod: { default: MermaidApi }
        try {
          mermaidMod = (await import(
            /* @vite-ignore */ 'mermaid'
          )) as { default: MermaidApi }
        } catch {
          if (!cancelled) setError('missing-peer')
          return
        }
        const mermaid = mermaidMod.default
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'neutral',
          fontFamily: 'inherit',
        })
        const id = `mmd-${reactId}-${Math.random().toString(36).slice(2, 8)}`
        const { svg } = await mermaid.render(id, chart.trim())
        if (cancelled || !hostRef.current) return
        hostRef.current.innerHTML = svg
        setReady(true)
      } catch (e) {
        if (cancelled) return
        setError(e instanceof Error ? e.message : String(e))
      }
    })()

    const host = hostRef.current
    return () => {
      cancelled = true
      if (host) host.innerHTML = ''
    }
  }, [chart, reactId])

  const errorText =
    error === 'missing-peer'
      ? t('mermaid.missingPeer')
      : error
        ? `${t('mermaid.renderFailed')}: ${error}`
        : null

  return (
    <div className={cn('mermaid-diagram', className)}>
      {title ? (
        <Text variant="strong" size="sm" as="p" className="mermaid-diagram-title">
          {title}
        </Text>
      ) : null}
      <div className="mermaid-diagram-body">
        {!ready && !error ? (
          <div className="mermaid-diagram-loading">
            <Spinner />
          </div>
        ) : null}
        {errorText ? (
          <Text variant="body" size="sm" className="mermaid-diagram-error" as="p">
            {errorText}
          </Text>
        ) : null}
        <div
          ref={hostRef}
          className="mermaid-diagram-svg"
          style={{ display: ready ? 'block' : 'none' }}
        />
      </div>
    </div>
  )
}
