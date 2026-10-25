import { useRef, useState, type DragEvent } from 'react'
import { Upload } from 'lucide-react'
import { cn } from '@/lib/cn'

export function FileUpload({
  accept,
  multiple,
  onFiles,
  title = '点击或拖拽文件到此处',
  hint = '支持常见文档与图片',
  className,
}: {
  accept?: string
  multiple?: boolean
  onFiles?: (files: File[]) => void
  title?: string
  hint?: string
  className?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [names, setNames] = useState<string[]>([])

  function take(list: FileList | null) {
    if (!list?.length) return
    const files = Array.from(list)
    setNames(files.map((f) => f.name))
    onFiles?.(files)
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    take(e.dataTransfer.files)
  }

  return (
    <div
      className={cn('file-upload', dragging && 'is-dragging', className)}
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
      <p className="file-upload-title">{title}</p>
      <p className="file-upload-hint">{names.length ? names.join(', ') : hint}</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => take(e.target.files)}
      />
    </div>
  )
}
