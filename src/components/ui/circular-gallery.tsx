import React, { useState, useEffect, useRef, useCallback, HTMLAttributes } from 'react';
import { MapPin, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Define the type for a single gallery item
export interface GalleryItem {
  id?: string;
  common: string;
  binomial: string;
  category?: string;
  location?: string;
  rating?: number;
  photo: {
    url: string; 
    text: string;
    pos?: string;
    by: string;
  };
  onClick?: () => void;
}

// Define the props for the CircularGallery component
export interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not interacting. */
  autoRotateSpeed?: number;
  cardClassName?: string;
  showControls?: boolean;
  onItemClick?: (item: GalleryItem, index: number) => void;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 360, autoRotateSpeed = 0.04, showControls = true, cardClassName, onItemClick, ...props }, ref) => {
    const count = items.length;
    const anglePerItem = count > 0 ? 360 / count : 60;

    // Continuous rotation physics matching CurvedSneakerRack
    const [rotation, setRotation] = useState(0);
    const posRef = useRef(0);
    const targetPosRef = useRef(0);
    const velocityRef = useRef(0);
    const isInteractingRef = useRef(false);
    const rafRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Mouse parallax tracking
    const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

    // Fluid critically damped spring physics loop (120 FPS glide)
    const updatePhysics = useCallback(() => {
      const diff = targetPosRef.current - posRef.current;

      if (Math.abs(diff) < 0.01 && Math.abs(velocityRef.current) < 0.01 && !isInteractingRef.current) {
        posRef.current = targetPosRef.current;
        setRotation(posRef.current);
        rafRef.current = null;
        return;
      }

      posRef.current += diff * 0.1 + velocityRef.current;
      velocityRef.current *= 0.88; // inertia damping

      setRotation(posRef.current);
      rafRef.current = requestAnimationFrame(updatePhysics);
    }, []);

    const startPhysics = useCallback(() => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updatePhysics);
      }
    }, [updatePhysics]);

    const rotateToAngle = useCallback((newAngle: number) => {
      targetPosRef.current = newAngle;
      startPhysics();
    }, [startPhysics]);

    const stepPrev = (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      isInteractingRef.current = true;
      const currentSnap = Math.round(targetPosRef.current / anglePerItem);
      rotateToAngle((currentSnap + 1) * anglePerItem);
      setTimeout(() => { isInteractingRef.current = false; }, 800);
    };

    const stepNext = (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      isInteractingRef.current = true;
      const currentSnap = Math.round(targetPosRef.current / anglePerItem);
      rotateToAngle((currentSnap - 1) * anglePerItem);
      setTimeout(() => { isInteractingRef.current = false; }, 800);
    };

    // Drag / Swipe handling with inertia fling (identical to Sneaker Rack)
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragLastX = useRef(0);
    const dragStartRotation = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
      isDragging.current = true;
      isInteractingRef.current = true;
      dragStartX.current = e.clientX;
      dragLastX.current = e.clientX;
      dragStartRotation.current = posRef.current;
      velocityRef.current = 0;
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      isDragging.current = true;
      isInteractingRef.current = true;
      dragStartX.current = e.touches[0].clientX;
      dragLastX.current = e.touches[0].clientX;
      dragStartRotation.current = posRef.current;
      velocityRef.current = 0;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      const clientX = e.touches[0].clientX;
      const deltaX = clientX - dragStartX.current;
      const instantaneousDelta = clientX - dragLastX.current;
      dragLastX.current = clientX;

      velocityRef.current = instantaneousDelta * 0.45;
      targetPosRef.current = dragStartRotation.current + deltaX * 0.45;
      startPhysics();
    };

    const handleTouchEnd = () => {
      if (isDragging.current) {
        isDragging.current = false;
        // Project inertia and snap
        const projected = targetPosRef.current + velocityRef.current * 4;
        const nearestSnap = Math.round(projected / anglePerItem) * anglePerItem;
        rotateToAngle(nearestSnap);
        setTimeout(() => { isInteractingRef.current = false; }, 800);
      }
    };

    // Global Mouse Listeners for smooth drag without loss of capture
    useEffect(() => {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        const deltaX = e.clientX - dragStartX.current;
        const instantaneousDelta = e.clientX - dragLastX.current;
        dragLastX.current = e.clientX;

        velocityRef.current = instantaneousDelta * 0.45;
        targetPosRef.current = dragStartRotation.current + deltaX * 0.45;
        startPhysics();
      };

      const handleGlobalMouseUp = () => {
        if (isDragging.current) {
          isDragging.current = false;
          // Smooth fling release and snap
          const projected = targetPosRef.current + velocityRef.current * 4;
          const nearestSnap = Math.round(projected / anglePerItem) * anglePerItem;
          rotateToAngle(nearestSnap);
          setTimeout(() => { isInteractingRef.current = false; }, 800);
        }
      };

      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }, [anglePerItem, rotateToAngle, startPhysics]);

    // Horizontal Trackpad / Wheel listener (exact Sneaker Rack scroll logic)
    const lastWheelTime = useRef(0);
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.1 && Math.abs(e.deltaX) > 6) {
          e.preventDefault();
          const now = Date.now();
          if (now - lastWheelTime.current < 120) return;

          lastWheelTime.current = now;
          isInteractingRef.current = true;
          const step = e.deltaX > 0 ? -1 : 1;
          const currentSnap = Math.round(targetPosRef.current / anglePerItem);
          rotateToAngle((currentSnap + step) * anglePerItem);

          setTimeout(() => { isInteractingRef.current = false; }, 900);
        }
      };

      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }, [anglePerItem, rotateToAngle]);

    // Gentle ambient auto-rotation when idle
    useEffect(() => {
      const autoInterval = setInterval(() => {
        if (!isInteractingRef.current && !isDragging.current) {
          targetPosRef.current += autoRotateSpeed * 2.5;
          posRef.current += autoRotateSpeed * 2.5;
          setRotation(posRef.current);
        }
      }, 16);

      return () => clearInterval(autoInterval);
    }, [autoRotateSpeed]);

    // Parallax mouse tilt
    const handleContainerMouseMove = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseTilt({ x: x * 6, y: -y * 6 });
    };

    const handleContainerMouseLeave = () => {
      setMouseTilt({ x: 0, y: 0 });
    };

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="region"
        aria-label="Circular 3D Gallery"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseMove={handleContainerMouseMove}
        onMouseLeave={handleContainerMouseLeave}
        className={cn(
          "relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-visible",
          className
        )}
        style={{ perspective: '1600px' }}
        {...props}
      >
        {/* Left & Right Step Buttons */}
        {showControls && (
          <>
            <button
              onClick={stepPrev}
              aria-label="Previous Slide"
              className="absolute left-4 sm:left-8 z-30 size-11 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200 shadow-xl flex items-center justify-center text-zinc-900 hover:bg-[#ccff00] hover:scale-110 active:scale-95 transition cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={stepNext}
              aria-label="Next Slide"
              className="absolute right-4 sm:right-8 z-30 size-11 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200 shadow-xl flex items-center justify-center text-zinc-900 hover:bg-[#ccff00] hover:scale-110 active:scale-95 transition cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        <div
          className="relative w-full h-full pointer-events-auto"
          style={{
            transform: `rotateX(${mouseTilt.y}deg) rotateY(${rotation + mouseTilt.x}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging.current ? 'none' : 'transform 0.05s linear',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            
            // True 3D Depth Opacity & Lighting for the full 360 ring
            const opacity = Math.max(0.45, 1 - (normalizedAngle / 240));

            return (
              <div
                key={`${item.photo.url}-${i}`} 
                role="group"
                aria-label={item.common}
                onClick={(e) => {
                  e.stopPropagation();
                  // Clicking any card rotates it smoothly to front center!
                  isInteractingRef.current = true;
                  rotateToAngle(-itemAngle);
                  setTimeout(() => { isInteractingRef.current = false; }, 800);
                  if (item.onClick) item.onClick();
                  if (onItemClick) onItemClick(item, i);
                }}
                className={cn(
                  "absolute w-[195px] sm:w-[225px] h-[270px] sm:h-[305px] transition-all duration-300 cursor-pointer",
                  cardClassName
                )}
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-98px',
                  marginTop: '-135px',
                  opacity: opacity,
                  transformStyle: 'preserve-3d',
                  zIndex: Math.round(100 - normalizedAngle),
                }}
              >
                {/* ========================================================================= */}
                {/* FRONT FACE: Editorial Card with Details */}
                {/* ========================================================================= */}
                <div 
                  className="group absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 bg-zinc-900 cursor-pointer transition-transform duration-300 hover:scale-105 flex flex-col justify-end p-4 sm:p-5"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {/* Photo */}
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  
                  {/* Cinematic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                  {/* Top Location Pill Badge */}
                  {item.location && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[9px] font-extrabold text-black border border-zinc-200 flex items-center gap-1 shadow-xs">
                        <MapPin className="size-2.5 text-[#65a30d]" />
                        {item.location}
                      </span>
                    </div>
                  )}

                  {/* Bottom details */}
                  <div className="relative z-10 space-y-1.5">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#ccff00] block truncate">
                      {item.photo.text} • {item.photo.by}
                    </span>
                    <h3 
                      className="text-sm sm:text-base font-bold text-white group-hover:text-[#ccff00] transition uppercase leading-tight line-clamp-2"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {item.common}
                    </h3>
                    
                    <div className="pt-1.5 border-t border-white/20 flex items-center justify-between">
                      <div className="min-w-0 pr-2">
                        <span className="text-[9px] text-zinc-300 block">Featured</span>
                        <span className="text-[11px] font-bold text-white block truncate">{item.binomial}</span>
                      </div>
                      <div className="size-7 shrink-0 rounded-full bg-[#ccff00] text-black flex items-center justify-center group-hover:scale-110 transition shadow-xs">
                        <ArrowUpRight className="size-3.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* BACK FACE (When viewed in 3D Background Circle): Sleek Photo & Vault Seal */}
                {/* ========================================================================= */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-zinc-300/40 bg-zinc-950 flex flex-col items-center justify-center p-4"
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
                  
                  <div className="relative z-10 text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] block font-bold">
                      DENCLUB VAULT
                    </span>
                    <span className="text-[10px] font-bold text-zinc-200 block uppercase">
                      {item.location || item.photo.text}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
export default CircularGallery;
