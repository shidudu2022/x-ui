import { useId, useRef, type ReactNode } from 'react'
import { User } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { Checkbox } from './Checkbox'
import { Text } from './Text'

/** viewBox matches 3:4 preview so the oval is not stretched into a circle */
const VIEW_W = 30
const VIEW_H = 40
/** ~64% × 60% vertical oval — common face-guide proportions */
const FACE_OVAL = { cx: 15, cy: 16, rx: 9.6, ry: 12 }

/**
 * KYC-style face photo picker: 3:4 frame + oval guide overlay + optional confirm checkbox.
 * File transport stays with the caller (`onFileSelect`); no upload API coupling.
 */
export function FacePhotoPicker({
  previewUrl,
  fileName,
  confirmed,
  onConfirmedChange,
  onFileSelect,
  disabled,
  accept = 'image/jpeg,.jpg,.jpeg',
  showConfirm = true,
  guide,
  emptyTitle,
  emptyHint,
  confirmLabel,
  className,
}: {
  previewUrl: string | null
  fileName?: string | null
  confirmed?: boolean
  onConfirmedChange?: (v: boolean) => void
  onFileSelect: (file: File | null) => void
  disabled?: boolean
  accept?: string
  showConfirm?: boolean
  guide?: ReactNode
  emptyTitle?: ReactNode
  emptyHint?: ReactNode
  confirmLabel?: ReactNode
  className?: string
}) {
  const t = useT()
  const uid = useId().replace(/:/g, '')
  const inputId = `face-file-${uid}`
  const maskId = `face-oval-mask-${uid}`
  const inputRef = useRef<HTMLInputElement>(null)
  const { cx, cy, rx, ry } = FACE_OVAL

  return (
    <div className={cn('face-photo-picker', className)}>
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept={accept}
        className="ui-native-hidden"
        disabled={disabled}
        onChange={(e) => {
          onFileSelect(e.target.files?.[0] ?? null)
          e.target.value = ''
        }}
      />

      <div className="face-photo-frame-wrap">
        <button
          type="button"
          className={cn('face-photo-frame', disabled && 'is-disabled')}
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          aria-label={
            previewUrl ? t('facePhoto.changeAria') : t('facePhoto.pickAria')
          }
        >
          {previewUrl ? (
            <img src={previewUrl} alt={t('facePhoto.previewAlt')} className="face-photo-img" />
          ) : (
            <span className="face-photo-empty">
              <User size={36} strokeWidth={1.5} aria-hidden className="face-photo-empty-icon" />
              <Text variant="strong" size="sm">
                {emptyTitle ?? t('facePhoto.emptyTitle')}
              </Text>
              <Text variant="muted" size="xs">
                {emptyHint ?? t('facePhoto.emptyHint')}
              </Text>
            </span>
          )}
          <svg
            aria-hidden
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="face-photo-oval"
          >
            <defs>
              <mask id={maskId}>
                <rect width={VIEW_W} height={VIEW_H} fill="white" />
                <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="black" />
              </mask>
            </defs>
            <rect
              width={VIEW_W}
              height={VIEW_H}
              className={cn(
                'face-photo-dim',
                previewUrl ? 'has-preview' : 'no-preview',
              )}
              mask={`url(#${maskId})`}
            />
            <ellipse
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              fill="none"
              className="face-photo-oval-stroke"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </button>
      </div>

      <Text variant="muted" size="sm" className="face-photo-guide">
        {guide ?? t('facePhoto.guide')}
      </Text>

      {previewUrl && fileName ? (
        <Text variant="muted" size="xs" className="face-photo-filename" title={fileName}>
          {fileName}
        </Text>
      ) : null}

      {showConfirm && previewUrl && onConfirmedChange ? (
        <div className="face-photo-confirm">
          <Checkbox
            checked={Boolean(confirmed)}
            disabled={disabled}
            onChange={(e) => onConfirmedChange(e.target.checked)}
            label={confirmLabel ?? t('facePhoto.confirm')}
          />
        </div>
      ) : null}
    </div>
  )
}
