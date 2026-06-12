import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#f4f4fb',
          borderRightColor: '#e0e0ea',
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',

          '&:hover': {
            backgroundColor: '#dbeafe',
            color: '#2563eb',
          },

          '&.active': {
            backgroundColor: '#bfdbfe',
            color: '#1d4ed8',
            fontWeight: 600,
          },
        },
      },
    },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#122861',
          borderRightColor: '#374151',
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',

          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.08)',
          },

          '&.active': {
            backgroundColor: 'rgba(255,255,255,0.12)',
            fontWeight: 600,
          },
        },
      },
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
