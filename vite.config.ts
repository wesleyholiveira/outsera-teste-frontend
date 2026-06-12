import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 700,
  },

  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    server: {
      deps: {
        inline: [
          '@mui/material',
          '@mui/system',
          '@mui/x-data-grid',
          '@mui/icons-material',
          'react-transition-group',
        ],
      },
    },
    pool: 'threads',
    fileParallelism: true,
    maxWorkers: 8,
  },
})
