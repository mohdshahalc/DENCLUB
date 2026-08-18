"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  url: string;
  title: string;
}

export interface DiagonalMarqueeCarouselProps {
  cards?: CardItem[];
  angle?: number;
  baseSpeed?: number;
  alternateDirections?: boolean;
  className?: string;
  cardClassName?: string;
  fadeClassName?: string;
}

const DEFAULT_CARDS: CardItem[] = [
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&h=600&fit=crop&q=80",
    title: "DEN Volt Streetwear",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop&q=80",
    title: "DEN Apex Carbon",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=600&fit=crop&q=80",
    title: "DEN Retro Horizon",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=600&fit=crop&q=80",
    title: "DEN Stealth Runner",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=600&fit=crop&q=80",
    title: "DEN Solar Flare",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=600&fit=crop&q=80",
    title: "DEN Minimalist Court",
  },
];

const Card = ({ card, className }: { card: CardItem; className?: string }) => {
  return (
    <div
      className={cn(
        "group relative h-[300px] w-[400px] shrink-0 cursor-pointer overflow-hidden rounded-xl shadow-2xl",
        className,
      )}
    >
      <img
        src={card.url}
        alt={card.title}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

const MarqueeRow = ({
  cards,
  speed,
  direction,
  cardClassName,
}: {
  cards: CardItem[];
  speed: number;
  direction: 1 | -1;
  cardClassName?: string;
}) => {
  const animationClass =
    direction === -1 ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={cn(
          "flex shrink-0 cursor-pointer hover:[animation-play-state:paused]",
          animationClass,
        )}
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0">
          {cards.map((card, idx) => (
            <div key={`${card.id}-${idx}`} className="shrink-0 pr-8">
              <Card card={card} className={cardClassName} />
            </div>
          ))}
        </div>
        <div className="flex shrink-0">
          {cards.map((card, idx) => (
            <div key={`${card.id}-${idx}-copy`} className="shrink-0 pr-8">
              <Card card={card} className={cardClassName} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function DiagonalMarqueeCarousel({
  cards = DEFAULT_CARDS,
  angle = -25,
  baseSpeed = 120,
  alternateDirections = true,
  className = "",
  cardClassName = "",
  fadeClassName = "",
}: DiagonalMarqueeCarouselProps) {
  const rotationStyle = {
    transform: `rotate(${angle}deg)`,
  };

  const rowCards = [...cards, ...cards, ...cards];
  const rowCardsReverse = [...rowCards].reverse();

  return (
    <div
      className={cn(
        "relative flex h-screen w-full items-center justify-center overflow-hidden bg-white",
        className,
      )}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marquee-left var(--speed) linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right var(--speed) linear infinite;
        }
      `,
        }}
      />
      <div
        className="absolute z-0 flex w-[200vw] flex-col gap-8"
        style={rotationStyle}
      >
        <MarqueeRow
          cards={rowCards}
          speed={baseSpeed}
          direction={-1}
          cardClassName={cardClassName}
        />
        <MarqueeRow
          cards={rowCardsReverse}
          speed={baseSpeed - 15 > 20 ? baseSpeed - 15 : 30}
          direction={alternateDirections ? 1 : -1}
          cardClassName={cardClassName}
        />
        <MarqueeRow
          cards={rowCards}
          speed={baseSpeed + 15}
          direction={-1}
          cardClassName={cardClassName}
        />
        <MarqueeRow
          cards={rowCardsReverse}
          speed={baseSpeed - 6 > 20 ? baseSpeed - 6 : 35}
          direction={alternateDirections ? 1 : -1}
          cardClassName={cardClassName}
        />
        <MarqueeRow
          cards={rowCards}
          speed={baseSpeed + 24}
          direction={-1}
          cardClassName={cardClassName}
        />
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-gradient-to-b from-white via-white/80 to-transparent",
          fadeClassName,
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-white via-white/90 to-transparent",
          fadeClassName,
        )}
      />
    </div>
  );
}

export { DiagonalMarqueeCarousel };

/**
 * Great UI Component
 *
 * Built with React, TypeScript, Tailwind CSS, and Framer Motion.
 * Designed to be accessible, customizable, and production-ready.
 *
 * Website: https://great-ui.com
 * GitHub: https://github.com/Saurabh-2607/GreatUI
 * X (Great UI): https://x.com/GreatUIHQ
 *
 * Released under the MIT License.
 * Contributions, issues, and feature requests are always welcome.
 *
 * Author: Saurabh Sharma
 * X: https://x.com/srbh_s
 */
