import type { SxProps, Theme } from '@mui/material/styles'

export const moviesTableStyles = {
  paper: {
    p: 2,
  },

  title: {
    mb: 2,
    fontWeight: 700,
  },

  headerFilter: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 0.75,
    px: 1,
  },

  headerTitle: {
    width: '100%',
    fontWeight: 700,
    textAlign: 'center',
    lineHeight: 1.2,
  },

  grid: {
    border: 1,
    borderColor: 'divider',

    '& .MuiDataGrid-columnHeader': {
      borderRight: 1,
      borderColor: 'divider',
      p: 0,
    },

    '& .MuiDataGrid-columnHeaderDraggableContainer': {
      width: '100%',
    },

    '& .MuiDataGrid-columnHeaderTitleContainer': {
      width: '100%',
      justifyContent: 'center',
      px: 0,
    },

    '& .MuiDataGrid-columnHeaderTitleContainerContent': {
      width: '100%',
      justifyContent: 'center',
    },

    '& .MuiDataGrid-columnHeaderTitle': {
      width: '100%',
      textAlign: 'center',
      fontWeight: 700,
    },

    '& .MuiDataGrid-iconButtonContainer': {
      display: 'none',
    },

    '& .MuiDataGrid-menuIcon': {
      display: 'none',
    },

    '& .MuiDataGrid-columnSeparator': {
      display: 'none',
    },

    '& .MuiDataGrid-cell': {
      borderRight: 1,
      borderColor: 'divider',
    },
  },
} satisfies Record<string, SxProps<Theme>>
