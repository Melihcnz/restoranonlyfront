"use client"

import { useEffect, useState } from "react"
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
import { Circle, Coffee, CreditCard, DollarSign, FolderPlus, Table, Timer, Users, X, AlertCircle } from "lucide-react"
import { Masa, masaService } from "@/lib/services/masa.service"

export default function Page() {
  const [selectedMasa, setSelectedMasa] = useState<number | null>(null)
  const [hoveredMasa, setHoveredMasa] = useState<number | null>(null)
  const [masalar, setMasalar] = useState<Masa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  // Masaları API'den yükle
  useEffect(() => {
    const fetchMasalar = async () => {
      try {
        setLoading(true)
        const data = await masaService.getAllMasalar()
        setMasalar(data)
        setError("")
      } catch (err: any) {
        console.error("Masalar yüklenirken hata:", err)
        setError("Masalar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.")
      } finally {
        setLoading(false)
      }
    }
    
    fetchMasalar()
  }, [])
  
  // Masa durumunu güncelle
  const handleUpdateMasaDurum = async (masaId: number, durum: "boş" | "dolu") => {
    try {
      await masaService.updateMasaDurum(masaId, durum)
      
      // Masa listesini güncelle
      setMasalar(masalar.map(masa => 
        masa.id === masaId ? { ...masa, durum } : masa
      ))
      
      // Seçimi temizle
      setSelectedMasa(null)
    } catch (err: any) {
      console.error("Masa durumu güncellenirken hata:", err)
      setError("Masa durumu güncellenirken bir hata oluştu.")
    }
  }
  
  // Boş ve dolu masaları hesapla
  const bosMasalar = masalar.filter(masa => masa.durum === "boş").length
  const doluMasalar = masalar.filter(masa => masa.durum === "dolu").length

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
                <BreadcrumbPage>Masalar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="ml-auto flex gap-3">
            <div className="flex items-center text-sm">
              <Circle className="size-3 fill-green-500 text-green-500 mr-1.5" /> 
              <span>Boş: {bosMasalar}</span>
            </div>
            <div className="flex items-center text-sm">
              <Circle className="size-3 fill-red-500 text-red-500 mr-1.5" /> 
              <span>Dolu: {doluMasalar}</span>
            </div>
            <button 
              className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
              onClick={() => {
                // Yeni masa ekleme işlemi (modal açılabilir)
              }}
            >
              <FolderPlus className="size-4" />
              <span>Yeni Masa Ekle</span>
            </button>
          </div>
        </header>
        
        <div className="p-4 pt-2">
          <h1 className="text-3xl font-bold mb-1">Masalar</h1>
          <p className="text-muted-foreground mb-4">Restoran masalarını görüntüleyin ve yönetin</p>
          
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400 rounded-md p-3 mb-4 text-sm flex items-center gap-2">
              <AlertCircle className="size-4" />
              <span>{error}</span>
            </div>
          )}
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                <p className="text-muted-foreground">Masalar yükleniyor...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {masalar.map((masa) => (
                <div 
                  key={masa.id}
                  className={`
                    border-2 rounded-xl overflow-hidden cursor-pointer relative
                    transition-all duration-300 ease-out
                    shadow-sm hover:shadow-lg z-10
                    ${hoveredMasa === masa.id ? 'scale-105 z-20' : ''}
                    ${selectedMasa === masa.id ? "ring-2 ring-primary" : ""}
                    ${masa.durum === "dolu" 
                      ? "border-red-500 bg-red-50 dark:bg-red-950/30" 
                      : "border-green-500 bg-green-50 dark:bg-green-950/30"}
                  `}
                  onClick={() => setSelectedMasa(masa.id === selectedMasa ? null : masa.id)}
                  onMouseEnter={() => setHoveredMasa(masa.id)}
                  onMouseLeave={() => setHoveredMasa(null)}
                  style={{
                    transform: hoveredMasa === masa.id ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  }}
                >
                  <div className="flex justify-between items-center p-2 border-b relative overflow-hidden">
                    {hoveredMasa === masa.id && (
                      <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
                    )}
                    <h2 className="text-xl font-bold relative z-10">Masa {masa.masa_no}</h2>
                    <div className={`
                      flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium
                      ${masa.durum === "dolu" 
                        ? "bg-red-100 text-red-700 dark:bg-red-900/70 dark:text-red-300" 
                        : "bg-green-100 text-green-700 dark:bg-green-900/70 dark:text-green-300"}
                      relative z-10
                    `}>
                      <Circle className={`size-2 ${masa.durum === "dolu" ? "fill-red-500" : "fill-green-500"}`} />
                      {masa.durum === "dolu" ? "dolu" : "boş"}
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <div className="flex items-center gap-1 mb-1.5">
                      <Users className="size-4 text-muted-foreground" />
                      <span className="text-sm">Kapasite: {masa.kapasite} kişi</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Table className="size-4 text-muted-foreground" />
                      <span className="text-sm">Konum: {masa.konum}</span>
                    </div>
                  </div>
                  
                  {/* Boş Masa İşlemleri */}
                  {masa.durum === "boş" && selectedMasa === masa.id && (
                    <div className="p-3 border-t bg-background flex flex-col gap-2">
                      <button className="bg-primary text-primary-foreground w-full py-2 rounded-md text-sm font-medium 
                        flex items-center justify-center gap-1.5 shadow hover:shadow-md transition-all
                        hover:bg-primary/90 active:scale-95"
                        onClick={() => handleUpdateMasaDurum(masa.id, "dolu")}
                      >
                        <Coffee className="size-4" />
                        <span>Sipariş Aç</span>
                      </button>
                      <button className="bg-muted text-muted-foreground w-full py-2 rounded-md text-sm 
                        flex items-center justify-center gap-1.5 hover:bg-muted/80 transition-all active:scale-95"
                        onClick={() => setSelectedMasa(null)}
                      >
                        <X className="size-4" />
                        <span>İptal</span>
                      </button>
                    </div>
                  )}
                  
                  {/* Dolu Masa İşlemleri */}
                  {masa.durum === "dolu" && selectedMasa === masa.id && (
                    <div className="p-3 border-t bg-background flex flex-col gap-2">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Timer className="size-3.5" />
                          <span>{new Date(masa.olusturma_tarihi).toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}</span>
                        </div>
                        {/* Toplam tutarı göster - bu veriyi API'den alacaksınız */}
                        <div className="flex items-center gap-1 font-medium">
                          <DollarSign className="size-3.5" />
                          <span>₺--</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-primary text-primary-foreground py-2 rounded-md text-sm flex-1
                          flex items-center justify-center gap-1.5 shadow hover:shadow-md transition-all
                          hover:bg-primary/90 active:scale-95">
                          <Coffee className="size-4" />
                          <span>Sipariş Detayı</span>
                        </button>
                      </div>
                      <button 
                        className="bg-red-500 text-white py-2 rounded-md text-sm 
                          flex items-center justify-center gap-1.5 shadow hover:shadow-md transition-all
                          hover:bg-red-600 active:scale-95"
                        onClick={() => handleUpdateMasaDurum(masa.id, "boş")}
                      >
                        <CreditCard className="size-4" />
                        <span>Hesap Al</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 