/**
 * GitHub Pages serves 404.html for unknown paths.
 * Copying index.html → 404.html lets deep links load the SPA.
 */
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(process.cwd(), 'dist')
const index = resolve(dist, 'index.html')
const notFound = resolve(dist, '404.html')

if (!existsSync(index)) {
  console.error('dist/index.html missing — run vite build first')
  process.exit(1)
}

copyFileSync(index, notFound)
console.log('Wrote dist/404.html for GitHub Pages SPA fallback')
