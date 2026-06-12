export type MultipleWinnerYear = {
  year: number
  winnerCount: number
}

export type YearsWithMultipleWinnersResponse = {
  years: MultipleWinnerYear[]
}

export type StudioWinner = {
  name: string
  winCount: number
}

export type StudiosWithWinCountResponse = {
  studios: StudioWinner[]
}

export type ProducerInterval = {
  producer: string
  interval: number
  previousWin: number
  followingWin: number
}

export type ProducerIntervalsResponse = {
  min: ProducerInterval[]
  max: ProducerInterval[]
}

export type MovieWinner = {
  id: number
  year: number
  title: string
}
