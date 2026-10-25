import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

/** URL `?q=` list filter — matches k3s-start/web useListSearch */
export function useListSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = (searchParams.get('q') || '').trim()

  const setQuery = useCallback(
    (next: string) => {
      const value = next.trim()
      const params = new URLSearchParams(searchParams.toString())
      if (!value) params.delete('q')
      else params.set('q', value)
      setSearchParams(params, { replace: true })
    },
    [searchParams, setSearchParams],
  )

  const clear = useCallback(() => {
    setQuery('')
  }, [setQuery])

  return useMemo(() => ({ q, setQuery, clear }), [q, setQuery, clear])
}

export function matchText(haystack: string, needle: string) {
  if (!needle) return true
  return haystack.toLowerCase().includes(needle.toLowerCase())
}
