import { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash-es/debounce'
import { Box, MenuItem, Pagination, Paper, Select, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import { useMovies } from '../hooks/useMovies'
import type { Movie } from '../types/movie'
import { moviesTableStyles } from './MoviesTable.styles'

const ALL_WINNERS_OPTION = 'all'
const GRID_PAGE_SIZE = 15
const SERVER_PAGE_SIZE = 15
const PAGES_PER_SERVER_REQUEST = SERVER_PAGE_SIZE / GRID_PAGE_SIZE

export function MoviesTable() {
  const [yearInput, setYearInput] = useState('')
  const [yearFilter, setYearFilter] = useState('')
  const [winnerFilter, setWinnerFilter] = useState<boolean | undefined>()
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: GRID_PAGE_SIZE,
  })

  const debouncedSetYearFilter = useMemo(
    () =>
      debounce((value: string) => {
        setYearFilter(value)
        setPaginationModel((current) => ({ ...current, page: 0 }))
      }, 400),
    [],
  )

  useEffect(() => {
    return () => debouncedSetYearFilter.cancel()
  }, [debouncedSetYearFilter])

  const serverPage = Math.floor(paginationModel.page / PAGES_PER_SERVER_REQUEST)

  const { data, isLoading, isFetching, isError } = useMovies({
    page: serverPage,
    size: SERVER_PAGE_SIZE,
    year: yearFilter,
    winner: winnerFilter,
  })

  const rows = data?.content ?? []
  const totalPages = Math.ceil((data?.totalElements ?? 0) / GRID_PAGE_SIZE)

  const columns: GridColDef<Movie>[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      sortable: false,
      headerAlign: 'center',
    },
    {
      field: 'year',
      width: 280,
      sortable: false,
      headerAlign: 'center',
      renderHeader: () => (
        <Box sx={moviesTableStyles.headerFilter}>
          <Typography variant="body2" component="div" sx={moviesTableStyles.headerTitle}>
            Year
          </Typography>

          <TextField
            type="number"
            size="small"
            placeholder="Filter by year"
            value={yearInput}
            onChange={(event) => {
              const value = event.target.value

              setYearInput(value)
              debouncedSetYearFilter(value)
            }}
            fullWidth
          />
        </Box>
      ),
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 280,
      sortable: false,
      headerAlign: 'center',
    },
    {
      field: 'winner',
      width: 280,
      sortable: false,
      headerAlign: 'center',
      valueFormatter: (value) => (value ? 'Yes' : 'No'),
      renderHeader: () => (
        <Box sx={moviesTableStyles.headerFilter}>
          <Typography variant="body2" component="div" sx={moviesTableStyles.headerTitle}>
            Winner?
          </Typography>

          <Select
            inputProps={{ 'aria-label': 'Filter by winner' }}
            size="small"
            value={winnerFilter === undefined ? ALL_WINNERS_OPTION : String(winnerFilter)}
            onChange={(event) => {
              const value = event.target.value

              setWinnerFilter(value === ALL_WINNERS_OPTION ? undefined : value === 'true')

              setPaginationModel((current) => ({ ...current, page: 0 }))
            }}
            displayEmpty
            fullWidth
          >
            <MenuItem value={ALL_WINNERS_OPTION}>Yes/No</MenuItem>
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </Box>
      ),
    },
  ]

  return (
    <Paper variant="outlined" sx={moviesTableStyles.paper}>
      <Typography variant="h6" component="h2" sx={moviesTableStyles.title}>
        List movies
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={isLoading || isFetching}
        hideFooter
        disableColumnMenu
        disableRowSelectionOnClick
        columnHeaderHeight={88}
        sx={moviesTableStyles.grid}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={totalPages}
          page={paginationModel.page + 1}
          onChange={(_, page) => {
            setPaginationModel({
              page: page - 1,
              pageSize: GRID_PAGE_SIZE,
            })
          }}
          showFirstButton
          showLastButton
        />
      </Box>

      {isError && (
        <Typography color="error" sx={{ mt: 2 }}>
          Failed to load movies.
        </Typography>
      )}
    </Paper>
  )
}
