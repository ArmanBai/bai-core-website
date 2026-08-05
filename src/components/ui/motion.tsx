"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type HTMLMotionProps,
  type Transition,
} from "framer-motion";

import { cn } from "@/lib/utils";

export const easeSmooth: Transition["ease"] = [0.22, 1, 0.36, 1];
export const easeOutExpo: Transition["ease"] = [0.16, 1, 0.3, 1];

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  once?: boolean;
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 0,
  x = 0,
  once = true,
  className,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount: 0 }}
      transition={{ duration, delay, ease: easeSmooth }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({
  children,
  delay = 0,
  duration = 0.7,
  distance = 24,
  className,
  ...rest
}: FadeInProps & { distance?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration, delay, ease: easeOutExpo }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({
  value,
  duration = 1.4,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const displayed = useTransform(spring, (latest) =>
    `${prefix}${latest.toLocaleString("ru-RU", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    })}${suffix}`
  );

  React.useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  return <motion.span ref={ref} className={className}>{displayed}</motion.span>;
}

/**
 * CursorSpotlight - radial glow that follows the cursor within a container.
 * Add to any <div className="relative group">.
 */
export function CursorSpotlight({
  color = "oklch(0.72 0.18 215 / 0.15)",
  size = 520,
  className,
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(-size);
  const y = useMotionValue(-size);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => {
        x.set(-size);
        y.set(-size);
      }}
      className={cn("pointer-events-auto absolute inset-0", className)}
      aria-hidden="true"
    >
      <motion.div
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(closest-side, ${color}, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}
