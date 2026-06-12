import { afterEach, describe, expect, it, vi } from 'vitest'
import { getJson } from './apiClient'

describe('getJson', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return parsed json when request succeeds', async () => {
    const payload = { ok: true }

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => payload,
    } as Response)

    await expect(getJson('/api/test', 'Request failed')).resolves.toEqual(payload)
    expect(fetchMock).toHaveBeenCalledWith('/api/test')
  })

  it('should throw custom error when request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response)

    await expect(getJson('/api/test', 'Request failed')).rejects.toThrow('Request failed')
  })
})
