import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  getMaxMinWinIntervalForProducers,
  getStudiosWithWinCount,
  getWinnersByYear,
  getYearsWithMultipleWinners,
} from '../services/dashboardService'
import {
  useMaxMinWinIntervalForProducers,
  useStudiosWithWinCount,
  useWinnersByYear,
  useYearsWithMultipleWinners,
} from './useDashboardQueries'

vi.mock('../services/dashboardService', () => ({
  getYearsWithMultipleWinners: vi.fn(),
  getStudiosWithWinCount: vi.fn(),
  getMaxMinWinIntervalForProducers: vi.fn(),
  getWinnersByYear: vi.fn(),
}))

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useDashboardQueries', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch years with multiple winners', async () => {
    const response = { years: [{ year: 1986, winnerCount: 2 }] }
    vi.mocked(getYearsWithMultipleWinners).mockResolvedValue(response)

    const { result } = renderHook(() => useYearsWithMultipleWinners(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(getYearsWithMultipleWinners).toHaveBeenCalledTimes(1)
    expect(result.current.data).toEqual(response)
  })

  it('should fetch studios with win count', async () => {
    const response = { studios: [{ name: 'Columbia Pictures', winCount: 7 }] }
    vi.mocked(getStudiosWithWinCount).mockResolvedValue(response)

    const { result } = renderHook(() => useStudiosWithWinCount(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(getStudiosWithWinCount).toHaveBeenCalledTimes(1)
    expect(result.current.data).toEqual(response)
  })

  it('should fetch max/min producer intervals', async () => {
    const response = {
      min: [{ producer: 'Producer A', interval: 1, previousWin: 2000, followingWin: 2001 }],
      max: [{ producer: 'Producer B', interval: 10, previousWin: 1990, followingWin: 2000 }],
    }
    vi.mocked(getMaxMinWinIntervalForProducers).mockResolvedValue(response)

    const { result } = renderHook(() => useMaxMinWinIntervalForProducers(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(getMaxMinWinIntervalForProducers).toHaveBeenCalledTimes(1)
    expect(result.current.data).toEqual(response)
  })

  it('should fetch winners by year when year is provided', async () => {
    const response = [{ id: 1, year: 1980, title: "Can't Stop the Music" }]
    vi.mocked(getWinnersByYear).mockResolvedValue(response)

    const { result } = renderHook(() => useWinnersByYear('1980'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(getWinnersByYear).toHaveBeenCalledWith('1980')
    expect(result.current.data).toEqual(response)
  })

  it('should not fetch winners by year when year is empty', () => {
    renderHook(() => useWinnersByYear(''), {
      wrapper: createWrapper(),
    })

    expect(getWinnersByYear).not.toHaveBeenCalled()
  })

  it('should expose error state when a dashboard request fails', async () => {
    const error = new Error('Failed to fetch')
    vi.mocked(getYearsWithMultipleWinners).mockRejectedValue(error)

    const { result } = renderHook(() => useYearsWithMultipleWinners(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toEqual(error)
  })
})
