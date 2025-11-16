export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.dramz.fun'

export type ApiRequestConfig = {
  token?: string
  isFormData?: boolean
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  config: ApiRequestConfig = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path}`

  const headers: Record<string, string> = {}

  if (options.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        headers[key] = value
      })
    } else if (Array.isArray(options.headers)) {
      options.headers.forEach(([key, value]) => {
        headers[key] = value
      })
    } else {
      Object.assign(headers, options.headers)
    }
  }

  if (!config.isFormData) {
    if (!headers['Content-Type'] && !headers['content-type']) {
      headers['Content-Type'] = 'application/json'
    }
  }

  if (config.token) {
    headers['Authorization'] = `Bearer ${config.token}`
  }

  const res = await fetch(url, {
    cache: 'no-store',
    ...options,
    headers
  })

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`
    try {
      const data = await res.json() as { message?: string }
      if (data && typeof data.message === 'string') {
        message = data.message
      }
    } catch {
    }
    throw new Error(message)
  }

  if (res.status === 204) {
    return null as unknown as T
  }

  return res.json() as Promise<T>
}


