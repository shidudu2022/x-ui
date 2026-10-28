import { Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useT } from '@/i18n'
import { Button } from './Button'
import { Input } from './Field'

export type KeyValuePair = { key: string; value: string }

export function KeyValueEditor({
  value,
  onChange,
  keyPlaceholder,
  valuePlaceholder,
  addLabel,
  className,
}: {
  value: KeyValuePair[]
  onChange?: (next: KeyValuePair[]) => void
  keyPlaceholder?: string
  valuePlaceholder?: string
  addLabel?: string
  className?: string
}) {
  const t = useT()
  const resolvedKeyPlaceholder = keyPlaceholder ?? t('keyValue.key')
  const resolvedValuePlaceholder = valuePlaceholder ?? t('keyValue.value')
  const resolvedAddLabel = addLabel ?? t('keyValue.add')
  function update(index: number, patch: Partial<KeyValuePair>) {
    onChange?.(value.map((row, i) => (i === index ? { ...row, ...patch } : row)))
  }

  function remove(index: number) {
    onChange?.(value.filter((_, i) => i !== index))
  }

  return (
    <div className={cn('kv-editor', className)}>
      {value.map((row, i) => (
        <div key={i} className="kv-editor-row">
          <Input
            value={row.key}
            placeholder={resolvedKeyPlaceholder}
            onChange={(e) => update(i, { key: e.target.value })}
            aria-label={t('keyValue.keyAria', { n: i + 1 })}
          />
          <Input
            value={row.value}
            placeholder={resolvedValuePlaceholder}
            onChange={(e) => update(i, { value: e.target.value })}
            aria-label={t('keyValue.valueAria', { n: i + 1 })}
          />
          <Button
            size="sm"
            variant="ghost"
            iconOnly
            aria-label={t('keyValue.removeRow')}
            onClick={() => remove(i)}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ))}
      <Button
        size="sm"
        variant="secondary"
        onClick={() => onChange?.([...value, { key: '', value: '' }])}
      >
        <Plus size={14} />
        {resolvedAddLabel}
      </Button>
    </div>
  )
}
