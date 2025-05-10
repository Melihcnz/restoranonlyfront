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
import { 
  CalendarRange, 
  Plus, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Table, 
  Clock, 
  Users, 
  Phone, 
  CheckCircle,
  XCircle,
  Filter
} from "lucide-react"

export default function Page() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<"günlük" | "haftalık" | "aylık">("günlük")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Rezervasyon durumları
  const statusColors = {
    onaylandi: "bg-green-100 text-green-700 border-green-200",
    beklemede: "bg-yellow-100 text-yellow-700 border-yellow-200",
    iptal: "bg-red-100 text-red-700 border-red-200",
  }
  
  // Örnek rezervasyon verileri
  const reservations = [
    {
      id: 1,
      musteriAdi: "Ahmet Yılmaz",
      telefon: "0532 123 4567",
      tarih: "2023-08-15",
      saat: "19:30",
      kisiSayisi: 4,
      masaNo: 8,
      durum: "onaylandi",
      notlar: "Pencere kenarı tercih ediliyor"
    },
    {
      id: 2,
      musteriAdi: "Ayşe Demir",
      telefon: "0533 456 7890",
      tarih: "2023-08-15",
      saat: "20:00",
      kisiSayisi: 2,
      masaNo: 5,
      durum: "onaylandi",
      notlar: ""
    },
    {
      id: 3,
      musteriAdi: "Mehmet Kaya",
      telefon: "0535 789 0123",
      tarih: "2023-08-15",
      saat: "18:45",
      kisiSayisi: 6,
      masaNo: 12,
      durum: "beklemede",
      notlar: "Doğum günü kutlaması"
    },
    {
      id: 4,
      musteriAdi: "Zeynep Çelik",
      telefon: "0536 012 3456",
      tarih: "2023-08-15",
      saat: "21:15",
      kisiSayisi: 3,
      masaNo: 7,
      durum: "iptal",
      notlar: ""
    },
    {
      id: 5,
      musteriAdi: "Mustafa Şahin",
      telefon: "0537 345 6789",
      tarih: "2023-08-16",
      saat: "19:00",
      kisiSayisi: 5,
      masaNo: 10,
      durum: "onaylandi",
      notlar: "Alerjisi var: fıstık"
    },
  ]
  
  // Bugünkü rezervasyonlar
  const todayReservations = reservations.filter(res => res.tarih === "2023-08-15")
  
  // Tarih formatını düzenleyen fonksiyon
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }
  
  // Gün değiştirme fonksiyonları
  const goToPreviousDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }
  
  const goToNextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
  }
  
  // Zaman dilimleri
  const timeSlots = Array.from({ length: 15 }, (_, i) => {
    const hour = Math.floor(i / 2) + 12 // 12:00'den başla
    const minute = (i % 2) * 30
    return `${hour}:${minute === 0 ? '00' : minute}`
  })

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
                <BreadcrumbPage>Rezervasyonlar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Müşteri ara..."
                className="pl-9 pr-4 py-1.5 rounded-lg border text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
            
            <button 
              className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="size-4" />
              <span>Yeni Rezervasyon</span>
            </button>
          </div>
        </header>
        
        <div className="p-4 pt-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Rezervasyonlar</h1>
            <p className="text-muted-foreground">Rezervasyonları görüntüleyin ve yönetin</p>
          </div>
          
          {/* Takvim Navigasyonu */}
          <div className="flex justify-between items-center mb-6 bg-card shadow-sm rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <button 
                className="p-1.5 rounded-md hover:bg-muted transition-colors"
                onClick={goToPreviousDay}
              >
                <ChevronLeft className="size-5" />
              </button>
              
              <h2 className="text-lg font-medium">
                {formatDate(currentDate)}
              </h2>
              
              <button 
                className="p-1.5 rounded-md hover:bg-muted transition-colors"
                onClick={goToNextDay}
              >
                <ChevronRight className="size-5" />
              </button>
              
              <button className="ml-2 bg-primary/10 text-primary px-3 py-1 rounded-md text-sm">
                Bugün
              </button>
            </div>
            
            <div className="flex border rounded-lg overflow-hidden">
              <button 
                className={`px-3 py-1.5 text-sm ${viewMode === "günlük" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}
                onClick={() => setViewMode("günlük")}
              >
                Günlük
              </button>
              <button 
                className={`px-3 py-1.5 text-sm ${viewMode === "haftalık" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}
                onClick={() => setViewMode("haftalık")}
              >
                Haftalık
              </button>
              <button 
                className={`px-3 py-1.5 text-sm ${viewMode === "aylık" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}
                onClick={() => setViewMode("aylık")}
              >
                Aylık
              </button>
            </div>
          </div>
          
          {/* Günlük Görünüm */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Zaman Çizelgesi */}
            <div className="lg:col-span-2 bg-card shadow-sm rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Günlük Program</span>
                </h2>
              </div>
              
              <div className="p-4">
                <div className="relative min-h-96">
                  {/* Zaman dilimleri */}
                  {timeSlots.map((time, index) => (
                    <div key={index} className="absolute w-full" style={{ top: `${index * 40}px` }}>
                      <div className="flex items-center">
                        <div className="text-xs text-muted-foreground w-12">{time}</div>
                        <div className="flex-1 border-t border-dashed border-border h-0 ml-2"></div>
                      </div>
                      
                      {/* Rezervasyonlar */}
                      {todayReservations
                        .filter(res => res.saat === time)
                        .map(reservation => (
                          <div 
                            key={reservation.id}
                            className={`absolute left-16 right-0 ml-2 p-2 rounded-md border ${statusColors[reservation.durum as keyof typeof statusColors]} shadow-sm`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{reservation.musteriAdi}</p>
                                <div className="flex items-center gap-4 text-xs mt-1">
                                  <span className="flex items-center gap-1">
                                    <Clock className="size-3" />
                                    {reservation.saat}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Users className="size-3" />
                                    {reservation.kisiSayisi} kişi
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Table className="size-3" />
                                    Masa {reservation.masaNo}
                                  </span>
                                </div>
                              </div>
                              
                              <div className={`text-xs px-2 py-0.5 rounded-full ${
                                reservation.durum === "onaylandi" ? "bg-green-100 text-green-700" :
                                reservation.durum === "beklemede" ? "bg-yellow-100 text-yellow-700" :
                                "bg-red-100 text-red-700"
                              }`}>
                                {reservation.durum === "onaylandi" ? "Onaylandı" :
                                 reservation.durum === "beklemede" ? "Beklemede" : "İptal"}
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Bugünkü Rezervasyonlar */}
            <div className="bg-card shadow-sm rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <CalendarRange className="h-5 w-5 text-primary" />
                  <span>Bugünkü Rezervasyonlar</span>
                </h2>
                <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                  <Filter className="size-4 text-muted-foreground" />
                </button>
              </div>
              
              <div className="divide-y divide-border">
                {todayReservations.length > 0 ? (
                  todayReservations.map(reservation => (
                    <div key={reservation.id} className="p-3 hover:bg-muted/20 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{reservation.musteriAdi}</h3>
                          <div className="flex items-center gap-4 text-xs mt-1 text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="size-3" />
                              {reservation.saat}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="size-3" />
                              {reservation.kisiSayisi} kişi
                            </span>
                            <span className="flex items-center gap-1">
                              <Table className="size-3" />
                              Masa {reservation.masaNo}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <Phone className="size-3" />
                            {reservation.telefon}
                          </div>
                        </div>
                        
                        <div className="flex gap-1">
                          {reservation.durum === "beklemede" && (
                            <>
                              <button className="p-1 rounded-md text-green-500 hover:bg-green-50">
                                <CheckCircle className="size-4" />
                              </button>
                              <button className="p-1 rounded-md text-red-500 hover:bg-red-50">
                                <XCircle className="size-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {reservation.notlar && (
                        <div className="mt-2 text-xs bg-muted/30 p-2 rounded-md">
                          {reservation.notlar}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">Bugün için rezervasyon bulunmuyor</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 