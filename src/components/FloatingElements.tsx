"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import JewelryItem from "./JewelryItem";

interface FloatingElementsProps {
  count?: number;
  scrollFactor?: number;
}

export default function FloatingElements({
  count = 10,
  scrollFactor = 0.5,
}: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Generate random positions for jewelry items
  const items = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 30 + Math.random() * 70,
    rotationSpeed: 0.2 + Math.random() * 0.8,
    floatSpeed: 0.5 + Math.random() * 1.5,
    delay: Math.random() * 2,
    type: Math.floor(Math.random() * 3), // 0: diamond, 1: ring, 2: pendant
  }));

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[1200px] overflow-hidden bg-black"
    >
      {items.map((item) => {
        const xMovement = useTransform(
          scrollYProgress,
          [0, 1],
          [item.x, item.x + (Math.random() * 40 - 20) * scrollFactor],
        );

        const yMovement = useTransform(
          scrollYProgress,
          [0, 1],
          [item.y, item.y + (Math.random() * 60 - 30) * scrollFactor],
        );

        return (
          <motion.div
            key={item.id}
            className="absolute"
            style={{
              x: `${xMovement}%`,
              y: `${yMovement}%`,
              zIndex: Math.floor(item.size),
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [0, 360 * item.rotationSpeed],
              y: [`${item.y}%`, `${item.y + 5}%`, `${item.y}%`],
            }}
            transition={{
              rotate: {
                repeat: Infinity,
                duration: 20 / item.rotationSpeed,
                ease: "linear",
              },
              y: {
                repeat: Infinity,
                duration: 5 / item.floatSpeed,
                ease: "easeInOut",
                delay: item.delay,
              },
              opacity: { duration: 1, delay: item.delay * 0.5 },
              scale: { duration: 1, delay: item.delay * 0.5 },
            }}
          >
            <JewelryItem
              type={item.type}
              size={item.size}
              glowIntensity={0.6 + Math.random() * 0.4}
              glowColor={
                [
                  "#ff9cf7", // pink
                  "#7df9ff", // cyan
                  "#ffdf00", // gold
                ][item.type]
              }
            />
          </motion.div>
        );
      })}
    </div>
  );
}
