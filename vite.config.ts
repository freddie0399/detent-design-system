import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // The router plugin must run before react() so it can generate the route tree.
  plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true }), react(), tailwindcss()],
  // Routes are code-split into virtual modules the dependency scanner can't see,
  // so scan every source file up front; otherwise each newly visited page
  // triggers a dev-only re-optimise-and-reload.
  optimizeDeps: { entries: ['src/**/*.tsx'] },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
