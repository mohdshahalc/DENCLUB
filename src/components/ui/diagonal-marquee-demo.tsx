"use client";

import React from "react";
import DiagonalMarqueeCarousel from "@/components/ui/great-ui-diagonal-marquee-carousel";

export default function DiagonalMarqueeCarouselPreview() {
  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-3xl">
      <DiagonalMarqueeCarousel className="absolute -inset-5 h-[calc(100%+2.5rem)] max-h-none w-[calc(100%+2.5rem)] max-w-none" />
    </div>
  );
}
