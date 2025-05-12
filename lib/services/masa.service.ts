import { apiClient } from "@/lib/api-client"

export interface Masa {
  id: number
  masa_no: number
  durum: "boş" | "dolu" | "rezervasyon"
  kapasite: number
  konum: string
  olusturma_tarihi: string
}

export const masaService = {
  /**
   * Tüm masaları getir
   */
  getAllMasalar: async (): Promise<Masa[]> => {
    return apiClient.get("/masalar")
  },

  /**
   * Masa detayı getir
   */
  getMasaById: async (id: number): Promise<Masa> => {
    return apiClient.get(`/masalar/${id}`)
  },

  /**
   * Yeni masa oluştur
   */
  createMasa: async (data: Partial<Masa>): Promise<Masa> => {
    return apiClient.post("/masalar", data)
  },

  /**
   * Masa güncelle
   */
  updateMasa: async (id: number, data: Partial<Masa>): Promise<Masa> => {
    return apiClient.put(`/masalar/${id}`, data)
  },

  /**
   * Masa durumunu güncelle
   */
  updateMasaDurum: async (id: number, durum: "boş" | "dolu" | "rezervasyon"): Promise<Masa> => {
    return apiClient.put(`/masalar/${id}/durum`, { durum })
  },

  /**
   * Masa sil
   */
  deleteMasa: async (id: number): Promise<void> => {
    return apiClient.delete(`/masalar/${id}`)
  },

  /**
   * Masa siparişlerini getir
   */
  getMasaSiparisler: async (id: number): Promise<any[]> => {
    return apiClient.get(`/masalar/${id}/siparisler`)
  }
} 