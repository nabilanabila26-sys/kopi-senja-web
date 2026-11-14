// Kopi Senja - Modern Coffee Shop Web App & Ordering MVP
// Built with React, Tailwind CSS, Lucide Icons, and LocalStorage Persistence

const { useState, useEffect, useMemo } = React;

// Simple Web Audio API Synthesizer for warm cafe sound effects (Zero external audio file dependency)
const CafeAudio = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  playAdd() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {
      console.log("Audio not supported or permitted");
    }
  },
  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.1, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.4);
      });
    } catch (e) {}
  }
};

// Format currency in Indonesian Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
};

// Lucide Icon Helper with local SVG & Lucide fallback
const Icon = ({ name, size = 18, className = "" }) => {
  if (!name) return null;
  const iconName = name.charAt(0).toUpperCase() + name.slice(1);
  if (window.AppIcons && window.AppIcons[iconName]) {
    return window.AppIcons[iconName]({ size, className });
  }
  const LucideIcons = window.lucide;
  if (LucideIcons && LucideIcons[iconName]) {
    const IconComponent = LucideIcons[iconName];
    return React.createElement(IconComponent, { size, className });
  }
  return React.createElement("span", { className: `inline-block ${className}` }, "☕");
};

// Main App Component
function App() {
  const data = window.KOPI_SENJA_DATA;

  // Persistent Cart state from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("kopi_senja_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // User details state (persisted)
  const [customerName, setCustomerName] = useState(() => {
    return localStorage.getItem("kopi_senja_user_name") || "";
  });
  const [orderType, setOrderType] = useState("dine-in"); // dine-in or take-away
  const [selectedTable, setSelectedTable] = useState("T-03"); // Default to an available outlet table
  const [orderNotes, setOrderNotes] = useState("");

  // UI States
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavMobileOpen, setIsNavMobileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [wifiCopied, setWifiCopied] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  const [selectedZone, setSelectedZone] = useState("all");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Table status list with live simulation
  const [tables, setTables] = useState(data.tables);

  // Modal states
  const [customizingItem, setCustomizingItem] = useState(null);
  const [orderTrackingData, setOrderStatusModal] = useState(null);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("kopi_senja_cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Save customer name
  useEffect(() => {
    try {
      localStorage.setItem("kopi_senja_user_name", customerName);
    } catch (e) {}
  }, [customerName]);

  // Toast auto dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3200);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  // Cart Calculations
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  // Add Item to Cart
  const handleAddToCart = (item, options = {}, notes = "") => {
    if (soundEnabled) CafeAudio.playAdd();
    
    // Create unique key based on ID and chosen options
    const optionsKey = JSON.stringify(options);
    const uniqueKey = `${item.id}-${optionsKey}-${notes}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(cartItem => cartItem.uniqueKey === uniqueKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prevCart, {
          ...item,
          uniqueKey,
          options,
          notes,
          quantity: 1
        }];
      }
    });

    showToast(`✓ ${item.name} berhasil ditambahkan ke keranjang`);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (uniqueKey, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.uniqueKey === uniqueKey) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  // Remove from Cart
  const handleRemoveFromCart = (uniqueKey) => {
    setCart(prevCart => prevCart.filter(item => item.uniqueKey !== uniqueKey));
    showToast("Item dihapus dari keranjang");
  };

  // Clear Cart
  const handleClearCart = () => {
    if (window.confirm("Kosongkan keranjang pesanan Anda?")) {
      setCart([]);
      showToast("Keranjang telah dikosongkan");
    }
  };

  // Select Table from Map
  const handleSelectTableFromMap = (table) => {
    if (table.status === "occupied") {
      showToast(`Meja ${table.number} saat ini sedang terisi. Anda dapat memilih meja lain yang masih tersedia.`);
      return;
    }
    if (table.status === "reserved") {
      showToast(`Meja ${table.number} sedang dalam status reservasi.`);
      return;
    }
    setSelectedTable(table.id);
    setOrderType("dine-in");
    showToast(`✓ Meja ${table.number} (${table.name}) dipilih!`);
    
    // Smooth scroll to menu or open cart
    const menuEl = document.getElementById("menu");
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toggle Table Status (Live Simulation for testing occupancy)
  const handleToggleTableOccupancy = (tableId, e) => {
    e.stopPropagation();
    setTables(prev => prev.map(t => {
      if (t.id === tableId) {
        const nextStatus = t.status === "available" ? "occupied" : (t.status === "occupied" ? "reserved" : "available");
        const nextNote = nextStatus === "available" ? "Siap Ditempati" : (nextStatus === "occupied" ? "Terisi (Sedang Dipakai)" : "Direservasi Pelanggan");
        return { ...t, status: nextStatus, occupantNote: nextNote };
      }
      return t;
    }));
    showToast("Status meja diperbarui secara live");
  };

  // Copy Wi-Fi details
  const handleCopyWifi = () => {
    navigator.clipboard.writeText(data.shopInfo.wifi.pass);
    setWifiCopied(true);
    showToast(`Password Wi-Fi berhasil disalin: ${data.shopInfo.wifi.pass}`);
    setTimeout(() => setWifiCopied(false), 3000);
  };

  // Copy Address
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(data.shopInfo.address);
    setAddressCopied(true);
    showToast("Alamat Kopi Senja berhasil disalin ke clipboard!");
    setTimeout(() => setAddressCopied(false), 3000);
  };

  // Generate WhatsApp Order Message
  const generateWhatsAppMessage = () => {
    const tableObj = tables.find(t => t.id === selectedTable);
    const tableInfo = orderType === "dine-in" 
      ? `Meja ${tableObj?.number || "?"} - ${tableObj?.name || ""} (${tableObj?.outlets || 0} Colokan)` 
      : "Take-away / Bawa Pulang (Pick-up di Kasir)";

    let message = `*HALO KOPI SENJA, SAYA INGIN MEMESAN:* ☕✨\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Nama Pemesan:* ${customerName.trim() || "Pelanggan Kopi Senja"}\n`;
    message += `📍 *Tipe Pesanan:* ${orderType === "dine-in" ? "Dine-in (Makan di Tempat)" : "Take-away (Bawa Pulang)"}\n`;
    message += `🪑 *Lokasi/Meja:* ${tableInfo}\n`;
    if (orderNotes.trim()) {
      message += `📝 *Catatan Khusus:* ${orderNotes.trim()}\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `📋 *RINCIAN PESANAN:*\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.quantity}x ${item.name}* — ${formatRupiah(item.price * item.quantity)}\n`;
      if (item.options && Object.keys(item.options).length > 0) {
        const optStr = Object.entries(item.options).map(([k, v]) => `${v}`).join(", ");
        message += `   ↳ _Varian: ${optStr}_\n`;
      }
      if (item.notes) {
        message += `   ↳ _Catatan: ${item.notes}_\n`;
      }
    });

    message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL PEMBAYARAN:* ${formatRupiah(cartSubtotal)}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `_Pesanan dibuat otomatis via Web App Kopi Senja_\n`;
    message += `Mohon konfirmasi pesanan dan ketersediaan barista. Terima kasih! 🙏`;

    return message;
  };

  // Handle Checkout via WhatsApp
  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) {
      showToast("Keranjang pesanan masih kosong.");
      return;
    }

    if (!customerName.trim()) {
      showToast("Mohon isi nama pemesan terlebih dahulu");
      const nameInput = document.getElementById("customer-name-input");
      if (nameInput) nameInput.focus();
      return;
    }

    if (soundEnabled) CafeAudio.playSuccess();

    const encodedMsg = encodeURIComponent(generateWhatsAppMessage());
    const waUrl = `https://wa.me/${data.shopInfo.phone}?text=${encodedMsg}`;

    // Open WhatsApp in new tab
    window.open(waUrl, "_blank");

    // Launch simulated interactive order tracker modal
    const tableObj = tables.find(t => t.id === selectedTable);
    setOrderStatusModal({
      orderId: `KS-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerName.trim(),
      orderType,
      tableInfo: orderType === "dine-in" ? `Meja ${tableObj?.number} (${tableObj?.name})` : "Take-away",
      items: [...cart],
      total: cartSubtotal,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      statusStep: 1 // 1: Diterima, 2: Barista Meracik, 3: Siap Disajikan
    });

    setIsCartOpen(false);
  };

  // Filtered Menu Items based on Category and Search
  const filteredMenuItems = useMemo(() => {
    let list = [];
    if (selectedCategory === "all") {
      list = [...data.nugasPackages, ...data.menuItems];
    } else if (selectedCategory === "paket-nugas") {
      list = data.nugasPackages;
    } else {
      list = data.menuItems.filter(item => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q) ||
        (item.itemsIncluded && item.itemsIncluded.some(inc => inc.toLowerCase().includes(q)))
      );
    }
    return list;
  }, [selectedCategory, searchQuery, data]);

  // Filtered Tables based on Zone
  const filteredTables = useMemo(() => {
    if (selectedZone === "all") return tables;
    return tables.filter(t => t.zone === selectedZone);
  }, [selectedZone, tables]);

  // Table Occupancy Stats
  const tableStats = useMemo(() => {
    const available = tables.filter(t => t.status === "available").length;
    const occupied = tables.filter(t => t.status === "occupied").length;
    const reserved = tables.filter(t => t.status === "reserved").length;
    return { available, occupied, reserved, total: tables.length };
  }, [tables]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#3C2A21] selection:bg-[#D48139] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-[#3C2A21] text-[#FAF7F2] px-5 py-3 rounded-2xl shadow-2xl border border-[#D48139]/30 transition-all duration-300 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D48139] animate-pulse"></span>
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Top Banner: Fast Wi-Fi & Remote Work Perks */}
      <div className="bg-[#3C2A21] text-[#FAF7F2] text-xs py-2 px-4 border-b border-[#D48139]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-semibold text-amber-200">Buka Sekarang (08:00 - 23:00)</span>
            <span className="hidden sm:inline text-stone-400">|</span>
            <span className="hidden sm:inline text-stone-300">Sanctuary Nugas & Kopi Terbaik di Sukasari, Bandung</span>
          </div>
          
          <div className="flex items-center gap-3 ml-auto">
            {/* Quick Wi-Fi badge with one-click copy */}
            <button 
              onClick={handleCopyWifi}
              title="Klik untuk salin password Wi-Fi"
              className="flex items-center gap-1.5 bg-[#4A352A] hover:bg-[#5D4336] px-2.5 py-1 rounded-full text-xs transition border border-[#D48139]/30 text-amber-100"
            >
              <Icon name="Wifi" size={13} className="text-amber-400" />
              <span>Wi-Fi 150 Mbps: <strong>{wifiCopied ? "Tersalin! ✓" : data.shopInfo.wifi.pass}</strong></span>
            </button>

            {/* Sound toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Matikan Efek Suara" : "Aktifkan Efek Suara"}
              className="p-1 text-stone-400 hover:text-amber-200 transition"
            >
              <Icon name={soundEnabled ? "Volume2" : "VolumeX"} size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#3C2A21]/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3C2A21] to-[#D48139] flex items-center justify-center text-white shadow-md shadow-[#D48139]/20 group-hover:scale-105 transition-transform">
              <Icon name="Coffee" size={24} className="text-amber-200" />
            </div>
            <div>
              <span className="font-serif-heading text-2xl font-bold tracking-tight text-[#3C2A21] block leading-none">
                Kopi Senja
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#D48139]">
                Coffee & Sanctuary
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#3C2A21]/80">
            <a href="#beranda" className="hover:text-[#D48139] transition">Beranda</a>
            <a href="#paket-nugas" className="hover:text-[#D48139] transition flex items-center gap-1 text-[#D48139] font-semibold">
              <Icon name="Laptop" size={15} /> Paket Nugas
            </a>
            <a href="#menu" className="hover:text-[#D48139] transition">Menu Lengkap</a>
            <a href="#denah-meja" className="hover:text-[#D48139] transition flex items-center gap-1">
              <Icon name="Zap" size={15} className="text-amber-600" /> Status Meja & Colokan
            </a>
            <a href="#tentang" className="hover:text-[#D48139] transition">Tentang</a>
            <a href="#lokasi" className="hover:text-[#D48139] transition">Lokasi & Jam</a>
          </nav>

          {/* Right Action: Cart Button & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-[#3C2A21] hover:bg-[#2B1E17] text-[#FAF7F2] px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 group"
            >
              <div className="relative">
                <Icon name="ShoppingBag" size={18} className="text-amber-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D48139] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#3C2A21] animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Pesanan</span>
              {cartCount > 0 && (
                <span className="text-amber-300 font-semibold border-l border-white/20 pl-2">
                  {formatRupiah(cartSubtotal)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsNavMobileOpen(!isNavMobileOpen)}
              className="md:hidden p-2 rounded-xl text-[#3C2A21] hover:bg-[#F3E8DF] transition"
              aria-label="Toggle menu"
            >
              <Icon name={isNavMobileOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isNavMobileOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-b border-[#3C2A21]/10 px-4 pt-2 pb-6 space-y-3">
            <a 
              href="#beranda" 
              onClick={() => setIsNavMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#3C2A21] hover:bg-[#F3E8DF]"
            >
              Beranda
            </a>
            <a 
              href="#paket-nugas" 
              onClick={() => setIsNavMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-[#D48139] hover:bg-[#F3E8DF] flex items-center gap-2"
            >
              <Icon name="Laptop" size={18} /> Paket Nugas Hemat
            </a>
            <a 
              href="#menu" 
              onClick={() => setIsNavMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#3C2A21] hover:bg-[#F3E8DF]"
            >
              Menu Lengkap
            </a>
            <a 
              href="#denah-meja" 
              onClick={() => setIsNavMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#3C2A21] hover:bg-[#F3E8DF] flex items-center gap-2"
            >
              <Icon name="Zap" size={18} className="text-amber-600" /> Cek Stopkontak & Meja
            </a>
            <a 
              href="#tentang" 
              onClick={() => setIsNavMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#3C2A21] hover:bg-[#F3E8DF]"
            >
              Tentang Kami
            </a>
            <a 
              href="#lokasi" 
              onClick={() => setIsNavMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#3C2A21] hover:bg-[#F3E8DF]"
            >
              Lokasi & Jam Operasional
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="beranda" className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE6] to-[#FAF7F2]">
        
        {/* Subtle Decorative Background Ornaments */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-[#D48139]/10 to-amber-100/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3E8DF] text-[#D48139] font-medium text-xs border border-[#D48139]/20 shadow-sm">
                <Icon name="Sparkles" size={14} className="text-amber-600" />
                <span>Dirancang Khusus Mahasiswa & Remote Worker</span>
              </div>

              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#3C2A21] leading-[1.15]">
                Nikmati Secangkir Kopi <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D48139] via-[#B45309] to-[#3C2A21]">
                  Penuh Cerita & Inspirasi
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#3C2A21]/75 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Suasana hening berpadu aroma biji kopi Nusantara. Dilengkapi <strong>Wi-Fi 150 Mbps</strong>, 
                stopkontak di setiap sudut meja, dan kursi ergonomis agar sesi nugas dan kerjamu mengalir tanpa hambatan.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#menu"
                  className="w-full sm:w-auto px-8 py-4 bg-[#D48139] hover:bg-[#BE6E28] text-white rounded-2xl font-semibold shadow-lg shadow-[#D48139]/30 transition-all hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center gap-2"
                >
                  <Icon name="Coffee" size={20} />
                  <span>Lihat Menu & Pesan</span>
                </a>
                <a
                  href="#denah-meja"
                  className="w-full sm:w-auto px-7 py-4 bg-[#FAF7F2] hover:bg-[#F3E8DF] text-[#3C2A21] border border-[#3C2A21]/20 rounded-2xl font-semibold transition-all hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
                >
                  <Icon name="Zap" size={18} className="text-amber-600" />
                  <span>Cek Colokan & Meja Kosong</span>
                </a>
              </div>

              {/* Highlights Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#3C2A21]/10 text-left">
                <div className="p-3 bg-white/60 rounded-xl border border-[#3C2A21]/5">
                  <div className="flex items-center gap-1.5 text-[#D48139] font-bold text-sm">
                    <Icon name="Wifi" size={16} /> 150 Mbps
                  </div>
                  <div className="text-xs text-[#3C2A21]/70 mt-0.5">Dual-Band Fiber</div>
                </div>
                <div className="p-3 bg-white/60 rounded-xl border border-[#3C2A21]/5">
                  <div className="flex items-center gap-1.5 text-[#D48139] font-bold text-sm">
                    <Icon name="Zap" size={16} /> 40+ Outlets
                  </div>
                  <div className="text-xs text-[#3C2A21]/70 mt-0.5">Colokan Tiap Meja</div>
                </div>
                <div className="p-3 bg-white/60 rounded-xl border border-[#3C2A21]/5">
                  <div className="flex items-center gap-1.5 text-[#D48139] font-bold text-sm">
                    <Icon name="Wind" size={16} /> AC 20°C & Garden
                  </div>
                  <div className="text-xs text-[#3C2A21]/70 mt-0.5">Quiet & Smoking Zone</div>
                </div>
                <div className="p-3 bg-white/60 rounded-xl border border-[#3C2A21]/5">
                  <div className="flex items-center gap-1.5 text-[#D48139] font-bold text-sm">
                    <Icon name="Moon" size={16} /> Buka s.d 23:00
                  </div>
                  <div className="text-xs text-[#3C2A21]/70 mt-0.5">Weekend s.d 24:00</div>
                </div>
              </div>

            </div>

            {/* Right Visual Image & Interactive Live Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Hero Photo */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 aspect-[4/3] sm:aspect-square group">
                  <img
                    src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80"
                    alt="Suasana Hangat Kopi Senja untuk Nugas dan Kopi"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3C2A21]/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Caption on Hero Image */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-[#D48139] rounded text-white uppercase tracking-wider">
                        Live Sanctuary
                      </span>
                      <span className="text-xs text-stone-200">Kopi Senja - Sukasari, Bandung</span>
                    </div>
                    <p className="text-sm font-medium text-stone-100">
                      "Dua hal yang tak pernah padam di sini: lampu meja kerja dan semangat menyelesaikan mimpi."
                    </p>
                  </div>
                </div>

                {/* Floating Live Occupancy Card */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#3C2A21]/10 flex items-center gap-4 max-w-xs">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl relative">
                    <Icon name="Laptop" size={24} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {tableStats.available} Meja Siap Pakai
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      {tableStats.occupied} terisi • Stopkontak siap
                    </div>
                    <a href="#denah-meja" className="text-xs font-semibold text-[#D48139] hover:underline mt-1 inline-block">
                      Pilih meja nugas →
                    </a>
                  </div>
                </div>

                {/* Floating Rating Badge */}
                <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-[#3C2A21]/10 flex items-center gap-2">
                  <span className="text-amber-500 text-base">★</span>
                  <div>
                    <span className="font-bold text-sm text-[#3C2A21]">4.9 / 5.0</span>
                    <span className="text-[10px] text-stone-500 block">500+ Mahasiswa & Coder</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WORK-SESSION BUNDLE SECTION ("PAKET NUGAS") */}
      <section id="paket-nugas" className="py-16 bg-[#F3E8DF]/60 border-y border-[#3C2A21]/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
                <Icon name="Flame" size={14} className="text-amber-600" />
                <span>Paket Spesial Nugas & Remote Work</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3C2A21]">
                Paket Nugas Produktif
              </h2>
              <p className="text-sm sm:text-base text-[#3C2A21]/70 max-w-xl mt-1">
                Kombinasi kopi favorit dan camilan renyah dengan harga hemat. Didesain untuk menemani sesi fokus 2-4 jam tanpa bolak-balik pesan.
              </p>
            </div>
            
            <div className="text-sm text-stone-600 flex items-center gap-2 bg-white/80 px-4 py-2 rounded-xl border border-[#3C2A21]/10 w-fit">
              <Icon name="CheckCircle" size={16} className="text-emerald-600" />
              <span>Termasuk Voucher Password Wi-Fi VIP</span>
            </div>
          </div>

          {/* Bundle Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.nugasPackages.map(pkg => (
              <div 
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#3C2A21]/10 shadow-sm hover-lift flex flex-col relative group"
              >
                {/* Discount Tag */}
                <div className="absolute top-3 left-3 z-10 flex gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-white text-[11px] font-bold shadow-md ${pkg.badgeColor}`}>
                    {pkg.tag}
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-red-600 text-white text-[11px] font-bold shadow-md">
                    {pkg.discount}
                  </span>
                </div>

                {/* Package Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-[#3C2A21] group-hover:text-[#D48139] transition">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* What's included checklist */}
                    <div className="mt-3 pt-3 border-t border-stone-100 space-y-1">
                      {pkg.itemsIncluded.map((inc, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-stone-700 font-medium">
                          <Icon name="Check" size={12} className="text-amber-600 shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs line-through text-stone-400 block leading-tight">
                        {formatRupiah(pkg.originalPrice)}
                      </span>
                      <span className="text-lg font-bold text-[#D48139] leading-tight">
                        {formatRupiah(pkg.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(pkg)}
                      className="px-4 py-2 bg-[#3C2A21] hover:bg-[#D48139] text-white rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <Icon name="Plus" size={14} />
                      <span>Pesan Paket</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LAPTOP-FRIENDLY SEATING MAP & BUSY SEAT STATUS */}
      <section id="denah-meja" className="py-16 bg-[#FAF7F2] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
              <Icon name="Zap" size={14} className="text-amber-600" />
              <span>Real-Time Seat & Outlet Indicator</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3C2A21]">
              Denah Meja & Stopkontak Live
            </h2>
            <p className="text-sm sm:text-base text-[#3C2A21]/70 mt-2">
              Khusus remote worker & mahasiswa: cek ketersediaan stopkontak dan kursi sebelum datang. 
              Pilih meja favoritmu langsung untuk pesanan <strong>Dine-in</strong>!
            </p>
          </div>

          {/* Occupancy Summary & Zone Filter Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#3C2A21]/10 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Live Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span>Tersedia ({tableStats.available})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span>Terisi ({tableStats.occupied})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span>Direservasi ({tableStats.reserved})</span>
              </div>
              <span className="text-stone-300 hidden sm:inline">|</span>
              <span className="text-stone-500 text-[11px]">
                Tip: Klik tombol ⚡ pada meja untuk simulasi ubah status
              </span>
            </div>

            {/* Zone Filter Tabs */}
            <div className="flex items-center bg-[#FAF7F2] p-1 rounded-xl border border-stone-200 w-full md:w-auto">
              <button
                onClick={() => setSelectedZone("all")}
                className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedZone === "all" ? "bg-[#3C2A21] text-white shadow-sm" : "text-stone-600 hover:text-[#3C2A21]"
                }`}
              >
                Semua Zona ({tables.length})
              </button>
              <button
                onClick={() => setSelectedZone("indoor")}
                className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedZone === "indoor" ? "bg-[#3C2A21] text-white shadow-sm" : "text-stone-600 hover:text-[#3C2A21]"
                }`}
              >
                Indoor AC (Quiet Zone)
              </button>
              <button
                onClick={() => setSelectedZone("outdoor")}
                className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedZone === "outdoor" ? "bg-[#3C2A21] text-white shadow-sm" : "text-stone-600 hover:text-[#3C2A21]"
                }`}
              >
                Semi-Outdoor Garden
              </button>
            </div>

          </div>

          {/* Tables Interactive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {filteredTables.map(table => {
              const isSelected = selectedTable === table.id && orderType === "dine-in";
              const isAvailable = table.status === "available";
              const isOccupied = table.status === "occupied";
              const isReserved = table.status === "reserved";

              return (
                <div
                  key={table.id}
                  onClick={() => handleSelectTableFromMap(table)}
                  className={`bg-white rounded-2xl p-4 border-2 transition-all relative cursor-pointer flex flex-col justify-between hover-lift ${
                    isSelected 
                      ? "border-[#D48139] ring-2 ring-[#D48139]/30 bg-amber-50/30" 
                      : isAvailable 
                        ? "border-emerald-200/80 hover:border-emerald-400" 
                        : isOccupied 
                          ? "border-rose-200/70 bg-stone-50/50" 
                          : "border-amber-200 bg-amber-50/20"
                  }`}
                >
                  {/* Top Bar of Table Card */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-8 h-8 rounded-xl bg-[#3C2A21] text-white font-bold text-sm flex items-center justify-center">
                          {table.number}
                        </span>
                        <div>
                          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                            Meja #{table.number}
                          </span>
                          <span className="text-xs font-semibold text-[#3C2A21] block leading-tight">
                            {table.name}
                          </span>
                        </div>
                      </div>

                      {/* Status Indicator Dot */}
                      <div className="flex items-center gap-1">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          isAvailable ? "bg-emerald-500" : isOccupied ? "bg-rose-500" : "bg-amber-500"
                        }`}></span>
                      </div>
                    </div>

                    {/* Zone & Capacity badge */}
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-3">
                      <span className="px-2 py-0.5 rounded bg-stone-100 font-medium">
                        {table.zone === "indoor" ? "❄️ Indoor AC" : "🌿 Garden"}
                      </span>
                      <span>• {table.capacity} Orang</span>
                    </div>

                    {/* Power Outlet Feature - Highlighted */}
                    <div className="p-2.5 rounded-xl bg-orange-50/80 border border-orange-200/60 mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                        <Icon name="Zap" size={14} className="text-amber-600 fill-amber-500" />
                        <span>{table.outlets} Stopkontak</span>
                      </div>
                      <p className="text-[10px] text-stone-600 mt-0.5">
                        {table.outletType}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-1 mb-3">
                      {table.features.map((feat, i) => (
                        <div key={i} className="text-[10px] text-stone-600 flex items-center gap-1">
                          <span className="text-emerald-600">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action & Status */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className={`text-[11px] font-semibold block ${
                        isAvailable ? "text-emerald-700" : isOccupied ? "text-rose-600" : "text-amber-700"
                      }`}>
                        {table.occupantNote}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Simulation quick toggle */}
                      <button
                        onClick={(e) => handleToggleTableOccupancy(table.id, e)}
                        title="Simulasi ubah status meja"
                        className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
                      >
                        <Icon name="RefreshCw" size={12} />
                      </button>

                      {isAvailable && (
                        <button
                          onClick={() => handleSelectTableFromMap(table)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                            isSelected 
                              ? "bg-[#D48139] text-white" 
                              : "bg-[#3C2A21] hover:bg-[#D48139] text-white"
                          }`}
                        >
                          {isSelected ? "Terpilih ✓" : "Pilih"}
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Table Selection Note */}
          <div className="mt-8 bg-amber-50 rounded-2xl p-4 border border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-200/60 text-amber-800 flex items-center justify-center shrink-0">
                <Icon name="CheckCircle" size={20} />
              </div>
              <div className="text-sm">
                <span className="font-bold text-[#3C2A21]">Meja Aktif untuk Pesanan Dine-in: </span>
                <span className="font-semibold text-[#D48139]">
                  {tables.find(t => t.id === selectedTable)?.name || "Belum dipilih"} (Meja #{tables.find(t => t.id === selectedTable)?.number})
                </span>
                <p className="text-xs text-stone-500 mt-0.5">
                  Stopkontak terkonfirmasi aktif, barista akan mengantarkan pesanan langsung ke meja ini.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setOrderType("dine-in");
                setIsCartOpen(true);
              }}
              className="px-5 py-2.5 bg-[#3C2A21] hover:bg-[#D48139] text-white rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap shadow-sm"
            >
              <Icon name="ShoppingBag" size={14} />
              <span>Buka Keranjang Pesanan</span>
            </button>
          </div>

        </div>
      </section>

      {/* FULL INTERACTIVE MENU SECTION */}
      <section id="menu" className="py-16 bg-[#F6EFE6] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D48139]">
              Menu Artisan Kopi Senja
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3C2A21] mt-1">
              Pilihan Sajian Kopi & Makanan
            </h2>
            <p className="text-sm sm:text-base text-[#3C2A21]/70 mt-2">
              Diseduh dari 100% biji kopi pilihan nusantara dan diolah fresh saat dipesan.
            </p>
          </div>

          {/* Search Bar & Category Filter Bar */}
          <div className="space-y-4 mb-10">
            {/* Search Input */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Cari kopi, matcha, pasta, atau croissant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white pl-11 pr-10 py-3.5 rounded-2xl border border-[#3C2A21]/15 text-sm text-[#3C2A21] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D48139] shadow-sm"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                <Icon name="Search" size={18} />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>

            {/* Category Navigation Pills */}
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {data.categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? "bg-[#3C2A21] text-white shadow-md scale-105"
                      : "bg-white text-stone-700 hover:bg-stone-100 border border-[#3C2A21]/10"
                  }`}
                >
                  <Icon name={cat.icon} size={15} />
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          {filteredMenuItems.length === 0 ? (
            <div className="text-center py-16 bg-white/70 rounded-3xl border border-stone-200 max-w-md mx-auto p-8">
              <Icon name="Coffee" size={40} className="mx-auto text-stone-400 mb-3" />
              <h3 className="font-bold text-lg text-stone-800">Menu Tidak Ditemukan</h3>
              <p className="text-xs text-stone-500 mt-1">
                Tidak ada menu yang cocok dengan kata kunci "{searchQuery}". Coba kata kunci lain atau reset filter.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                className="mt-4 px-4 py-2 bg-[#D48139] text-white rounded-xl text-xs font-bold"
              >
                Tampilkan Semua Menu
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMenuItems.map(item => {
                // Check if this item is already in cart
                const itemInCart = cart.find(c => c.id === item.id);

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl overflow-hidden border border-[#3C2A21]/10 shadow-sm hover-lift flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          {item.isBestSeller && (
                            <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-[10px] font-bold shadow-md">
                              ★ Best Seller
                            </span>
                          )}
                          {item.isSignature && (
                            <span className="px-2.5 py-1 rounded-lg bg-[#3C2A21] text-amber-200 text-[10px] font-bold shadow-md">
                              Signature
                            </span>
                          )}
                          {item.category === "paket-nugas" && (
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold shadow-md">
                              ⚡ Paket Nugas
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-base text-[#3C2A21] group-hover:text-[#D48139] transition leading-snug">
                            {item.name}
                          </h3>
                        </div>

                        <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        {/* If it has options */}
                        {item.options && (
                          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg w-fit">
                            <Icon name="SlidersHorizontal" size={11} />
                            <span>Bisa custom gula, es, & oatmilk</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Price & Add Action */}
                    <div className="p-5 pt-0 mt-2 flex items-center justify-between border-t border-stone-100/80 pt-4">
                      <div>
                        <span className="text-[11px] text-stone-400 block font-medium">Harga</span>
                        <span className="text-base font-bold text-[#D48139]">
                          {formatRupiah(item.price)}
                        </span>
                      </div>

                      {/* Action Button: Opens Customization Modal if item has options */}
                      <button
                        onClick={() => {
                          if (item.options) {
                            setCustomizingItem(item);
                          } else {
                            handleAddToCart(item);
                          }
                        }}
                        className="px-4 py-2 bg-[#3C2A21] hover:bg-[#D48139] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        <Icon name="Plus" size={14} />
                        <span>{itemInCart ? `Tambah (${itemInCart.quantity})` : "Tambah"}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="tentang" className="py-16 bg-[#FAF7F2] border-t border-[#3C2A21]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                <Icon name="Heart" size={14} className="text-amber-600" />
                <span>Cerita Kopi Senja</span>
              </div>

              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3C2A21] leading-tight">
                Tempat Singgah untuk Ide, Fokus, dan Hangatnya Diskusi
              </h2>

              <p className="text-sm sm:text-base text-[#3C2A21]/75 leading-relaxed">
                Kopi Senja lahir dari kegelisahan mencari tempat kerja dan belajar yang nyaman tanpa merasa canggung berlama-lama. 
                Kami menyajikan kopi single origin dan house blend terbaik Nusantara—mulai dari Arabica Aceh Gayo washed, Toraja Sapan, hingga Flores Bajawa—dengan profil sangrai berimbang.
              </p>

              <p className="text-sm sm:text-base text-[#3C2A21]/75 leading-relaxed">
                Di sini, meja dirancang luas dengan colokan listrik universal teruji, Wi-Fi berkecepatan tinggi tanpa throttling, 
                serta pencahayaan hangat yang menjaga mata tetap segar meski menatap layar laptop hingga petang.
              </p>

              {/* Barista & Bean Quality Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white rounded-2xl border border-stone-200">
                  <div className="text-2xl font-bold text-[#D48139]">100%</div>
                  <div className="text-xs font-semibold text-stone-700 mt-1">Biji Kopi Nusantara</div>
                  <div className="text-[11px] text-stone-500">Aceh Gayo, Toraja, Flores</div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-stone-200">
                  <div className="text-2xl font-bold text-[#D48139]">Zero Glare</div>
                  <div className="text-xs font-semibold text-stone-700 mt-1">Pencahayaan Hangat</div>
                  <div className="text-[11px] text-stone-500">Nyaman di mata saat nugas</div>
                </div>
              </div>
            </div>

            {/* Facilities Cards Grid */}
            <div className="lg:col-span-6">
              <h3 className="font-bold text-lg text-[#3C2A21] mb-4 flex items-center gap-2">
                <Icon name="CheckCircle" size={18} className="text-amber-600" />
                <span>Fasilitas Lengkap untuk Ketenangan Anda</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.facilities.map((fac, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#D48139] flex items-center justify-center mb-3">
                      <Icon name={fac.icon} size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#3C2A21]">{fac.title}</h4>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                        {fac.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Customer Reviews / Testimonials */}
          <div className="mt-16 pt-12 border-t border-stone-200">
            <h3 className="font-serif-heading text-2xl font-bold text-center text-[#3C2A21] mb-8">
              Kata Mereka yang Sudah Nugas di Kopi Senja
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.reviews.map((rev, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-500 text-sm mb-3">
                      {"★".repeat(rev.rating)}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-stone-100">
                    <img 
                      src={rev.avatar} 
                      alt={rev.name} 
                      className="w-10 h-10 rounded-full object-cover border border-amber-300"
                    />
                    <div>
                      <div className="font-bold text-xs text-[#3C2A21]">{rev.name}</div>
                      <div className="text-[10px] text-stone-500">{rev.role} • {rev.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* LOCATION, HOURS & SOCIAL MEDIA */}
      <section id="lokasi" className="py-16 bg-[#F3E8DF]/70 border-t border-[#3C2A21]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D48139]">
              Kunjungi Kami
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3C2A21] mt-1">
              Lokasi & Jam Operasional
            </h2>
            <p className="text-sm sm:text-base text-[#3C2A21]/70 mt-2">
              Berada di kawasan asri Sukasari, Bandung. Mudah diakses dengan parkir mobil dan motor yang aman.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Information Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col justify-between space-y-6">
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    {data.shopInfo.hours.status}
                  </span>
                  <span className="text-xs text-stone-500">Wi-Fi: {data.shopInfo.wifi.speed}</span>
                </div>

                {/* Address Box */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D48139] flex items-center justify-center shrink-0">
                      <Icon name="MapPin" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#3C2A21]">Alamat Kafe</h4>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        {data.shopInfo.address}
                      </p>
                      <button
                        onClick={handleCopyAddress}
                        className="text-xs font-semibold text-[#D48139] hover:underline mt-1.5 inline-block"
                      >
                        {addressCopied ? "Alamat Tersalin! ✓" : "Salin Alamat Lengkap →"}
                      </button>
                    </div>
                  </div>

                  {/* Hours Box */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D48139] flex items-center justify-center shrink-0">
                      <Icon name="Clock" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#3C2A21]">Jam Operasional</h4>
                      <p className="text-xs text-stone-600 mt-1">
                        {data.shopInfo.hours.weekday}
                      </p>
                      <p className="text-xs text-stone-600">
                        {data.shopInfo.hours.weekend}
                      </p>
                    </div>
                  </div>

                  {/* Contact WhatsApp */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Icon name="Phone" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#3C2A21]">Kontak & Reservasi</h4>
                      <p className="text-xs text-stone-600 mt-1">
                        WhatsApp: <strong>{data.shopInfo.phoneDisplay}</strong>
                      </p>
                      <a
                        href={`https://wa.me/${data.shopInfo.phone}?text=Halo%20Kopi%20Senja%2C%20saya%20ingin%20bertanya`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-emerald-600 hover:underline mt-1 inline-block"
                      >
                        Chat Langsung via WhatsApp →
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-stone-100">
                <span className="text-xs font-bold text-stone-500 block mb-3 uppercase tracking-wider">
                  Ikuti Keseruan Kami
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 transition"
                  >
                    <Icon name="Instagram" size={15} />
                    <span>{data.shopInfo.socials.instagram}</span>
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 transition"
                  >
                    <Icon name="Share2" size={15} />
                    <span>{data.shopInfo.socials.tiktok}</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Interactive Map Visual Placeholder */}
            <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm relative min-h-[380px] flex flex-col">
              
              {/* Map Preview Graphic */}
              <div className="relative flex-1 bg-stone-200 overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                  alt="Peta Lokasi Kopi Senja Sukasari Bandung"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                
                {/* Floating Map Pin Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <div className="relative inline-block">
                    <div className="w-14 h-14 rounded-full bg-[#3C2A21] text-amber-300 border-4 border-white shadow-2xl flex items-center justify-center animate-bounce">
                      <Icon name="Coffee" size={26} />
                    </div>
                    <div className="w-4 h-4 bg-[#3C2A21] rotate-45 mx-auto -mt-2"></div>
                  </div>
                  <div className="bg-[#3C2A21] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg mt-1 whitespace-nowrap">
                    Kopi Senja Sukasari
                  </div>
                </div>

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-stone-800 shadow">
                  📍 5 Menit dari Kampus Terdekat
                </div>
              </div>

              {/* Map Footer Action */}
              <div className="p-4 bg-white border-t border-stone-100 flex items-center justify-between">
                <div className="text-xs text-stone-600">
                  <span className="font-semibold text-stone-900">Google Maps Terverifikasi</span> • Rute Ramah Mobil & Motor
                </div>
                <a
                  href={data.shopInfo.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#D48139] hover:bg-[#BE6E28] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  <Icon name="Navigation" size={14} />
                  <span>Buka di Google Maps</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#231812] text-[#FAF7F2] pt-14 pb-8 border-t border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
            
            {/* Brand column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#D48139] flex items-center justify-center text-white font-bold">
                  <Icon name="Coffee" size={22} />
                </div>
                <div>
                  <span className="font-serif-heading text-2xl font-bold tracking-tight text-white block">
                    Kopi Senja
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-amber-300">
                    Sukasari • Bandung
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 max-w-sm leading-relaxed">
                Tempat berlabuh bagi para pencari fokus, pencipta karya, dan penikmat kopi senja. 
                Secangkir kopi, stopkontak terjamin, dan koneksi internet tanpa batas.
              </p>
              <div className="text-xs text-amber-200">
                ⚡ 100% Meja Dilengkapi Colokan Listrik
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                Navigasi Cepat
              </h4>
              <ul className="space-y-2 text-xs text-stone-300">
                <li><a href="#beranda" className="hover:text-amber-200 transition">Beranda</a></li>
                <li><a href="#paket-nugas" className="hover:text-amber-200 transition">Paket Nugas Hemat</a></li>
                <li><a href="#menu" className="hover:text-amber-200 transition">Menu Makanan & Kopi</a></li>
                <li><a href="#denah-meja" className="hover:text-amber-200 transition">Status Stopkontak Meja</a></li>
                <li><a href="#tentang" className="hover:text-amber-200 transition">Tentang Kami</a></li>
                <li><a href="#lokasi" className="hover:text-amber-200 transition">Lokasi & Jam Kafe</a></li>
              </ul>
            </div>

            {/* Order & Contact info */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                Pesanan & Bantuan
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Ingin pesan meja untuk kerja kelompok atau meeting? Hubungi kami langsung melalui WhatsApp barista.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${data.shopInfo.phone}?text=Halo%20Kopi%20Senja%2C%20saya%20ingin%20reservasi%20meja`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow"
                >
                  <Icon name="MessageCircle" size={15} />
                  <span>Chat WhatsApp Barista</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Back to Top */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <div>
              © 2026 Kopi Senja. Dibuat dengan cinta untuk mahasiswa & remote worker.
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-stone-300 hover:text-amber-300 flex items-center gap-1.5 transition"
            >
              <span>Kembali ke Atas</span>
              <Icon name="ArrowUp" size={14} />
            </button>
          </div>
        </div>
      </footer>

      {/* FLOATING / DRAWER SHOPPING CART */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          ></div>

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FAF7F2] text-[#3C2A21] shadow-2xl flex flex-col drawer-slide-in">
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#3C2A21]/10 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-[#D48139] flex items-center justify-center font-bold">
                    <Icon name="ShoppingBag" size={18} />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-[#3C2A21]">Keranjang Pesanan</h2>
                    <span className="text-[11px] text-stone-500 block">
                      {cartCount} item dipilih • Disimpan otomatis
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      title="Kosongkan keranjang"
                      className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg transition"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg transition"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                {/* Empty State */}
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-700 mx-auto flex items-center justify-center">
                      <Icon name="Coffee" size={36} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-stone-800">Keranjang Masih Kosong</h3>
                      <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1 leading-relaxed">
                        Pilih paket nugas atau kopi favoritmu dari menu untuk mulai memesan.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 bg-[#D48139] text-white rounded-xl text-xs font-bold shadow hover:bg-[#BE6E28] transition"
                    >
                      Mulai Pilih Menu
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Cart Items List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-stone-600 uppercase tracking-wider">
                        <span>Daftar Menu ({cart.length})</span>
                        <span className="text-emerald-700 font-semibold lowercase">✓ tersimpan otomatis</span>
                      </div>

                      {cart.map(item => (
                        <div
                          key={item.uniqueKey}
                          className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-sm flex items-start gap-3"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-100"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-[#3C2A21] truncate">
                              {item.name}
                            </h4>

                            {/* Customized Options if any */}
                            {item.options && Object.keys(item.options).length > 0 && (
                              <p className="text-[10px] text-amber-800 mt-0.5 line-clamp-1">
                                {Object.values(item.options).join(" • ")}
                              </p>
                            )}

                            {/* Item Notes */}
                            {item.notes && (
                              <p className="text-[10px] text-stone-500 italic mt-0.5">
                                "{item.notes}"
                              </p>
                            )}

                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs font-bold text-[#D48139]">
                                {formatRupiah(item.price * item.quantity)}
                              </span>

                              {/* Quantity Stepper */}
                              <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-0.5">
                                <button
                                  onClick={() => handleUpdateQuantity(item.uniqueKey, -1)}
                                  className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-white transition text-xs font-bold"
                                >
                                  -
                                </button>
                                <span className="text-xs font-bold w-4 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.uniqueKey, 1)}
                                  className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-white transition text-xs font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Details Form */}
                    <div className="bg-white p-4 rounded-2xl border border-stone-200/80 space-y-4">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-stone-600">
                        Detail Pemesan & Meja
                      </h4>

                      {/* Customer Name Input */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Nama Pemesan <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="customer-name-input"
                          type="text"
                          placeholder="Contoh: Dimas / Nabila"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#D48139]"
                        />
                      </div>

                      {/* Order Type Toggle */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Tipe Pesanan
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setOrderType("dine-in")}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                              orderType === "dine-in"
                                ? "bg-[#3C2A21] text-white shadow"
                                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                            }`}
                          >
                            <Icon name="Coffee" size={14} />
                            <span>Dine-in (Di Tempat)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setOrderType("take-away")}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                              orderType === "take-away"
                                ? "bg-[#3C2A21] text-white shadow"
                                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                            }`}
                          >
                            <Icon name="ShoppingBag" size={14} />
                            <span>Take-away (Bawa)</span>
                          </button>
                        </div>
                      </div>

                      {/* Dine-in Table Selector */}
                      {orderType === "dine-in" && (
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-semibold text-stone-700">
                              Pilih Meja Nugas (Dengan Stopkontak)
                            </label>
                            <a href="#denah-meja" onClick={() => setIsCartOpen(false)} className="text-[11px] text-[#D48139] hover:underline">
                              Lihat Denah →
                            </a>
                          </div>
                          
                          <select
                            value={selectedTable}
                            onChange={(e) => setSelectedTable(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#D48139]"
                          >
                            {tables.map(t => (
                              <option 
                                key={t.id} 
                                value={t.id}
                                disabled={t.status === "occupied"}
                              >
                                Meja #{t.number} - {t.name} ({t.outlets} Colokan) {t.status === "occupied" ? "[TERISI]" : "[TERSEDIA]"}
                              </option>
                            ))}
                          </select>

                          {/* Selected Table Detail Note */}
                          {(() => {
                            const cur = tables.find(t => t.id === selectedTable);
                            if (!cur) return null;
                            return (
                              <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200/60 text-[11px] text-amber-900 flex items-center gap-2">
                                <Icon name="Zap" size={14} className="text-amber-600 shrink-0" />
                                <div>
                                  <strong>{cur.name}:</strong> Dilengkapi {cur.outlets} colokan ({cur.outletType}). Barista akan mengantar langsung.
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      )}

                      {/* Notes Input */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Catatan Tambahan (Opsional)
                        </label>
                        <input
                          type="text"
                          placeholder="Misal: Kurangi es batu, tolong sediakan colokan sambung"
                          value={orderNotes}
                          onChange={(e) => setOrderNotes(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#D48139]"
                        />
                      </div>

                    </div>
                  </>
                )}

              </div>

              {/* Drawer Footer / Checkout CTA */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#3C2A21]/10 bg-white space-y-3">
                  
                  {/* Price Summary */}
                  <div className="space-y-1.5 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span>Subtotal Pesanan</span>
                      <span>{formatRupiah(cartSubtotal)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>Biaya Layanan & Wi-Fi</span>
                      <span>Gratis (Rp 0)</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#3C2A21] pt-2 border-t border-stone-200">
                      <span>Total Pembayaran</span>
                      <span className="text-[#D48139] text-base">{formatRupiah(cartSubtotal)}</span>
                    </div>
                  </div>

                  {/* Primary Action Button: Send via WhatsApp */}
                  <button
                    onClick={handleCheckoutWhatsApp}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Icon name="MessageCircle" size={18} />
                    <span>Pesan via WhatsApp</span>
                  </button>

                  <p className="text-[10px] text-center text-stone-400">
                    Otomatis membuat pesan rapi ke WhatsApp Barista Kopi Senja
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ITEM CUSTOMIZATION MODAL */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200">
            
            <div className="relative aspect-[16/9] bg-stone-100">
              <img
                src={customizingItem.image}
                alt={customizingItem.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setCustomizingItem(null)}
                className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-1.5 rounded-full text-stone-700 hover:bg-white transition"
              >
                <Icon name="X" size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-bold text-lg text-[#3C2A21]">
                  Custom {customizingItem.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {customizingItem.description}
                </p>
                <span className="text-base font-bold text-[#D48139] block mt-2">
                  {formatRupiah(customizingItem.price)}
                </span>
              </div>

              {/* Dynamic options selector */}
              {customizingItem.options && (
                <div className="space-y-3 pt-2">
                  {Object.entries(customizingItem.options).map(([optKey, optValues]) => (
                    <div key={optKey}>
                      <span className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Pilihan {optKey}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {optValues.map(val => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => {
                              setCustomizingItem(prev => ({
                                ...prev,
                                chosenOptions: {
                                  ...(prev.chosenOptions || {}),
                                  [optKey]: val
                                }
                              }));
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                              (customizingItem.chosenOptions?.[optKey] || optValues[0]) === val
                                ? "bg-[#3C2A21] text-white border-[#3C2A21]"
                                : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCustomizingItem(null)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const defaultOptions = {};
                    if (customizingItem.options) {
                      Object.entries(customizingItem.options).forEach(([k, v]) => {
                        defaultOptions[k] = customizingItem.chosenOptions?.[k] || v[0];
                      });
                    }
                    handleAddToCart(customizingItem, defaultOptions);
                    setCustomizingItem(null);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#D48139] hover:bg-[#BE6E28] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
                >
                  <Icon name="Plus" size={15} />
                  <span>Tambahkan ke Keranjang</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ORDER SIMULATION / TRACKING MODAL */}
      {orderTrackingData && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-fadeIn">
            
            {/* Header with success badge */}
            <div className="bg-gradient-to-r from-[#3C2A21] to-[#D48139] p-6 text-white text-center relative">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md text-amber-200 mx-auto flex items-center justify-center mb-3">
                <Icon name="CheckCircle" size={32} />
              </div>
              <h3 className="font-serif-heading text-2xl font-bold">
                Pesanan Berhasil Dikirim!
              </h3>
              <p className="text-xs text-amber-100 mt-1">
                Kode Pesanan: <strong className="font-mono text-white text-sm">{orderTrackingData.orderId}</strong>
              </p>

              <button
                onClick={() => setOrderStatusModal(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-1"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Stepper Status Tracker */}
            <div className="p-6 space-y-6">
              
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-3">
                  Status Pesanan Real-Time Barista
                </span>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-800 block">1. Pesanan Diterima Barista</span>
                      <span className="text-[10px] text-stone-500">Pesan WhatsApp terkirim ke sistem kasir</span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#D48139] text-white flex items-center justify-center text-xs font-bold animate-pulse">
                      ☕
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-800 block">2. Barista Sedang Menyeduh</span>
                      <span className="text-[10px] text-stone-500">Estimasi waktu penyajian: 5 - 8 menit</span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-center gap-3 opacity-60">
                    <div className="w-7 h-7 rounded-full bg-stone-300 text-stone-600 flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-800 block">3. Siap Diantar ke Meja Anda</span>
                      <span className="text-[10px] text-stone-500">{orderTrackingData.tableInfo}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Receipt Summary */}
              <div className="space-y-2 text-xs border-t border-stone-100 pt-4">
                <div className="flex justify-between text-stone-500">
                  <span>Nama Pemesan:</span>
                  <span className="font-bold text-stone-800">{orderTrackingData.customerName}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Tipe / Lokasi:</span>
                  <span className="font-bold text-stone-800">{orderTrackingData.tableInfo}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Total Bayar:</span>
                  <span className="font-bold text-[#D48139] text-sm">{formatRupiah(orderTrackingData.total)}</span>
                </div>
              </div>

              {/* Wi-Fi Credential Reminder while waiting */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                <div>
                  <span className="font-bold block">Sambil Menunggu Kopi:</span>
                  <span className="text-[11px] text-stone-600">Password Wi-Fi 150 Mbps: <strong>{data.shopInfo.wifi.pass}</strong></span>
                </div>
                <button
                  onClick={handleCopyWifi}
                  className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 rounded-lg text-[10px] font-bold text-amber-900 transition"
                >
                  Salin
                </button>
              </div>

              <button
                onClick={() => setOrderStatusModal(null)}
                className="w-full py-3 bg-[#3C2A21] hover:bg-[#2B1E17] text-white rounded-xl text-xs font-bold transition"
              >
                Tutup & Lanjut Nugas
              </button>

            </div>

          </div>
        </div>
      )}

      {/* Mobile Sticky Quick Order / Cart Bar */}
      {cartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-30 md:hidden animate-bounce">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#3C2A21] text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-[#D48139]/40"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#D48139] text-white text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
              <span className="text-xs font-bold">Lihat Pesanan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-300 text-sm font-bold">{formatRupiah(cartSubtotal)}</span>
              <Icon name="ChevronRight" size={16} />
            </div>
          </button>
        </div>
      )}

    </div>
  );
}

// Mount React Root
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(App));
}
