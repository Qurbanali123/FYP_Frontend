"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";

const ICONS = [
  { id: 1, symbol: "🔒" },
  { id: 2, symbol: "🛡️" },
  { id: 3, symbol: "01" },
  { id: 4, symbol: "AI" },
  { id: 5, symbol: "🤖" },
  { id: 6, symbol: "ML" },
  { id: 7, symbol: "🔐" },
  { id: 9, symbol: "🧬" },
  { id: 10, symbol: "🧠" },
  { id: 11, symbol: "⚙️" },
  { id: 12, symbol: "🛰️" },
];

const neonShadow = `
  0 0 2px #00b8ff,
  0 0 4px #00b8ff,
  0 0 6px #00a0c0,
  0 0 8px #008080,
  0 0 12px #006080
`;

interface FloatingIcon {
  id: number;
  symbol: string;
  top: string;
  left: string;
}

export default function Hero() {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: false });

  useEffect(() => {
    const iconsWithPositions = ICONS.map(icon => ({
      ...icon,
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
    }));
    setFloatingIcons(iconsWithPositions);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #000a1f 0%, #001f3f 70%, #003d66 100%)",
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #000a1f 0%, #001f3f 70%, #003d66 100%)",
            "linear-gradient(225deg, #000a1f 0%, #001f3f 70%, #004d5c 100%)",
            "linear-gradient(45deg, #000a1f 0%, #001f3f 70%, #003d66 100%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div>

      {/* Glowing orbs background */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#006699] to-[#004d5c] rounded-full blur-3xl"
        style={{ opacity: 0.08 }}
        animate={{
          x: [0, 50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-l from-[#001f3f] to-[#006699] rounded-full blur-3xl"
        style={{ opacity: 0.08 }}
        animate={{
          x: [0, -60, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/bg2.png')`,
          opacity: 0.08,
        }}
      ></div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-0"></div>

      {/* Animated lines decoration */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00b8ff] to-transparent opacity-30"
        animate={{ scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
      ></motion.div>

      <motion.div
        className="absolute bottom-1/4 right-0 w-full h-1 bg-gradient-to-l from-transparent via-[#14b8a6] to-transparent opacity-30"
        animate={{ scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      ></motion.div>

      {/* Floating Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {floatingIcons.map((icon, index) => (
          <motion.div
            key={icon.id}
            className="absolute flex items-center justify-center rounded-full backdrop-blur-sm"
            style={{
              width: 40,
              height: 40,
              top: icon.top,
              left: icon.left,
              fontSize: icon.symbol.length === 2 ? "13px" : "18px",
              fontWeight: "bold",
              opacity: 0.3,
              color: "white",
              background: "linear-gradient(135deg, rgba(0,184,255,0.4), rgba(20,184,166,0.3))",
              boxShadow: "0 0 20px rgba(0,184,255,0.4), inset 0 0 20px rgba(0,184,255,0.2)",
              border: "1px solid rgba(0,184,255,0.5)",
            }}
            animate={{
              x: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 120, 0],
              y: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 120, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 14 + index * 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {icon.symbol}
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 text-center">
        <div className="relative flex flex-col items-center justify-center py-20 gap-6">
          {/* Decorative element above title */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00b8ff] to-transparent rounded-full"
            animate={{ scaleX: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          ></motion.div>

          {/* Enhanced Title */}
          <div ref={titleRef} className="relative">
            <motion.div
              className="text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-block relative"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: isInView ? 0 : 60, opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.7, delay: 0, type: "spring", stiffness: 100 }}
              >
                <span style={{ textShadow: neonShadow }}>Fake</span>
                <motion.span
                  className="ml-3 bg-gradient-to-r from-[#00b8ff] via-[#14b8a6] to-[#00b8ff] text-transparent bg-clip-text"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  Detection
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Glow effect behind title */}
            <motion.div
              className="absolute inset-0 blur-3xl -z-10"
              style={{
                background: "linear-gradient(135deg, rgba(0,184,255,0.4), rgba(20,184,166,0.3))",
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            ></motion.div>
          </div>

          {/* Enhanced Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm md:text-base text-white/90 drop-shadow-lg"
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xl">✓</span>
              <span>Verify Products</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xl">⛓️</span>
              <span>Blockchain Trust</span>
            </motion.div>
          </motion.div>



          {/* Enhanced Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-20 justify-center mt-4 w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Customer Verification Button */}
            <Link href="/customer-dashboard" className="w-full sm:w-auto">
              <motion.div
                className="relative w-full sm:w-64 h-48 rounded-3xl cursor-pointer overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Button background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#004080] via-[#00b8ff] to-[#14b8a6] shadow-2xl rounded-3xl"></div>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00b8ff] via-[#14b8a6] to-[#00b8ff] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl"
                  animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                ></motion.div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 rounded-3xl bg-gradient-to-br from-[#004080]/90 via-[#00b8ff]/90 to-[#14b8a6]/90 group-hover:from-[#004080] group-hover:via-[#00b8ff] group-hover:to-[#14b8a6] transition-all duration-300">
                  <motion.div
                    className="text-3xl md:text-4xl mb-2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🔍
                  </motion.div>
                  <div className="text-lg md:text-xl font-bold text-white">Verify Product</div>
                  <div className="text-xs md:text-sm text-white/80 mt-1">Scan & Authenticate</div>
                </div>
              </motion.div>
            </Link>

            {/* Seller Product Button */}
            <Link href="/register/seller" className="w-full sm:w-auto">
              <motion.div
                className="relative w-full sm:w-64 h-48 rounded-3xl cursor-pointer overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Button background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#004080] via-[#00b8ff] to-[#14b8a6] shadow-2xl rounded-3xl"></div>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#14b8a6] via-[#00b8ff] to-[#14b8a6] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl"
                  animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                ></motion.div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 rounded-3xl bg-gradient-to-br from-[#004080]/90 via-[#00b8ff]/90 to-[#14b8a6]/90 group-hover:from-[#004080] group-hover:via-[#00b8ff] group-hover:to-[#14b8a6] transition-all duration-300">
                  <motion.div
                    className="text-3xl md:text-4xl mb-2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    📦
                  </motion.div>
                  <div className="text-lg md:text-xl font-bold text-white">Add Your Product</div>
                  <div className="text-xs md:text-sm text-white/80 mt-1">Blockchain Registration</div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom decoration */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      ></motion.div>
    </section>
  );
}
