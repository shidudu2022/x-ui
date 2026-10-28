import { useRef, useState, type DragEvent } from 'react'
import { Upload } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { Progress } from './Progress'

export type FileUploadItem = {
  name: string
  size: number
  progress?: number
  error?: string
}

export function FileUpload({
  accept,
  multiple,
  maxSizeMb,
  onFiles,
  files,
  title,
  hint,
  className,
}: {
  accept?: string
  multiple?: boolean
  /** Reject files larger than this (MB); shows inline error */
  maxSizeMb?: number
  onFiles?: (files: File[]) => void
  /** Controlled progress list (0–100) */
  files?: FileUploadItem[]
  title?: string
  hint?: string
  className?: string
}) {
  const t = useT()
  const resolvedTitle = title ?? t('fileUpload.title')
  const resolvedHint = hint ?? t('fileUpload.hint')
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [local, setLocal] = useState<FileUploadItem[]>([])
  const [rejectHint, setRejectHint] = useState<string | null>(null)
  const shown = files ?? local

  function take(list: FileList | null) {
    if (!list?.length) return
    let next = Array.from(list)
    setRejectHint(null)
    if (maxSizeMb != null) {
      const limit = maxSizeMb * 1024 * 1024
      const rejected = next.filter((f) => f.size > limit)
      next = next.filter((f) => f.size <= limit)
      if (rejected.length) {
        setRejectHint(
          t('fileUpload.tooLarge', {
            name: rejected.map((f) => f.name).join(', '),
            max: maxSizeMb,
          }),
        )
      }
    }
    if (!next.length) return
    setLocal(next.map((f) => ({ name: f.name, size: f.size })))
    onFiles?.(next)
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    take(e.dataTransfer.files)
  }

  return (
    <div className={cn('file-upload-wrap', className)}>
      <div
        className={cn('file-upload', dragging && 'is-dragging')}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
        }}
      >
        <Upload size={20} style={{ marginBottom: 8, color: 'var(--text-muted)' }} />
        <p className="file-upload-title">{resolvedTitle}</p>
        <p className="file-upload-hint">
          {rejectHint ?? (shown.length ? shown.map((f) => f.name).join(', ') : resolvedHint)}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => take(e.target.files)}
        />
      </div>
      {shown.some((f) => f.progress != null || f.error) ? (
        <ul className="file-upload-list">
          {shown.map((f) => (
            <li key={f.name} className="file-upload-item">
              <div className="file-upload-item-head">
                <span>{f.name}</span>
                {f.error ? <span className="danger-text">{f.error}</span> : null}
              </div>
              {f.progress != null ? <Progress value={f.progress} /> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
