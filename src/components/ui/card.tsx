import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative rounded-2xl text-sm text-card-foreground transition-[box-shadow,transform,border-color] duration-300",
  {
    variants: {
      variant: {
        default: "border border-border bg-card",
        glass:
          "border border-white/10 backdrop-blur-xl bg-card/70 shadow-[0_20px_60px_-20px_oklch(0_0_0_/_0.45)]",
        elevated:
          "border border-border/50 bg-card shadow-[0_20px_60px_-20px_oklch(0_0_0_/_0.5)]",
        outline: "border border-border bg-transparent",
        glow:
          "border border-primary/25 bg-card shadow-[0_0_0_1px_oklch(0.72_0.18_215_/_0.15),0_20px_60px_-20px_oklch(0.72_0.18_215_/_0.35)]",
        interactive:
          "border border-border bg-card cursor-pointer hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_oklch(0.72_0.18_215_/_0.35)]",
        gradient:
          "border border-border/50 bg-gradient-to-br from-card via-card to-muted/40",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

type CardProps = React.ComponentProps<"div"> & VariantProps<typeof cardVariants>;

export function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1 p-5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-base font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-5 pb-5", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center rounded-b-2xl border-t border-border/60 bg-muted/40 p-4",
        className
      )}
      {...props}
    />
  );
}
