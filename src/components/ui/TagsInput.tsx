import { useState, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'

export function TagsInput({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  className?: string
}) {
  const t = useT()
  const resolvedPlaceholder = placeholder ?? t('tagsInput.placeholder')
  const [draft, setDraft] = useState('')

  function add(tag: string) {
    const next = tag.trim()
    if (!next || value.includes(next)) return
    onChange([...value, next])
    setDraft('')
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      add(draft)
    }
    if (e.key === 'Backspace' && !draft && value.length) {
      onChange(value.slice(0, -1))
    }
  }

  return (
    <div className={cn('tags-input', className)}>
      {value.map((tag) => (
        <span key={tag} className="tag-chip" title={tag}>
          <span className="tag-chip-label">{tag}</span>
          <button type="button" aria-label={t('tagsInput.remove', { tag })} onClick={() => onChange(value.filter((x) => x !== tag))}>
            <X size={12} strokeWidth={2} />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => add(draft)}
        placeholder={value.length ? '' : resolvedPlaceholder}
        aria-label={placeholder}
      />
    </div>
  )
}
