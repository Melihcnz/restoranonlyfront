import { apiClient } from "@/lib/api-client"

export interface SiparisDetay {
  id: number
  siparis_id: number
  urun_id: number
  adet?: number
  miktar?: number
  birim_fiyat: number
  toplam_fiyat: number
  notlar?: string
  urun?: {
    id: number
    ad: string
    fiyat: number
    kategori_id?: number
  }
}

export interface Siparis {
  id: number
  masa_id: number
  musteri_id?: number
  kullanici_id: number
  durum: "bekliyor" | "hazirlaniyor" | "tamamlandi" | "iptal_edildi" | "hazırlanıyor" | "tamamlandı" | "iptal"
  toplam_tutar: number
  odeme_turu?: "nakit" | "kredi_karti" | "havale"
  olusturma_tarihi: string
  guncelleme_tarihi: string
  detaylar?: SiparisDetay[]
  siparis_detaylari?: SiparisDetay[]
  masa?: {
    id: number
    masa_no: number
  }
  kullanici?: {
    id: number
    kullanici_adi: string
    ad_soyad: string
  }
  musteri?: {
    id: number
    ad_soyad: string
    telefon: string
  }
}

export interface ApiResponse<T> {
  basarili?: boolean
  mesaj?: string
  veri?: T
}

export const siparisService = {
  /**
   * Tüm siparişleri getir
   */
  getAllSiparisler: async (params?: { durum?: string, limit?: number }): Promise<Siparis[]> => {
    const queryParams = params ? 
      `?${Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}` 
      : '';
    
    const response = await apiClient.get(`/siparisler${queryParams}`)
    
    // API yanıtının yapısını kontrol et
    if (response && typeof response === 'object' && 'veri' in response && Array.isArray(response.veri)) {
      return response.veri
    } else if (Array.isArray(response)) {
      return response
    } else {
      console.error("API yanıtı beklenen formatta değil:", response)
      return []
    }
  },

  /**
   * Sipariş detayı getir
   */
  getSiparisById: async (id: number): Promise<Siparis> => {
    const response = await apiClient.get(`/siparisler/${id}`)
    
    // API yanıtının yapısını kontrol et
    if (response && typeof response === 'object' && 'veri' in response) {
      return response.veri
    } else {
      return response as Siparis
    }
  },

  /**
   * Yeni sipariş oluştur
   */
  createSiparis: async (data: {
    masa_id: number, 
    urunler: Array<{urun_id: number, adet: number, notlar?: string}>
  }): Promise<Siparis> => {
    const response = await apiClient.post("/siparisler", data)
    
    // API yanıtının yapısını kontrol et
    if (response && typeof response === 'object' && 'veri' in response) {
      return response.veri
    } else {
      return response as Siparis
    }
  },

  /**
   * Sipariş durumunu güncelle
   */
  updateSiparisDurum: async (id: number, durum: string): Promise<Siparis> => {
    // Backend'de durum 'hazırlanıyor', 'tamamlandı' veya 'iptal' olarak bekleniyor
    // Frontend'den gelen değeri uygun formata dönüştür
    let backendDurum = durum;
    
    // Frontend durum değerlerinden backend durum değerlerine dönüşüm
    if (durum === "tamamlandi") backendDurum = "tamamlandı";
    if (durum === "hazirlaniyor") backendDurum = "hazırlanıyor";
    if (durum === "iptal_edildi") backendDurum = "iptal";
    
    const response = await apiClient.put(`/siparisler/${id}/durum`, { durum: backendDurum })
    
    // API yanıtının yapısını kontrol et
    if (response && typeof response === 'object' && 'veri' in response) {
      return response.veri
    } else {
      return response as Siparis
    }
  },

  /**
   * Siparişe ürün ekle
   */
  addUrunToSiparis: async (id: number, data: {
    urun_id: number, 
    adet: number, 
    notlar?: string
  }): Promise<SiparisDetay> => {
    const response = await apiClient.post(`/siparisler/${id}/urunler`, data)
    
    // API yanıtının yapısını kontrol et
    if (response && typeof response === 'object' && 'veri' in response) {
      return response.veri
    } else {
      return response as SiparisDetay
    }
  },

  /**
   * Siparişteki ürünü güncelle
   */
  updateSiparisDetay: async (
    siparisId: number, 
    detayId: number, 
    data: {adet?: number, notlar?: string}
  ): Promise<SiparisDetay> => {
    const response = await apiClient.put(`/siparisler/${siparisId}/urunler/${detayId}`, data)
    
    // API yanıtının yapısını kontrol et
    if (response && typeof response === 'object' && 'veri' in response) {
      return response.veri
    } else {
      return response as SiparisDetay
    }
  },

  /**
   * Siparişteki ürünü sil
   */
  deleteSiparisDetay: async (siparisId: number, detayId: number): Promise<void> => {
    return apiClient.delete(`/siparisler/${siparisId}/urunler/${detayId}`)
  },

  /**
   * Siparişi iptal et
   */
  cancelSiparis: async (id: number): Promise<Siparis> => {
    const response = await apiClient.put(`/siparisler/${id}/iptal`, {})
    
    // API yanıtının yapısını kontrol et
    if (response && typeof response === 'object' && 'veri' in response) {
      return response.veri
    } else {
      return response as Siparis
    }
  },

  /**
   * Siparişi tamamla (ödeme)
   */
  completeSiparis: async (id: number, data: {
    odeme_turu: "nakit" | "kredi_karti" | "havale"
  }): Promise<any> => {
    const response = await apiClient.post(`/siparisler/${id}/tamamla`, data)
    
    // API yanıtının yapısını kontrol et
    if (response && typeof response === 'object' && 'veri' in response) {
      return response.veri
    } else {
      return response
    }
  }
} 