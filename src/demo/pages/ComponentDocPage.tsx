import { Navigate, useParams } from 'react-router-dom'
import { getCatalogEntry } from '@/demo/catalog/registry'
import { DOC_PAGES } from '@/demo/docs/components'

export function ComponentDocPage() {
  const { slug = '' } = useParams()
  const entry = getCatalogEntry(slug)
  const Page = DOC_PAGES[slug]
  if (!entry || !Page) return <Navigate to="/components" replace />
  return <Page />
}
