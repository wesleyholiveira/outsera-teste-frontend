import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MoviesTable } from './MoviesTable'
import { renderWithQueryClient } from '../../../test/renderWithQueryClient'
import { getMovies } from '../services/moviesService'

vi.mock('@mui/x-data-grid', async () => {
  const actual = await vi.importActual<typeof import('@mui/x-data-grid')>('@mui/x-data-grid')

  return {
    ...actual,
    DataGrid: ({
      rows,
      columns,
    }: {
      rows: Array<{ id: number; title: string }>
      columns: Array<{
        field: string
        headerName?: string
        renderHeader?: () => React.ReactNode
      }>
    }) => (
      <div data-testid="data-grid">
        <div data-testid="data-grid-headers">
          {columns.map((column) => (
            <div key={column.field}>
              {column.renderHeader ? column.renderHeader() : column.headerName}
            </div>
          ))}
        </div>

        <div data-testid="data-grid-rows">
          {rows.map((row) => (
            <div key={row.id}>{row.title}</div>
          ))}
        </div>
      </div>
    ),
  }
})

vi.mock('../services/moviesService', () => ({
  getMovies: vi.fn(),
}))

const mockedGetMovies = vi.mocked(getMovies)

const moviesResponse = {
  content: [
    {
      id: 1,
      year: 1980,
      title: "Can't Stop the Music",
      studios: ['Associated Film Distribution'],
      producers: ['Allan Carr'],
      winner: true,
    },
    {
      id: 2,
      year: 1980,
      title: 'Cruising',
      studios: ['United Artists'],
      producers: ['Jerry Weintraub'],
      winner: false,
    },
  ],
  totalElements: 2,
  totalPages: 1,
  size: 75,
  number: 0,
}

const getWinnerSelect = () => screen.findByLabelText('Filter by winner')

describe('MoviesTable', () => {
  beforeEach(() => {
    mockedGetMovies.mockResolvedValue(moviesResponse)
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('renders movies returned from the server', async () => {
    renderWithQueryClient(<MoviesTable />)

    expect(await screen.findByText("Can't Stop the Music")).toBeInTheDocument()
    expect(screen.getByText('Cruising')).toBeInTheDocument()

    expect(mockedGetMovies).toHaveBeenCalledWith({
      page: 0,
      size: 75,
      year: '',
      winner: undefined,
    })
  })

  it('filters by year using debounce', async () => {
    renderWithQueryClient(<MoviesTable />)

    const yearInput = await screen.findByPlaceholderText('Filter by year')

    vi.useFakeTimers()

    fireEvent.change(yearInput, {
      target: { value: '1980' },
    })

    expect(mockedGetMovies).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(400)

    await vi.waitFor(() => {
      expect(mockedGetMovies).toHaveBeenLastCalledWith({
        page: 0,
        size: 75,
        year: '1980',
        winner: undefined,
      })
    })
  })

  it('does not accept non numeric characters in year filter', async () => {
    renderWithQueryClient(<MoviesTable />)

    const yearInput = await screen.findByPlaceholderText('Filter by year')

    fireEvent.change(yearInput, {
      target: { value: 'abc' },
    })

    expect(yearInput).toHaveValue('')

    fireEvent.change(yearInput, {
      target: { value: '1980' },
    })

    expect(yearInput).toHaveValue('1980')
  })

  it('filters by winner yes', async () => {
    const user = userEvent.setup()

    renderWithQueryClient(<MoviesTable />)

    await user.click(await getWinnerSelect())
    await user.click(await screen.findByRole('option', { name: 'Yes' }))

    await waitFor(() => {
      expect(mockedGetMovies).toHaveBeenLastCalledWith({
        page: 0,
        size: 75,
        year: '',
        winner: true,
      })
    })
  })

  it('filters by winner no', async () => {
    const user = userEvent.setup()

    renderWithQueryClient(<MoviesTable />)

    await user.click(await getWinnerSelect())
    await user.click(await screen.findByRole('option', { name: 'No' }))

    await waitFor(() => {
      expect(mockedGetMovies).toHaveBeenLastCalledWith({
        page: 0,
        size: 75,
        year: '',
        winner: false,
      })
    })
  })

  it('clears winner filter when selecting Yes/No', async () => {
    const user = userEvent.setup()

    renderWithQueryClient(<MoviesTable />)

    await user.click(await getWinnerSelect())
    await user.click(await screen.findByRole('option', { name: 'Yes' }))

    await waitFor(() => {
      expect(mockedGetMovies).toHaveBeenLastCalledWith({
        page: 0,
        size: 75,
        year: '',
        winner: true,
      })
    })

    await user.click(await getWinnerSelect())
    await user.click(await screen.findByRole('option', { name: 'Yes/No' }))

    await waitFor(() => {
      expect(mockedGetMovies).toHaveBeenCalledWith({
        page: 0,
        size: 75,
        year: '',
        winner: undefined,
      })
    })
  })

  it('shows an error message when request fails', async () => {
    mockedGetMovies.mockRejectedValueOnce(new Error('Network error'))

    renderWithQueryClient(<MoviesTable />)

    expect(await screen.findByText('Failed to load movies.')).toBeInTheDocument()
  })

  it('filters by a year that has no movies', async () => {
    renderWithQueryClient(<MoviesTable />)

    const yearInput = await screen.findByPlaceholderText('Filter by year')

    vi.useFakeTimers()

    fireEvent.change(yearInput, {
      target: { value: '2099' },
    })

    await vi.advanceTimersByTimeAsync(400)

    await vi.waitFor(() => {
      expect(mockedGetMovies).toHaveBeenLastCalledWith({
        page: 0,
        size: 75,
        year: '2099',
        winner: undefined,
      })
    })
  })
})
