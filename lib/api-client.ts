"use client"

const API_BASE_URL = "http://localhost:3000/api"

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // Token'ı localStorage'dan al
  const token = localStorage.getItem("token")
  
  // Default headers
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...(options.headers || {})
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers
    })

    // Token süresi dolmuşsa logout
    if (response.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
      throw new Error("Oturum süresi doldu, yeniden giriş yapmalısınız")
    }

    // 4xx veya 5xx hatası varsa
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error(`API İsteği Başarısız: ${response.status} ${response.statusText}`, {
        url: `${API_BASE_URL}${url}`,
        method: options.method || 'GET',
        response: errorData
      })
      throw new Error(errorData.message || "API isteği başarısız oldu")
    }

    // Boş yanıt kontrolü
    if (response.status === 204) {
      return null
    }

    // Yanıtı JSON olarak ayrıştır
    return await response.json()
  } catch (error) {
    console.error("API isteği hatası:", error)
    throw error
  }
}

export const apiClient = {
  get: (url: string) => fetchWithAuth(url, { method: "GET" }),
  
  post: (url: string, data: any) => fetchWithAuth(url, {
    method: "POST",
    body: JSON.stringify(data)
  }),
  
  put: (url: string, data: any) => fetchWithAuth(url, {
    method: "PUT",
    body: JSON.stringify(data)
  }),
  
  delete: (url: string) => fetchWithAuth(url, { method: "DELETE" }),
} 