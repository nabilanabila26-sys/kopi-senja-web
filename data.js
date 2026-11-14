// Data configuration for Kopi Senja
// Real shop details, categories, menu items, nugas packages, and table seating status

window.KOPI_SENJA_DATA = {
  shopInfo: {
    name: "Kopi Senja",
    tagline: "Nikmati Secangkir Kopi Penuh Cerita",
    subtagline: "Sanctuary ternyaman untuk mahasiswa, remote worker, dan penikmat kopi. Dilengkapi Wi-Fi 150 Mbps dedicated dan stopkontak di setiap sudut meja.",
    phone: "6281234567890", // Real WhatsApp contact
    phoneDisplay: "+62 812-3456-7890",
    address: "Jl. Senja Damai No. 24, Sukasari, Bandung 40152",
    addressShort: "Sukasari, Bandung",
    mapsUrl: "https://maps.google.com/?q=Bandung+Coffee+Shop",
    hours: {
      weekday: "Senin - Jumat: 08:00 - 23:00 WIB",
      weekend: "Sabtu - Minggu: 07:00 - 24:00 WIB",
      status: "Buka Sekarang"
    },
    wifi: {
      ssid: "KopiSenja-HighSpeed_5G",
      pass: "kopipenuhinspirasi",
      speed: "150 Mbps Dedicated Fiber",
      ping: "6 ms"
    },
    socials: {
      instagram: "@kopisenja.id",
      tiktok: "@kopisenja.official",
      whatsapp: "+62 812-3456-7890"
    }
  },

  categories: [
    { id: "all", name: "Semua", icon: "Coffee" },
    { id: "paket-nugas", name: "Paket Nugas ⚡", icon: "Laptop" },
    { id: "kopi", name: "Kopi", icon: "CupSoda" },
    { id: "non-kopi", name: "Non-Kopi", icon: "Sparkles" },
    { id: "camilan", name: "Camilan", icon: "Cookie" },
    { id: "makanan-utama", name: "Makanan Utama", icon: "UtensilsCrossed" }
  ],

  // Work-Session Bundle Packages ("Paket Nugas")
  nugasPackages: [
    {
      id: "pkg-1",
      name: "Paket Nugas Solo",
      category: "paket-nugas",
      price: 38000,
      originalPrice: 46000,
      discount: "Hemat 17%",
      tag: "Paling Laris",
      badgeColor: "bg-amber-600",
      description: "Es Kopi Susu Senja + Truffle Fries renyah + Password Wi-Fi VIP. Cocok untuk sesi coding 2-3 jam.",
      itemsIncluded: ["1x Es Kopi Susu Senja", "1x Truffle Fries Signature", "Voucher Wi-Fi VIP Dedicated"],
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
      popular: true
    },
    {
      id: "pkg-2",
      name: "Paket Deadline Killer",
      category: "paket-nugas",
      price: 42000,
      originalPrice: 52000,
      discount: "Hemat 20%",
      tag: "High Caffeine",
      badgeColor: "bg-stone-800",
      description: "Double Shot Americano Gayo + Warm Butter Croissant dengan selai hazelnut. Booster fokus maksimal!",
      itemsIncluded: ["1x Double Shot Americano", "1x Butter Croissant", "1x Hazelnut Dip"],
      image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80",
      popular: true
    },
    {
      id: "pkg-3",
      name: "Paket Kenyang Produktif",
      category: "paket-nugas",
      price: 52000,
      originalPrice: 64000,
      discount: "Hemat 19%",
      tag: "Makan Siang",
      badgeColor: "bg-emerald-700",
      description: "Nasi Goreng Senja Spesial + Es Kopi Aren + Kerupuk & Acar. Energi penuh tanpa harus pindah tempat makan.",
      itemsIncluded: ["1x Nasi Goreng Senja Spesial", "1x Es Kopi Aren Senja", "1x Kerupuk & Telur Mata Sapi"],
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
      popular: false
    },
    {
      id: "pkg-4",
      name: "Paket Diskusi Berdua",
      category: "paket-nugas",
      price: 68000,
      originalPrice: 84000,
      discount: "Hemat 20%",
      tag: "Meeting Santai",
      badgeColor: "bg-orange-700",
      description: "2 Pilihan Minuman (Kopi Susu / Matcha) + Platters Mix (Kentang, Sosis, Karage). Pas untuk ngerjain tugas kelompok.",
      itemsIncluded: ["2x Minuman Pilihan", "1x Sharing Platter (Fries, Sausage, Nugget)", "Meja 2-4 Orang Ber-Colokan"],
      image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
      popular: false
    }
  ],

  // Full Menu Items with realistic pricing and details
  menuItems: [
    // KOPI
    {
      id: "kopi-1",
      name: "Es Kopi Susu Senja",
      category: "kopi",
      price: 22000,
      description: "Signature blend Kopi Senja, susu segar creamy, gula aren organik murni dengan aroma smoky lembut.",
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      isBestSeller: true,
      options: {
        sugar: ["Normal", "Less Sugar", "No Sugar"],
        ice: ["Normal Ice", "Less Ice"],
        milk: ["Fresh Milk", "Oatmilk (+Rp 6.000)"]
      }
    },
    {
      id: "kopi-2",
      name: "Manual Brew V60 Gayo",
      category: "kopi",
      price: 26000,
      description: "Single origin Arabica Aceh Gayo washed. Tasting notes: Floral jasmine, sweet citrus, clean black tea finish.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      isBestSeller: true,
      options: {
        serving: ["Hot", "Iced (+Rp 2.000)"],
        beans: ["Aceh Gayo Washed", "Toraja Sapan Natural (+Rp 3.000)"]
      }
    },
    {
      id: "kopi-3",
      name: "Caramel Macchiato",
      category: "kopi",
      price: 28000,
      description: "Steamed velvety milk dengan vanilla syrup, espresso shot ganda, dan drizzle saus karamel mentega gurih.",
      image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      isBestSeller: false,
      options: {
        temperature: ["Dingin (Ice)", "Panas (Hot)"],
        sugar: ["Normal", "Less Sugar"],
        milk: ["Fresh Milk", "Oatmilk (+Rp 6.000)"]
      }
    },
    {
      id: "kopi-4",
      name: "Americano / Long Black",
      category: "kopi",
      price: 20000,
      description: "Double ristretto shot dari house blend 100% Arabica. Kaya aroma, bold, tanpa rasa asam berlebih.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      isBestSeller: false,
      options: {
        temperature: ["Dingin (Iced)", "Panas (Hot)"],
        sweetness: ["Tanpa Gula", "Simple Syrup terpisah"]
      }
    },
    {
      id: "kopi-5",
      name: "Spanish Vanilla Latte",
      category: "kopi",
      price: 27000,
      description: "Perpaduan kental manis Spanyol berimbang dengan double espresso dan ekstrak vanilla madagaskar.",
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      isBestSeller: false,
      options: {
        sugar: ["Normal", "Less Sweet"],
        ice: ["Normal Ice", "Less Ice"]
      }
    },
    {
      id: "kopi-6",
      name: "Affogato Senja",
      category: "kopi",
      price: 24000,
      description: "Dua scoop es krim vanila lembut ditenggelamkan dalam siraman espresso panas pekat yang wangi.",
      image: "https://images.unsplash.com/photo-1594910069359-598d9753443a?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      isBestSeller: false,
      options: {
        topping: ["Classic Almond", "Choco Sprinkles"]
      }
    },

    // NON-KOPI
    {
      id: "non-1",
      name: "Kyoto Artisan Matcha Latte",
      category: "non-kopi",
      price: 26000,
      description: "Pure ceremonial grade Uji Matcha dipadukan dengan steamed susu lembut dan sentuhan madu hutan.",
      image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      isBestSeller: true,
      options: {
        temperature: ["Iced Matcha", "Hot Matcha"],
        sugar: ["Normal", "Less Sugar", "No Sugar"],
        milk: ["Fresh Milk", "Oatmilk (+Rp 6.000)"]
      }
    },
    {
      id: "non-2",
      name: "Belgian Dark Chocolate",
      category: "non-kopi",
      price: 25000,
      description: "Kakao Belgia 70% kaya antioksidan dengan rasa cokelat pekat, legit, dan tidak enek.",
      image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      isBestSeller: true,
      options: {
        temperature: ["Iced Chocolate", "Hot Chocolate"],
        sweetness: ["Normal", "Less Sweet"]
      }
    },
    {
      id: "non-3",
      name: "Sparkling Peach Jasmine",
      category: "non-kopi",
      price: 24000,
      description: "Cold brew melati aromatik dipadukan dengan sari buah persik manis dan soda dingin menyegarkan.",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      isBestSeller: false,
      options: {
        ice: ["Normal Ice", "Extra Chilled"]
      }
    },
    {
      id: "non-4",
      name: "Earl Grey Milk Tea with Jelly",
      category: "non-kopi",
      price: 25000,
      description: "Teh hitam Earl Grey beraroma citrus bergamot dengan susu gurih dan topping grass jelly kenyal.",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      isBestSeller: false,
      options: {
        sugar: ["Normal", "Less Sugar"]
      }
    },

    // CAMILAN
    {
      id: "snack-1",
      name: "Signature Truffle Fries",
      category: "camilan",
      price: 24000,
      description: "Kentang goreng renyah bumbu sea salt dengan semprotan minyak truffle asli dan taburan keju parmesan.",
      image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      isBestSeller: true,
      options: {
        dip: ["Garlic Mayo", "Spicy Senja Sauce", "Cheese Sauce"]
      }
    },
    {
      id: "snack-2",
      name: "French Butter Croissant",
      category: "camilan",
      price: 20000,
      description: "Pastry lapis renyah dengan aroma mentega Prancis harum, hangat di luar dan lembut berongga di dalam.",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      isBestSeller: true,
      options: {
        serving: ["Dipanaskan (Warm)", "Suhu Ruang"]
      }
    },
    {
      id: "snack-3",
      name: "Crispy Churros Dulce de Leche",
      category: "camilan",
      price: 22000,
      description: "5 batang churros garing bersalut gula kayu manis harum, disajikan dengan saus karamel dulce lezat.",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      isBestSeller: false,
      options: {
        sauce: ["Dulce de Leche", "Belgian Dark Choco"]
      }
    },
    {
      id: "snack-4",
      name: "Roti Bakar Kaya Butter",
      category: "camilan",
      price: 18000,
      description: "Roti brioche tebal panggang renyah dengan olesan selai pandan srikaya homemade dan potongan cold butter.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      isBestSeller: false,
      options: {
        flavor: ["Original Kaya", "Kaya Cheese (+Rp 3.000)"]
      }
    },

    // MAKANAN UTAMA
    {
      id: "main-1",
      name: "Nasi Goreng Senja Spesial",
      category: "makanan-utama",
      price: 35000,
      description: "Nasi goreng aroma bumbu rempah nusantara dengan suwiran ayam, sosis, telur mata sapi, kerupuk, dan acar segar.",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      isBestSeller: true,
      options: {
        spicy: ["Tidak Pedas", "Sedang", "Pedas Mantap"],
        egg: ["Setengah Matang", "Matang"]
      }
    },
    {
      id: "main-2",
      name: "Creamy Smoked Beef Carbonara",
      category: "makanan-utama",
      price: 38000,
      description: "Fettuccine al dente dengan saus krim keju parmesan gurih, potongan daging asap melimpah, dan garlic bread.",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      isBestSeller: true,
      options: {
        pasta: ["Fettuccine", "Spaghetti"]
      }
    },
    {
      id: "main-3",
      name: "Chicken Katsu Japanese Curry",
      category: "makanan-utama",
      price: 36000,
      description: "Fillet dada ayam goreng tepung panko renyah, kuah kari jepang kental wangi wortel kentang di atas nasi hangat.",
      image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      isBestSeller: false,
      options: {
        spiciness: ["Mild", "Spicy"]
      }
    },
    {
      id: "main-4",
      name: "Beef Teriyaki Rice Bowl",
      category: "makanan-utama",
      price: 38000,
      description: "Irisan daging sapi US shortplate empuk ditumis dengan saus teriyaki manis gurih, taburan wijen, dan scrambled egg.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      isBestSeller: false,
      options: {
        sauce: ["Classic Teriyaki", "Black Pepper (+Rp 2.000)"]
      }
    }
  ],

  // Laptop-Friendly Seating Map & Busy Status
  // Designed specifically for remote workers & students
  tables: [
    {
      id: "T-01",
      number: "01",
      name: "Bar Solo Workspace A",
      zone: "indoor",
      zoneLabel: "Indoor AC (Quiet Work Zone)",
      capacity: 1,
      outlets: 2,
      outletType: "Universal Socket + 20W USB-C PD",
      status: "available", // available, occupied, reserved
      occupantNote: "Siap Ditempati",
      features: ["Dekat Barista", "Lampu Baca Fokus", "Kursi Bar Busa"],
      popularFor: "Solo Coder / Quick Focus"
    },
    {
      id: "T-02",
      number: "02",
      name: "Bar Solo Workspace B",
      zone: "indoor",
      zoneLabel: "Indoor AC (Quiet Work Zone)",
      capacity: 1,
      outlets: 2,
      outletType: "Universal Socket + Fast Charging USB",
      status: "occupied",
      occupantNote: "Terisi (Est. selesai 14:00)",
      features: ["Dekat Barista", "Lampu Baca Fokus", "Kursi Bar Busa"],
      popularFor: "Solo Student"
    },
    {
      id: "T-03",
      number: "03",
      name: "Window Workstation 1",
      zone: "indoor",
      zoneLabel: "Indoor AC (Quiet Work Zone)",
      capacity: 2,
      outlets: 4,
      outletType: "4 Universal Sockets di Kolong Meja",
      status: "available",
      occupantNote: "Siap Ditempati",
      features: ["Pemandangan Taman", "Kursi Sandaran Ergonomis", "Cahaya Alami"],
      popularFor: "Deep Work / Skripsi"
    },
    {
      id: "T-04",
      number: "04",
      name: "Window Workstation 2",
      zone: "indoor",
      zoneLabel: "Indoor AC (Quiet Work Zone)",
      capacity: 2,
      outlets: 4,
      outletType: "4 Universal Sockets di Kolong Meja",
      status: "occupied",
      occupantNote: "Terisi (Sedang Nugas)",
      features: ["Pemandangan Taman", "Kursi Sandaran Ergonomis", "Cahaya Alami"],
      popularFor: "Remote Worker"
    },
    {
      id: "T-05",
      number: "05",
      name: "Central Collab Table A",
      zone: "indoor",
      zoneLabel: "Indoor AC (Quiet Work Zone)",
      capacity: 4,
      outlets: 6,
      outletType: "Power Strip Tengah Meja (6 Port)",
      status: "available",
      occupantNote: "Siap Ditempati",
      features: ["Meja Kayu Jati Luas", "Stopkontak Tengah Meja", "Dekat AC Utama"],
      popularFor: "Kerja Kelompok / Team Sync"
    },
    {
      id: "T-06",
      number: "06",
      name: "Central Collab Table B",
      zone: "indoor",
      zoneLabel: "Indoor AC (Quiet Work Zone)",
      capacity: 4,
      outlets: 6,
      outletType: "Power Strip Tengah Meja (6 Port)",
      status: "reserved",
      occupantNote: "Direservasi s.d 15:30",
      features: ["Meja Kayu Jati Luas", "Stopkontak Tengah Meja", "Dekat AC Utama"],
      popularFor: "Meeting Klien"
    },
    {
      id: "T-07",
      number: "07",
      name: "Cozy Booth Corner",
      zone: "indoor",
      zoneLabel: "Indoor AC (Quiet Work Zone)",
      capacity: 3,
      outlets: 3,
      outletType: "3 Universal Sockets di Dinding Sofa",
      status: "occupied",
      occupantNote: "Terisi (Laptop User)",
      features: ["Sofa Kulit Empuk", "Suasana Privat", "Colokan Dinding"],
      popularFor: "Santai & Casual Work"
    },
    {
      id: "T-08",
      number: "08",
      name: "Garden Terrace 1",
      zone: "outdoor",
      zoneLabel: "Semi-Outdoor (Smoking & Garden)",
      capacity: 4,
      outlets: 2,
      outletType: "2 Colokan Weatherproof di Tiang",
      status: "available",
      occupantNote: "Siap Ditempati",
      features: ["Area Merokok Legal", "Angin Alami Sejuk", "Kipas Angin Kabut"],
      popularFor: "Ngobrol Santai / Sunset View"
    },
    {
      id: "T-09",
      number: "09",
      name: "Garden Terrace 2",
      zone: "outdoor",
      zoneLabel: "Semi-Outdoor (Smoking & Garden)",
      capacity: 2,
      outlets: 2,
      outletType: "2 Colokan Weatherproof di Dinding",
      status: "available",
      occupantNote: "Siap Ditempati",
      features: ["Area Merokok Legal", "Dikelilingi Tanaman Rindang", "Lampu Gantung Hangat"],
      popularFor: "Diskusi Santai"
    },
    {
      id: "T-10",
      number: "10",
      name: "Canopy Deck Workstation",
      zone: "outdoor",
      zoneLabel: "Semi-Outdoor (Smoking & Garden)",
      capacity: 4,
      outlets: 4,
      outletType: "4 Colokan Pelindung Air di Bawah Meja",
      status: "occupied",
      occupantNote: "Terisi (Ngopi & Diskusi)",
      features: ["Atap Kanopi Transparan", "Suasana Sore Estetik", "Stopkontak Anti-Hujan"],
      popularFor: "Sore Santai Nugas"
    }
  ],

  // Cafe Features and Facilities
  facilities: [
    {
      icon: "Wifi",
      title: "Wi-Fi 150 Mbps Fiber",
      description: "Dedicated enterprise router dual-band 2.4 & 5GHz. Anti putus untuk video call, git push, dan streaming."
    },
    {
      icon: "Zap",
      title: "Colokan di Setiap Meja",
      description: "Total 40+ stopkontak universal dengan proteksi grounding aman dan fast charging port."
    },
    {
      icon: "Clock",
      title: "Buka Hingga Larut Malam",
      description: "Buka dari 08.00 pagi sampai 23.00 (weekend sampai 24.00). Tempat aman saat dikejar deadline tugas."
    },
    {
      icon: "Volume2",
      title: "Lo-Fi & Akustik Playlist",
      description: "Musik latar bertempo tenang dan volume terkontrol, menjaga konsentrasi nugas tanpa bikin bising."
    },
    {
      icon: "Moon",
      title: "Musholla & Toilet Bersih",
      description: "Fasilitas ibadah ber-AC dan tempat wudhu bersih terpisah agar ibadah tetap tenang saat nugas."
    },
    {
      icon: "Car",
      title: "Parkir Luas & Aman",
      description: "Area parkir mobil dan motor memadai dengan penerangan terang dan petugas keamanan bersahabat."
    }
  ],

  reviews: [
    {
      name: "Dimas Arya",
      role: "Software Engineer Remote",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      comment: "Kafe paling pengertian buat remote worker di Bandung. Wi-Fi 150 Mbps-nya beneran kenceng, ping cuma 6ms. Meja 03 favorit saya karena colokannya ada 4 dan kursinya empuk!",
      date: "2 hari lalu"
    },
    {
      name: "Nabila Putri",
      role: "Mahasiswi Tingkat Akhir ITB",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      comment: "Paket Nugas Solo-nya bener-bener lifesaver! 38rb udah dapet Kopi Susu Senja enak + Truffle Fries banyak. Berhasil kelarin 2 bab skripsi di sini.",
      date: "Kemarin"
    },
    {
      name: "Reza Mahendra",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      comment: "Fitur cek status meja di webnya sangat ngebantu, jadi gak perlu was-was kehabisan colokan. V60 Gayo-nya juga juara, acid-nya seimbang.",
      date: "5 hari lalu"
    }
  ]
};
