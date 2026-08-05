import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border-primary/25",
        outline: "border-border text-foreground bg-transparent",
        ghost: "text-foreground border-transparent",
        solid: "bg-primary text-primary-foreground border-transparent",
        gradient:
          "text-primary-foreground border-transparent bg-gradient-to-r from-[oklch(0.65_0.2_215)] via-[oklch(0.6_0.22_260)] to-[oklch(0.65_0.22_310)]",
        success: "bg-success/10 text-success border-success/25",
        warning: "bg-warning/15 text-warning border-warning/30",
        destructive: "bg-destructive/10 text-destructive border-destructive/25",
        "mono-dim": "bg-white/5 text-muted-foreground border-white/10 font-mono",
      },
      size: {
        sm: "h-4 px-1.5 text-[10px]",
        default: "h-5",
        lg: "h-6 px-2.5 text-[13px]",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export function StatusDot({
  tone = "success",
  className,
}: {
  tone?: "success" | "warning" | "destructive" | "primary";
  className?: string;
}) {
  const map = {
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
    primary: "bg-primary",
  } as const;
  return (
    <span className={cn("relative inline-flex h-1.5 w-1.5", className)} aria-hidden="true">
      <span className={cn("absolute inset-0 rounded-full opacity-75 animate-ping", map[tone])} />
      <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", map[tone])} />
    </span>
  );
}

export { badgeVariants };
