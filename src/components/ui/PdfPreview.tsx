import { useEffect, useState, type ReactNode } from 'react'
import { Download, ExternalLink, FileText, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { withBase } from '@/lib/baseUrl'
import { usePresence } from '@/lib/usePresence'
import { Button } from './Button'

/**
 * PDF thumbnail / trigger + lightbox (iframe). Supports controlled `open` for
 * post-fetch flows (e.g. open after API returns a blob URL).
 */
export function PdfPreview({
  src,
  title,
  fileName,
  open: openProp,
  onOpenChange,
  className,
  children,
  showDownload = true,
  showOpenTab = true,
}: {
  src: string
  title?: ReactNode
  fileName?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  /** Custom trigger; omit when using controlled open-only mode. */
  children?: ReactNode
  showDownload?: boolean
  showOpenTab?: boolean
}) {
  const tr = useT()
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const controlled = openProp !== undefined
  const open = controlled ? Boolean(openProp) : uncontrolledOpen
  const setOpen = (next: boolean) => {
    if (!controlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }
  const { present, visible } = usePresence(open, 180)
  const fullSrc = withBase(src)
  const dialogTitle = title ?? fileName ?? tr('pdfPreview.dialog')

  useEffect(() => {
    if (!visible) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [visible])

  function download() {
    const a = document.createElement('a')
    a.href = fullSrc
    a.download = fileName || 'document.pdf'
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <>
      {children !== undefined ? (
        <button
          type="button"
          className={cn('pdf-preview-trigger', className)}
          onClick={() => setOpen(true)}
          aria-label={tr('pdfPreview.preview')}
        >
          {children}
        </button>
      ) : !controlled ? (
        <button
          type="button"
          className={cn('pdf-preview-trigger pdf-preview-card', className)}
          onClick={() => setOpen(true)}
          aria-label={tr('pdfPreview.preview')}
        >
          <FileText size={22} aria-hidden />
          <span className="pdf-preview-card-label">
            {fileName || tr('pdfPreview.preview')}
          </span>
        </button>
      ) : null}

      {present ? (
        <div
          className={cn('pdf-preview-lightbox', visible && 'open')}
          role="dialog"
          aria-modal="true"
          aria-label={typeof dialogTitle === 'string' ? dialogTitle : tr('pdfPreview.dialog')}
          onClick={() => setOpen(false)}
        >
          <div
            className="pdf-preview-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pdf-preview-toolbar">
              <strong className="pdf-preview-title">{dialogTitle}</strong>
              <div className="pdf-preview-toolbar-actions">
                {showOpenTab ? (
                  <a
                    className="btn btn-ghost btn-sm"
                    href={fullSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="btn-label">
                      <ExternalLink size={14} aria-hidden />
                      {tr('pdfPreview.openTab')}
                    </span>
                  </a>
                ) : null}
                {showDownload ? (
                  <Button type="button" variant="secondary" size="sm" onClick={download}>
                    <Download size={14} aria-hidden />
                    {tr('pdfPreview.download')}
                  </Button>
                ) : null}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  iconOnly
                  aria-label={tr('pdfPreview.close')}
                  onClick={() => setOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
            <iframe
              className="pdf-preview-frame"
              title={typeof dialogTitle === 'string' ? dialogTitle : tr('pdfPreview.dialog')}
              src={fullSrc}
            />
          </div>
        </div>
      ) : null}
    </>
  )
}
