"use client";

import { ReactNode } from "react";
import Hero from "./Hero";
import FloatingElements from "./FloatingElements";
import IPhoneSection from "./IPhoneSection";

interface ParallaxContainerProps {
  children?: ReactNode;
}

export default function ParallaxContainer({
  children,
}: ParallaxContainerProps) {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Floating Jewelry Elements */}
      <FloatingElements count={15} scrollFactor={0.8} />

      {/* iPhone Collection Section */}
      <IPhoneSection />

      {/* Additional content */}
      {children}
    </div>
  );
}
