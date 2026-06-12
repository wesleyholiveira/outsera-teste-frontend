import { getJson } from '../../../services/apiClient'
import type {
  MovieWinner,
  ProducerIntervalsResponse,
  StudiosWithWinCountResponse,
  YearsWithMultipleWinnersResponse,
} from '../types/dashboard'

const BASE_URL = 'https://challenge.outsera.tech/api/movies'

export function getYearsWithMultipleWinners(): Promise<YearsWithMultipleWinnersResponse> {
  return getJson(
    `${BASE_URL}/yearsWithMultipleWinners`,
    'Failed to fetch years with multiple winners',
  )
}

export function getStudiosWithWinCount(): Promise<StudiosWithWinCountResponse> {
  return getJson(`${BASE_URL}/studiosWithWinCount`, 'Failed to fetch studios with win count')
}

export function getMaxMinWinIntervalForProducers(): Promise<ProducerIntervalsResponse> {
  return getJson(
    `${BASE_URL}/maxMinWinIntervalForProducers`,
    'Failed to fetch producer win intervals',
  )
}

export function getWinnersByYear(year: string): Promise<MovieWinner[]> {
  const params = new URLSearchParams()
  params.set('year', year)

  return getJson(
    `${BASE_URL}/winnersByYear?${params.toString()}`,
    'Failed to fetch winners by year',
  )
}
