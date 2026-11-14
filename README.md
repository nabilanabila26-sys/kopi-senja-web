<div align="center">

  <h1>☕ Kopi Senja — Coffee & Sanctuary</h1>
  <p><strong>Modern, Minimalist Coffee Shop Landing Page & Ordering Web App (MVP)</strong></p>
  <p><em>"Nikmati Secangkir Kopi Penuh Cerita"</em></p>

  <p>
    <a href="#-fitur-utama"><img src="https://img.shields.io/badge/Status-Production%20Ready-emerald?style=for-the-badge&logo=checkmarx" alt="Status"></a>
    <a href="#-tech-stack"><img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React 18"></a>
    <a href="#-tech-stack"><img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS"></a>
    <a href="#-tech-stack"><img src="https://img.shields.io/badge/Icons-Lucide-F97316?style=for-the-badge" alt="Lucide Icons"></a>
    <a href="#-lisensi"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License"></a>
  </p>

  <p>
    Dirancang khusus untuk memenangkan hati <strong>mahasiswa</strong> dan <strong>remote worker / digital nomad</strong> yang mencari sanctuary ngopi produktif dengan <strong>Wi-Fi 150 Mbps dedicated</strong> dan <strong>stopkontak di setiap sudut meja</strong>.
  </p>

</div>

---

## 📋 Daftar Isi
- [✨ Fitur Utama](#-fitur-utama)
- [🎨 Desain & Tema](#-desain--tema)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Struktur Berkas](#-struktur-berkas)
- [🚀 Cara Menjalankan Secara Lokal](#-cara-menjalankan-secara-lokal)
- [🌐 Cara Deploy ke GitHub Pages (Gratis)](#-cara-deploy-ke-github-pages-gratis)
- [⚙️ Panduan Kustomisasi Kafe](#️-panduan-kustomisasi-kafe)
- [📄 Lisensi](#-lisensi)

---

## ✨ Fitur Utama

### 1. ⚡ Denah Meja & Status Stopkontak Real-Time (*Laptop-Friendly Seats*)
* Solusi anti was-was bagi pekerja remote dan mahasiswa agar tidak datang ke kafe yang sudah penuh:
  * **Indikator Live Ketersediaan:** Menampilkan status meja secara visual:
    * 🟢 **Tersedia:** Meja kosong dan siap ditempati.
    * 🔴 **Terisi:** Meja sedang digunakan nugas.
    * 🟡 **Direservasi:** Meja telah dibooking.
  * **Informasi Stopkontak Rinci:** Jumlah colokan universal (2–6 port), port fast charging USB-C PD, dan letak colokan (kolong meja / dinding sofa).
  * **Pemisahan Zona Nyaman:**
    * ❄️ *Indoor AC (Quiet Work Zone)* — pencahayaan hangat anti-glare dan lo-fi acoustic playlist.
    * 🌿 *Semi-Outdoor Garden (Smoking & Relax Area)* — sirkulasi udara segar dengan colokan tahan cuaca.
  * **One-Click Table Selection:** Klik langsung meja kosong untuk otomatis dipilih pada pesanan *Dine-in*, barista akan mengantar langsung ke meja tersebut.
  * **Simulasi Interaktif:** Tombol refresh pada kartu meja untuk mengubah status secara langsung saat pengujian.

### 2. ⚡ Paket Nugas Produktif (*Work-Session Bundles*)
* Strategi menaikkan nilai pesanan (*Average Order Value*) dengan paket bundling hemat:
  * **Paket Nugas Solo (Rp 38.000):** Es Kopi Susu Senja + Truffle Fries + Akses Wi-Fi VIP.
  * **Paket Deadline Killer (Rp 42.000):** Double Shot Americano Gayo + Butter Croissant + Sweet Choco Dip.
  * **Paket Kenyang Produktif (Rp 52.000):** Nasi Goreng Senja Spesial + Es Kopi Aren Senja + Telur & Kerupuk.
  * **Paket Diskusi Berdua (Rp 68.000):** 2 Minuman Pilihan + Mix Platters (Fries, Sausage, Nugget).
* Tombol *One-Click Add to Cart* dengan efek suara sintetis via Web Audio API.

### 3. 🛒 Floating & Drawer Shopping Cart (*Saved Cart*)
* **Persistensi Otomatis (`localStorage`):** Keranjang dan nama pemesan tidak hilang saat halaman di-refresh.
* **Formulir Checkout Intuitif:**
  * Pilihan jenis pesanan: **Dine-in (Makan di Tempat)** dengan pemilihan nomor meja, atau **Take-away (Bawa Pulang)**.
  * Input nama pemesan dan catatan pesanan kustom (opsi es, gula, oatmilk, request colokan sambung).
* **Integrasi Pesan WhatsApp Otomatis:** Menghasilkan template pesan WhatsApp yang rapi dan terstruktur langsung ke kontak kafe:
  ```text
  *HALO KOPI SENJA, SAYA INGIN MEMESAN:* ☕✨
  ━━━━━━━━━━━━━━━━━━━━━━━━━━
  👤 Nama: Dimas
  📍 Tipe: Dine-in (Meja 03 - Window Workstation 1 • 4 Colokan)
  📝 Catatan: Kurangi gula, sediakan sedotan kertas

  📋 RINCIAN PESANAN:
  1. 1x Paket Nugas Solo — Rp 38.000
  2. 1x Kyoto Artisan Matcha Latte — Rp 26.000
     ↳ Varian: Less Sugar, Iced Matcha

  ━━━━━━━━━━━━━━━━━━━━━━━━━━
  💰 TOTAL PEMBAYARAN: Rp 64.000
  ━━━━━━━━━━━━━━━━━━━━━━━━━━
  ```
* **Simulasi Pelacak Pesanan Barista:** Modal interaktif 3 tahap (*Pesanan Diterima -> Sedang Diseduh -> Siap Disajikan*).

### 4. 🍽️ Menu Interaktif & Filter Cepat
* Filter kategori: *Semua, Paket Nugas, Kopi, Non-Kopi, Camilan, Makanan Utama*.
* Fitur pencarian instan (search bar) real-time.
* Modal customizer rasa (Sugar level, Ice level, Milk choice).

### 5. 📍 Detail Kafe Nyata, Jam Operasional & Fasilitas
* **Alamat Nyata:** Jl. Senja Damai No. 24, Sukasari, Bandung 40152 (dekat area kampus).
* **Jam Operasional:** Senin–Jumat (08:00–23:00 WIB), Sabtu–Minggu (07:00–24:00 WIB) dengan status dinamis *Buka Sekarang*.
* **Wi-Fi Voucher Widget:** Kecepatan 150 Mbps Dedicated Fiber, ping 6ms, tombol salin password instan (`kopipenuhinspirasi`).
* **Peta Lokasi Interaktif:** Tampilan embed map dengan pin lokasi dan tautan Google Maps.

---

## 🎨 Desain & Tema

* **Filosofi Visual:** Minimalis, hangat, bersih, dan menenangkan (*Warm & Cozy Coffee Sanctuary*).
* **Palet Warna:**
  * Background Utama: `#FAF7F2` *(Warm Cream)*
  * Teks & Kontras: `#3C2A21` *(Rich Espresso Brown)*
  * Aksen Utama & CTA: `#D48139` *(Warm Caramel / Amber)*
  * Card Background & Border: `#F3E8DF` *(Soft Warm Beige)*
  * Footer: `#231812` *(Deep Espresso)*
* **Tipografi:** Google Fonts *Plus Jakarta Sans* (Body/UI) & *Playfair Display* (Editorial Headings).

---

## 🛠️ Tech Stack

| Kategori | Teknologi | Deskripsi |
|---|---|---|
| **Frontend Library** | React 18 | Declarative UI, reactive state hooks |
| **Styling** | Tailwind CSS + Custom CSS | Utilitas responsif, animasi pulse, dan glassmorphism |
| **Icons** | Lucide Icons (Native SVG) | Ringan, tajam, zero external runtime dependency |
| **Persistensi** | Browser `localStorage` | Menyimpan keranjang & data sesi pemesan |
| **Audio FX** | Web Audio API | Sintesis nada audio mandiri tanpa aset file eksternal |
| **Local Server** | Python 3 `http.server` | Server pengujian lokal tanpa instalasi npm |

---

## 📁 Struktur Berkas

```
kopi-senja/
├── index.html              # Entry point aplikasi web modular
├── index-standalone.html   # Distribusi standalone single-file (bisa dibuka langsung via file://)
├── app.js                  # Komponen React, state management, modal & WhatsApp generator
├── data.js                 # Database menu, paket nugas, data meja/colokan, dan info kafe
├── icons.js                # Koleksi icon SVG Lucide native
├── styles.css              # Custom styling, scrollbar estetis, dan keyframe animasi
├── server.py               # Script server lokal Python (port 8000)
├── build_standalone.py     # Script bundler untuk memperbarui index-standalone.html
├── .gitignore              # Konfigurasi file yang diabaikan Git
└── README.md               # Dokumentasi proyek
```

---

## 🚀 Cara Menjalankan Secara Lokal

### Opsi 1: Klik Ganda Langsung (Paling Mudah)
Cukup buka berkas **`index-standalone.html`** dengan klik ganda (*double-click*) di browser Chrome, Edge, atau Opera Anda. Tidak memerlukan instalasi server apa pun!

### Opsi 2: Menggunakan Server Lokal Python
1. Buka terminal (PowerShell atau Command Prompt) dan masuk ke direktori:
   ```powershell
   cd "C:\Users\ThinkPad X13\.gemini\antigravity\scratch\kopi-senja"
   ```
2. Jalankan server Python:
   ```powershell
   python server.py
   ```
3. Buka peramban di: **`http://localhost:8000`**

---

## 🌐 Cara Deploy ke GitHub Pages (Gratis)

Aplikasi ini 100% *client-side*, sehingga sangat mudah di-hosting gratis di GitHub Pages:

1. Di repository GitHub Anda, buka tab **Settings** > **Pages**.
2. Pada bagian **Build and deployment**:
   - **Source:** Pilih `Deploy from a branch`.
   - **Branch:** Pilih `main` dan folder `/ (root)`.
3. Klik **Save**.
4. Dalam 1–2 menit, web app Anda akan aktif di URL:
   `https://<username-github>.github.io/<nama-repo>/`

---

## ⚙️ Panduan Kustomisasi Kafe

Semua konfigurasi data kafe tersimpan rapi di berkas **`data.js`**:
* **Ubah Nomor WhatsApp:** Edit properti `shopInfo.phone` (contoh: `"6281234567890"`).
* **Ubah Alamat & Jam Buka:** Edit properti `shopInfo.address` dan `shopInfo.hours`.
* **Tambah / Ubah Menu & Harga:** Edit array `menuItems`.
* **Tambah Paket Nugas:** Edit array `nugasPackages`.
* **Atur Meja & Colokan:** Edit array `tables` untuk menambah meja baru atau mengubah jumlah stopkontak.

> **Tips:** Setelah mengedit `data.js`, jalankan `python build_standalone.py` jika ingin memperbarui versi *single-file* `index-standalone.html`.

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi [MIT](LICENSE). Silakan gunakan, sesuaikan, dan kembangkan untuk kebutuhan kafe Anda!

<div align="center">
  <p>Dibuat dengan ❤️ dan secangkir kopi untuk mendukung produktivitas mahasiswa & remote worker.</p>
</div>
