# DENCLUB — Footwear Atelier & Streetwear Platform

A modern luxury streetwear and sneaker e-commerce web application featuring high-end 3D spatial interactive showroom displays, GSAP physics animations, Coverflow carousel, and responsive shopping cart architecture.

---

## ⚡ Features & Visual Highlights

- **Cinematic Scroll-Driven Hero Section**:
  - Pinned full-screen viewport with hardware-accelerated 3D parallax.
  - Floating dual sneakers (`Volt V2 Carbon High-Top` & `Apex X Runner`) with scroll-linked flight paths and kinetic typography.

- **3D Sneaker Vault**:
  - Interactive Coverflow Carousel with 5 perspective matrix presets (`Hyper 3D`, `Cinematic`, `Street Rake`, `Minimal`, `Flat`).
  - Smooth wheel scrub, drag, and click-to-center selection.

- **True 3D Curved Sneaker Rack**:
  - Cylindrical 3D arc showroom display with individual shoe depth and ground contact shadows.
  - Click-to-center rotational navigation with focused center spotlight.

- **360° Customizer Studio & Telemetry Lab**:
  - GSAP Draggable turntable (`type: "rotation"`).
  - Horizontal material chassis scrubber (`type: "x"`).
  - Free-floating draggable NFC club hangtags (`type: "x,y"`).

- **Full E-Commerce Core**:
  - Interactive catalog & product grid with filtering.
  - Slide-over Cart Drawer with local storage persistence.
  - Quick View 360° inspection modal.
  - Fit & Size guide calculator and community reviews.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Vanilla CSS 3D Transforms
- **Animations & Physics**: GSAP (Draggable, ScrollTrigger, Inertia) + Lucide Icons + Sharp
- **Design Tokens**: Clean Luxury White Theme (`#ffffff`), Obsidian Black (`#09090b`), Electric Volt Lime (`#ccff00` / `#84cc16`)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 📄 License
MIT
