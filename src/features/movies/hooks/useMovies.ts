import { useQuery } from '@tanstack/react-query'
import { getMovies } from '../services/moviesService'

type UseMoviesParams = {
  page: number
  size: number
  year?: string
  winner?: boolean | ''
}

export function useMovies(params: UseMoviesParams) {
  return useQuery({
    queryKey: ['movies', params],
    queryFn: () => getMovies(params),
    staleTime: 5 * 60000,
    gcTime: 5 * 60000,
  })
}
