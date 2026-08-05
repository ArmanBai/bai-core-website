"use client";

import { motion } from "framer-motion";

import { BaiLogo } from "./logo";

/**
 * Hero chip visual - layered SVG with glow + breathing + 8 orbital dots
 * symmetrically distributed around the chip.
 */
export function HeroChip() {
  const DOT_COUNT = 8;

  return (
    <div
      className="relative"
      style={{
        width: "clamp(240px, 28vw, 400px)",
        aspectRatio: "1/1",
      }}
    >
      {/* Back glow */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-full blur-[60px] bg-gradient-to-br from-cyan-400/40 via-indigo-500/40 to-violet-500/40" />
      </motion.div>

      {/* Rotating conic ring */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[10%] rounded-full opacity-40"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, rgba(34,211,238,0.6), transparent 40%, rgba(167,139,250,0.6), transparent 70%, rgba(34,211,238,0.4), transparent)",
          filter: "blur(22px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />

      {/* Outer orbital dots - 8 symmetric, rotating clockwise */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% 50%" }}
      >
        {Array.from({ length: DOT_COUNT }).map((_, i) => {
          const deg = (360 / DOT_COUNT) * i;
          return (
            <span
              key={i}
              className="absolute block h-1.5 w-1.5 rounded-full bg-cyan-300"
              style={{
                top: "50%",
                left: "50%",
                marginTop: "-3px",
                marginLeft: "-3px",
                transform: `rotate(${deg}deg) translateY(-45%)`,
                transformOrigin: "center center",
                boxShadow: "0 0 10px 2px rgba(34,211,238,0.7)",
              }}
            />
          );
        })}
      </motion.div>

      {/* Inner 4 dots, counter-rotating */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% 50%" }}
      >
        {Array.from({ length: 4 }).map((_, i) => {
          const deg = (360 / 4) * i + 45;
          return (
            <span
              key={i}
              className="absolute block h-1 w-1 rounded-full bg-violet-300"
              style={{
                top: "50%",
                left: "50%",
                marginTop: "-2px",
                marginLeft: "-2px",
                transform: `rotate(${deg}deg) translateY(-32%)`,
                transformOrigin: "center center",
                boxShadow: "0 0 8px 1px rgba(167,139,250,0.8)",
              }}
            />
          );
        })}
      </motion.div>

      {/* The logo - absolutely centred */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        animate={{ y: [0, -4, 0], scale: [1, 1.015, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 22px rgba(34,211,238,0.35))" }}
      >
        <div
          style={{
            width: "clamp(200px, 24vw, 320px)",
            aspectRatio: "1/1",
          }}
        >
          <BaiLogo animated className="text-primary w-full h-full" size={320} />
        </div>
      </motion.div>
    </div>
  );
}
