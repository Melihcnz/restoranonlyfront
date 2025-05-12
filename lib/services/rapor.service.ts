import { apiClient } from "@/lib/api-client"

// Türler
export interface RaporOzet {
  toplamSiparisSayisi: number
  toplamSiparisTutari: number
  toplamFaturaSayisi: number
  toplamFaturaTutari: number
  gunlukOrtalamaCiro?: number
}

export interface CiroVerisi {
  tarih: string
  ciro: number
}

export interface OdemeTuru {
  sayi: number
  tutar: number
}

export interface UrunSatis {
  urunId: number
  urunAdi: string
  kategoriAdi?: string
  toplamMiktar: number
  toplamTutar: number
}

export interface KategoriSatis {
  kategori: string
  toplamTutar: number
}

export interface MusteriSatis {
  musteriId: number
  musteriAdi: string
  musteriTelefon: string
  siparisSayisi: number
  toplamHarcama: number
  ortalamaHarcama: number
  enYuksekHarcama: number
  enDusukHarcama: number
}

export interface SatisRaporuSonuc {
  baslangicTarihi: string
  bitisTarihi: string
  ozet: RaporOzet
  gunlukCiroVerileri: CiroVerisi[]
  odemeTurleri: Record<string, OdemeTuru>
}

export interface GunlukRaporSonuc {
  tarih: string
  ozet: RaporOzet
  odemeTurleri: Record<string, OdemeTuru>
  enCokSatilanUrunler: UrunSatis[]
  kategoriRaporu: KategoriSatis[]
}

export interface UrunRaporuSonuc {
  baslangicTarihi: string
  bitisTarihi: string
  urunSatislari: UrunSatis[]
}

export interface MusteriRaporuSonuc {
  baslangicTarihi: string
  bitisTarihi: string
  musteriSatislari: MusteriSatis[]
}

export interface AylikRaporSonuc {
  ay: number
  yil: number
  ayAdi: string
  ozet: RaporOzet & { gunlukOrtalamaCiro: number }
  gunlukCiroVerileri: CiroVerisi[]
  odemeTurleri: Record<string, OdemeTuru>
  kategoriRaporu: KategoriSatis[]
}

export interface YillikRaporSonuc {
  yil: number
  ozet: RaporOzet
  aylikCiro: Array<{ ay: number, ayAdi: string, ciro: number }>
  odemeTurleri: Array<{ odeme_turu: string, faturaSayisi: number, toplamTutar: number }>
  kategoriSatislari: Array<{ kategoriId: number, kategoriAdi: string, siparisSayisi: number, toplamMiktar: number, toplamTutar: number }>
}

export interface ApiResponse<T> {
  basarili: boolean
  mesaj: string
  veri: T
}

// Backend rotaları için
const API_PREFIX = "";

export const raporService = {
  /**
   * Satış raporu getir
   */
  getSatisRaporu: async (baslangicTarihi: string, bitisTarihi: string): Promise<ApiResponse<SatisRaporuSonuc>> => {
    try {
      const response = await apiClient.get(`${API_PREFIX}/raporlar/satis?baslangicTarihi=${encodeURIComponent(baslangicTarihi)}&bitisTarihi=${encodeURIComponent(bitisTarihi)}`)
      
      if (response && typeof response === 'object' && 'veri' in response) {
        return response as ApiResponse<SatisRaporuSonuc>
      } else {
        console.error("API yanıtı beklenen formatta değil:", response)
        throw new Error("API yanıtı beklenen formatta değil")
      }
    } catch (error) {
      console.error("Satış raporu alınırken hata:", error)
      throw error
    }
  },

  /**
   * Günlük rapor getir
   */
  getGunlukRapor: async (tarih: string): Promise<ApiResponse<GunlukRaporSonuc>> => {
    try {
      const response = await apiClient.get(`${API_PREFIX}/raporlar/gunluk?tarih=${encodeURIComponent(tarih)}`)
      
      if (response && typeof response === 'object' && 'veri' in response) {
        return response as ApiResponse<GunlukRaporSonuc>
      } else {
        console.error("API yanıtı beklenen formatta değil:", response)
        throw new Error("API yanıtı beklenen formatta değil")
      }
    } catch (error) {
      console.error("Günlük rapor alınırken hata:", error)
      throw error
    }
  },

  /**
   * Ürün raporu getir
   */
  getUrunRaporu: async (baslangicTarihi: string, bitisTarihi: string, kategoriId?: number): Promise<ApiResponse<UrunRaporuSonuc>> => {
    try {
      let url = `${API_PREFIX}/raporlar/urunler?baslangicTarihi=${encodeURIComponent(baslangicTarihi)}&bitisTarihi=${encodeURIComponent(bitisTarihi)}`
      
      if (kategoriId) {
        url += `&kategoriId=${kategoriId}`
      }
      
      const response = await apiClient.get(url)
      
      if (response && typeof response === 'object' && 'veri' in response) {
        return response as ApiResponse<UrunRaporuSonuc>
      } else {
        console.error("API yanıtı beklenen formatta değil:", response)
        throw new Error("API yanıtı beklenen formatta değil")
      }
    } catch (error) {
      console.error("Ürün raporu alınırken hata:", error)
      throw error
    }
  },

  /**
   * Müşteri raporu getir
   */
  getMusteriRaporu: async (baslangicTarihi: string, bitisTarihi: string): Promise<ApiResponse<MusteriRaporuSonuc>> => {
    try {
      // Müşteri raporunu almak için doğru endpoint'i kullan
      // Önce raporlar/musteriler ile dene
      try {
        const response = await apiClient.get(`${API_PREFIX}/raporlar/musteriler?baslangicTarihi=${encodeURIComponent(baslangicTarihi)}&bitisTarihi=${encodeURIComponent(bitisTarihi)}`)
        
        if (response && typeof response === 'object') {
          // API yanıtı farklı formatta olabilir, bu durumda uyarla
          if (Array.isArray(response)) {
            return {
              basarili: true,
              mesaj: "Müşteri raporu başarıyla alındı",
              veri: {
                baslangicTarihi,
                bitisTarihi,
                musteriSatislari: response
              }
            } as ApiResponse<MusteriRaporuSonuc>
          } else if ('veri' in response) {
            return response as ApiResponse<MusteriRaporuSonuc>
          }
        }
        
        throw new Error("API yanıtı beklenen formatta değil")
      } catch (error) {
        // Alternatif olarak sadece müşteri listesini al
        console.warn("Müşteri raporu endpointi başarısız, müşteri listesine geçiliyor")
        const response = await apiClient.get(`${API_PREFIX}/musteriler`)
        
        if (response) {
          let musteriler = Array.isArray(response) ? response : (response.veri || [])
          
          return {
            basarili: true,
            mesaj: "Müşteri raporu başarıyla alındı (sadece müşteri listesi)",
            veri: {
              baslangicTarihi,
              bitisTarihi,
              musteriSatislari: musteriler.map((m: any) => ({
                musteriId: m.id,
                musteriAdi: m.ad_soyad,
                musteriTelefon: m.telefon || "",
                siparisSayisi: 0,
                toplamHarcama: 0,
                ortalamaHarcama: 0,
                enYuksekHarcama: 0,
                enDusukHarcama: 0
              }))
            }
          } as ApiResponse<MusteriRaporuSonuc>
        }
      }
      
      // Her iki yöntem de başarısız olursa hata fırlat
      throw new Error("Müşteri raporu alınamadı")
    } catch (error) {
      console.error("Müşteri raporu alınırken hata:", error)
      throw error
    }
  },

  /**
   * Aylık rapor getir
   */
  getAylikRapor: async (ay: number, yil: number): Promise<ApiResponse<AylikRaporSonuc>> => {
    try {
      const response = await apiClient.get(`${API_PREFIX}/raporlar/aylik/${ay}/${yil}`)
      
      if (response && typeof response === 'object' && 'veri' in response) {
        return response as ApiResponse<AylikRaporSonuc>
      } else {
        console.error("API yanıtı beklenen formatta değil:", response)
        throw new Error("API yanıtı beklenen formatta değil")
      }
    } catch (error) {
      console.error("Aylık rapor alınırken hata:", error)
      throw error
    }
  },

  /**
   * Yıllık rapor getir
   */
  getYillikRapor: async (yil: number): Promise<ApiResponse<YillikRaporSonuc>> => {
    try {
      const response = await apiClient.get(`${API_PREFIX}/raporlar/yillik/${yil}`)
      
      if (response && typeof response === 'object' && 'veri' in response) {
        return response as ApiResponse<YillikRaporSonuc>
      } else {
        console.error("API yanıtı beklenen formatta değil:", response)
        throw new Error("API yanıtı beklenen formatta değil")
      }
    } catch (error) {
      console.error("Yıllık rapor alınırken hata:", error)
      throw error
    }
  },

  /**
   * Kategori raporu getir
   */
  getKategoriRaporu: async (kategoriId: number, baslangicTarihi: string, bitisTarihi: string): Promise<ApiResponse<any>> => {
    try {
      const response = await apiClient.get(`${API_PREFIX}/raporlar/kategori/${kategoriId}?baslangicTarihi=${encodeURIComponent(baslangicTarihi)}&bitisTarihi=${encodeURIComponent(bitisTarihi)}`)
      
      if (response && typeof response === 'object' && 'veri' in response) {
        return response as ApiResponse<any>
      } else {
        console.error("API yanıtı beklenen formatta değil:", response)
        throw new Error("API yanıtı beklenen formatta değil")
      }
    } catch (error) {
      console.error("Kategori raporu alınırken hata:", error)
      throw error
    }
  },

  /**
   * Tarih aralığı raporu getir
   */
  getTarihAraligiRaporu: async (baslangic: string, bitis: string): Promise<ApiResponse<any>> => {
    try {
      const response = await apiClient.get(`${API_PREFIX}/raporlar/tarih/${encodeURIComponent(baslangic)}/${encodeURIComponent(bitis)}`)
      
      if (response && typeof response === 'object' && 'veri' in response) {
        return response as ApiResponse<any>
      } else {
        console.error("API yanıtı beklenen formatta değil:", response)
        throw new Error("API yanıtı beklenen formatta değil")
      }
    } catch (error) {
      console.error("Tarih aralığı raporu alınırken hata:", error)
      throw error
    }
  }
} 