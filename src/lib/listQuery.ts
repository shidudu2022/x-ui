/** Build `?a=1&b=2` from a param map; skips empty / `all` / nullish. */
export function buildListQuery(
  params: Record<string, string | number | boolean | undefined | null>,
): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '' || value === 'all') continue
    search.set(key, String(value))
  }
  const query = search.toString()
  return query ? `?${query}` : ''
}

export function pageCount(total: number, pageSize: number): number {
  return Math.max(1, Math.ceil(Math.max(total, 0) / Math.max(pageSize, 1)))
}

export function slicePage<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (Math.max(page, 1) - 1) * pageSize
  return items.slice(start, start + pageSize)
}

export type ListPageResult<T> = {
  items: T[]
  total: number
  page?: number
  take?: number
}

/** Soft client filter: `q` matches JSON.stringify(row); other keys exact-match fields. */
export function defaultFilterRow<T>(row: T, filters: Record<string, string>): boolean {
  for (const [key, value] of Object.entries(filters)) {
    if (!value || value === 'all') continue
    if (key === 'q') {
      const hay = JSON.stringify(row).toLowerCase()
      if (!hay.includes(value.trim().toLowerCase())) return false
      continue
    }
    const field = (row as Record<string, unknown>)[key]
    if (field !== undefined && String(field) !== value) return false
  }
  return true
}
