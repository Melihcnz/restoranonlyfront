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
import { 
  BarChart3,
  CalendarDays, 
  Calendar, 
  ChevronDown, 
  Download, 
  PieChart, 
  TrendingUp, 
  Users,
  Utensils,
  Wallet,
  Loader2,
  AlertCircle
} from "lucide-react"
import { raporService } from "@/lib/services/rapor.service"

export default function Page() {
  const [activeTab, setActiveTab] = useState("satis")
  const [dateRange, setDateRange] = useState("bugun")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  // Rapor verileri
  const [satisRaporu, setSatisRaporu] = useState<any>(null)
  const [urunRaporu, setUrunRaporu] = useState<any>(null)
  const [musteriRaporu, setMusteriRaporu] = useState<any>(null)
  
  // Tarih hesaplama yardımcı fonksiyonları
  const getDateRange = () => {
    const today = new Date()
    const startDate = new Date()
    const endDate = new Date()
    
    switch (dateRange) {
      case "bugun":
        // Başlangıç ve bitiş bugün
        return {
          baslangic: today.toISOString().split('T')[0],
          bitis: today.toISOString().split('T')[0]
        }
      case "bu-hafta":
        // Haftanın başlangıcı (Pazartesi)
        startDate.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1))
        return {
          baslangic: startDate.toISOString().split('T')[0],
          bitis: today.toISOString().split('T')[0]
        }
      case "bu-ay":
        // Ayın başlangıcı
        startDate.setDate(1)
        return {
          baslangic: startDate.toISOString().split('T')[0],
          bitis: today.toISOString().split('T')[0]
        }
      case "bu-yil":
        // Yılın başlangıcı
        startDate.setMonth(0, 1)
        return {
          baslangic: startDate.toISOString().split('T')[0],
          bitis: today.toISOString().split('T')[0]
        }
      default:
        return {
          baslangic: today.toISOString().split('T')[0],
          bitis: today.toISOString().split('T')[0]
        }
    }
  }
  
  // Satış raporunu yükle
  const loadSatisRaporu = async () => {
    try {
      setLoading(true)
      setError("")
      
      const { baslangic, bitis } = getDateRange()
      
      try {
        const response = await raporService.getSatisRaporu(baslangic, bitis)
        
        if (response && response.basarili && response.veri) {
          setSatisRaporu(response.veri)
        } else {
          console.warn("Satış raporu yüklenirken uyarı: Beklenen yanıt formatı alınamadı")
          // Varsayılan boş rapor oluştur
          setSatisRaporu({
            baslangicTarihi: baslangic,
            bitisTarihi: bitis,
            ozet: {
              toplamSiparisSayisi: 0,
              toplamSiparisTutari: 0,
              toplamFaturaSayisi: 0,
              toplamFaturaTutari: 0
            },
            gunlukCiroVerileri: [],
            odemeTurleri: {}
          })
        }
      } catch (err: any) {
        console.error("Satış raporu API hatası:", err)
        
        // API hata verdiğinde boş bir rapor oluştur
        setSatisRaporu({
          baslangicTarihi: baslangic,
          bitisTarihi: bitis,
          ozet: {
            toplamSiparisSayisi: 0,
            toplamSiparisTutari: 0,
            toplamFaturaSayisi: 0,
            toplamFaturaTutari: 0
          },
          gunlukCiroVerileri: [],
          odemeTurleri: {}
        })
        
        setError("Satış raporu şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.")
      }
    } catch (err: any) {
      console.error("Satış raporu yüklenirken hata:", err)
      setError(err.message || "Satış raporu yüklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }
  
  // Ürün raporunu yükle
  const loadUrunRaporu = async () => {
    try {
      setLoading(true)
      setError("")
      
      const { baslangic, bitis } = getDateRange()
      
      try {
        const response = await raporService.getUrunRaporu(baslangic, bitis)
        
        if (response && response.basarili && response.veri) {
          setUrunRaporu(response.veri)
        } else {
          console.warn("Ürün raporu yüklenirken uyarı: Beklenen yanıt formatı alınamadı")
          // Varsayılan boş rapor oluştur
          setUrunRaporu({
            baslangicTarihi: baslangic,
            bitisTarihi: bitis,
            urunSatislari: []
          })
        }
      } catch (err: any) {
        console.error("Ürün raporu API hatası:", err)
        
        // API hata verdiğinde boş bir rapor oluştur
        setUrunRaporu({
          baslangicTarihi: baslangic,
          bitisTarihi: bitis,
          urunSatislari: []
        })
        
        setError("Ürün raporu şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.")
      }
    } catch (err: any) {
      console.error("Ürün raporu yüklenirken hata:", err)
      setError(err.message || "Ürün raporu yüklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }
  
  // Müşteri raporunu yükle
  const loadMusteriRaporu = async () => {
    try {
      setLoading(true)
      setError("")
      
      const { baslangic, bitis } = getDateRange()
      
      try {
        const response = await raporService.getMusteriRaporu(baslangic, bitis)
        
        if (response && response.basarili && response.veri) {
          setMusteriRaporu(response.veri)
        } else {
          console.warn("Müşteri raporu yüklenirken uyarı: Beklenen yanıt formatı alınamadı")
          setMusteriRaporu({
            baslangicTarihi: baslangic,
            bitisTarihi: bitis,
            musteriSatislari: []
          })
        }
      } catch (err: any) {
        console.error("Müşteri raporu API hatası:", err)
        
        // API hata verdiğinde boş bir rapor oluştur
        setMusteriRaporu({
          baslangicTarihi: baslangic,
          bitisTarihi: bitis,
          musteriSatislari: []
        })
        
        setError("Müşteri raporu şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.")
      }
    } catch (err: any) {
      console.error("Müşteri raporu yüklenirken hata:", err)
      setError(err.message || "Müşteri raporu yüklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }
  
  // Aktif taba göre raporu yükle
  useEffect(() => {
    if (activeTab === "satis") {
      loadSatisRaporu()
    } else if (activeTab === "urun") {
      loadUrunRaporu()
    } else if (activeTab === "musteri") {
      loadMusteriRaporu()
    }
  }, [activeTab, dateRange])
  
  // Tarih aralığı değiştiğinde raporu yeniden yükle
  const handleDateRangeChange = (value: string) => {
    setDateRange(value)
  }
  
  // Tab değiştiğinde ilgili raporu yükle
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  
  // Para formatı
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value)
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
                <BreadcrumbPage>Raporlar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5">
              <Calendar className="size-4 text-muted-foreground" />
              <select 
                className="bg-transparent text-sm outline-none min-w-28"
                value={dateRange}
                onChange={(e) => handleDateRangeChange(e.target.value)}
              >
                <option value="bugun">Bugün</option>
                <option value="bu-hafta">Bu Hafta</option>
                <option value="bu-ay">Bu Ay</option>
                <option value="bu-yil">Bu Yıl</option>
              </select>
            </div>
            
            <button 
              className="bg-primary/10 text-primary rounded-lg px-3 py-1.5 flex items-center gap-1 text-sm hover:bg-primary/20 transition-colors"
            >
              <Download className="size-4" />
              <span>Rapor İndir</span>
            </button>
          </div>
        </header>
        
        <div className="p-4 pt-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Raporlar</h1>
            <p className="text-muted-foreground">Satış, müşteri ve ürün raporlarını görüntüleyin ve analiz edin</p>
          </div>
          
          {/* Hata mesajı */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400 rounded-md p-3 mb-4 text-sm flex items-center gap-2">
              <AlertCircle className="size-4" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Sekme Navigasyonu */}
          <div className="border-b mb-6">
            <div className="flex">
              <button 
                className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "satis" 
                    ? "border-primary text-primary" 
                    : "border-transparent hover:border-muted-foreground/30"
                }`}
                onClick={() => handleTabChange("satis")}
              >
                <TrendingUp className="size-4" />
                <span>Satış Raporu</span>
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "musteri" 
                    ? "border-primary text-primary" 
                    : "border-transparent hover:border-muted-foreground/30"
                }`}
                onClick={() => handleTabChange("musteri")}
              >
                <Users className="size-4" />
                <span>Müşteri Raporu</span>
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "urun" 
                    ? "border-primary text-primary" 
                    : "border-transparent hover:border-muted-foreground/30"
                }`}
                onClick={() => handleTabChange("urun")}
              >
                <Utensils className="size-4" />
                <span>Ürün Raporu</span>
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Rapor yükleniyor...</p>
              </div>
            </div>
          ) : (
            <>
              {/* İstatistik Kartları - Satış Raporu */}
              {activeTab === "satis" && satisRaporu && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-card shadow-sm rounded-xl p-4 border border-border">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm font-medium mb-1">Toplam Satış</p>
                          <p className="text-2xl font-bold">{formatCurrency(satisRaporu.ozet?.toplamSiparisTutari || 0)}</p>
                        </div>
                        <div className="bg-primary/10 rounded-full p-2.5">
                          <Wallet className="text-primary h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex items-center mt-3 text-sm">
                        <div className="bg-muted h-2 flex-1 rounded-full overflow-hidden">
                          <div className="bg-primary h-2 rounded-full" style={{width: "75%"}}></div>
                        </div>
                        <span className="ml-2 text-xs text-muted-foreground">%75</span>
                      </div>
                    </div>
                    
                    <div className="bg-card shadow-sm rounded-xl p-4 border border-border">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm font-medium mb-1">Sipariş Sayısı</p>
                          <p className="text-2xl font-bold">{satisRaporu.ozet?.toplamSiparisSayisi || 0}</p>
                        </div>
                        <div className="bg-blue-500/10 rounded-full p-2.5">
                          <BarChart3 className="text-blue-500 h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex items-center mt-3 text-sm">
                        <div className="bg-muted h-2 flex-1 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: "60%"}}></div>
                        </div>
                        <span className="ml-2 text-xs text-muted-foreground">%60</span>
                      </div>
                    </div>
                    
                    <div className="bg-card shadow-sm rounded-xl p-4 border border-border">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm font-medium mb-1">Ortalama Sepet</p>
                          <p className="text-2xl font-bold">
                            {formatCurrency(
                              satisRaporu.ozet?.toplamSiparisSayisi > 0 
                                ? satisRaporu.ozet.toplamSiparisTutari / satisRaporu.ozet.toplamSiparisSayisi 
                                : 0
                            )}
                          </p>
                        </div>
                        <div className="bg-green-500/10 rounded-full p-2.5">
                          <PieChart className="text-green-500 h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex items-center mt-3 text-sm">
                        <div className="bg-muted h-2 flex-1 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: "40%"}}></div>
                        </div>
                        <span className="ml-2 text-xs text-muted-foreground">%40</span>
                      </div>
                    </div>
                    
                    <div className="bg-card shadow-sm rounded-xl p-4 border border-border">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm font-medium mb-1">Fatura Sayısı</p>
                          <p className="text-2xl font-bold">{satisRaporu.ozet?.toplamFaturaSayisi || 0}</p>
                        </div>
                        <div className="bg-purple-500/10 rounded-full p-2.5">
                          <Users className="text-purple-500 h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex items-center mt-3 text-sm">
                        <div className="bg-muted h-2 flex-1 rounded-full overflow-hidden">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: "65%"}}></div>
                        </div>
                        <span className="ml-2 text-xs text-muted-foreground">%65</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Grafik Alanı - Satış Trendi */}
                  <div className="bg-card shadow-sm rounded-xl border border-border p-4 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="font-bold text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <span>Satış Trendi</span>
                      </h2>
                      <div className="flex gap-2">
                        <button className="bg-muted px-3 py-1 rounded-md text-sm">Günlük</button>
                        <button className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">Haftalık</button>
                        <button className="bg-muted px-3 py-1 rounded-md text-sm">Aylık</button>
                      </div>
                    </div>
                    
                    {/* Grafik Placeholder - Gerçek projede chart kütüphanesi kullanabilirsiniz */}
                    <div className="h-64 w-full bg-muted/30 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <p className="font-medium text-primary mb-2">Satış Grafiği</p>
                        <p className="text-muted-foreground text-sm">Bu alanda gerçek bir grafik görüntülenecektir</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tablo Alanı - Günlük Satış Raporu */}
                  <div className="bg-card shadow-sm rounded-xl border border-border overflow-hidden">
                    <div className="p-4 border-b">
                      <h2 className="font-bold text-lg flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-primary" />
                        <span>Günlük Satış Raporu</span>
                      </h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tarih</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Sipariş Sayısı</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Ciro</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Ort. Sepet</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {satisRaporu.gunlukCiroVerileri && satisRaporu.gunlukCiroVerileri.length > 0 ? (
                            satisRaporu.gunlukCiroVerileri.map((item: any, index: number) => (
                              <tr key={index} className="hover:bg-muted/30">
                                <td className="px-4 py-3 text-sm">{new Date(item.tarih).toLocaleDateString('tr-TR')}</td>
                                <td className="px-4 py-3 text-sm">-</td>
                                <td className="px-4 py-3 text-sm font-medium">{formatCurrency(item.ciro)}</td>
                                <td className="px-4 py-3 text-sm">-</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                                Bu tarih aralığında satış verisi bulunamadı
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* Müşteri Raporu */}
              {activeTab === "musteri" && musteriRaporu && (
                <>
                  <div className="bg-card shadow-sm rounded-xl border border-border overflow-hidden mb-6">
                    <div className="p-4 border-b">
                      <h2 className="font-bold text-lg flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span>Müşteri Harcama Raporu</span>
                      </h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Müşteri</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Telefon</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Sipariş Sayısı</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Toplam Harcama</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Ort. Harcama</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {musteriRaporu.musteriSatislari && musteriRaporu.musteriSatislari.length > 0 ? (
                            musteriRaporu.musteriSatislari.map((musteri: any, index: number) => (
                              <tr key={index} className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-medium">{musteri.musteriAdi}</td>
                                <td className="px-4 py-3 text-sm">{musteri.musteriTelefon}</td>
                                <td className="px-4 py-3 text-sm">{musteri.siparisSayisi}</td>
                                <td className="px-4 py-3 text-sm font-medium">{formatCurrency(musteri.toplamHarcama)}</td>
                                <td className="px-4 py-3 text-sm">{formatCurrency(musteri.ortalamaHarcama)}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                                Bu tarih aralığında müşteri verisi bulunamadı
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
              
              {/* Ürün Raporu */}
              {activeTab === "urun" && urunRaporu && (
                <>
                  <div className="bg-card shadow-sm rounded-xl border border-border overflow-hidden mb-6">
                    <div className="p-4 border-b">
                      <h2 className="font-bold text-lg flex items-center gap-2">
                        <Utensils className="h-5 w-5 text-primary" />
                        <span>Ürün Satış Raporu</span>
                      </h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Ürün</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Kategori</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Satış Adedi</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Toplam Tutar</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {urunRaporu.urunSatislari && urunRaporu.urunSatislari.length > 0 ? (
                            urunRaporu.urunSatislari.map((urun: any, index: number) => (
                              <tr key={index} className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-medium">{urun.urunAdi}</td>
                                <td className="px-4 py-3 text-sm">{urun.kategoriAdi || "Kategorisiz"}</td>
                                <td className="px-4 py-3 text-sm">{urun.toplamMiktar}</td>
                                <td className="px-4 py-3 text-sm font-medium">{formatCurrency(urun.toplamTutar)}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                                Bu tarih aralığında ürün satış verisi bulunamadı
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 