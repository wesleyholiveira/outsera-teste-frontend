import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it, vi, afterEach } from 'vitest'
import { getMovies } from '../services/moviesService'
import { useMovies } from './useMovies'

vi.mock('../services/moviesService', () => ({
  getMovies: vi.fn(),
}))

const mockMoviesResponse = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  size: 15,
  number: 0,
}

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

describe('useMovies', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch movies using params', async () => {
    vi.mocked(getMovies).mockResolvedValue(mockMoviesResponse as never)

    const params = {
      page: 0,
      size: 15,
      year: '2020',
      winner: true,
    }

    const { result } = renderHook(() => useMovies(params), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(getMovies).toHaveBeenCalledWith(params)
    expect(result.current.data).toEqual(mockMoviesResponse)
  })

  it('should expose error state when service fails', async () => {
    vi.mocked(getMovies).mockRejectedValue(new Error('Failed to fetch movies'))

    const { result } = renderHook(
      () =>
        useMovies({
          page: 0,
          size: 15,
        }),
      {
        wrapper: createWrapper(),
      },
    )

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toEqual(new Error('Failed to fetch movies'))
  })
})
