// Lucide SVG Icons for Kopi Senja
// Pure SVG components compatible with React 18, zero external dependencies needed!

(function() {
  const h = React.createElement;

  const defaultSvgProps = (size, className) => ({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className || ""
  });

  const icons = {
    Coffee: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M10 2v2" }),
      h("path", { d: "M14 2v2" }),
      h("path", { d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12Z" }),
      h("path", { d: "M6 2v2" }),
      h("path", { d: "M17 10h1a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3h-1" })
    ),
    Laptop: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" })
    ),
    Wifi: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M12 20h.01" }),
      h("path", { d: "M2 8.82a15 15 0 0 1 20 0" }),
      h("path", { d: "M5 12.859a10 10 0 0 1 14 0" }),
      h("path", { d: "M8.5 16.429a5 5 0 0 1 7 0" })
    ),
    Zap: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" })
    ),
    CupSoda: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "m6 8 1.75 12.28A2 2 0 0 0 9.74 22h4.52a2 2 0 0 0 1.99-1.72L18 8" }),
      h("path", { d: "M5 8h14" }),
      h("path", { d: "M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0" }),
      h("path", { d: "m12 8 1-6h2" })
    ),
    Sparkles: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" }),
      h("path", { d: "M5 3v4" }),
      h("path", { d: "M19 17v4" }),
      h("path", { d: "M3 5h4" }),
      h("path", { d: "M17 19h4" })
    ),
    Cookie: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" }),
      h("path", { d: "M8.5 8.5v.01" }),
      h("path", { d: "M16 15.5v.01" }),
      h("path", { d: "M12 12v.01" }),
      h("path", { d: "M11 17v.01" }),
      h("path", { d: "M7 14v.01" })
    ),
    UtensilsCrossed: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8Z" }),
      h("path", { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" }),
      h("path", { d: "m2.1 21.8 6.4-6.3" }),
      h("path", { d: "m19 5-7 7" })
    ),
    ShoppingBag: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" }),
      h("path", { d: "M3 6h18" }),
      h("path", { d: "M16 10a4 4 0 0 1-8 0" })
    ),
    Check: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("polyline", { points: "20 6 9 17 4 12" })
    ),
    CheckCircle: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
      h("polyline", { points: "22 4 12 14.01 9 11.01" })
    ),
    Flame: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" })
    ),
    Clock: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("circle", { cx: "12", cy: "12", r: "10" }),
      h("polyline", { points: "12 6 12 12 16 14" })
    ),
    Wind: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" }),
      h("path", { d: "M9.6 4.6A2 2 0 1 1 11 8H2" }),
      h("path", { d: "M12.6 19.4A2 2 0 1 0 14 16H2" })
    ),
    Moon: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" })
    ),
    Volume2: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
      h("path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" }),
      h("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14" })
    ),
    VolumeX: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
      h("line", { x1: "22", x2: "16", y1: "9", y2: "15" }),
      h("line", { x1: "16", x2: "22", y1: "9", y2: "15" })
    ),
    Car: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" }),
      h("circle", { cx: "7", cy: "17", r: "2" }),
      h("path", { d: "M9 17h6" }),
      h("circle", { cx: "17", cy: "17", r: "2" })
    ),
    Heart: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" })
    ),
    Search: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("circle", { cx: "11", cy: "11", r: "8" }),
      h("path", { d: "m21 21-4.3-4.3" })
    ),
    X: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M18 6 6 18" }),
      h("path", { d: "m6 6 12 12" })
    ),
    Plus: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M5 12h14" }),
      h("path", { d: "M12 5v14" })
    ),
    Trash2: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "3 6h18" }),
      h("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
      h("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }),
      h("line", { x1: "10", x2: "10", y1: "11", y2: "17" }),
      h("line", { x1: "14", x2: "14", y1: "11", y2: "17" })
    ),
    SlidersHorizontal: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("line", { x1: "21", x2: "14", y1: "4", y2: "4" }),
      h("line", { x1: "10", x2: "3", y1: "4", y2: "4" }),
      h("line", { x1: "21", x2: "12", y1: "12", y2: "12" }),
      h("line", { x1: "8", x2: "3", y1: "12", y2: "12" }),
      h("line", { x1: "21", x2: "16", y1: "20", y2: "20" }),
      h("line", { x1: "12", x2: "3", y1: "20", y2: "20" }),
      h("line", { x1: "14", x2: "14", y1: "2", y2: "6" }),
      h("line", { x1: "8", x2: "8", y1: "10", y2: "14" }),
      h("line", { x1: "16", x2: "16", y1: "18", y2: "22" })
    ),
    MapPin: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }),
      h("circle", { cx: "12", cy: "10", r: "3" })
    ),
    Phone: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })
    ),
    Instagram: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5" }),
      h("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
      h("line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5" })
    ),
    Share2: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("circle", { cx: "18", cy: "5", r: "3" }),
      h("circle", { cx: "6", cy: "12", r: "3" }),
      h("circle", { cx: "18", cy: "19", r: "3" }),
      h("line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49" }),
      h("line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49" })
    ),
    Navigation: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("polygon", { points: "3 11 22 2 13 21 11 13 3 11" })
    ),
    MessageCircle: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" })
    ),
    ArrowUp: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "m5 12 7-7 7 7" }),
      h("path", { d: "M12 19V5" })
    ),
    ChevronRight: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "m9 18 6-6-6-6" })
    ),
    RefreshCw: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
      h("path", { d: "M21 3v5h-5" }),
      h("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
      h("path", { d: "M8 16H3v5" })
    ),
    Menu: ({ size = 18, className }) => h("svg", defaultSvgProps(size, className),
      h("line", { x1: "4", x2: "20", y1: "12", y2: "12" }),
      h("line", { x1: "4", x2: "20", y1: "6", y2: "6" }),
      h("line", { x1: "4", x2: "20", y1: "18", y2: "18" })
    )
  };

  window.AppIcons = icons;
})();
