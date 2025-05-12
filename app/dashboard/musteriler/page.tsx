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
import { Calendar, ChevronDown, Filter, MoreHorizontal, Phone, Plus, Search, User, AlertCircle } from "lucide-react"
import { Musteri, musteriService } from "@/lib/services/musteri.service"

export default function Page() {
  const [activeTab, setActiveTab] = useState("tum")
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedMusteri, setSelectedMusteri] = useState<number | null>(null)
  const [musteriler, setMusteriler] = useState<Musteri[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  
  // Form state için kullanılacak yeni müşteri bilgileri
  const [yeniMusteri, setYeniMusteri] = useState({
    ad_soyad: "",
    telefon: "",
    email: "",
    adres: "",
    notlar: ""
  })
  
  // Müşterileri API'den yükle
  useEffect(() => {
    const fetchMusteriler = async (retryCount = 0) => {
      try {
        setLoading(true)
        const response = await musteriService.getAllMusteriler()
        
        // API yanıtının yapısını kontrol et ve veri nesnesini çıkar
        if (response && typeof response === 'object' && 'veri' in response && Array.isArray(response.veri)) {
          setMusteriler(response.veri)
        } else if (Array.isArray(response)) {
          setMusteriler(response)
        } else {
          console.error("API yanıtı beklenen formatta değil:", response)
          setMusteriler([])
        }
        
        setError("")
      } catch (err: any) {
        console.error("Müşteriler yüklenirken hata:", err)
        
        // Maksimum 3 kez tekrar dene
        if (retryCount < 3) {
          console.log(`Müşteri verileri yüklenirken hata oluştu, tekrar deneniyor (${retryCount + 1}/3)...`)
          setTimeout(() => {
            fetchMusteriler(retryCount + 1)
          }, 1000) // 1 saniye bekle ve tekrar dene
        } else {
          setError("Müşteriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.")
        }
      } finally {
        if (retryCount === 0 || retryCount >= 3) {
          setLoading(false)
        }
      }
    }
    
    fetchMusteriler()
  }, [])
  
  // Yeni müşteri ekleme
  const handleAddMusteri = async () => {
    try {
      // Form validasyonu
      if (!yeniMusteri.ad_soyad || !yeniMusteri.telefon) {
        setError("Ad Soyad ve Telefon zorunludur.")
        return
      }
      
      setLoading(true)
      const response = await musteriService.createMusteri(yeniMusteri)
      
      // Yanıt formatını kontrol et ve veriyi uygun şekilde al
      let yeniKayit: Musteri;
      if (response && typeof response === 'object' && 'veri' in response) {
        yeniKayit = response.veri;
      } else {
        // response doğrudan Musteri tipinde
        yeniKayit = response as Musteri;
      }
      
      // Müşteri listesini güncelle
      setMusteriler([...musteriler, yeniKayit])
      
      // Formu temizle ve kapat
      setYeniMusteri({
        ad_soyad: "",
        telefon: "",
        email: "",
        adres: "",
        notlar: ""
      })
      setShowAddForm(false)
      setError("")
    } catch (err: any) {
      console.error("Müşteri eklenirken hata:", err)
      setError("Müşteri eklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }
  
  // Müşteri silme
  const handleDeleteMusteri = async (id: number) => {
    try {
      await musteriService.deleteMusteri(id)
      
      // Müşteri listesini güncelle
      setMusteriler(musteriler.filter(m => m.id !== id))
      
      // Seçili müşteriyi temizle
      if (selectedMusteri === id) {
        setSelectedMusteri(null)
      }
    } catch (err: any) {
      console.error("Müşteri silinirken hata:", err)
      setError("Müşteri silinirken bir hata oluştu.")
    }
  }
  
  // Arama fonksiyonu
  const handleSearch = async (retryCount = 0) => {
    if (!searchTerm) {
      // Arama terimi yoksa tüm müşterileri getir
      const fetchMusteriler = async (retryAttempt = 0) => {
        try {
          setLoading(true)
          const response = await musteriService.getAllMusteriler()
          
          // API yanıtının yapısını kontrol et
          if (response && typeof response === 'object' && 'veri' in response && Array.isArray(response.veri)) {
            setMusteriler(response.veri)
          } else if (Array.isArray(response)) {
            setMusteriler(response)
          } else {
            console.error("API yanıtı beklenen formatta değil:", response)
            setMusteriler([])
          }
          
          setError("")
        } catch (err: any) {
          console.error("Müşteriler yüklenirken hata:", err)
          if (retryAttempt < 2) {
            setTimeout(() => fetchMusteriler(retryAttempt + 1), 1000)
          } else {
            setError("Müşteriler yüklenirken bir hata oluştu.")
          }
        } finally {
          if (retryAttempt === 0 || retryAttempt >= 2) {
            setLoading(false)
          }
        }
      }
      
      fetchMusteriler()
      return
    }
    
    try {
      setLoading(true)
      const results = await musteriService.searchMusteriler(searchTerm)
      
      // API yanıtının yapısını kontrol et
      if (results && typeof results === 'object' && 'veri' in results && Array.isArray(results.veri)) {
        setMusteriler(results.veri)
      } else if (Array.isArray(results)) {
        setMusteriler(results)
      } else {
        console.error("API arama yanıtı beklenen formatta değil:", results)
        setMusteriler([])
      }
      
      setError("")
    } catch (err: any) {
      console.error("Müşteri aranırken hata:", err)
      
      // Maksimum 2 kez tekrar dene
      if (retryCount < 2) {
        console.log(`Müşteri araması başarısız oldu, tekrar deneniyor (${retryCount + 1}/2)...`)
        setTimeout(() => {
          handleSearch(retryCount + 1)
        }, 1000)
      } else {
        setError("Müşteri aranırken bir hata oluştu.")
      }
    } finally {
      if (retryCount === 0 || retryCount >= 2) {
        setLoading(false)
      }
    }
  }
  
  // Tab filtreleme
  const filteredMusteriler = activeTab === "tum" 
    ? musteriler 
    : activeTab === "vip" 
    ? musteriler.filter(m => (m.puan || 0) > 80) 
    : musteriler.filter(m => (m.puan || 0) <= 80 && (m.puan || 0) > 0)

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
                <BreadcrumbPage>Müşteriler</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="ml-auto flex gap-2">
            <div className="relative">
              <div className="flex items-center border rounded-lg px-3 py-1.5">
                <Search className="size-4 text-muted-foreground mr-2" />
                <input 
                  type="text" 
                  placeholder="Müşteri ara..." 
                  className="bg-transparent outline-none text-sm w-28 md:w-auto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>
            
            <button 
              className="border rounded-lg px-3 py-1.5 flex items-center gap-1 text-sm"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="size-4" />
              <span className="hidden md:inline">Filtrele</span>
              <ChevronDown className="size-4" />
            </button>
            
            <button 
              className="bg-primary text-primary-foreground rounded-lg px-3 py-1.5 flex items-center gap-1 text-sm"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <Plus className="size-4" />
              <span className="hidden md:inline">Yeni Müşteri</span>
            </button>
          </div>
        </header>
        
        {filterOpen && (
          <div className="px-4 py-2 border-b flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-1 text-sm border rounded-lg px-2 py-1">
              <Calendar className="size-4" />
              <span>Son Ziyaret: Tüm Zamanlar</span>
              <ChevronDown className="size-4" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm">
                Filtreleri Temizle
              </button>
              <button className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm">
                Uygula
              </button>
            </div>
          </div>
        )}
        
        <div className="p-4 pt-2">
          <h1 className="text-3xl font-bold mb-1">Müşteriler</h1>
          <p className="text-muted-foreground mb-4">Tüm müşterilerinizi görüntüleyin ve yönetin</p>
          
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400 rounded-md p-3 mb-4 text-sm flex items-center gap-2">
              <AlertCircle className="size-4" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Yeni Müşteri Formu */}
          {showAddForm && (
            <div className="bg-card border rounded-xl p-4 mb-4">
              <h2 className="text-lg font-medium mb-3">Yeni Müşteri Ekle</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ad Soyad *</label>
                  <input 
                    type="text" 
                    className="w-full border rounded-lg p-2 text-sm" 
                    value={yeniMusteri.ad_soyad}
                    onChange={(e) => setYeniMusteri({...yeniMusteri, ad_soyad: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefon *</label>
                  <input 
                    type="tel" 
                    className="w-full border rounded-lg p-2 text-sm"
                    value={yeniMusteri.telefon}
                    onChange={(e) => setYeniMusteri({...yeniMusteri, telefon: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">E-posta</label>
                  <input 
                    type="email" 
                    className="w-full border rounded-lg p-2 text-sm"
                    value={yeniMusteri.email}
                    onChange={(e) => setYeniMusteri({...yeniMusteri, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Adres</label>
                  <input 
                    type="text" 
                    className="w-full border rounded-lg p-2 text-sm"
                    value={yeniMusteri.adres}
                    onChange={(e) => setYeniMusteri({...yeniMusteri, adres: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Notlar</label>
                  <textarea 
                    className="w-full border rounded-lg p-2 text-sm h-20"
                    value={yeniMusteri.notlar}
                    onChange={(e) => setYeniMusteri({...yeniMusteri, notlar: e.target.value})}
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-2 mt-4 justify-end">
                <button 
                  className="bg-muted text-muted-foreground px-4 py-2 rounded-lg text-sm"
                  onClick={() => setShowAddForm(false)}
                >
                  İptal
                </button>
                <button 
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm"
                  onClick={handleAddMusteri}
                  disabled={loading}
                >
                  {loading ? "Ekleniyor..." : "Ekle"}
                </button>
              </div>
            </div>
          )}
          
          {/* Tabs */}
          <div className="flex border-b mb-4">
            <button 
              className={`pb-2 px-4 text-sm font-medium relative ${activeTab === "tum" ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("tum")}
            >
              Tüm Müşteriler
              {activeTab === "tum" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
            </button>
            <button 
              className={`pb-2 px-4 text-sm font-medium relative ${activeTab === "vip" ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("vip")}
            >
              VIP Müşteriler
              {activeTab === "vip" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
            </button>
            <button 
              className={`pb-2 px-4 text-sm font-medium relative ${activeTab === "regular" ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("regular")}
            >
              Düzenli Müşteriler
              {activeTab === "regular" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
            </button>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                <p className="text-muted-foreground">Müşteriler yükleniyor...</p>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50 text-left text-sm">
                  <tr>
                    <th className="px-4 py-3 font-medium">Müşteri</th>
                    <th className="px-4 py-3 font-medium">İletişim</th>
                    <th className="px-4 py-3 font-medium">Son Ziyaret</th>
                    <th className="px-4 py-3 font-medium">Puan</th>
                    <th className="px-4 py-3 font-medium text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredMusteriler.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                        Müşteri bulunamadı
                      </td>
                    </tr>
                  ) : (
                    filteredMusteriler.map((musteri) => (
                      <tr key={musteri.id} className="hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 text-primary rounded-full p-1.5">
                              <User className="size-5" />
                            </div>
                            <div>
                              <div className="font-medium">{musteri.ad_soyad}</div>
                              {musteri.adres && (
                                <div className="text-xs text-muted-foreground">{musteri.adres}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <Phone className="size-3.5 text-muted-foreground" />
                              <span>{musteri.telefon}</span>
                            </div>
                            {musteri.email && (
                              <div className="text-muted-foreground text-sm">{musteri.email}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {musteri.son_ziyaret ? new Date(musteri.son_ziyaret).toLocaleDateString('tr-TR') : 'Belirsiz'}
                        </td>
                        <td className="px-4 py-3">
                          {musteri.puan ? (
                            <div className="inline-flex items-center text-sm">
                              <span className={`
                                w-2 h-2 rounded-full mr-1.5
                                ${musteri.puan > 80 ? "bg-green-500" : musteri.puan > 50 ? "bg-yellow-500" : "bg-red-500"}
                              `}></span>
                              {musteri.puan} puan
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">Yok</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button 
                            className="text-muted-foreground hover:text-primary p-1 rounded-md transition-colors"
                            onClick={() => setSelectedMusteri(selectedMusteri === musteri.id ? null : musteri.id)}
                          >
                            <MoreHorizontal className="size-5" />
                          </button>
                          
                          {selectedMusteri === musteri.id && (
                            <div className="absolute right-8 mt-2 bg-card shadow-lg border rounded-lg p-2 w-36 z-10">
                              <button className="w-full text-left hover:bg-muted px-2 py-1.5 rounded text-sm">
                                Düzenle
                              </button>
                              <button className="w-full text-left hover:bg-muted px-2 py-1.5 rounded text-sm">
                                Detaylar
                              </button>
                              <button 
                                className="w-full text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 px-2 py-1.5 rounded text-sm"
                                onClick={() => handleDeleteMusteri(musteri.id)}
                              >
                                Sil
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 