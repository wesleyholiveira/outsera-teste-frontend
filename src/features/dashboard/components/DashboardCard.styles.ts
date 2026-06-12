import type { SxProps, Theme } from '@mui/material/styles'

export const dashboardCardStyles = {
  paper: {
    p: 2,
    height: '100%',
  },

  title: {
    mb: 2,
    fontWeight: 700,
  },

  table: {
    '& .MuiTableCell-head': {
      fontWeight: 700,
    },
  },
} satisfies Record<string, SxProps<Theme>>
