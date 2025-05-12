"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ArrowUpDown, Calendar, Check, ChevronDown, Filter, Search, Timer, X, AlertCircle } from "lucide-react"
import { Siparis, SiparisDetay, siparisService } from "@/lib/services/siparis.service"

export default function Page() {
  const [activeTab, setActiveTab] = useState("aktif")
  const [filterOpen, setFilterOpen] = useState(false)
  const [aktifSiparisler, setAktifSiparisler] = useState<Siparis[]>([])
  const [tamamlananSiparisler, setTamamlananSiparisler] = useState<Siparis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [expandedSiparisId, setExpandedSiparisId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState<string>("")
  const [filterDurum, setFilterDurum] = useState<string>("all")
  
  // Siparişleri API'den yükle
  const fetchSiparisler = async (filters = {}) => {
    try {
      setLoading(true)
      
      // Aktif siparişleri yükle (bekliyor veya hazirlaniyor durumundakiler)
      const aktifData = await siparisService.getAllSiparisler({ 
        durum: "bekliyor,hazirlaniyor,hazırlanıyor",
        ...filters
      })
      setAktifSiparisler(aktifData)
      
      // Tamamlanan siparişleri yükle
      const tamamlananData = await siparisService.getAllSiparisler({ 
        durum: "tamamlandi,tamamlandı",
        ...filters
      })
      setTamamlananSiparisler(tamamlananData)
      
      setError("")
    } catch (err: any) {
      console.error("Siparişler yüklenirken hata:", err)
      setError("Siparişler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchSiparisler()
  }, [])
  
  // Filtreleri uygula
  const applyFilters = () => {
    const filters: any = {}
    
    // Tarih filtresi ekle
    if (filterDate) {
      filters.baslangic_tarihi = filterDate
      
      // Bitiş tarihi olarak aynı günün sonunu ayarla (23:59:59)
      const endDate = new Date(filterDate)
      endDate.setHours(23, 59, 59, 999)
      filters.bitis_tarihi = endDate.toISOString().split('T')[0]
    }
    
    // Durum filtresi ekle (aktif tab için gerekli değil)
    if (filterDurum !== "all" && activeTab === "tamamlanan") {
      filters.durum = filterDurum
    }
    
    fetchSiparisler(filters)
    setFilterOpen(false)
  }
  
  // Filtreleri sıfırla
  const resetFilters = () => {
    setFilterDate("")
    setFilterDurum("all")
    fetchSiparisler()
    setFilterOpen(false)
  }
  
  // Sipariş durumunu güncelle
  const handleUpdateSiparisDurum = async (siparisId: number, durum: string) => {
    try {
      // Backend'in beklediği durum formatına dönüştür
      let backendDurum = durum;
      if (durum === "tamamlandi") backendDurum = "tamamlandı";
      if (durum === "hazirlaniyor") backendDurum = "hazırlanıyor";
      if (durum === "iptal_edildi") backendDurum = "iptal";
      
      await siparisService.updateSiparisDurum(siparisId, backendDurum)
      
      // Sipariş listelerini güncelle
      if (durum === "tamamlandi" || durum === "tamamlandı") {
        // Sipariş tamamlandıysa, aktif listeden kaldır, tamamlanan listeye ekle
        const tamamlananSiparis = aktifSiparisler.find(s => s.id === siparisId)
        if (tamamlananSiparis) {
          setAktifSiparisler(prev => prev.filter(s => s.id !== siparisId))
          setTamamlananSiparisler(prev => [
            ...prev, 
            {
              ...tamamlananSiparis, 
              durum: backendDurum as "tamamlandı" // TypeScript için tipleme
            }
          ])
        }
      } else if (durum === "iptal_edildi" || durum === "iptal") {
        // Sipariş iptal edildiyse, aktif listeden kaldır
        setAktifSiparisler(prev => prev.filter(s => s.id !== siparisId))
      }
      
      // Detay görünümünü kapat
      setExpandedSiparisId(null)
    } catch (err: any) {
      console.error("Sipariş durumu güncellenirken hata:", err)
      setError("Sipariş durumu güncellenirken bir hata oluştu.")
    }
  }
  
  // Arama fonksiyonu
  const filterSiparisler = (siparisler: Siparis[]) => {
    if (!searchTerm) return siparisler
    
    return siparisler.filter(siparis => 
      (siparis.masa?.masa_no?.toString().includes(searchTerm)) ||
      (siparis.toplam_tutar?.toString().includes(searchTerm))
    )
  }
  
  const siparisDetay = (siparis: Siparis) => {
    // Frontend'e gelen veri farklı alanlarla gelmiş olabilir
    const detaylar = siparis.detaylar || siparis.siparis_detaylari || []
    
    console.log("Sipariş detayları:", detaylar) // Debug için
    
    return (
      <div className="bg-muted/30 p-3 rounded-lg mt-2 space-y-2">
        {detaylar?.length > 0 ? (
          detaylar.map((detay: any) => (
            <div key={detay.id} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded text-xs">
                  {detay.adet || detay.miktar || 0}x
                </span>
                <span>
                  {detay.urun?.ad || `Ürün #${detay.urun_id}`}
                </span>
                {detay.notlar && (
                  <span className="text-xs text-muted-foreground italic">
                    ({detay.notlar})
                  </span>
                )}
              </div>
              <div className="font-medium">₺{Number(detay.toplam_fiyat).toFixed(2)}</div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-2">
            Sipariş detayı bulunamadı
          </div>
        )}
        
        <div className="border-t pt-2 flex justify-between">
          <span className="font-medium">Toplam</span>
          <span className="font-bold">₺{Number(siparis.toplam_tutar).toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <button 
            className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm flex-1 flex justify-center items-center gap-1"
            onClick={() => handleUpdateSiparisDurum(siparis.id, "tamamlandi")}
          >
            <Check className="size-4" />
            <span>Tamamlandı</span>
          </button>
          <button 
            className="bg-red-500 text-white px-2 py-1 rounded text-sm flex-1 flex justify-center items-center gap-1"
            onClick={() => handleUpdateSiparisDurum(siparis.id, "iptal_edildi")}
          >
            <X className="size-4" />
            <span>İptal</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">
                  RESTORAN
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Siparişler</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="ml-auto flex gap-2">
            <div className="relative">
              <div className="flex items-center border rounded-lg px-3 py-1.5">
                <Search className="size-4 text-muted-foreground mr-2" />
                <input 
                  type="text" 
                  placeholder="Sipariş ara..." 
                  className="bg-transparent outline-none text-sm w-28 md:w-auto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="relative">
              <button 
                className="flex items-center border rounded-lg px-3 py-1.5 gap-1.5"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="size-4 text-muted-foreground" />
                <span className="text-sm">Filtrele</span>
                <ChevronDown className="size-4 text-muted-foreground" />
              </button>
              
              {filterOpen && (
                <div className="absolute top-full right-0 mt-1 bg-card border shadow-lg rounded-lg p-2 min-w-[200px] z-10">
                  <div className="p-2 space-y-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">Tarih</label>
                      <div className="flex items-center gap-2 border rounded-md p-1">
                        <Calendar className="size-4 text-muted-foreground ml-1" />
                        <input 
                          type="date" 
                          className="text-sm bg-transparent w-full outline-none"
                          value={filterDate}
                          onChange={(e) => setFilterDate(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium block mb-1">Durum</label>
                      <select 
                        className="w-full rounded-md border p-2 text-sm bg-card"
                        value={filterDurum}
                        onChange={(e) => setFilterDurum(e.target.value)}
                      >
                        <option value="all">Tümü</option>
                        <option value="bekliyor">Bekliyor</option>
                        <option value="hazirlaniyor">Hazırlanıyor</option>
                        <option value="tamamlandi">Tamamlandı</option>
                        <option value="iptal_edildi">İptal Edildi</option>
                      </select>
                    </div>
                    
                    <div className="flex gap-2 pt-1">
                      <button 
                        className="bg-muted flex-1 text-muted-foreground rounded-md py-1 text-sm"
                        onClick={resetFilters}
                      >
                        Sıfırla
                      </button>
                      <button 
                        className="bg-primary flex-1 text-primary-foreground rounded-md py-1 text-sm"
                        onClick={applyFilters}
                      >
                        Uygula
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        
        <div className="p-4 pt-2">
          <h1 className="text-3xl font-bold mb-1">Siparişler</h1>
          <p className="text-muted-foreground mb-4">Tüm siparişlerinizi görüntüleyin ve yönetin</p>
          
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400 rounded-md p-3 mb-4 text-sm flex items-center gap-2">
              <AlertCircle className="size-4" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Tabs */}
          <div className="flex border-b mb-4">
            <button 
              className={`pb-2 px-4 text-sm font-medium relative ${activeTab === "aktif" ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("aktif")}
            >
              Aktif Siparişler
              {activeTab === "aktif" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
            </button>
            <button 
              className={`pb-2 px-4 text-sm font-medium relative ${activeTab === "tamamlanan" ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("tamamlanan")}
            >
              Tamamlanan Siparişler
              {activeTab === "tamamlanan" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
            </button>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                <p className="text-muted-foreground">Siparişler yükleniyor...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Aktif Siparişler */}
              {activeTab === "aktif" && (
                <div className="space-y-4">
                  {filterSiparisler(aktifSiparisler).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Aktif sipariş bulunmuyor
                    </div>
                  ) : (
                    filterSiparisler(aktifSiparisler).map((siparis) => (
                      <div key={siparis.id} className="border rounded-lg p-3 bg-card">
                        <div 
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => setExpandedSiparisId(expandedSiparisId === siparis.id ? null : siparis.id)}
                        >
                          <div className="font-medium">Masa {siparis.masa?.masa_no}</div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-muted-foreground text-sm">
                              <Timer className="size-3.5" />
                              {new Date(siparis.olusturma_tarihi).toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}
                            </div>
                            <div className="font-semibold">₺{siparis.toplam_tutar}</div>
                            <div className={`
                              text-xs px-2 py-0.5 rounded-full 
                              ${siparis.durum === "bekliyor" ? "bg-yellow-100 text-yellow-700" : ""}
                              ${siparis.durum === "hazirlaniyor" || siparis.durum === "hazırlanıyor" ? "bg-blue-100 text-blue-700" : ""}
                              ${siparis.durum === "tamamlandi" || siparis.durum === "tamamlandı" ? "bg-green-100 text-green-700" : ""}
                              ${siparis.durum === "iptal_edildi" ? "bg-red-100 text-red-700" : ""}
                            `}>
                              {siparis.durum === "bekliyor" ? "Bekliyor" : ""}
                              {siparis.durum === "hazirlaniyor" || siparis.durum === "hazırlanıyor" ? "Hazırlanıyor" : ""}
                              {siparis.durum === "tamamlandi" || siparis.durum === "tamamlandı" ? "Tamamlandı" : ""}
                              {siparis.durum === "iptal_edildi" ? "İptal Edildi" : ""}
                            </div>
                          </div>
                        </div>
                        
                        {expandedSiparisId === siparis.id && siparisDetay(siparis)}
                      </div>
                    ))
                  )}
                </div>
              )}
              
              {/* Tamamlanan Siparişler */}
              {activeTab === "tamamlanan" && (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50 text-left text-sm">
                      <tr>
                        <th className="px-4 py-3 font-medium">Sipariş</th>
                        <th className="px-4 py-3 font-medium">Masa</th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            <span>Tarih</span>
                            <ArrowUpDown className="size-3" />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">Tutar</th>
                        <th className="px-4 py-3 font-medium">Ödeme</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filterSiparisler(tamamlananSiparisler).length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                            Tamamlanan sipariş bulunmuyor
                          </td>
                        </tr>
                      ) : (
                        filterSiparisler(tamamlananSiparisler).map((siparis) => (
                          <tr key={siparis.id} className="hover:bg-muted/30">
                            <td className="px-4 py-3 text-sm">#{siparis.id}</td>
                            <td className="px-4 py-3">Masa {siparis.masa?.masa_no}</td>
                            <td className="px-4 py-3 text-sm">
                              {new Date(siparis.olusturma_tarihi).toLocaleDateString('tr-TR')} 
                              {' '}
                              {new Date(siparis.olusturma_tarihi).toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}
                            </td>
                            <td className="px-4 py-3 font-medium">₺{siparis.toplam_tutar}</td>
                            <td className="px-4 py-3">
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                                {siparis.odeme_turu 
                                  ? siparis.odeme_turu === "nakit" 
                                    ? "Nakit" 
                                    : siparis.odeme_turu === "kredi_karti" 
                                      ? "Kredi Kartı" 
                                      : "Havale"
                                  : "Belirsiz"}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 