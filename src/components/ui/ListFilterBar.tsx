import { Button } from './Button'

/** Search hit summary — matches k3s-start/web ListFilterBar */
export function ListFilterBar({
  query,
  total,
  matched,
  unit = '条',
  onClear,
}: {
  query: string
  total: number
  matched: number
  unit?: string
  onClear?: () => void
}) {
  if (!query) return null

  return (
    <div className="list-filter-bar">
      <span>
        搜索「<strong>{query}</strong>」· 显示 {matched} / {total} {unit}
      </span>
      {onClear ? (
        <Button size="sm" variant="ghost" onClick={onClear}>
          清除
        </Button>
      ) : null}
    </div>
  )
}
