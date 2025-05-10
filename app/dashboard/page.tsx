"use client"

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
import { ArrowDown, ArrowUp, Coffee, Utensils, DollarSign, Users, Table, Armchair } from "lucide-react"

export default function Page() {
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
                <BreadcrumbPage>Anasayfa</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="ml-auto flex items-center gap-3">
            <div className="text-sm">
              <span className="text-muted-foreground">Bugün:</span> {new Date().toLocaleDateString('tr-TR', {day: 'numeric', month: 'long', year: 'numeric'})}
            </div>
          </div>
        </header>

        <div className="p-4 pt-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Hoş Geldiniz</h1>
            <p className="text-muted-foreground">Restoran yönetim sistemi kontrol paneli</p>
          </div>
          
          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-card shadow-sm rounded-xl p-4 border border-border hover:shadow-md transition-all">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-1">Günlük Ciro</p>
                  <p className="text-2xl font-bold">₺4,580</p>
                </div>
                <div className="bg-primary/10 rounded-full p-2.5">
                  <DollarSign className="text-primary h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm">
                <ArrowUp className="h-3.5 w-3.5 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+12.5%</span>
                <span className="text-muted-foreground ml-1.5">geçen haftaya göre</span>
              </div>
            </div>
            
            <div className="bg-card shadow-sm rounded-xl p-4 border border-border hover:shadow-md transition-all">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-1">Müşteri Sayısı</p>
                  <p className="text-2xl font-bold">32</p>
                </div>
                <div className="bg-blue-500/10 rounded-full p-2.5">
                  <Users className="text-blue-500 h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm">
                <ArrowDown className="h-3.5 w-3.5 text-red-500 mr-1" />
                <span className="text-red-500 font-medium">-3.2%</span>
                <span className="text-muted-foreground ml-1.5">geçen haftaya göre</span>
              </div>
            </div>
            
            <div className="bg-card shadow-sm rounded-xl p-4 border border-border hover:shadow-md transition-all">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-1">Ortalama Sipariş</p>
                  <p className="text-2xl font-bold">₺143</p>
                </div>
                <div className="bg-yellow-500/10 rounded-full p-2.5">
                  <Coffee className="text-yellow-500 h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm">
                <ArrowUp className="h-3.5 w-3.5 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+5.3%</span>
                <span className="text-muted-foreground ml-1.5">geçen haftaya göre</span>
              </div>
            </div>
            
            <div className="bg-card shadow-sm rounded-xl p-4 border border-border hover:shadow-md transition-all">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-1">Masa Doluluk</p>
                  <p className="text-2xl font-bold">%35</p>
                </div>
                <div className="bg-green-500/10 rounded-full p-2.5">
                  <Armchair className="text-green-500 h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm">
                <ArrowUp className="h-3.5 w-3.5 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+2.1%</span>
                <span className="text-muted-foreground ml-1.5">geçen haftaya göre</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Aktif Siparişler */}
            <div className="bg-card shadow-sm rounded-xl border border-border lg:col-span-2">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Coffee className="h-5 w-5" />
                  <span>Aktif Siparişler</span>
                </h2>
                <a href="/dashboard/siparisler" className="text-sm text-primary hover:underline">Tüm Siparişler</a>
              </div>
              
              <div className="px-4 divide-y divide-border">
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Masa 5</h3>
                    <p className="text-sm text-muted-foreground">3 ürün • 16:30</p>
                  </div>
                  <div className="font-medium">₺325</div>
                </div>
                
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Masa 8</h3>
                    <p className="text-sm text-muted-foreground">5 ürün • 17:15</p>
                  </div>
                  <div className="font-medium">₺520</div>
                </div>
                
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Masa 12</h3>
                    <p className="text-sm text-muted-foreground">2 ürün • 17:45</p>
                  </div>
                  <div className="font-medium">₺180</div>
                </div>
              </div>
              
              <div className="p-4 border-t">
                <button className="bg-primary text-primary-foreground w-full py-2 rounded-md text-sm font-medium 
                  flex items-center justify-center gap-1.5 shadow hover:shadow-md transition-all">
                  <Coffee className="size-4" />
                  <span>Yeni Sipariş Oluştur</span>
                </button>
              </div>
            </div>

            {/* Masalar Özeti */}
            <div className="bg-card shadow-sm rounded-xl border border-border">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Table className="h-5 w-5" />
                  <span>Masa Durumu</span>
                </h2>
                <a href="/dashboard/masalar" className="text-sm text-primary hover:underline">Tüm Masalar</a>
              </div>
              
              <div className="p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Toplam Masa</span>
                    <span className="font-medium">20</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dolu Masalar</span>
                    <span className="text-red-600 font-medium">3</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Boş Masalar</span>
                    <span className="text-green-600 font-medium">17</span>
                  </div>
                  
                  <div className="h-2.5 bg-muted rounded-full mt-2">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">%15 Doluluk Oranı</p>
                </div>
                
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium ${
                        i < 3 ? "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400" : "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400"
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t">
                <button className="bg-primary/10 text-primary w-full py-2 rounded-md text-sm font-medium 
                  flex items-center justify-center gap-1.5 hover:bg-primary/20 transition-all">
                  <Table className="size-4" />
                  <span>Masa Yönetimine Git</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* En Popüler Ürünler */}
          <div className="bg-card shadow-sm rounded-xl border border-border">
            <div className="p-4 border-b">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                <span>En Popüler Ürünler</span>
              </h2>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-muted/40 rounded-lg p-3 text-center">
                  <div className="h-16 w-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                    <Coffee className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="font-medium">Karışık Pizza</h3>
                  <p className="text-sm text-muted-foreground">124 sipariş</p>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-3 text-center">
                  <div className="h-16 w-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-2">
                    <Utensils className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-medium">Izgara Köfte</h3>
                  <p className="text-sm text-muted-foreground">98 sipariş</p>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-3 text-center">
                  <div className="h-16 w-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Utensils className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-medium">Mantı</h3>
                  <p className="text-sm text-muted-foreground">86 sipariş</p>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-3 text-center">
                  <div className="h-16 w-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <Coffee className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-medium">Su Böreği</h3>
                  <p className="text-sm text-muted-foreground">72 sipariş</p>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-3 text-center">
                  <div className="h-16 w-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <Coffee className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-medium">Künefe</h3>
                  <p className="text-sm text-muted-foreground">65 sipariş</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
