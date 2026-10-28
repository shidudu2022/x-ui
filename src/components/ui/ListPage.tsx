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
  // Depend on stable callbacks only — the full context value changes when
  // `open` flips, and re-running register/unregister would immediately close.
  const register = shellSearch?.register
  const update = shellSearch?.update
  const unregister = shellSearch?.unregister
  const setOpen = shellSearch?.setOpen
  const open = Boolean(shellSearch?.open)

  const searchEnabled = Boolean(search)

  useEffect(() => {
    if (!register || !unregister || !search) return
    register({
      hasQuery: Boolean(search.hasQuery),
      triggerLabel: search.triggerLabel,
    })
    return () => unregister()
    // search object identity changes every render when callers pass inline props;
    // only (un)register when search is enabled/disabled.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- see above
  }, [register, unregister, searchEnabled])

  useEffect(() => {
    if (!update || !search) return
    update({
      hasQuery: Boolean(search.hasQuery),
      triggerLabel: search.triggerLabel,
    })
  }, [update, searchEnabled, search?.hasQuery, search?.triggerLabel])

  return (
    <section className={cn('page', 'active', className)}>
      <PageHeader title={title} description={description} actions={actions} />
      {toolbar}
      {children}
      {search ? (
        <ListSearchDrawer
          open={open}
          onClose={() => setOpen?.(false)}
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
