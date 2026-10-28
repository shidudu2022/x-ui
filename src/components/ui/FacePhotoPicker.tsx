import { useId, useRef, type ReactNode } from 'react'
import { Camera, User } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { Field } from './Field'
import { Text } from './Text'

/** viewBox matches 3:4 preview so the oval is not stretched into a circle */
const VIEW_W = 30
const VIEW_H = 40
/** ~64% × 60% vertical oval — common face-guide proportions */
const FACE_OVAL = { cx: 15, cy: 16, rx: 9.6, ry: 12 }

/**
 * KYC-style face photo picker: compact 3:4 preview + oval guide, aligned with
 * ImageUploadField layout (preview + actions). File transport stays with the caller.
 */
export function FacePhotoPicker({
  label,
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
  uploadLabel,
  clearLabel,
  error,
  className,
}: {
  label?: ReactNode
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
  uploadLabel?: ReactNode
  clearLabel?: ReactNode
  error?: ReactNode
  className?: string
}) {
  const t = useT()
  const uid = useId().replace(/:/g, '')
  const inputId = `face-file-${uid}`
  const maskId = `face-oval-mask-${uid}`
  const inputRef = useRef<HTMLInputElement>(null)
  const { cx, cy, rx, ry } = FACE_OVAL
  const resolvedLabel = label ?? t('facePhoto.label')
  const resolvedHint = guide ?? t('facePhoto.guide')
  const resolvedUpload = uploadLabel ?? (previewUrl ? t('facePhoto.change') : t('facePhoto.upload'))
  const resolvedClear = clearLabel ?? t('facePhoto.clear')

  function pick() {
    if (disabled) return
    inputRef.current?.click()
  }

  return (
    <Field
      label={resolvedLabel}
      hint={resolvedHint}
      error={error}
      className={cn('face-photo-picker', className)}
    >
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

      <div className="face-photo-body">
        <button
          type="button"
          className={cn(
            'face-photo-frame',
            !previewUrl && 'is-empty',
            disabled && 'is-disabled',
          )}
          disabled={disabled}
          onClick={pick}
          aria-label={previewUrl ? t('facePhoto.changeAria') : t('facePhoto.pickAria')}
        >
          {previewUrl ? (
            <img src={previewUrl} alt={t('facePhoto.previewAlt')} className="face-photo-img" />
          ) : (
            <span className="face-photo-empty">
              <span className="face-photo-empty-icon" aria-hidden>
                <User size={28} strokeWidth={1.75} />
              </span>
              <Text variant="muted" size="xs">
                {emptyTitle ?? t('facePhoto.emptyTitle')}
              </Text>
            </span>
          )}
          <svg aria-hidden viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="face-photo-oval">
            <defs>
              <mask id={maskId}>
                <rect width={VIEW_W} height={VIEW_H} fill="white" />
                <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="black" />
              </mask>
            </defs>
            <rect
              width={VIEW_W}
              height={VIEW_H}
              className={cn('face-photo-dim', previewUrl ? 'has-preview' : 'no-preview')}
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
          <span className="face-photo-camera" aria-hidden>
            <Camera size={14} strokeWidth={2} />
          </span>
        </button>

        <div className="face-photo-controls">
          <div className="face-photo-actions">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={disabled}
              onClick={pick}
            >
              {resolvedUpload}
            </Button>
            {previewUrl ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled}
                onClick={() => {
                  onConfirmedChange?.(false)
                  onFileSelect(null)
                }}
              >
                {resolvedClear}
              </Button>
            ) : null}
          </div>
          {emptyHint || fileName ? (
            <Text variant="muted" size="xs" as="p" className="face-photo-meta">
              {previewUrl && fileName ? fileName : (emptyHint ?? t('facePhoto.emptyHint'))}
            </Text>
          ) : null}
          {showConfirm && previewUrl && onConfirmedChange ? (
            <Checkbox
              className="face-photo-confirm"
              checked={Boolean(confirmed)}
              disabled={disabled}
              onChange={(e) => onConfirmedChange(e.target.checked)}
              label={confirmLabel ?? t('facePhoto.confirm')}
            />
          ) : null}
        </div>
      </div>
    </Field>
  )
}
