import { getCatalogEntry } from '../catalog/registry'
import type { ComponentMeta } from './ComponentDocLayout'
import type { PropDef } from './PropTable'

export function docMeta(slug: string): ComponentMeta {
  const entry = getCatalogEntry(slug)
  if (!entry) throw new Error(`Unknown component slug: ${slug}`)
  return {
    slug: entry.slug,
    name: entry.name,
    summary: entry.summary,
    related: entry.related,
  }
}

export type { PropDef }
