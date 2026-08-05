"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type Line = {
  prompt?: string;
  text: string;
  delay?: number;
  tone?: "default" | "comment" | "output" | "success" | "accent";
};

const defaultLines: Line[] = [
  { prompt: "~/baicore", text: "init", tone: "accent", delay: 400 },
  { text: "// Company BAI Core", tone: "comment", delay: 400 },
  { prompt: "~/baicore", text: "npm run build - SaaS", tone: "accent", delay: 800 },
  { text: "✓ TenderCRM.kz deployed", tone: "success", delay: 700 },
  { prompt: "~/baicore", text: "analyze --your.business", tone: "accent", delay: 900 },
];

const TONE_CLASS: Record<NonNullable<Line["tone"]>, string> = {
  default: "text-foreground",
  comment: "text-muted-foreground",
  output: "text-primary",
  success: "text-[color:var(--data)]",
  accent: "text-foreground",
};

export function TerminalTypewriter({
  lines = defaultLines,
  className,
  charSpeed = 22,
}: {
  lines?: Line[];
  className?: string;
  charSpeed?: number;
}) {
  const [rendered, setRendered] = useState<Line[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    if (currentIdx >= lines.length) {
      // restart loop after pause
      const t = setTimeout(() => {
        setRendered([]);
        setCurrentText("");
        setCurrentIdx(0);
        setLoopKey((k) => k + 1);
      }, 3800);
      return () => clearTimeout(t);
    }

    const line = lines[currentIdx];
    const delay = line.delay ?? 300;

    if (currentText.length < line.text.length) {
      const t = setTimeout(
        () => setCurrentText(line.text.slice(0, currentText.length + 1)),
        charSpeed
      );
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setRendered((r) => [...r, { ...line, text: currentText }]);
      setCurrentText("");
      setCurrentIdx((i) => i + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [currentIdx, currentText, lines, charSpeed]);

  const inProgressLine = lines[currentIdx];

  return (
    <motion.div
      key={loopKey}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-background/60 backdrop-blur-xl font-mono text-[12px] sm:text-[13px] shadow-2xl",
        className
      )}
    >
      {/* Chrome */}
      <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-white/10 bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 text-[10px] text-muted-foreground/70 tracking-wider">
          bash · ~/baicore
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-muted-foreground/60">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-[color:var(--data)] opacity-70 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--data)]" />
          </span>
          live
        </span>
      </div>

      {/* Body */}
      <div className="p-3 sm:p-5 space-y-1.5 min-h-[150px] sm:min-h-[180px]">
        {rendered.map((l, i) => (
          <div key={i} className="flex items-start gap-2">
            {l.prompt && (
              <span className="text-primary/70 shrink-0">
                <span className="text-muted-foreground/60">❯</span> {l.prompt}
              </span>
            )}
            <span className={cn(TONE_CLASS[l.tone ?? "default"])}>
              {l.prompt ? <span className="text-muted-foreground">$ </span> : null}
              {l.text}
            </span>
          </div>
        ))}

        {inProgressLine && (
          <div className="flex items-start gap-2">
            {inProgressLine.prompt && (
              <span className="text-primary/70 shrink-0">
                <span className="text-muted-foreground/60">❯</span> {inProgressLine.prompt}
              </span>
            )}
            <span className={cn(TONE_CLASS[inProgressLine.tone ?? "default"])}>
              {inProgressLine.prompt ? <span className="text-muted-foreground">$ </span> : null}
              {currentText}
              <span className="inline-block w-2 h-4 -mb-0.5 ml-0.5 bg-primary align-middle animate-pulse" />
            </span>
          </div>
        )}
      </div>

      {/* Scan line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 3px)",
        }}
      />
    </motion.div>
  );
}
