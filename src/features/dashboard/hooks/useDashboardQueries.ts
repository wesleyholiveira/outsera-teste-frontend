import { useQuery } from '@tanstack/react-query'
import {
  getMaxMinWinIntervalForProducers,
  getStudiosWithWinCount,
  getWinnersByYear,
  getYearsWithMultipleWinners,
} from '../services/dashboardService'

const DASHBOARD_QUERY_STALE_TIME = 5 * 60000
const DASHBOARD_QUERY_GC_TIME = 5 * 60000

const dashboardQueryDefaults = {
  staleTime: DASHBOARD_QUERY_STALE_TIME,
  gcTime: DASHBOARD_QUERY_GC_TIME,
}

export function useYearsWithMultipleWinners() {
  return useQuery({
    queryKey: ['dashboard', 'yearsWithMultipleWinners'],
    queryFn: getYearsWithMultipleWinners,
    ...dashboardQueryDefaults,
  })
}

export function useStudiosWithWinCount() {
  return useQuery({
    queryKey: ['dashboard', 'studiosWithWinCount'],
    queryFn: getStudiosWithWinCount,
    ...dashboardQueryDefaults,
  })
}

export function useMaxMinWinIntervalForProducers() {
  return useQuery({
    queryKey: ['dashboard', 'maxMinWinIntervalForProducers'],
    queryFn: getMaxMinWinIntervalForProducers,
    ...dashboardQueryDefaults,
  })
}

export function useWinnersByYear(year: string) {
  return useQuery({
    queryKey: ['dashboard', 'winnersByYear', year],
    queryFn: () => getWinnersByYear(year),
    enabled: Boolean(year),
    ...dashboardQueryDefaults,
  })
}
