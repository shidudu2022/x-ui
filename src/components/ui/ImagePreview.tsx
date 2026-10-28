import { useEffect, useState, type ReactNode } from 'react'
import { ImageOff, X, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { withBase } from '@/lib/baseUrl'
import { usePresence } from '@/lib/usePresence'

/** Thumbnail + lightbox. Use for avatars/attachments; click to enlarge. */
export function ImagePreview({
  src,
  alt = '',
  thumbSrc,
  className,
  children,
}: {
  src: string
  alt?: string
  thumbSrc?: string
  className?: string
  children?: ReactNode
}) {
  const tr = useT()
  const [open, setOpen] = useState(false)
  const [broken, setBroken] = useState(false)
  const { present, visible } = usePresence(open, 180)
  const fullSrc = withBase(src)
  const thumb = withBase(thumbSrc ?? src)

  useEffect(() => {
    setBroken(false)
  }, [src, thumbSrc])

  useEffect(() => {
    if (!visible) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [visible])

  return (
    <>
      <button
        type="button"
        className={cn('image-preview-trigger', broken && 'is-broken', className)}
        onClick={() => {
          if (!broken) setOpen(true)
        }}
        disabled={broken}
        aria-label={alt || tr('imagePreview.preview')}
      >
        {children ??
          (broken ? (
            <span className="image-preview-fallback">
              <ImageOff size={18} aria-hidden />
              <span>{tr('imagePreview.loadFailed')}</span>
            </span>
          ) : (
            <>
              <img src={thumb} alt={alt} onError={() => setBroken(true)} />
              <span className="image-preview-zoom" aria-hidden>
                <ZoomIn size={14} />
              </span>
            </>
          ))}
      </button>
      {present ? (
        <div
          className={cn('image-preview-lightbox', visible && 'open')}
          role="dialog"
          aria-modal="true"
          aria-label={alt || tr('imagePreview.dialog')}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="btn btn-ghost btn-sm image-preview-close"
            aria-label={tr('imagePreview.close')}
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
          <img src={fullSrc} alt={alt} onClick={(e) => e.stopPropagation()} />
        </div>
      ) : null}
    </>
  )
}
