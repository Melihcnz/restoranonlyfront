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
import { BellRing, Building, Clock, CreditCard, Mail, Phone, Save, Settings, User } from "lucide-react"

export default function Page() {
  const [activeTab, setActiveTab] = useState("genel")
  
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
                <BreadcrumbPage>Ayarlar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        
        <div className="flex flex-1 gap-6 p-4 pt-0 overflow-auto">
          {/* Sidebar (Left) */}
          <div className="hidden md:flex flex-col w-56 shrink-0">
            <div className="mb-1 text-sm font-medium text-muted-foreground px-2 py-1.5">
              Ayarlar
            </div>
            <nav className="space-y-1">
              <button 
                className={`w-full text-sm flex items-center gap-2.5 px-2 py-2 rounded-md ${
                  activeTab === "genel" 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-muted/80"
                }`}
                onClick={() => setActiveTab("genel")}
              >
                <Building className="size-4 shrink-0" />
                <span>Restoran Bilgileri</span>
              </button>
              <button 
                className={`w-full text-sm flex items-center gap-2.5 px-2 py-2 rounded-md ${
                  activeTab === "kullanici" 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-muted/80"
                }`}
                onClick={() => setActiveTab("kullanici")}
              >
                <User className="size-4 shrink-0" />
                <span>Kullanıcı Ayarları</span>
              </button>
              <button 
                className={`w-full text-sm flex items-center gap-2.5 px-2 py-2 rounded-md ${
                  activeTab === "bildirimler" 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-muted/80"
                }`}
                onClick={() => setActiveTab("bildirimler")}
              >
                <BellRing className="size-4 shrink-0" />
                <span>Bildirimler</span>
              </button>
              <button 
                className={`w-full text-sm flex items-center gap-2.5 px-2 py-2 rounded-md ${
                  activeTab === "odeme" 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-muted/80"
                }`}
                onClick={() => setActiveTab("odeme")}
              >
                <CreditCard className="size-4 shrink-0" />
                <span>Ödeme Yöntemleri</span>
              </button>
              <button 
                className={`w-full text-sm flex items-center gap-2.5 px-2 py-2 rounded-md ${
                  activeTab === "gelismis" 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-muted/80"
                }`}
                onClick={() => setActiveTab("gelismis")}
              >
                <Settings className="size-4 shrink-0" />
                <span>Gelişmiş Ayarlar</span>
              </button>
            </nav>
          </div>
          
          {/* Mobile Tabs */}
          <div className="flex md:hidden border-b -mx-4 px-4 mb-4 overflow-x-auto">
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "genel" 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
              onClick={() => setActiveTab("genel")}
            >
              <Building className="size-4" />
              <span>Restoran</span>
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "kullanici" 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
              onClick={() => setActiveTab("kullanici")}
            >
              <User className="size-4" />
              <span>Kullanıcı</span>
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "bildirimler" 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
              onClick={() => setActiveTab("bildirimler")}
            >
              <BellRing className="size-4" />
              <span>Bildirimler</span>
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "odeme" 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
              onClick={() => setActiveTab("odeme")}
            >
              <CreditCard className="size-4" />
              <span>Ödeme</span>
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "gelismis" 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
              onClick={() => setActiveTab("gelismis")}
            >
              <Settings className="size-4" />
              <span>Gelişmiş</span>
            </button>
          </div>
          
          {/* Content (Right) */}
          <div className="flex-1 overflow-auto">
            {activeTab === "genel" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Restoran Bilgileri</h3>
                  <div className="bg-card border rounded-xl p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Restoran Adı</label>
                        <input 
                          type="text" 
                          className="w-full p-2 rounded-md border border-input bg-background" 
                          defaultValue="Lezzet Dünyası"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Vergi Numarası</label>
                        <input 
                          type="text" 
                          className="w-full p-2 rounded-md border border-input bg-background" 
                          defaultValue="1234567890"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Telefon</label>
                        <div className="flex items-center">
                          <Phone className="size-4 text-muted-foreground mr-2" />
                          <input 
                            type="text" 
                            className="w-full p-2 rounded-md border border-input bg-background" 
                            defaultValue="0212 345 6789"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">E-posta</label>
                        <div className="flex items-center">
                          <Mail className="size-4 text-muted-foreground mr-2" />
                          <input 
                            type="email" 
                            className="w-full p-2 rounded-md border border-input bg-background" 
                            defaultValue="info@lezzetdunyasi.com"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Adres</label>
                        <textarea 
                          className="w-full p-2 rounded-md border border-input bg-background" 
                          rows={3}
                          defaultValue="Örnek Mahallesi, Örnek Sokak No:123, Örnek/İstanbul"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Çalışma Saatleri</h3>
                  <div className="bg-card border rounded-xl p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="size-4 text-muted-foreground" />
                          <span className="font-medium">Pazartesi - Cuma</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="time"
                            className="p-1 rounded border border-input bg-background"
                            defaultValue="09:00"
                          />
                          <span>-</span>
                          <input 
                            type="time"
                            className="p-1 rounded border border-input bg-background"
                            defaultValue="22:00"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="size-4 text-muted-foreground" />
                          <span className="font-medium">Cumartesi - Pazar</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="time"
                            className="p-1 rounded border border-input bg-background"
                            defaultValue="10:00"
                          />
                          <span>-</span>
                          <input 
                            type="time"
                            className="p-1 rounded border border-input bg-background"
                            defaultValue="23:00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 flex items-center gap-2">
                    <Save className="size-4" />
                    <span>Değişiklikleri Kaydet</span>
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === "kullanici" && (
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-lg font-medium mb-4">Kullanıcı Ayarları</h3>
                <p className="text-muted-foreground">Bu bölüm kullanıcı ayarları ile ilgili seçenekleri içerecektir.</p>
              </div>
            )}
            
            {activeTab === "bildirimler" && (
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-lg font-medium mb-4">Bildirim Ayarları</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <div className="font-medium">Yeni Sipariş Bildirimleri</div>
                      <div className="text-sm text-muted-foreground">Yeni bir sipariş alındığında bildirim al</div>
                    </div>
                    <div>
                      <input type="checkbox" id="newOrder" className="mr-2" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <div className="font-medium">Masa Değişim Bildirimleri</div>
                      <div className="text-sm text-muted-foreground">Bir masa durumu değiştiğinde bildirim al</div>
                    </div>
                    <div>
                      <input type="checkbox" id="tableChange" className="mr-2" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <div className="font-medium">Müşteri Bildirimleri</div>
                      <div className="text-sm text-muted-foreground">Müşterilerle ilgili güncellemeler için bildirim al</div>
                    </div>
                    <div>
                      <input type="checkbox" id="customerNotifications" className="mr-2" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Sistem Bildirimleri</div>
                      <div className="text-sm text-muted-foreground">Sistem ile ilgili önemli duyurularda bildirim al</div>
                    </div>
                    <div>
                      <input type="checkbox" id="systemNotifications" className="mr-2" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "odeme" && (
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-lg font-medium mb-4">Ödeme Yöntemleri</h3>
                <p className="text-muted-foreground">Bu bölüm ödeme yöntemleri ile ilgili seçenekleri içerecektir.</p>
              </div>
            )}
            
            {activeTab === "gelismis" && (
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-lg font-medium mb-4">Gelişmiş Ayarlar</h3>
                <p className="text-muted-foreground">Bu bölüm gelişmiş ayarlarla ilgili seçenekleri içerecektir.</p>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 