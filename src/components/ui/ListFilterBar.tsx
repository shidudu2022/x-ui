import { useT } from '@/i18n'
import { Button } from './Button'

/** Search hit summary — matches k3s-start/web ListFilterBar */
export function ListFilterBar({
  query,
  total,
  matched,
  unit,
  onClear,
}: {
  query: string
  total: number
  matched: number
  unit?: string
  onClear?: () => void
}) {
  const t = useT()
  const resolvedUnit = unit ?? t('dataTable.unit')
  if (!query) return null

  return (
    <div className="list-filter-bar">
      <span>
        {t('listFilter.summary', { query, matched, total, unit: resolvedUnit })}
      </span>
      {onClear ? (
        <Button size="sm" variant="ghost" onClick={onClear}>
          {t('common.clear')}
        </Button>
      ) : null}
    </div>
  )
}
