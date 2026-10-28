import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

/** Library build for npm `@shidudu2022/x-ui` (demo site uses vite.config.ts). */
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/index.ts', 'src/components', 'src/theme', 'src/lib'],
      exclude: ['src/demo', 'src/App.tsx', 'src/main.tsx', 'src/styles-entry.ts'],
      outDir: 'dist',
      entryRoot: 'src',
      tsconfigPath: path.resolve(rootDir, 'tsconfig.app.json'),
      rollupTypes: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
    },
  },
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: true,
    lib: {
      entry: {
        index: path.resolve(rootDir, 'src/index.ts'),
        'styles-entry': path.resolve(rootDir, 'src/styles-entry.ts'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-dom/client',
        'react-router',
        'react-router-dom',
        'lucide-react',
        'recharts',
        'uqr',
        'mermaid',
      ],
      output: {
        assetFileNames: (asset) => {
          if (asset.name?.endsWith('.css')) return 'styles.css'
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
})
