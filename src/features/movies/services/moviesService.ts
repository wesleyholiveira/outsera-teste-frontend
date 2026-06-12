import type { MoviesResponse } from '../types/movie'

const BASE_URL = 'https://challenge.outsera.tech/api/movies'

type GetMoviesParams = {
  page: number
  size: number
  year?: string
  winner?: boolean | ''
}

export async function getMovies({
  page,
  size,
  year,
  winner,
}: GetMoviesParams): Promise<MoviesResponse> {
  const params = new URLSearchParams()

  params.set('page', String(page))
  params.set('size', String(size))

  if (year) {
    params.set('year', year)
  }

  if (winner !== undefined) {
    params.set('winner', String(winner))
  }

  const response = await fetch(`${BASE_URL}?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch movies')
  }

  return response.json()
}
