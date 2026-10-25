import { Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from './Button'
import { Input } from './Field'

export type KeyValuePair = { key: string; value: string }

export function KeyValueEditor({
  value,
  onChange,
  keyPlaceholder = '键',
  valuePlaceholder = '值',
  addLabel = '添加',
  className,
}: {
  value: KeyValuePair[]
  onChange?: (next: KeyValuePair[]) => void
  keyPlaceholder?: string
  valuePlaceholder?: string
  addLabel?: string
  className?: string
}) {
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
            placeholder={keyPlaceholder}
            onChange={(e) => update(i, { key: e.target.value })}
            aria-label={`键 ${i + 1}`}
          />
          <Input
            value={row.value}
            placeholder={valuePlaceholder}
            onChange={(e) => update(i, { value: e.target.value })}
            aria-label={`值 ${i + 1}`}
          />
          <Button
            size="sm"
            variant="ghost"
            iconOnly
            aria-label="删除行"
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
        {addLabel}
      </Button>
    </div>
  )
}
