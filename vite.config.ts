import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 700,
  },

  resolve: {
    alias: {
      'react-transition-group/TransitionGroupContext': path.resolve(
        __dirname,
        'node_modules/react-transition-group/cjs/TransitionGroupContext.js',
      ),
    },
  },

  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    alias: {
      'react-transition-group/TransitionGroupContext': path.resolve(
        __dirname,
        'node_modules/react-transition-group/cjs/TransitionGroupContext.js',
      ),
    },
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
  },
})
