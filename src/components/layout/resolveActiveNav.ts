import type { NavGroup, NavItem } from './Sidebar'

function matchesPath(pathname: string, item: NavItem) {
  return item.end
    ? pathname === item.to
    : pathname === item.to || pathname.startsWith(`${item.to}/`)
}

function matchScore(pathname: string, item: NavItem): number {
  if (!matchesPath(pathname, item)) return -1
  // Prefer longer route prefixes; exact `end` matches get a tiny boost.
  return item.to.length * 10 + (item.end && pathname === item.to ? 1 : 0)
}

/** Flatten nav groups and pick the best-matching item for `pathname`. */
export function resolveActiveNav(
  pathname: string,
  navGroups: NavGroup[],
): NavItem | undefined {
  let best: NavItem | undefined
  let bestScore = -1
  for (const group of navGroups) {
    for (const item of group.items) {
      const score = matchScore(pathname, item)
      if (score > bestScore) {
        best = item
        bestScore = score
      }
    }
  }
  return best
}

/** True when pathname is a nested child of the matched nav item (not the item root). */
export function isNestedUnderNav(pathname: string, item: NavItem): boolean {
  if (item.end) return false
  return pathname !== item.to && pathname.startsWith(`${item.to}/`)
}

/** Last non-empty path segment — fallback breadcrumb current label. */
export function pathSegmentLabel(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean)
  return parts[parts.length - 1] ?? (pathname || '/')
}
