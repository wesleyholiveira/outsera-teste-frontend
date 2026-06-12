import type { SxProps } from '@mui/material'
import type { Theme } from '@mui/material/styles'

const drawerWidth = 240
const mobileHeaderHeight = 56

export const appLayoutConstants = {
  drawerWidth,
  mobileHeaderHeight,
}

export const appLayoutStyles = {
  root: {
    display: 'flex',
    minHeight: '100dvh',
  },

  mobileHeader: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: mobileHeaderHeight,
    zIndex: (theme) => theme.zIndex.appBar,
    display: { xs: 'flex', md: 'none' },
    alignItems: 'center',
    px: 1,
    bgcolor: '#111827',
    borderBottom: '1px solid',
    borderColor: '#374151',
  },

  menuButton: {
    color: 'common.white',
  },

  drawerPaper: {
    width: drawerWidth,
    boxSizing: 'border-box',
    bgcolor: '#111827',
    borderRight: '1px solid',
    borderColor: '#374151',
  },

  temporaryDrawer: {
    display: { xs: 'block', md: 'none' },
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      bgcolor: '#111827',
      borderRight: '1px solid',
      borderColor: '#374151',
    },
  },

  permanentDrawer: {
    display: { xs: 'none', md: 'block' },
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      bgcolor: '#111827',
      borderRight: '1px solid',
      borderColor: '#374151',
    },
  },

  drawerContent: {
    width: drawerWidth,
  },

  main: {
    flex: 1,
    p: 3,
    pt: { xs: `${mobileHeaderHeight + 24}px`, md: 3 },
    minWidth: 0,
    minHeight: '100dvh',
  },
} satisfies Record<string, SxProps<Theme>>
