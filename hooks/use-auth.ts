"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect, useCallback } from "react"

interface User {
  id: number
  ad_soyad?: string
  kullanici_adi: string
  email?: string
  yetki: string
}

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  // Kullanıcı oturum durumunu kontrol et
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (!storedToken || !storedUser) {
          setUser(null)
          setToken(null)
          setLoading(false)
          return
        }

        try {
          const parsedUser = JSON.parse(storedUser)
          setToken(storedToken)
          setUser(parsedUser)
        } catch (parseError) {
          console.error("Kullanıcı verisi ayrıştırma hatası:", parseError)
          // Hatalı veri durumunda localStorage temizle
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          setUser(null)
          setToken(null)
        }
        
        setLoading(false)
      } catch (error) {
        console.error("Auth durumu kontrolünde hata:", error)
        setUser(null)
        setToken(null)
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Kullanıcı girişi
  const login = useCallback(async (username: string, password: string) => {
    setLoading(true)

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          kullanici_adi: username, 
          sifre: password 
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Giriş yapılırken bir hata oluştu")
      }

      // Backend'den gelen kullanıcı verisini kontrol et
      if (!data.token) {
        throw new Error("Token alınamadı")
      }
      
      // data.user kontrolü ve düzeltme
      const userData = data.user || {};
      
      // localStorage'a kaydetmeden önce null kontrolü
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(userData))

      setToken(data.token)
      setUser(userData)
      router.push("/dashboard")
      return { success: true }
    } catch (error: any) {
      console.error("Login hatası:", error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }, [router])

  // Kullanıcı çıkışı
  const logout = useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
    router.push("/login")
  }, [router])

  // İstek için header oluştur
  const getAuthHeaders = useCallback(() => {
    return {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
    }
  }, [token])

  // Koruma gerektiren API istekleri için
  const authFetch = useCallback(async (url: string, options: RequestInit = {}) => {
    try {
      const headers = {
        ...getAuthHeaders(),
        ...(options.headers || {}),
      }

      const response = await fetch(url, {
        ...options,
        headers,
      })

      // Token geçersizse kullanıcıyı çıkış yaptır
      if (response.status === 401) {
        logout()
        throw new Error("Oturum süresi doldu, tekrar giriş yapın")
      }

      return response
    } catch (error) {
      console.error("API isteği hatası:", error)
      throw error
    }
  }, [getAuthHeaders, logout])

  return {
    user,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
    authFetch,
    getAuthHeaders,
  }
} 