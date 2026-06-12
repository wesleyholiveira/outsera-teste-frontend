import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  getMaxMinWinIntervalForProducers,
  getStudiosWithWinCount,
  getWinnersByYear,
  getYearsWithMultipleWinners,
} from './dashboardService'

const yearsResponse = {
  years: [{ year: 1986, winnerCount: 2 }],
}

const studiosResponse = {
  studios: [{ name: 'Columbia Pictures', winCount: 7 }],
}

const intervalsResponse = {
  min: [
    {
      producer: 'Joel Silver',
      interval: 1,
      previousWin: 1990,
      followingWin: 1991,
    },
  ],
  max: [
    {
      producer: 'Matthew Vaughn',
      interval: 13,
      previousWin: 2002,
      followingWin: 2015,
    },
  ],
}

const winnersResponse = [{ id: 1, year: 1980, title: "Can't Stop the Music" }]

describe('dashboardService', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should fetch years with multiple winners', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => yearsResponse,
    } as Response)

    const result = await getYearsWithMultipleWinners()

    expect(fetchMock).toHaveBeenCalledWith(
      'https://challenge.outsera.tech/api/movies/yearsWithMultipleWinners',
    )
    expect(result).toEqual(yearsResponse)
  })

  it('should fetch studios with win count', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => studiosResponse,
    } as Response)

    const result = await getStudiosWithWinCount()

    expect(fetchMock).toHaveBeenCalledWith(
      'https://challenge.outsera.tech/api/movies/studiosWithWinCount',
    )
    expect(result).toEqual(studiosResponse)
  })

  it('should fetch max/min producer win intervals', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => intervalsResponse,
    } as Response)

    const result = await getMaxMinWinIntervalForProducers()

    expect(fetchMock).toHaveBeenCalledWith(
      'https://challenge.outsera.tech/api/movies/maxMinWinIntervalForProducers',
    )
    expect(result).toEqual(intervalsResponse)
  })

  it('should fetch winners by year using query param', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => winnersResponse,
    } as Response)

    const result = await getWinnersByYear('1980')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://challenge.outsera.tech/api/movies/winnersByYear?year=1980',
    )
    expect(result).toEqual(winnersResponse)
  })

  it('should encode winners by year param', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => winnersResponse,
    } as Response)

    await getWinnersByYear('1980 1981')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://challenge.outsera.tech/api/movies/winnersByYear?year=1980+1981',
    )
  })

  it.each([
    [getYearsWithMultipleWinners, 'Failed to fetch years with multiple winners'],
    [getStudiosWithWinCount, 'Failed to fetch studios with win count'],
    [getMaxMinWinIntervalForProducers, 'Failed to fetch producer win intervals'],
    [() => getWinnersByYear('1980'), 'Failed to fetch winners by year'],
  ])('should throw when request fails', async (request, message) => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response)

    await expect(request()).rejects.toThrow(message)
  })
})
