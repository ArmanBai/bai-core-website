"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Magnetic - a wrapper that attracts its child towards the cursor when
 * the mouse is within `radius`. Perfect for CTAs and navigation items.
 *
 * Usage:
 *   <Magnetic>
 *     <Button>...</Button>
 *   </Magnetic>
 */
export function Magnetic({
  children,
  strength = 0.3,
  radius = 100,
  className,
  ...rest
}: {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 300, damping: 18, mass: 0.3 });

  function handleMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
