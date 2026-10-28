import { useId, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Button } from './Button'
import { Field, Input } from './Field'
import { useT } from '@/i18n'

/**
 * Image field with preview, upload, clear, and optional URL paste.
 * Upload transport is injected — no API coupling.
 */
export function ImageUploadField({
  label,
  value,
  onChange,
  onUpload,
  accept = 'image/png,image/jpeg,image/webp,image/gif',
  hint,
  emptyLabel,
  uploadLabel,
  clearLabel,
  showUrlInput = true,
  urlPlaceholder,
  resolveUrl,
  uploading: uploadingProp,
  disabled,
  error,
  className,
}: {
  label?: ReactNode
  value?: string | null
  onChange?: (value: string | null) => void
  /** Called when user picks a file; return the stored URL / path. */
  onUpload?: (file: File) => Promise<string>
  accept?: string
  hint?: ReactNode
  emptyLabel?: string
  uploadLabel?: string
  clearLabel?: string
  showUrlInput?: boolean
  urlPlaceholder?: string
  /** Map stored value → displayable src (e.g. prepend CDN). */
  resolveUrl?: (value: string) => string
  uploading?: boolean
  disabled?: boolean
  error?: ReactNode
  className?: string
}) {
  const t = useT()
  const resolvedLabel = label ?? t('imageUpload.label')
  const resolvedHint = hint ?? t('imageUpload.hint')
  const resolvedEmptyLabel = emptyLabel ?? t('imageUpload.empty')
  const resolvedUploadLabel = uploadLabel ?? t('imageUpload.upload')
  const resolvedClearLabel = clearLabel ?? t('imageUpload.clear')
  const resolvedUrlPlaceholder = urlPlaceholder ?? t('imageUpload.urlPlaceholder')
  const inputRef = useRef<HTMLInputElement>(null)
  const fieldId = useId()
  const [busy, setBusy] = useState(false)
  const uploading = uploadingProp ?? busy
  const preview = value ? (resolveUrl ? resolveUrl(value) : value) : null

  async function take(file: File) {
    if (!onUpload || disabled) return
    setBusy(true)
    try {
      const url = await onUpload(file)
      onChange?.(url)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Field label={resolvedLabel} hint={resolvedHint} error={error} className={cn('image-upload-field', className)}>
      <div className="image-upload-field-body">
        <div
          className={cn('image-upload-preview', !preview && 'is-empty')}
          aria-hidden={!preview}
        >
          {preview ? (
            <img src={preview} alt="" />
          ) : (
            <span>{resolvedEmptyLabel}</span>
          )}
        </div>
        <div className="image-upload-controls">
          <div className="image-upload-actions">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={disabled || uploading || !onUpload}
              loading={uploading}
              onClick={() => inputRef.current?.click()}
            >
              {uploading ? t('imageUpload.uploading') : resolvedUploadLabel}
            </Button>
            {value ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled || uploading}
                onClick={() => onChange?.(null)}
              >
                {resolvedClearLabel}
              </Button>
            ) : null}
          </div>
          {showUrlInput ? (
            <Input
              id={fieldId}
              value={value ?? ''}
              disabled={disabled || uploading}
              placeholder={resolvedUrlPlaceholder}
              onChange={(e) => onChange?.(e.target.value.trim() || null)}
            />
          ) : null}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          hidden
          disabled={disabled || uploading}
          onChange={(e) => {
            const file = e.target.files?.[0]
            e.target.value = ''
            if (file) void take(file)
          }}
        />
      </div>
    </Field>
  )
}
