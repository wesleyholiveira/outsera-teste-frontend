import { useMemo, useState } from 'react'
import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef, GridRowsProp } from '@mui/x-data-grid'
import type { MovieWinner } from '../types/dashboard'
import { dashboardCardStyles } from './DashboardCard.styles'

const rows: MovieWinner[] = [
  { id: 1, year: 1980, title: "Can't Stop the Music" },
  { id: 11, year: 1981, title: 'Mommie Dearest' },
  { id: 18, year: 1982, title: 'Inchon' },
]

const columns: GridColDef<MovieWinner>[] = [
  { field: 'id', headerName: 'Id', flex: 0.8, sortable: false },
  { field: 'year', headerName: 'Year', flex: 1, sortable: false },
  { field: 'title', headerName: 'Title', flex: 2, sortable: false },
]

export function MovieWinnersByYearCard() {
  const [year, setYear] = useState('')
  const [searchedYear, setSearchedYear] = useState('')

  const filteredRows: GridRowsProp<MovieWinner> = useMemo(() => {
    if (!searchedYear) return []
    return rows.filter((movie) => String(movie.year) === searchedYear)
  }, [searchedYear])

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
        />

        <Button variant="contained" onClick={() => setSearchedYear(year)}>
          <SearchIcon />
        </Button>
      </Stack>

      <DataGrid
        rows={filteredRows}
        columns={columns}
        disableColumnMenu
        disableRowSelectionOnClick
        hideFooter
        autoHeight
      />
    </Paper>
  )
}
