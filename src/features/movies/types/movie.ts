export type Movie = {
  id: number
  year: number
  title: string
  studios: string[]
  producers: string[]
  winner?: boolean
}

export type MoviesResponse = {
  content: Movie[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}
