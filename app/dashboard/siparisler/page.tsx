"use client"

import { useState } from "react"
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
import { ArrowUpDown, Calendar, Check, ChevronDown, Filter, Search, Timer, X } from "lucide-react"

export default function Page() {
  const [activeTab, setActiveTab] = useState("aktif")
  const [filterOpen, setFilterOpen] = useState(false)
  
  const aktifSiparisler = [
    { 
      id: 1, 
      masa: "Masa 2", 
      zaman: "15:30", 
      tutar: 325, 
      urunler: [
        { id: 1, ad: "Karışık Pizza", adet: 1, fiyat: 120 },
        { id: 2, ad: "Cola", adet: 2, fiyat: 15 },
        { id: 3, ad: "Izgara Köfte", adet: 1, fiyat: 175 }
      ],
      durumu: "hazırlanıyor"
    },
    { 
      id: 2, 
      masa: "Masa 5", 
      zaman: "16:15", 
      tutar: 780, 
      urunler: [
        { id: 1, ad: "Karışık Izgara", adet: 2, fiyat: 250 },
        { id: 2, ad: "Ayran", adet: 3, fiyat: 10 },
        { id: 3, ad: "Salata", adet: 1, fiyat: 50 },
        { id: 4, ad: "Künefe", adet: 2, fiyat: 100 },
      ],
      durumu: "servis edildi"
    },
    { 
      id: 3, 
      masa: "Masa 8", 
      zaman: "16:45", 
      tutar: 190, 
      urunler: [
        { id: 1, ad: "Etli Pide", adet: 1, fiyat: 120 },
        { id: 2, ad: "Ayran", adet: 2, fiyat: 10 },
        { id: 3, ad: "Baklava", adet: 1, fiyat: 50 }
      ],
      durumu: "hazırlanıyor"
    }
  ]
  
  const tamamlananSiparisler = [
    { 
      id: 4, 
      masa: "Masa 1", 
      zaman: "14:00", 
      tutar: 450, 
      urunler: 5, 
      durumu: "tamamlandı",
      odeme: "kredi kartı" 
    },
    { 
      id: 5, 
      masa: "Masa 3", 
      zaman: "14:45", 
      tutar: 210, 
      urunler: 2, 
      durumu: "tamamlandı",
      odeme: "nakit" 
    },
    { 
      id: 6, 
      masa: "Masa 6", 
      zaman: "15:30", 
      tutar: 380, 
      urunler: 4, 
      durumu: "tamamlandı",
      odeme: "kredi kartı" 
    },
    { 
      id: 7, 
      masa: "Masa 9", 
      zaman: "16:15", 
      tutar: 295, 
      urunler: 3, 
      durumu: "tamamlandı", 
      odeme: "nakit"
    }
  ]
  
  const siparisDetay = (siparis: any) => {
    return (
      <div className="bg-muted/30 p-3 rounded-lg mt-2 space-y-2">
        {siparis.urunler.map((urun: any) => (
          <div key={urun.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded text-xs">{urun.adet}x</span>
              <span>{urun.ad}</span>
            </div>
            <div className="font-medium">₺{urun.fiyat * urun.adet}</div>
          </div>
        ))}
        <div className="border-t pt-2 flex justify-between">
          <span className="font-medium">Toplam</span>
          <span className="font-bold">₺{siparis.tutar}</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm flex-1 flex justify-center items-center gap-1">
            <Check className="size-4" />
            <span>Tamamlandı</span>
          </button>
          <button className="bg-red-500 text-white px-2 py-1 rounded text-sm flex-1 flex justify-center items-center gap-1">
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
          </div>
        </header>
        
        {filterOpen && (
          <div className="px-4 py-2 border-b flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-1 text-sm border rounded-lg px-2 py-1">
              <Calendar className="size-4" />
              <span>Bugün</span>
              <ChevronDown className="size-4" />
            </div>
            <div className="flex items-center gap-1 text-sm border rounded-lg px-2 py-1">
              <ArrowUpDown className="size-4" />
              <span>Sırala: En Yeni</span>
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
        
        <div className="border-b">
          <div className="flex px-4">
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "aktif" 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
              onClick={() => setActiveTab("aktif")}
            >
              Aktif Siparişler
              <span className="ml-1.5 bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-xs">
                {aktifSiparisler.length}
              </span>
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "tamamlanan" 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
              onClick={() => setActiveTab("tamamlanan")}
            >
              Tamamlanan Siparişler
              <span className="ml-1.5 bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-xs">
                {tamamlananSiparisler.length}
              </span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-1 flex-col p-4 pt-3 overflow-auto">
          {activeTab === "aktif" ? (
            <div className="space-y-4">
              {aktifSiparisler.map(siparis => (
                <div key={siparis.id} className="bg-card rounded-xl p-4 border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium flex items-center">
                        {siparis.masa}
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                          siparis.durumu === "hazırlanıyor" 
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }`}>
                          {siparis.durumu === "hazırlanıyor" ? "Hazırlanıyor" : "Servis Edildi"}
                        </span>
                      </h3>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Timer className="size-3.5 mr-1" />
                        {siparis.zaman} • {siparis.urunler.length} ürün
                      </div>
                    </div>
                    <div className="text-lg font-bold">₺{siparis.tutar}</div>
                  </div>
                  
                  {siparisDetay(siparis)}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {tamamlananSiparisler.map(siparis => (
                <div key={siparis.id} className="bg-card rounded-xl p-4 border hover:border-primary/50 cursor-pointer transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{siparis.masa}</h3>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Timer className="size-3.5 mr-1" />
                        {siparis.zaman} • {siparis.urunler} ürün
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="text-lg font-bold">₺{siparis.tutar}</div>
                      <div className="text-xs text-muted-foreground capitalize">{siparis.odeme}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 