const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002'

export async function apiClient(endpoint, options = {}) {
  const { headers = {}, ...restOptions } = options
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...restOptions,
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, config)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Error HTTP: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.warn(`[API Info] Endpoint ${endpoint} respondió con advertencia/fallback local:`, error.message)
    throw error
  }
}

export const api = {
  get: (endpoint, options) => apiClient(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body, options) =>
    apiClient(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),
  put: (endpoint, body, options) =>
    apiClient(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }),
  patch: (endpoint, body, options) =>
    apiClient(endpoint, { method: 'PATCH', body: JSON.stringify(body), ...options }),
  delete: (endpoint, options) => apiClient(endpoint, { method: 'DELETE', ...options }),
}
