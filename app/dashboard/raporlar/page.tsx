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
  BarChart3,
  CalendarDays, 
  Calendar, 
  ChevronDown, 
  Download, 
  PieChart, 
  TrendingUp, 
  Users,
  Utensils,
  Wallet
} from "lucide-react"

export default function Page() {
  const [activeTab, setActiveTab] = useState("satis")
  const [dateRange, setDateRange] = useState("bu-hafta")

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
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="bugun">Bugün</option>
                <option value="bu-hafta">Bu Hafta</option>
                <option value="bu-ay">Bu Ay</option>
                <option value="bu-yil">Bu Yıl</option>
                <option value="ozel">Özel Tarih Aralığı</option>
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
          
          {/* Sekme Navigasyonu */}
          <div className="border-b mb-6">
            <div className="flex">
              <button 
                className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "satis" 
                    ? "border-primary text-primary" 
                    : "border-transparent hover:border-muted-foreground/30"
                }`}
                onClick={() => setActiveTab("satis")}
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
                onClick={() => setActiveTab("musteri")}
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
                onClick={() => setActiveTab("urun")}
              >
                <Utensils className="size-4" />
                <span>Ürün Raporu</span>
              </button>
            </div>
          </div>
          
          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-card shadow-sm rounded-xl p-4 border border-border">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-1">Toplam Satış</p>
                  <p className="text-2xl font-bold">₺12,580</p>
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
                  <p className="text-2xl font-bold">214</p>
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
                  <p className="text-2xl font-bold">₺58,78</p>
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
                  <p className="text-muted-foreground text-sm font-medium mb-1">Müşteri Sayısı</p>
                  <p className="text-2xl font-bold">156</p>
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
          
          {/* Grafik Alanı */}
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
            
            {/* Placeholder for chart - in a real app, you would use a chart library */}
            <div className="h-64 w-full bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="font-medium text-primary mb-2">Satış Grafiği</p>
                <p className="text-muted-foreground text-sm">Bu alanda gerçek bir grafik görüntülenecektir</p>
              </div>
            </div>
          </div>
          
          {/* Tablo Alanı */}
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Ürün Miktarı</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Ciro</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Ortalama Sepet</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="bg-card hover:bg-muted/20">
                    <td className="px-4 py-3 text-sm">12.08.2023</td>
                    <td className="px-4 py-3 text-sm">42</td>
                    <td className="px-4 py-3 text-sm">128</td>
                    <td className="px-4 py-3 text-sm font-medium">₺2,450</td>
                    <td className="px-4 py-3 text-sm">₺58.33</td>
                  </tr>
                  <tr className="bg-card hover:bg-muted/20">
                    <td className="px-4 py-3 text-sm">11.08.2023</td>
                    <td className="px-4 py-3 text-sm">38</td>
                    <td className="px-4 py-3 text-sm">112</td>
                    <td className="px-4 py-3 text-sm font-medium">₺2,180</td>
                    <td className="px-4 py-3 text-sm">₺57.37</td>
                  </tr>
                  <tr className="bg-card hover:bg-muted/20">
                    <td className="px-4 py-3 text-sm">10.08.2023</td>
                    <td className="px-4 py-3 text-sm">45</td>
                    <td className="px-4 py-3 text-sm">136</td>
                    <td className="px-4 py-3 text-sm font-medium">₺2,680</td>
                    <td className="px-4 py-3 text-sm">₺59.56</td>
                  </tr>
                  <tr className="bg-card hover:bg-muted/20">
                    <td className="px-4 py-3 text-sm">09.08.2023</td>
                    <td className="px-4 py-3 text-sm">40</td>
                    <td className="px-4 py-3 text-sm">122</td>
                    <td className="px-4 py-3 text-sm font-medium">₺2,350</td>
                    <td className="px-4 py-3 text-sm">₺58.75</td>
                  </tr>
                  <tr className="bg-card hover:bg-muted/20">
                    <td className="px-4 py-3 text-sm">08.08.2023</td>
                    <td className="px-4 py-3 text-sm">49</td>
                    <td className="px-4 py-3 text-sm">148</td>
                    <td className="px-4 py-3 text-sm font-medium">₺2,920</td>
                    <td className="px-4 py-3 text-sm">₺59.59</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t flex justify-between items-center">
              <div className="text-sm text-muted-foreground">5 sonuç gösteriliyor</div>
              <div className="flex gap-1">
                <button className="p-2 rounded hover:bg-muted transition-colors">
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </button>
                <button className="p-2 rounded hover:bg-muted transition-colors">
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 