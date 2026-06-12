export type MultipleWinnerYear = {
  year: number
  winCount: number
}

export type StudioWinner = {
  name: string
  winCount: number
}

export type ProducerInterval = {
  producer: string
  interval: number
  previousWin: number
  followingWin: number
}

export type MovieWinner = {
  id: number
  year: number
  title: string
}
