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
  ChefHat, 
  Plus, 
  ChevronsUpDown, 
  Search, 
  Pencil, 
  Trash, 
  ChevronDown,
  Coffee,
  UtensilsCrossed,
  Beef,
  Soup,
  Cookie,
  Wine
} from "lucide-react"

export default function Page() {
  const [activeCategory, setActiveCategory] = useState("ana-yemek")
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Menü kategorileri
  const categories = [
    { id: "ana-yemek", name: "Ana Yemekler", icon: <Beef className="size-4" /> },
    { id: "corbalar", name: "Çorbalar", icon: <Soup className="size-4" /> },
    { id: "aperatifler", name: "Aperatifler", icon: <UtensilsCrossed className="size-4" /> },
    { id: "icecekler", name: "İçecekler", icon: <Wine className="size-4" /> },
    { id: "tatlilar", name: "Tatlılar", icon: <Cookie className="size-4" /> },
  ]

  // Tüm menü öğeleri
  const menuItems = {
    "ana-yemek": [
      { id: 1, name: "Karışık Pizza", price: 120, description: "Sucuk, sosis, mantar, mısır, zeytin, biber", image: "pizza.jpg", stokDurumu: true },
      { id: 2, name: "Izgara Köfte", price: 95, description: "200g dana kıyma, patates kızartması, közlenmiş biber", image: "kofte.jpg", stokDurumu: true },
      { id: 3, name: "Mantı", price: 85, description: "El açması mantı, yoğurt, tereyağı, nane", image: "manti.jpg", stokDurumu: true },
      { id: 4, name: "Tavuk Şiş", price: 90, description: "Marine edilmiş tavuk, ızgara sebzeler, pilav", image: "tavuk.jpg", stokDurumu: false },
    ],
    "corbalar": [
      { id: 5, name: "Mercimek Çorbası", price: 35, description: "Kızarmış ekmek ile servis edilir", image: "mercimek.jpg", stokDurumu: true },
      { id: 6, name: "Ezogelin Çorbası", price: 35, description: "Taze nane ve tereyağı ile", image: "ezogelin.jpg", stokDurumu: true },
    ],
    "aperatifler": [
      { id: 7, name: "Patates Kızartması", price: 40, description: "Özel baharat ve soslar ile", image: "patates.jpg", stokDurumu: true },
      { id: 8, name: "Çıtır Tavuk", price: 55, description: "Çıtır tavuk parçaları, ranch sos ile", image: "tavuk-parca.jpg", stokDurumu: true },
    ],
    "icecekler": [
      { id: 9, name: "Ayran", price: 15, description: "Taze yayık ayranı", image: "ayran.jpg", stokDurumu: true },
      { id: 10, name: "Limonata", price: 25, description: "Taze sıkılmış limon", image: "limonata.jpg", stokDurumu: true },
    ],
    "tatlilar": [
      { id: 11, name: "Künefe", price: 65, description: "Fıstıklı künefe, kaymak ile servis edilir", image: "kunefe.jpg", stokDurumu: true },
      { id: 12, name: "Sütlaç", price: 45, description: "Fırında pişirilmiş, tarçınlı", image: "sutlac.jpg", stokDurumu: true },
    ],
  }

  // Filtrelenmiş menü öğeleri
  const filteredItems = searchQuery 
    ? Object.values(menuItems).flat().filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : menuItems[activeCategory as keyof typeof menuItems]

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
                <BreadcrumbPage>Menü Yönetimi</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Menüde ara..."
                className="pl-9 pr-4 py-1.5 rounded-lg border text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
            
            <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-1.5">
              <Plus className="size-4" />
              <span>Yeni Ürün Ekle</span>
            </button>
          </div>
        </header>
        
        <div className="p-4 pt-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Menü Yönetimi</h1>
            <p className="text-muted-foreground">Menü öğelerini düzenleyin, yeni ürünler ekleyin ve fiyatları güncelleyin</p>
          </div>
          
          {/* Kategori Navigasyonu */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2.5 rounded-lg flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => {
                  setActiveCategory(category.id)
                  setSearchQuery("")
                }}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Menü Listesi */}
          <div className="bg-card shadow-sm rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-primary" />
                <span>{searchQuery ? "Arama Sonuçları" : categories.find(c => c.id === activeCategory)?.name}</span>
              </h2>
              <button className="bg-muted px-3 py-1 rounded-md text-sm flex items-center gap-1.5">
                <ChevronsUpDown className="size-4" />
                <span>Sırala</span>
              </button>
            </div>
            
            <div className="divide-y divide-border">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div key={item.id} className="hover:bg-muted/30 transition-colors">
                    <div 
                      className="p-4 flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-md flex items-center justify-center ${item.stokDurumu ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                          <Coffee className="size-5" />
                        </div>
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            {item.name}
                            {!item.stokDurumu && (
                              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full">Stokta Yok</span>
                            )}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="font-medium">₺{item.price}</span>
                        <ChevronDown className={`size-5 text-muted-foreground transition-transform ${expandedItem === item.id ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                    
                    {expandedItem === item.id && (
                      <div className="p-4 pt-0 bg-muted/20">
                        <div className="ml-12 border-t pt-3">
                          <p className="text-sm mb-3">{item.description}</p>
                          <div className="flex gap-2">
                            <button className="bg-muted/50 px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 hover:bg-muted transition-colors">
                              <Pencil className="size-4" />
                              <span>Düzenle</span>
                            </button>
                            <button className="bg-red-100 text-red-600 px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 hover:bg-red-200 transition-colors">
                              <Trash className="size-4" />
                              <span>Sil</span>
                            </button>
                            <button className={`ml-auto px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-colors ${
                              item.stokDurumu 
                                ? "bg-red-100 text-red-600 hover:bg-red-200" 
                                : "bg-green-100 text-green-600 hover:bg-green-200"
                            }`}>
                              <span>{item.stokDurumu ? "Stoktan Kaldır" : "Stoğa Ekle"}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">Sonuç bulunamadı</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 