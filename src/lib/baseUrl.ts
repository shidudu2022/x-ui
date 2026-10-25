/** Prefix in-app absolute paths with Vite `base` (e.g. `/x-ui` on GitHub Pages). */
export function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  if (!base || path === base || path.startsWith(`${base}/`)) return path
  return `${base}${path}`
}

export function routerBasename(): string | undefined {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return base || undefined
}
