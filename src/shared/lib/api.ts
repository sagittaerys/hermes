const NYT_API_KEY = process.env.EXPO_PUBLIC_NYT_API_KEY
const NYT_BASE_URL = 'https://api.nytimes.com/svc'

export async function nytFetch<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(NYT_BASE_URL + path)
  url.searchParams.set('api-key', NYT_API_KEY!)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.status === 429) throw new Error('Rate limit reached. Please try again shortly.')
  if (res.status === 401) throw new Error('Invalid API key.')
  if (!res.ok) throw new Error(`NYT API error: ${res.status}`)

  return res.json() as Promise<T>
}