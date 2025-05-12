import { apiClient } from "@/lib/api-client"

export interface Musteri {
  id: number
  ad_soyad: string
  telefon: string
  email?: string
  adres?: string
  dogum_tarihi?: string
  son_ziyaret?: string
  olusturma_tarihi: string
  puan?: number
  notlar?: string
}

export interface ApiResponse<T> {
  basarili: boolean
  mesaj: string
  veri: T
}

export const musteriService = {
  /**
   * Tüm müşterileri getir
   */
  getAllMusteriler: async (): Promise<ApiResponse<Musteri[]> | Musteri[]> => {
    return apiClient.get("/musteriler")
  },

  /**
   * Müşteri detayı getir
   */
  getMusteriById: async (id: number): Promise<ApiResponse<Musteri> | Musteri> => {
    return apiClient.get(`/musteriler/${id}`)
  },

  /**
   * Yeni müşteri oluştur
   */
  createMusteri: async (data: Partial<Musteri>): Promise<ApiResponse<Musteri> | Musteri> => {
    return apiClient.post("/musteriler", data)
  },

  /**
   * Müşteri güncelle
   */
  updateMusteri: async (id: number, data: Partial<Musteri>): Promise<ApiResponse<Musteri> | Musteri> => {
    return apiClient.put(`/musteriler/${id}`, data)
  },

  /**
   * Müşteri sil
   */
  deleteMusteri: async (id: number): Promise<void> => {
    return apiClient.delete(`/musteriler/${id}`)
  },

  /**
   * Müşteri siparişlerini getir
   */
  getMusteriSiparisler: async (id: number): Promise<ApiResponse<any[]> | any[]> => {
    return apiClient.get(`/musteriler/${id}/siparisler`)
  },

  /**
   * Müşteri ara
   */
  searchMusteriler: async (query: string): Promise<ApiResponse<Musteri[]> | Musteri[]> => {
    return apiClient.get(`/musteriler/search?q=${encodeURIComponent(query)}`)
  }
} 