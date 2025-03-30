"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import JewelryItem from "./JewelryItem";

export default function IPhoneSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Check if section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Generate jewelry items that will flow into the phone
  const jewelryItems = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100 - 50, // -50 to 50
    initialY: Math.random() * 100 - 150, // -150 to -50 (above the viewport)
    size: 20 + Math.random() * 40,
    delay: 0.1 + Math.random() * 0.5,
    type: Math.floor(Math.random() * 3), // 0: diamond, 1: ring, 2: pendant
  }));

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background glow */}

      {/* iPhone mockup */}
      <motion.div
        className="relative z-10"
        style={{
          y: phoneY,
          scale: phoneScale,
          opacity: phoneOpacity,
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent" />
        <div className="w-[280px] h-[580px] bg-gray-900 rounded-[40px] border-4 border-gray-800 shadow-2xl overflow-hidden relative">
          {/* iPhone notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-xl z-20" />

          {/* iPhone screen */}
          <div className="w-full h-full bg-gradient-to-b from-purple-900/40 to-black p-2 flex items-center justify-center">
            <motion.div
              className="text-white text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: 1.2 }}
            >
              <h3 className="text-xl font-bold mb-2">Collection Complete</h3>
              <p className="text-sm text-gray-300">Your digital jewelry box</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
      {/* Floating jewelry that flows into the phone */}
      {jewelryItems.map((item) => (
        <motion.div
          key={item.id}
          className="absolute left-1/2 top-1/2"
          initial={{
            x: item.initialX,
            y: item.initialY,
            opacity: 0,
            scale: 0,
          }}
          animate={
            isInView
              ? {
                  x: 0,
                  y: 0,
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                }
              : {}
          }
          transition={{
            duration: 2.5,
            delay: item.delay,
            ease: "easeInOut",
            opacity: { times: [0, 0.2, 0.8, 1] },
            scale: { times: [0, 0.2, 0.8, 1] },
          }}
        >
          <JewelryItem
            type={item.type}
            size={item.size}
            glowIntensity={0.8}
            glowColor={
              [
                "#ff9cf7", // pink
                "#7df9ff", // cyan
                "#ffdf00", // gold
              ][item.type]
            }
          />
        </motion.div>
      ))}
    </div>
  );
}
