import { afterEach, describe, expect, it, vi } from 'vitest'
import { getMovies } from './moviesService'

const mockMoviesResponse = {
  content: [],
  pageable: {
    pageNumber: 0,
    pageSize: 15,
  },
  totalElements: 0,
  totalPages: 0,
  last: true,
  first: true,
  size: 15,
  number: 0,
  numberOfElements: 0,
  empty: true,
}

describe('getMovies', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should fetch movies with required params', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockMoviesResponse,
    } as Response)

    const result = await getMovies({
      page: 0,
      size: 15,
    })

    expect(fetchMock).toHaveBeenCalledWith(
      'https://challenge.outsera.tech/api/movies?page=0&size=15',
    )

    expect(result).toEqual(mockMoviesResponse)
  })

  it('should fetch movies with year filter', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockMoviesResponse,
    } as Response)

    await getMovies({
      page: 1,
      size: 15,
      year: '2020',
    })

    expect(fetchMock).toHaveBeenCalledWith(
      'https://challenge.outsera.tech/api/movies?page=1&size=15&year=2020',
    )
  })

  it('should fetch movies with winner filter as true', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockMoviesResponse,
    } as Response)

    await getMovies({
      page: 0,
      size: 15,
      winner: true,
    })

    expect(fetchMock).toHaveBeenCalledWith(
      'https://challenge.outsera.tech/api/movies?page=0&size=15&winner=true',
    )
  })

  it('should fetch movies with winner filter as false', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockMoviesResponse,
    } as Response)

    await getMovies({
      page: 0,
      size: 15,
      winner: false,
    })

    expect(fetchMock).toHaveBeenCalledWith(
      'https://challenge.outsera.tech/api/movies?page=0&size=15&winner=false',
    )
  })

  it('should include winner param when winner is empty string', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockMoviesResponse,
    } as Response)

    await getMovies({
      page: 0,
      size: 15,
      winner: '',
    })

    expect(fetchMock).toHaveBeenCalledWith(
      'https://challenge.outsera.tech/api/movies?page=0&size=15&winner=',
    )
  })

  it('should throw an error when response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => mockMoviesResponse,
    } as Response)

    await expect(
      getMovies({
        page: 0,
        size: 15,
      }),
    ).rejects.toThrow('Failed to fetch movies')
  })
})
