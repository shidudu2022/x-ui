import { useState, type ReactNode } from 'react'
import { Download, ExternalLink, FileText } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { withBase } from '@/lib/baseUrl'
import { Button } from './Button'
import { Drawer, type DrawerSize } from './Drawer'
import { Modal } from './Modal'

export type PdfPreviewPresentation = 'modal' | 'drawer'

/**
 * PDF preview embedded in Modal or Drawer. Supports controlled `open` for
 * post-fetch flows (e.g. open after API returns a blob URL).
 */
export function PdfPreview({
  src,
  title,
  fileName,
  open: openProp,
  onOpenChange,
  presentation = 'modal',
  modalSize = 'lg',
  drawerSize = 'xl',
  drawerSide = 'right',
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
  /** Embed PDF in Modal (default) or Drawer. */
  presentation?: PdfPreviewPresentation
  modalSize?: 'sm' | 'md' | 'lg'
  drawerSize?: DrawerSize
  drawerSide?: 'left' | 'right'
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
  const fullSrc = withBase(src)
  const dialogTitle = title ?? fileName ?? tr('pdfPreview.dialog')
  const frameTitle =
    typeof dialogTitle === 'string' ? dialogTitle : tr('pdfPreview.dialog')

  function download() {
    const a = document.createElement('a')
    a.href = fullSrc
    a.download = fileName || 'document.pdf'
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const footer = (
    <div className="pdf-preview-footer-actions">
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
    </div>
  )

  const frame = (
    <iframe className="pdf-preview-frame" title={frameTitle} src={fullSrc} />
  )

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
          <FileText size={20} aria-hidden />
          <span className="pdf-preview-card-label">
            {fileName || tr('pdfPreview.preview')}
          </span>
        </button>
      ) : null}

      {presentation === 'drawer' ? (
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title={dialogTitle}
          size={drawerSize}
          side={drawerSide}
          footer={footer}
          className="pdf-preview-drawer"
        >
          <div className="pdf-preview-embed">{frame}</div>
        </Drawer>
      ) : (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title={dialogTitle}
          size={modalSize}
          footer={footer}
          className="pdf-preview-modal"
        >
          <div className="pdf-preview-embed">{frame}</div>
        </Modal>
      )}
    </>
  )
}
