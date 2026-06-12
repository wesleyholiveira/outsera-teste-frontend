import { useState } from 'react'
import { Alert, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import type { MovieWinner } from '../types/dashboard'
import { useWinnersByYear } from '../hooks/useDashboardQueries'
import { dashboardCardStyles } from './DashboardCard.styles'

const columns: GridColDef<MovieWinner>[] = [
  { field: 'id', headerName: 'Id', flex: 0.8, sortable: false },
  { field: 'year', headerName: 'Year', flex: 1, sortable: false },
  { field: 'title', headerName: 'Title', flex: 2, sortable: false },
]

export function MovieWinnersByYearCard() {
  const [year, setYear] = useState('')
  const [searchedYear, setSearchedYear] = useState('')
  const { data = [], isLoading, isFetching, isError } = useWinnersByYear(searchedYear)

  const isPending = isLoading || isFetching

  return (
    <Paper sx={dashboardCardStyles.paper}>
      <Typography variant="h6" sx={dashboardCardStyles.title}>
        List movie winners by year
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          type="number"
          placeholder="Search by year"
          value={year}
          onChange={(event) => setYear(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setSearchedYear(year)
            }
          }}
        />

        <Button
          variant="contained"
          onClick={() => setSearchedYear(year)}
          aria-label="Search winners by year"
        >
          <SearchIcon />
        </Button>
      </Stack>

      <DataGrid
        rows={searchedYear ? data : []}
        columns={columns}
        loading={isPending}
        disableColumnMenu
        disableRowSelectionOnClick
        hideFooter
        autoHeight
      />

      {isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to load winners by year.
        </Alert>
      )}
    </Paper>
  )
}
