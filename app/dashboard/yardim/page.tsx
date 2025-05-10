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
  HelpCircle, 
  Search, 
  ChevronDown, 
  Mail, 
  Phone, 
  MessageSquare, 
  FileText, 
  BookOpen, 
  Video, 
  ExternalLink, 
  PlayCircle 
} from "lucide-react"

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState("genel")
  
  // SSS Kategorileri
  const faqCategories = [
    { id: "genel", name: "Genel" },
    { id: "siparis", name: "Sipariş Yönetimi" },
    { id: "masa", name: "Masa Yönetimi" },
    { id: "menu", name: "Menü Yönetimi" },
    { id: "rapor", name: "Raporlar" },
  ]
  
  // Sık Sorulan Sorular
  const faqs = {
    genel: [
      {
        id: 1,
        question: "Restoran yönetim sistemine nasıl giriş yapabilirim?",
        answer: "Sisteme giriş yapmak için size verilen kullanıcı adı ve şifre ile giriş ekranını kullanabilirsiniz. Eğer henüz bir hesabınız yoksa sistem yöneticinizle iletişime geçin."
      },
      {
        id: 2,
        question: "Şifremi unuttum, ne yapmalıyım?",
        answer: "Giriş ekranındaki 'Şifremi Unuttum' bağlantısını kullanarak kayıtlı e-posta adresinize sıfırlama bağlantısı alabilirsiniz. Eğer e-posta adresinize erişemiyorsanız, lütfen destek ekibimizle iletişime geçin."
      },
      {
        id: 3,
        question: "Sistemde birden fazla şube için yönetim yapabilir miyim?",
        answer: "Evet, sisteme giriş yaptıktan sonra üst menüdeki şube seçimi bölümünden yönetmek istediğiniz şubeyi seçebilirsiniz. Bu özellik kurumsal paketlerimizde mevcuttur."
      },
    ],
    siparis: [
      {
        id: 4,
        question: "Sipariş oluştururken hata alıyorum, ne yapmalıyım?",
        answer: "Sipariş oluştururken yaşanan hatalar genellikle menü öğelerinin stok durumu veya fiyatlandırma sorunlarından kaynaklanır. Lütfen seçtiğiniz ürünlerin stokta olduğundan emin olun ve problemi detaylarıyla destek ekibimize bildirin."
      },
      {
        id: 5,
        question: "Siparişi iptal etme işlemi nasıl yapılır?",
        answer: "Aktif siparişler sayfasında iptal etmek istediğiniz siparişin detaylarına girerek sağ üst köşedeki 'İptal Et' butonunu kullanabilirsiniz. İptal nedeni girmeniz istenecektir."
      },
      {
        id: 6,
        question: "Farklı masalardaki siparişleri birleştirebilir miyim?",
        answer: "Evet, 'Masa Yönetimi' sayfasından masaları seçerek 'Masaları Birleştir' seçeneğini kullanabilirsiniz. Bu işlem sonrasında siparişler hedef masaya aktarılacaktır."
      },
    ],
    masa: [
      {
        id: 7,
        question: "Yeni masa nasıl eklerim?",
        answer: "Masalar sayfasında sağ üst köşedeki 'Yeni Masa Ekle' butonuna tıklayarak yeni masa oluşturabilirsiniz. Masa numarası, kapasite ve konum bilgilerini girmeniz gerekecektir."
      },
      {
        id: 8,
        question: "Masa düzenini değiştirebilir miyim?",
        answer: "Evet, 'Masa Düzeni' sayfasından sürükle-bırak yöntemiyle masaların konumlarını değiştirebilir ve restoran planınıza uygun düzenleme yapabilirsiniz."
      },
    ],
    menu: [
      {
        id: 9,
        question: "Menüye yeni ürün eklemek için ne yapmalıyım?",
        answer: "Menü Yönetimi sayfasında 'Yeni Ürün Ekle' butonuna tıklayarak ürün adı, açıklaması, fiyatı, kategorisi ve diğer detayları girerek yeni ürün ekleyebilirsiniz."
      },
      {
        id: 10,
        question: "Menü öğelerini toplu olarak güncelleyebilir miyim?",
        answer: "Evet, Menü Yönetimi sayfasında 'Toplu İşlemler' bölümünden Excel formatında ürün listesi indirip, güncellemeleri yaparak tekrar sisteme yükleyebilirsiniz."
      },
    ],
    rapor: [
      {
        id: 11,
        question: "Satış raporlarını nasıl indirebilirim?",
        answer: "Raporlar sayfasında istediğiniz raporu seçtikten sonra tarih aralığı ve diğer filtreleri ayarlayıp 'Rapor İndir' butonuna tıklayarak Excel, PDF veya CSV formatında indirebilirsiniz."
      },
      {
        id: 12,
        question: "Özel raporlar oluşturabilir miyim?",
        answer: "Evet, Raporlar sayfasındaki 'Özel Rapor Oluştur' bölümünden istediğiniz metrikleri ve filtreleri seçerek kendi raporlarınızı oluşturabilirsiniz."
      },
    ],
  }
  
  // Filtrelenmiş SSS
  const filteredFaqs = searchQuery 
    ? Object.values(faqs).flat().filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs[activeCategory as keyof typeof faqs]
  
  // Video Eğitimleri
  const videoTutorials = [
    {
      id: 1,
      title: "Sisteme Genel Bakış",
      duration: "5:30",
      thumbnail: "tutorial1.jpg",
      category: "Genel",
    },
    {
      id: 2,
      title: "Sipariş Alma ve Yönetme",
      duration: "8:15",
      thumbnail: "tutorial2.jpg",
      category: "Sipariş",
    },
    {
      id: 3,
      title: "Masaları Yönetme",
      duration: "4:45",
      thumbnail: "tutorial3.jpg",
      category: "Masalar",
    },
    {
      id: 4,
      title: "Raporlama ve Analiz",
      duration: "7:20",
      thumbnail: "tutorial4.jpg",
      category: "Raporlar",
    },
  ]

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
                <BreadcrumbPage>Yardım</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Sorunuzu yazın..."
                className="pl-9 pr-4 py-1.5 rounded-lg border text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
          </div>
        </header>
        
        <div className="p-4 pt-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Yardım ve Destek</h1>
            <p className="text-muted-foreground">Sık sorulan sorular, eğitim videoları ve destek kanalları</p>
          </div>
          
          {/* Yardım Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card shadow-sm rounded-xl p-4 border border-border hover:shadow-md transition-all">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-primary/10 rounded-full p-3 mb-2">
                  <MessageSquare className="text-primary h-6 w-6" />
                </div>
                <h3 className="font-medium">Canlı Destek</h3>
                <p className="text-sm text-muted-foreground">Anlık yardım için uzmanlarımızla görüşün</p>
                <button className="mt-2 bg-primary/10 text-primary px-3 py-1.5 rounded-md text-sm font-medium hover:bg-primary/20 transition-colors w-full">
                  Şimdi Başlat
                </button>
              </div>
            </div>
            
            <div className="bg-card shadow-sm rounded-xl p-4 border border-border hover:shadow-md transition-all">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-blue-500/10 rounded-full p-3 mb-2">
                  <BookOpen className="text-blue-500 h-6 w-6" />
                </div>
                <h3 className="font-medium">Kullanım Kılavuzu</h3>
                <p className="text-sm text-muted-foreground">Detaylı kullanım talimatlarını indirin</p>
                <button className="mt-2 bg-blue-500/10 text-blue-500 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-500/20 transition-colors w-full flex items-center justify-center gap-1.5">
                  <FileText className="size-4" />
                  <span>PDF İndir</span>
                </button>
              </div>
            </div>
            
            <div className="bg-card shadow-sm rounded-xl p-4 border border-border hover:shadow-md transition-all">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-green-500/10 rounded-full p-3 mb-2">
                  <Video className="text-green-500 h-6 w-6" />
                </div>
                <h3 className="font-medium">Video Eğitimleri</h3>
                <p className="text-sm text-muted-foreground">Adım adım eğitim videolarını izleyin</p>
                <button className="mt-2 bg-green-500/10 text-green-500 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-green-500/20 transition-colors w-full flex items-center justify-center gap-1.5">
                  <PlayCircle className="size-4" />
                  <span>Videoları Görüntüle</span>
                </button>
              </div>
            </div>
            
            <div className="bg-card shadow-sm rounded-xl p-4 border border-border hover:shadow-md transition-all">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-purple-500/10 rounded-full p-3 mb-2">
                  <Mail className="text-purple-500 h-6 w-6" />
                </div>
                <h3 className="font-medium">E-posta Desteği</h3>
                <p className="text-sm text-muted-foreground">Teknik destek ekibimize yazın</p>
                <a 
                  href="mailto:destek@restoransistemi.com" 
                  className="mt-2 bg-purple-500/10 text-purple-500 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-purple-500/20 transition-colors w-full inline-block"
                >
                  destek@restoransistemi.com
                </a>
              </div>
            </div>
          </div>
          
          {/* SSS Bölümü */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="size-5 text-primary" />
              <span>Sık Sorulan Sorular</span>
            </h2>
            
            {/* SSS Kategorileri */}
            {!searchQuery && (
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
            
            {/* SSS Listeleme */}
            <div className="bg-card shadow-sm rounded-xl border border-border overflow-hidden">
              {searchQuery && (
                <div className="p-4 border-b">
                  <p className="text-sm text-muted-foreground">
                    "{searchQuery}" için {filteredFaqs.length} sonuç bulundu
                  </p>
                </div>
              )}
              
              <div className="divide-y divide-border">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq) => (
                    <div key={faq.id} className="transition-all">
                      <div 
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/20"
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      >
                        <h3 className="font-medium pr-8">{faq.question}</h3>
                        <ChevronDown className={`size-5 text-muted-foreground transition-transform ${expandedFaq === faq.id ? "rotate-180" : ""}`} />
                      </div>
                      
                      {expandedFaq === faq.id && (
                        <div className="p-4 pt-0 bg-muted/10">
                          <div className="border-t pt-3 pl-0 pr-8">
                            <p className="text-muted-foreground">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">Sonuç bulunamadı</p>
                    <button className="mt-3 bg-primary/10 text-primary px-3 py-1.5 rounded-md text-sm">
                      Tüm Soruları Göster
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Video Eğitimleri */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Video className="size-5 text-primary" />
              <span>Video Eğitimleri</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {videoTutorials.map((tutorial) => (
                <div key={tutorial.id} className="bg-card shadow-sm rounded-xl border border-border overflow-hidden hover:shadow-md transition-all">
                  <div className="aspect-video bg-muted/50 relative flex items-center justify-center">
                    <div className="absolute">
                      <PlayCircle className="size-12 text-primary opacity-80" />
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {tutorial.duration}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium mb-1">{tutorial.title}</h3>
                    <p className="text-xs text-muted-foreground">{tutorial.category}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <button className="bg-primary/10 text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/20 transition-colors flex items-center gap-1.5 mx-auto">
                <ExternalLink className="size-4" />
                <span>Tüm Eğitim Videolarını Görüntüle</span>
              </button>
            </div>
          </div>
          
          {/* İletişim Bilgileri */}
          <div className="bg-card shadow-sm rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold mb-4">Bizimle İletişime Geçin</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2.5 mt-0.5">
                  <Phone className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Telefon</h3>
                  <p className="text-sm">Pazartesi - Cuma: 09:00 - 18:00</p>
                  <p className="text-sm font-medium mt-1">+90 212 123 4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2.5 mt-0.5">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">E-posta</h3>
                  <p className="text-sm">24 saat içinde yanıt verilir</p>
                  <p className="text-sm font-medium mt-1">destek@restoransistemi.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2.5 mt-0.5">
                  <MessageSquare className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Canlı Destek</h3>
                  <p className="text-sm">Anlık teknik destek alın</p>
                  <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm mt-1 shadow hover:shadow-md transition-all">
                    Şimdi Başlat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 