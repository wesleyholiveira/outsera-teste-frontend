export async function getJson<T>(url: string, errorMessage: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(errorMessage)
  }

  return response.json()
}
