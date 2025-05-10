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
  FileText, 
  Download, 
  Search, 
  Filter, 
  Eye, 
  Printer, 
  Mail, 
  CheckCircle, 
  Clock, 
  XCircle, 
  CalendarDays, 
  User,
  CreditCard,
  ChevronRight
} from "lucide-react"

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [dateFilter, setDateFilter] = useState<string | null>(null)
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null)
  
  // Fatura durumları ve renkleri
  const invoiceStatus = {
    odendi: { text: "Ödendi", color: "bg-green-100 text-green-700" },
    beklemede: { text: "Beklemede", color: "bg-yellow-100 text-yellow-700" },
    iptal: { text: "İptal", color: "bg-red-100 text-red-700" },
  }
  
  // Örnek fatura verileri
  const invoices = [
    {
      id: 1001,
      tarih: "15.08.2023",
      musteriAdi: "Ahmet Yılmaz",
      masaNo: 5,
      tutar: 450,
      odemeTuru: "Kredi Kartı",
      durum: "odendi",
      detaylar: [
        { id: 1, urun: "Karışık Pizza", miktar: 1, birimFiyat: 120, toplamFiyat: 120 },
        { id: 2, urun: "Izgara Köfte", miktar: 2, birimFiyat: 95, toplamFiyat: 190 },
        { id: 3, urun: "Ayran", miktar: 3, birimFiyat: 15, toplamFiyat: 45 },
        { id: 4, urun: "Künefe", miktar: 1, birimFiyat: 65, toplamFiyat: 65 },
        { id: 5, urun: "Su", miktar: 2, birimFiyat: 15, toplamFiyat: 30 },
      ]
    },
    {
      id: 1002,
      tarih: "15.08.2023",
      musteriAdi: "Ayşe Demir",
      masaNo: 8,
      tutar: 325,
      odemeTuru: "Nakit",
      durum: "odendi",
      detaylar: [
        { id: 1, urun: "Mantı", miktar: 2, birimFiyat: 85, toplamFiyat: 170 },
        { id: 2, urun: "Limonata", miktar: 2, birimFiyat: 25, toplamFiyat: 50 },
        { id: 3, urun: "Sütlaç", miktar: 2, birimFiyat: 45, toplamFiyat: 90 },
        { id: 4, urun: "Su", miktar: 1, birimFiyat: 15, toplamFiyat: 15 },
      ]
    },
    {
      id: 1003,
      tarih: "14.08.2023",
      musteriAdi: "Mehmet Kaya",
      masaNo: 12,
      tutar: 520,
      odemeTuru: "Kredi Kartı",
      durum: "odendi",
      detaylar: [
        { id: 1, urun: "Karışık Pizza", miktar: 2, birimFiyat: 120, toplamFiyat: 240 },
        { id: 2, urun: "Çıtır Tavuk", miktar: 2, birimFiyat: 55, toplamFiyat: 110 },
        { id: 3, urun: "Patates Kızartması", miktar: 2, birimFiyat: 40, toplamFiyat: 80 },
        { id: 4, urun: "Limonata", miktar: 3, birimFiyat: 25, toplamFiyat: 75 },
        { id: 5, urun: "Su", miktar: 1, birimFiyat: 15, toplamFiyat: 15 },
      ]
    },
    {
      id: 1004,
      tarih: "14.08.2023",
      musteriAdi: "Zeynep Çelik",
      masaNo: 3,
      tutar: 180,
      odemeTuru: "Beklemede",
      durum: "beklemede",
      detaylar: [
        { id: 1, urun: "Mercimek Çorbası", miktar: 1, birimFiyat: 35, toplamFiyat: 35 },
        { id: 2, urun: "Mantı", miktar: 1, birimFiyat: 85, toplamFiyat: 85 },
        { id: 3, urun: "Ayran", miktar: 2, birimFiyat: 15, toplamFiyat: 30 },
        { id: 4, urun: "Su", miktar: 2, birimFiyat: 15, toplamFiyat: 30 },
      ]
    },
    {
      id: 1005,
      tarih: "13.08.2023",
      musteriAdi: "Mustafa Şahin",
      masaNo: 9,
      tutar: 275,
      odemeTuru: "İptal Edildi",
      durum: "iptal",
      detaylar: [
        { id: 1, urun: "Tavuk Şiş", miktar: 2, birimFiyat: 90, toplamFiyat: 180 },
        { id: 2, urun: "Ezogelin Çorbası", miktar: 1, birimFiyat: 35, toplamFiyat: 35 },
        { id: 3, urun: "Ayran", miktar: 2, birimFiyat: 15, toplamFiyat: 30 },
        { id: 4, urun: "Su", miktar: 2, birimFiyat: 15, toplamFiyat: 30 },
      ]
    },
  ]
  
  // Filtrelenmiş faturalar
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = searchQuery === "" || 
      invoice.musteriAdi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toString().includes(searchQuery)
    
    const matchesStatus = statusFilter === null || invoice.durum === statusFilter
    const matchesDate = dateFilter === null || invoice.tarih.includes(dateFilter)
    
    return matchesSearch && matchesStatus && matchesDate
  })
  
  // Seçilen fatura
  const selectedInvoiceData = selectedInvoice 
    ? invoices.find(invoice => invoice.id === selectedInvoice) 
    : null

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
                <BreadcrumbPage>Faturalar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Fatura ara..."
                className="pl-9 pr-4 py-1.5 rounded-lg border text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
            
            <button className="bg-primary/10 text-primary rounded-lg px-3 py-1.5 flex items-center gap-1 text-sm hover:bg-primary/20 transition-colors">
              <Download className="size-4" />
              <span>Rapor İndir</span>
            </button>
          </div>
        </header>
        
        <div className="p-4 pt-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Faturalar</h1>
            <p className="text-muted-foreground">Satış ve sipariş faturalarını görüntüleyin ve yönetin</p>
          </div>
          
          {/* Filtreler */}
          <div className="flex flex-wrap gap-3 mb-6">
            <select 
              className="bg-card border rounded-lg px-3 py-1.5 text-sm outline-none"
              value={statusFilter || ""}
              onChange={(e) => setStatusFilter(e.target.value || null)}
            >
              <option value="">Tüm Durumlar</option>
              <option value="odendi">Ödendi</option>
              <option value="beklemede">Beklemede</option>
              <option value="iptal">İptal</option>
            </select>
            
            <select 
              className="bg-card border rounded-lg px-3 py-1.5 text-sm outline-none"
              value={dateFilter || ""}
              onChange={(e) => setDateFilter(e.target.value || null)}
            >
              <option value="">Tüm Tarihler</option>
              <option value="15.08">Bugün</option>
              <option value="14.08">Dün</option>
              <option value="13.08">Önceki Gün</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fatura Listesi */}
            <div className="md:col-span-1 bg-card shadow-sm rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Faturalar</span>
                </h2>
                <div className="text-sm text-muted-foreground">
                  {filteredInvoices.length} sonuç
                </div>
              </div>
              
              <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map(invoice => (
                    <div 
                      key={invoice.id}
                      className={`p-3 hover:bg-muted/20 transition-colors cursor-pointer ${selectedInvoice === invoice.id ? 'bg-muted/30' : ''}`}
                      onClick={() => setSelectedInvoice(invoice.id)}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium flex items-center gap-1">
                          Fatura #{invoice.id}
                          <ChevronRight className="size-4 text-muted-foreground" />
                        </h3>
                        <div className={`text-xs px-2 py-0.5 rounded-full ${invoiceStatus[invoice.durum as keyof typeof invoiceStatus].color}`}>
                          {invoiceStatus[invoice.durum as keyof typeof invoiceStatus].text}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <User className="size-3.5" />
                          <span>{invoice.musteriAdi}</span>
                        </div>
                        <div className="text-sm font-medium">₺{invoice.tutar}</div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs mt-2 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="size-3" />
                          {invoice.tarih}
                        </span>
                        <span className="flex items-center gap-1">
                          <CreditCard className="size-3" />
                          {invoice.odemeTuru}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">Sonuç bulunamadı</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Fatura Detayı */}
            <div className="md:col-span-2 bg-card shadow-sm rounded-xl border border-border overflow-hidden">
              {selectedInvoiceData ? (
                <>
                  <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>Fatura Detayı</span>
                    </h2>
                    <div className="flex gap-2">
                      <button className="bg-muted p-2 rounded-md hover:bg-muted/80 transition-colors">
                        <Printer className="size-4 text-muted-foreground" />
                      </button>
                      <button className="bg-muted p-2 rounded-md hover:bg-muted/80 transition-colors">
                        <Mail className="size-4 text-muted-foreground" />
                      </button>
                      <button className="bg-muted p-2 rounded-md hover:bg-muted/80 transition-colors">
                        <Download className="size-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {/* Fatura Başlığı */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold">FATURA #{selectedInvoiceData.id}</h3>
                        <p className="text-muted-foreground mt-1">{selectedInvoiceData.tarih}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-md ${invoiceStatus[selectedInvoiceData.durum as keyof typeof invoiceStatus].color}`}>
                        {invoiceStatus[selectedInvoiceData.durum as keyof typeof invoiceStatus].text}
                      </div>
                    </div>
                    
                    {/* Müşteri ve Masa Bilgisi */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-muted/30 p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                          <User className="size-4 text-primary" />
                          <span>Müşteri Bilgileri</span>
                        </h4>
                        <p className="text-sm">{selectedInvoiceData.musteriAdi}</p>
                      </div>
                      
                      <div className="bg-muted/30 p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                          <FileText className="size-4 text-primary" />
                          <span>Sipariş Bilgileri</span>
                        </h4>
                        <p className="text-sm">Masa No: {selectedInvoiceData.masaNo}</p>
                        <p className="text-sm mt-1">Ödeme: {selectedInvoiceData.odemeTuru}</p>
                      </div>
                    </div>
                    
                    {/* Fatura Detayları */}
                    <div className="border rounded-md overflow-hidden mb-6">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">#</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Ürün</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Miktar</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Birim Fiyat</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Toplam</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {selectedInvoiceData.detaylar.map((item, index) => (
                            <tr key={item.id} className="hover:bg-muted/20">
                              <td className="px-4 py-3 text-sm">{index + 1}</td>
                              <td className="px-4 py-3 text-sm">{item.urun}</td>
                              <td className="px-4 py-3 text-sm text-right">{item.miktar}</td>
                              <td className="px-4 py-3 text-sm text-right">₺{item.birimFiyat}</td>
                              <td className="px-4 py-3 text-sm font-medium text-right">₺{item.toplamFiyat}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Toplam Kısmı */}
                    <div className="flex justify-end">
                      <div className="w-72 bg-muted/30 p-3 rounded-md">
                        <div className="flex justify-between py-1">
                          <span className="text-sm">Ara Toplam:</span>
                          <span className="text-sm">₺{selectedInvoiceData.tutar}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm">KDV (%8):</span>
                          <span className="text-sm">₺{Math.round(selectedInvoiceData.tutar * 0.08)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-t mt-1 pt-2">
                          <span className="font-medium">Toplam:</span>
                          <span className="font-bold">₺{selectedInvoiceData.tutar}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 flex flex-col items-center justify-center h-full">
                  <FileText className="size-16 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">Detayları görüntülemek için bir fatura seçin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 