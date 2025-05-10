# Restoran Yönetim Sistemi

Bu proje, restoran ve kafe işletmelerinin masaları ve siparişleri yönetmelerini sağlayan modern bir web uygulamasıdır.

## Özellikler

- **Dashboard**: Anasayfa ile günlük ciro, müşteri sayısı ve masa doluluk oranlarını takip edin
- **Masalar**: Restoran masalarını görsel olarak izleyin ve yönetin
- **Siparişler**: Sipariş oluşturma, takip etme ve faturalandırma
- **Faturalar**: Satışları fatura bazında izleme ve raporlama
- **Raporlar**: Detaylı satış, müşteri ve ürün raporları

## Teknolojiler

- [Next.js 15](https://nextjs.org)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

## Kurulum

Projeyi yerel ortamınıza kurmak için:

```bash
# Projeyi klonlayın
git clone https://github.com/kullanici/restoran-yonetim-sistemi.git
cd restoran-yonetim-sistemi

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyebilirsiniz.

## Kullanım

- `/dashboard` - Ana kontrol paneli
- `/dashboard/masalar` - Masa yönetim sayfası
- `/dashboard/siparisler` - Sipariş takip ve yönetimi
- `/dashboard/faturalar` - Fatura görüntüleme ve yönetimi
- `/dashboard/raporlar` - Analiz ve raporlama

## Katkıda Bulunma

1. Bu repo'yu fork edin
2. Yeni bir branch oluşturun: `git checkout -b ozellik-adi`
3. Değişikliklerinizi yapın ve commit edin: `git commit -am 'Yeni özellik: açıklama'`
4. Branch'inizi push edin: `git push origin ozellik-adi`
5. Pull Request açın

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.
