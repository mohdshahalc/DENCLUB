import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCoverflow } from './components/HeroCoverflow';
import { SneakerVaultCarousel } from './components/SneakerVaultCarousel';
import { CurvedSneakerRack } from './components/CurvedSneakerRack';
import { ProductGrid } from './components/ProductGrid';
import { TechLab } from './components/TechLab';
import { Lookbook } from './components/Lookbook';
import { InteractivePlayground } from './components/InteractivePlayground';
import { SizeGuide } from './components/SizeGuide';
import { ReviewsSection } from './components/ReviewsSection';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { Footer } from './components/Footer';
import { DENCLUB_SHOES } from './data/shoes';
import type { ShoeProduct, CartItem } from './types/store';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('denclub_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('denclub_wishlist');
      return saved ? JSON.parse(saved) : ['den-01', 'den-04'];
    } catch {
      return ['den-01', 'den-04'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewShoe, setQuickViewShoe] = useState<ShoeProduct | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('denclub_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('denclub_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const handleAddToCart = (product: ShoeProduct, size?: number) => {
    const chosenSize = size || product.sizes[0];
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.size === chosenSize);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { product, size: chosenSize, color: product.colors[0], quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart(prev => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-[#ccff00] selection:text-black">
      {/* Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectShoe={(shoe) => setQuickViewShoe(shoe)}
        shoes={DENCLUB_SHOES}
      />

      {/* Main Landing Sections */}
      <main className="flex-1">
        {/* 1. Cinematic Hero Section */}
        <HeroCoverflow
          onQuickView={(shoe) => setQuickViewShoe(shoe)}
          onAddToCart={(shoe) => handleAddToCart(shoe)}
        />

        {/* 2. 3D Sneaker Vault Coverflow Section */}
        <SneakerVaultCarousel
          onQuickView={(shoe) => setQuickViewShoe(shoe)}
          onAddToCart={(shoe) => handleAddToCart(shoe)}
        />

        {/* 3. True 3D Curved Spatial Sneaker Rack */}
        <CurvedSneakerRack
          onQuickView={(shoe) => setQuickViewShoe(shoe)}
          onAddToCart={(shoe) => handleAddToCart(shoe)}
        />

        {/* 4. Interactive Catalog / Product Grid */}
        <ProductGrid
          shoes={DENCLUB_SHOES}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(shoe) => setQuickViewShoe(shoe)}
          onAddToCart={(shoe, size) => handleAddToCart(shoe, size)}
        />

        {/* 3. Sole Architecture & Tech Lab */}
        <TechLab />

        {/* 4. 360° Sneaker Customizer & Interactive Atelier */}
        <InteractivePlayground
          onAddToCart={(shoe) => handleAddToCart(shoe)}
          onQuickView={(shoe) => setQuickViewShoe(shoe)}
        />

        {/* 5. Global Street Lookbook */}
        <Lookbook
          shoes={DENCLUB_SHOES}
          onQuickView={(shoe) => setQuickViewShoe(shoe)}
        />

        {/* 6. Fit & Size Finder */}
        <SizeGuide />

        {/* 7. Community Reviews & VIP Alerts */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Shopping Bag */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        shoe={quickViewShoe}
        onClose={() => setQuickViewShoe(null)}
        onAddToCart={(shoe, size) => handleAddToCart(shoe, size)}
      />
    </div>
  );
}
