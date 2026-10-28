import { useRef, useState } from 'react'
import { Camera } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Avatar } from './Avatar'
import { useT } from '@/i18n'

export function AvatarUpload({
  name,
  src,
  onFile,
  className,
}: {
  name?: string
  src?: string
  onFile?: (file: File) => void
  className?: string
}) {
  const t = useT()
  const resolvedName = name ?? t('common.user')
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | undefined>(src)

  function take(file?: File) {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    onFile?.(file)
  }

  return (
    <button
      type="button"
      className={cn('avatar-upload', className)}
      onClick={() => inputRef.current?.click()}
      aria-label={t('avatarUpload.label')}
    >
      <Avatar name={resolvedName} src={preview} size="lg" />
      <span className="avatar-upload-badge" aria-hidden>
        <Camera size={14} />
      </span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => take(e.target.files?.[0])}
      />
    </button>
  )
}
