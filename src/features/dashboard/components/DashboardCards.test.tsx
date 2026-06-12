import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  useMaxMinWinIntervalForProducers,
  useStudiosWithWinCount,
  useWinnersByYear,
  useYearsWithMultipleWinners,
} from '../hooks/useDashboardQueries'
import { MovieWinnersByYearCard } from './MovieWinnersByYearCard'
import { MultipleWinnersCard } from './MultipleWinnersCard'
import { ProducerIntervalsCard } from './ProducerIntervalsCard'
import { TopStudiosCard } from './TopStudiosCard'

vi.mock('@mui/x-data-grid', () => ({
  DataGrid: ({
    rows,
    columns,
    loading,
  }: {
    rows: Array<{ id: number; year: number; title: string }>
    columns: Array<{ field: string; headerName?: string }>
    loading?: boolean
  }) => (
    <div data-testid="data-grid" aria-busy={loading ? 'true' : 'false'}>
      <div data-testid="data-grid-headers">
        {columns.map((column) => (
          <span key={column.field}>{column.headerName}</span>
        ))}
      </div>

      <div data-testid="data-grid-rows">
        {rows.map((row) => (
          <div key={row.id}>
            {row.id} - {row.year} - {row.title}
          </div>
        ))}
      </div>
    </div>
  ),
}))

vi.mock('../hooks/useDashboardQueries', () => ({
  useYearsWithMultipleWinners: vi.fn(),
  useStudiosWithWinCount: vi.fn(),
  useMaxMinWinIntervalForProducers: vi.fn(),
  useWinnersByYear: vi.fn(),
}))

const querySuccessState = {
  isLoading: false,
  isFetching: false,
  isError: false,
}

const queryLoadingState = {
  data: undefined,
  isLoading: true,
  isFetching: false,
  isError: false,
}

const queryErrorState = {
  data: undefined,
  isLoading: false,
  isFetching: false,
  isError: true,
}

describe('MultipleWinnersCard', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should render years sorted by descending year without mutating source data', () => {
    const years = [
      { year: 1986, winnerCount: 2 },
      { year: 1990, winnerCount: 3 },
    ]

    vi.mocked(useYearsWithMultipleWinners).mockReturnValue({
      data: { years },
      ...querySuccessState,
    } as never)

    render(<MultipleWinnersCard />)

    const rows = screen.getAllByRole('row')
    expect(within(rows[1]).getByText('1990')).toBeInTheDocument()
    expect(within(rows[1]).getByText('3')).toBeInTheDocument()
    expect(within(rows[2]).getByText('1986')).toBeInTheDocument()
    expect(within(rows[2]).getByText('2')).toBeInTheDocument()
    expect(years).toEqual([
      { year: 1986, winnerCount: 2 },
      { year: 1990, winnerCount: 3 },
    ])
  })

  it('should render loading state', () => {
    vi.mocked(useYearsWithMultipleWinners).mockReturnValue(queryLoadingState as never)

    render(<MultipleWinnersCard />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render error state', () => {
    vi.mocked(useYearsWithMultipleWinners).mockReturnValue(queryErrorState as never)

    render(<MultipleWinnersCard />)

    expect(screen.getByText('Failed to load data.')).toBeInTheDocument()
  })

  it('should render empty state', () => {
    vi.mocked(useYearsWithMultipleWinners).mockReturnValue({
      data: { years: [] },
      ...querySuccessState,
    } as never)

    render(<MultipleWinnersCard />)

    expect(screen.getByText('No data found.')).toBeInTheDocument()
  })
})

describe('TopStudiosCard', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should render only the top three studios', () => {
    vi.mocked(useStudiosWithWinCount).mockReturnValue({
      data: {
        studios: [
          { name: 'Studio 1', winCount: 10 },
          { name: 'Studio 2', winCount: 9 },
          { name: 'Studio 3', winCount: 8 },
          { name: 'Studio 4', winCount: 7 },
        ],
      },
      ...querySuccessState,
    } as never)

    render(<TopStudiosCard />)

    expect(screen.getByText('Studio 1')).toBeInTheDocument()
    expect(screen.getByText('Studio 2')).toBeInTheDocument()
    expect(screen.getByText('Studio 3')).toBeInTheDocument()
    expect(screen.queryByText('Studio 4')).not.toBeInTheDocument()
  })

  it('should render loading, error and empty states', () => {
    vi.mocked(useStudiosWithWinCount).mockReturnValueOnce(queryLoadingState as never)
    const { rerender } = render(<TopStudiosCard />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    vi.mocked(useStudiosWithWinCount).mockReturnValueOnce(queryErrorState as never)
    rerender(<TopStudiosCard />)
    expect(screen.getByText('Failed to load data.')).toBeInTheDocument()

    vi.mocked(useStudiosWithWinCount).mockReturnValueOnce({
      data: { studios: [] },
      ...querySuccessState,
    } as never)
    rerender(<TopStudiosCard />)
    expect(screen.getByText('No data found.')).toBeInTheDocument()
  })
})

describe('ProducerIntervalsCard', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should render max and min producer interval tables', () => {
    vi.mocked(useMaxMinWinIntervalForProducers).mockReturnValue({
      data: {
        max: [
          {
            producer: 'Producer Max',
            interval: 13,
            previousWin: 2002,
            followingWin: 2015,
          },
        ],
        min: [
          {
            producer: 'Producer Min',
            interval: 1,
            previousWin: 1990,
            followingWin: 1991,
          },
        ],
      },
      ...querySuccessState,
    } as never)

    render(<ProducerIntervalsCard />)

    expect(screen.getByText('Maximum')).toBeInTheDocument()
    expect(screen.getByText('Minimum')).toBeInTheDocument()
    expect(screen.getByText('Producer Max')).toBeInTheDocument()
    expect(screen.getByText('13')).toBeInTheDocument()
    expect(screen.getByText('2002')).toBeInTheDocument()
    expect(screen.getByText('2015')).toBeInTheDocument()
    expect(screen.getByText('Producer Min')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('1990')).toBeInTheDocument()
    expect(screen.getByText('1991')).toBeInTheDocument()
  })

  it('should render loading and error state in both tables', () => {
    vi.mocked(useMaxMinWinIntervalForProducers).mockReturnValueOnce(queryLoadingState as never)
    const { rerender } = render(<ProducerIntervalsCard />)
    expect(screen.getAllByText('Loading...')).toHaveLength(2)

    vi.mocked(useMaxMinWinIntervalForProducers).mockReturnValueOnce(queryErrorState as never)
    rerender(<ProducerIntervalsCard />)
    expect(screen.getAllByText('Failed to load data.')).toHaveLength(2)
  })

  it('should render empty state in both tables', () => {
    vi.mocked(useMaxMinWinIntervalForProducers).mockReturnValue({
      data: { max: [], min: [] },
      ...querySuccessState,
    } as never)

    render(<ProducerIntervalsCard />)

    expect(screen.getAllByText('No data found.')).toHaveLength(2)
  })
})

describe('MovieWinnersByYearCard', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should not show rows before a year is searched', () => {
    vi.mocked(useWinnersByYear).mockReturnValue({
      data: [{ id: 1, year: 1980, title: "Can't Stop the Music" }],
      ...querySuccessState,
    } as never)

    render(<MovieWinnersByYearCard />)

    expect(useWinnersByYear).toHaveBeenCalledWith('')
    expect(screen.queryByText(/Can't Stop the Music/)).not.toBeInTheDocument()
  })

  it('should search winners by clicking the search button', async () => {
    const user = userEvent.setup()

    vi.mocked(useWinnersByYear).mockImplementation(
      (year: string) =>
        ({
          data: year === '1980' ? [{ id: 1, year: 1980, title: "Can't Stop the Music" }] : [],
          ...querySuccessState,
        }) as never,
    )

    render(<MovieWinnersByYearCard />)

    await user.type(screen.getByPlaceholderText('Search by year'), '1980')
    await user.click(screen.getByRole('button', { name: 'Search winners by year' }))

    expect(useWinnersByYear).toHaveBeenLastCalledWith('1980')
    expect(screen.getByText(/Can't Stop the Music/)).toBeInTheDocument()
  })

  it('should search winners when pressing enter', () => {
    vi.mocked(useWinnersByYear).mockImplementation(
      (year: string) =>
        ({
          data: year === '1990' ? [{ id: 2, year: 1990, title: 'Ghosts Can’t Do It' }] : [],
          ...querySuccessState,
        }) as never,
    )

    render(<MovieWinnersByYearCard />)

    const input = screen.getByPlaceholderText('Search by year')
    fireEvent.change(input, { target: { value: '1990' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(useWinnersByYear).toHaveBeenLastCalledWith('1990')
    expect(screen.getByText(/Ghosts Can’t Do It/)).toBeInTheDocument()
  })

  it('should mark grid as loading while request is pending', () => {
    vi.mocked(useWinnersByYear).mockReturnValue({
      data: [],
      isLoading: false,
      isFetching: true,
      isError: false,
    } as never)

    render(<MovieWinnersByYearCard />)

    expect(screen.getByTestId('data-grid')).toHaveAttribute('aria-busy', 'true')
  })

  it('should render error alert when request fails', () => {
    vi.mocked(useWinnersByYear).mockReturnValue({
      data: [],
      isLoading: false,
      isFetching: false,
      isError: true,
    } as never)

    render(<MovieWinnersByYearCard />)

    expect(screen.getByText('Failed to load winners by year.')).toBeInTheDocument()
  })
})
