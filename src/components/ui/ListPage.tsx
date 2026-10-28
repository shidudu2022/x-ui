import { useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { PageHeader } from './PageHeader'
import { ListSearchDrawer } from './ListSearchDrawer'
import {
  useAppShellSearchOptional,
  type AppShellListSearchConfig,
} from '@/components/layout/AppShellSearchContext'

export type ListPageSearch = AppShellListSearchConfig

/**
 * Full-width list page — matches k3s-start/web list screens
 * (`page` without `page-narrow`; table stretches with content).
 *
 * Pass `search` to register a topbar search trigger on AppShell and render
 * a filter drawer (form fields as `search.children`).
 */
export function ListPage({
  title,
  description,
  actions,
  toolbar,
  search,
  children,
  className,
}: {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  /** Optional filter / search bar under the header (e.g. ListFilterBar summary) */
  toolbar?: ReactNode
  /** Registers AppShell topbar search button + opens ListSearchDrawer */
  search?: ListPageSearch
  children: ReactNode
  className?: string
}) {
  const shellSearch = useAppShellSearchOptional()

  useEffect(() => {
    if (!shellSearch || !search) return
    shellSearch.register({
      hasQuery: Boolean(search.hasQuery),
      triggerLabel: search.triggerLabel,
    })
    return () => shellSearch.unregister()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- presence while search enabled
  }, [shellSearch, Boolean(search)])

  useEffect(() => {
    if (!shellSearch || !search) return
    shellSearch.update({
      hasQuery: Boolean(search.hasQuery),
      triggerLabel: search.triggerLabel,
    })
  }, [shellSearch, search?.hasQuery, search?.triggerLabel])

  return (
    <section className={cn('page', 'active', className)}>
      <PageHeader title={title} description={description} actions={actions} />
      {toolbar}
      {children}
      {search ? (
        <ListSearchDrawer
          open={Boolean(shellSearch?.open)}
          onClose={() => shellSearch?.setOpen(false)}
          title={search.title}
          onClear={search.onClear}
          onSubmit={search.onSubmit}
          clearLabel={search.clearLabel}
          submitLabel={search.submitLabel}
        >
          {search.children}
        </ListSearchDrawer>
      ) : null}
    </section>
  )
}
