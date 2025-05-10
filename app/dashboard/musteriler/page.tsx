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
import { Calendar, ChevronDown, Filter, MoreHorizontal, Phone, Plus, Search, User } from "lucide-react"

export default function Page() {
  const [activeTab, setActiveTab] = useState("tum")
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedMusteri, setSelectedMusteri] = useState<number | null>(null)
  
  const musteriler = [
    { 
      id: 1, 
      ad: "Ahmet Yılmaz", 
      telefon: "0532 123 4567", 
      email: "ahmet.yilmaz@example.com",
      sonZiyaret: "25.04.2023", 
      toplamZiyaret: 8,
      toplamHarcama: 1250,
      tercihler: ["Köşe Masa", "Az Baharatlı"],
      favoriSiparisler: ["Karışık Pizza", "Ayran"]
    },
    { 
      id: 2, 
      ad: "Ayşe Demir", 
      telefon: "0533 765 4321", 
      email: "ayse.demir@example.com",
      sonZiyaret: "27.04.2023", 
      toplamZiyaret: 5,
      toplamHarcama: 850,
      tercihler: ["Pencere Kenarı", "Tatlı Yok"],
      favoriSiparisler: ["Izgara Köfte", "Mantı"]
    },
    { 
      id: 3, 
      ad: "Mehmet Kaya", 
      telefon: "0534 987 6543", 
      email: "mehmet.kaya@example.com",
      sonZiyaret: "28.04.2023", 
      toplamZiyaret: 12,
      toplamHarcama: 2100,
      tercihler: ["VIP Masa", "Extra Baharatlı"],
      favoriSiparisler: ["Karışık Izgara", "Künefe"]
    },
    { 
      id: 4, 
      ad: "Zeynep Öz", 
      telefon: "0535 456 7890", 
      email: "zeynep.oz@example.com",
      sonZiyaret: "29.04.2023", 
      toplamZiyaret: 3,
      toplamHarcama: 450,
      tercihler: ["Bahçe", "Vejetaryen"],
      favoriSiparisler: ["Sebzeli Pizza", "Meyveli Soda"]
    },
    { 
      id: 5, 
      ad: "Ali Yıldız", 
      telefon: "0536 789 1234", 
      email: "ali.yildiz@example.com",
      sonZiyaret: "30.04.2023", 
      toplamZiyaret: 7,
      toplamHarcama: 1680,
      tercihler: ["Gürültüden Uzak", "Şekerli İçecek Yok"],
      favoriSiparisler: ["Etli Pide", "Şalgam"]
    }
  ]
  
  const filteredMusteriler = activeTab === "tum" 
    ? musteriler 
    : activeTab === "vip" 
    ? musteriler.filter(m => m.toplamHarcama > 1500) 
    : musteriler.filter(m => m.toplamZiyaret > 5)

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
            
            <button className="bg-primary text-primary-foreground rounded-lg px-3 py-1.5 flex items-center gap-1 text-sm">
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
        
        <div className="border-b">
          <div className="flex px-4">
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "tum" 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
              onClick={() => setActiveTab("tum")}
            >
              Tüm Müşteriler
              <span className="ml-1.5 bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-xs">
                {musteriler.length}
              </span>
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "vip" 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
              onClick={() => setActiveTab("vip")}
            >
              VIP Müşteriler
              <span className="ml-1.5 bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-xs">
                {musteriler.filter(m => m.toplamHarcama > 1500).length}
              </span>
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "regular" 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
              onClick={() => setActiveTab("regular")}
            >
              Düzenli Müşteriler
              <span className="ml-1.5 bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-xs">
                {musteriler.filter(m => m.toplamZiyaret > 5).length}
              </span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-1 flex-col p-4 pt-3 overflow-auto">
          <div className="space-y-4">
            {filteredMusteriler.map(musteri => (
              <div 
                key={musteri.id} 
                className={`bg-card rounded-xl p-4 border transition-all ${
                  selectedMusteri === musteri.id 
                    ? "ring-2 ring-primary"
                    : "hover:border-primary/20"
                }`}
                onClick={() => setSelectedMusteri(musteri.id === selectedMusteri ? null : musteri.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="bg-primary/10 text-primary size-12 rounded-full flex items-center justify-center">
                      <User className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">{musteri.ad}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Phone className="size-3.5 mr-1" />
                        {musteri.telefon}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-sm">Son ziyaret: {musteri.sonZiyaret}</div>
                    <div className="flex items-center gap-2">
                      <button className="text-primary hover:bg-primary/10 p-1 rounded">
                        <Phone className="size-4" />
                      </button>
                      <button className="text-muted-foreground hover:bg-muted p-1 rounded">
                        <MoreHorizontal className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {selectedMusteri === musteri.id && (
                  <div className="mt-4 pt-3 border-t grid gap-3 grid-cols-1 md:grid-cols-2">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">İletişim Bilgileri</div>
                      <div className="text-sm">
                        <div>Email: {musteri.email}</div>
                        <div>Telefon: {musteri.telefon}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">İstatistikler</div>
                      <div className="text-sm">
                        <div>Toplam Ziyaret: {musteri.toplamZiyaret}</div>
                        <div>Toplam Harcama: ₺{musteri.toplamHarcama}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Tercihler</div>
                      <div className="flex flex-wrap gap-1">
                        {musteri.tercihler.map((tercih, i) => (
                          <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded">
                            {tercih}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Favori Siparişler</div>
                      <div className="flex flex-wrap gap-1">
                        {musteri.favoriSiparisler.map((siparis, i) => (
                          <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded">
                            {siparis}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2 mt-2 flex justify-end gap-2">
                      <button className="bg-muted text-muted-foreground px-3 py-1.5 rounded text-sm">
                        Düzenle
                      </button>
                      <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded text-sm">
                        Sipariş Geçmişi
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 