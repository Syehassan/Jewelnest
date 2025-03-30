"use client";

import { motion } from "framer-motion";

interface JewelryItemProps {
  type?: number; // 0: diamond, 1: ring, 2: pendant
  size?: number;
  glowIntensity?: number;
  glowColor?: string;
}

export default function JewelryItem({
  type = 0,
  size = 60,
  glowIntensity = 0.7,
  glowColor = "#ff9cf7",
}: JewelryItemProps) {
  // Choose the jewelry shape based on type
  const renderJewelry = () => {
    switch (type) {
      case 0: // Diamond
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L22 10L12 22L2 10L12 2Z"
              fill="rgba(255, 255, 255, 0.9)"
              stroke={glowColor}
              strokeWidth="0.5"
            />
            <path
              d="M12 2L22 10H2L12 2Z"
              fill="rgba(255, 255, 255, 0.7)"
              stroke={glowColor}
              strokeWidth="0.5"
            />
            <path
              d="M2 10L12 22L22 10H2Z"
              fill="rgba(255, 255, 255, 0.8)"
              stroke={glowColor}
              strokeWidth="0.5"
            />
          </svg>
        );

      case 1: // Ring
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="8"
              fill="rgba(255, 255, 255, 0.1)"
              stroke={glowColor}
              strokeWidth="1.5"
            />
            <circle
              cx="12"
              cy="12"
              r="5"
              fill="rgba(255, 255, 255, 0.8)"
              stroke={glowColor}
              strokeWidth="0.5"
            />
            <circle cx="12" cy="9" r="1.5" fill={glowColor} fillOpacity="0.8" />
          </svg>
        );

      case 2: // Pendant
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3V6"
              stroke={glowColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M12 6C16.4183 6 20 9.58172 20 14C20 18.4183 16.4183 22 12 22C7.58172 22 4 18.4183 4 14C4 9.58172 7.58172 6 12 6Z"
              fill="rgba(255, 255, 255, 0.8)"
              stroke={glowColor}
              strokeWidth="0.5"
            />
            <circle cx="12" cy="14" r="3" fill={glowColor} fillOpacity="0.6" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        style={{
          backgroundColor: glowColor,
          opacity: glowIntensity * 0.5,
        }}
        animate={{
          opacity: [
            glowIntensity * 0.3,
            glowIntensity * 0.7,
            glowIntensity * 0.3,
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 2 + Math.random() * 2,
          ease: "easeInOut",
        }}
      />

      {/* Jewelry item */}
      <motion.div
        animate={{
          rotate: [0, 10, 0, -10, 0],
          scale: [1, 1.05, 1, 0.95, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 5 + Math.random() * 3,
          ease: "easeInOut",
        }}
      >
        {renderJewelry()}
      </motion.div>
    </div>
  );
}
