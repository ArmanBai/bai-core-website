"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

/**
 * Circuit-network particle field. Renders as absolute-positioned canvas;
 * parent should be `relative`. Low density on mobile.
 */
export function ParticleField({
  id = "circuit-field",
  className,
  density = 70,
}: {
  id?: string;
  className?: string;
  density?: number;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: 48,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    particles: {
      number: {
        value: density,
        density: { enable: true, width: 1600, height: 900 },
      },
      color: { value: ["#22d3ee", "#a5b4fc"] },
      shape: { type: "circle" },
      opacity: { value: { min: 0.15, max: 0.5 } },
      size: { value: { min: 1, max: 2 } },
      links: {
        enable: true,
        distance: 120,
        color: "#22d3ee",
        opacity: 0.15,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "bounce" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.45 } },
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
  };

  if (!ready) return null;

  return (
    <div
      className={className ?? "absolute inset-0 pointer-events-none"}
      aria-hidden="true"
    >
      <Particles id={id} options={options} />
    </div>
  );
}
