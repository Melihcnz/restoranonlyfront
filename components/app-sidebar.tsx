"use client"

import * as React from "react"
import { Utensils, Home, Table, Users, ShoppingBag, Settings, BarChart2, CalendarRange, ChefHat, FileText, HelpCircle } from "lucide-react"
import { usePathname } from "next/navigation" 

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

// Tüm menü öğelerini buraya ekliyoruz (yenileri de dahil)
const menuItems = [
  {
    title: "Anasayfa",
    url: "/dashboard",
    icon: <Home className="size-4" />,
    path: "/dashboard"
  },
  {
    title: "Masalar",
    url: "/dashboard/masalar",
    icon: <Table className="size-4" />,
    path: "/dashboard/masalar"
  },
  {
    title: "Siparişler",
    url: "/dashboard/siparisler",
    icon: <ShoppingBag className="size-4" />,
    path: "/dashboard/siparisler"
  },
  {
    title: "Müşteriler",
    url: "/dashboard/musteriler",
    icon: <Users className="size-4" />,
    path: "/dashboard/musteriler"
  },
  {
    title: "Raporlar",
    url: "/dashboard/raporlar",
    icon: <BarChart2 className="size-4" />,
    path: "/dashboard/raporlar"
  },
  {
    title: "Menü Yönetimi",
    url: "/dashboard/menu-yonetimi",
    icon: <ChefHat className="size-4" />,
    path: "/dashboard/menu-yonetimi"
  },
  {
    title: "Rezervasyonlar",
    url: "/dashboard/rezervasyonlar",
    icon: <CalendarRange className="size-4" />,
    path: "/dashboard/rezervasyonlar"
  },
  {
    title: "Faturalar",
    url: "/dashboard/faturalar",
    icon: <FileText className="size-4" />,
    path: "/dashboard/faturalar"
  },
  {
    title: "Yardım",
    url: "/dashboard/yardim",
    icon: <HelpCircle className="size-4" />,
    path: "/dashboard/yardim"
  },
  {
    title: "Ayarlar",
    url: "/dashboard/ayarlar",
    icon: <Settings className="size-4" />,
    path: "/dashboard/ayarlar"
  },
]

// Kategori grupları
const menuCategories = [
  {
    title: "ANA MENÜ",
    items: ["Anasayfa", "Masalar", "Siparişler", "Müşteriler"]
  },
  {
    title: "YÖNETİM",
    items: ["Raporlar", "Menü Yönetimi", "Rezervasyonlar", "Faturalar"]
  },
  {
    title: "SİSTEM",
    items: ["Yardım", "Ayarlar"]
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  
  // Menü öğeleri için hover state
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)

  // Şu anki seçili sayfayı bul
  const activeItem = menuItems.find(item => item.path === pathname)?.title || null
  
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard" 
                className="transition-all hover:bg-primary/5 rounded-lg" 
                style={{ transform: pathname === "/dashboard" ? "scale(1.02)" : "scale(1)" }}>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg shadow-sm">
                  <Utensils className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">RESTORAN</span>
                  <span className="">Yönetim</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        {menuCategories.map((category) => (
          <SidebarGroup key={category.title}>
            <div className="px-3 py-2">
              <h3 className="text-xs font-medium text-muted-foreground mb-1">{category.title}</h3>
            </div>
            <SidebarMenu className="gap-1 px-2">
              {menuItems
                .filter(item => category.items.includes(item.title))
                .map((item) => {
                  const isActive = pathname === item.path
                  const isHovered = hoveredItem === item.title
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuSubButton 
                        asChild 
                        isActive={isActive}
                        className="transition-all duration-150 hover:translate-x-1"
                        onMouseEnter={() => setHoveredItem(item.title)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <a 
                          href={item.url} 
                          className={`flex items-center gap-2 transition-all ${isActive ? "font-medium" : ""}`}
                        >
                          <div className={`transition-all duration-300 ${isActive || isHovered ? "text-primary" : ""}`}>
                            {item.icon}
                          </div>
                          {item.title}
                          {isActive && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"></div>
                          )}
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuItem>
                  )
                })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
        
        <div className="mt-auto px-3 pt-6 pb-4">
          <div className="bg-muted/50 rounded-lg p-3 text-center text-sm">
            <p className="font-medium mb-1">Restoran Yönetim Sistemi</p>
            <p className="text-muted-foreground text-xs">v1.2.0</p>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
