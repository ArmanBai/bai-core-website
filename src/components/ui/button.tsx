"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
        gradient:
          "text-primary-foreground shadow-md hover:shadow-lg bg-gradient-to-r from-[oklch(0.65_0.2_215)] via-[oklch(0.6_0.22_260)] to-[oklch(0.65_0.22_310)] bg-[length:200%_100%] bg-left hover:bg-right transition-[background-position] duration-500",
        glow:
          "bg-primary text-primary-foreground shadow-[0_0_0_1px_oklch(0.72_0.18_215_/_0.35),0_8px_30px_-6px_oklch(0.72_0.18_215_/_0.7)] hover:shadow-[0_0_0_1px_oklch(0.72_0.18_215_/_0.55),0_14px_40px_-6px_oklch(0.72_0.18_215_/_1)]",
        outline:
          "border-border bg-transparent hover:bg-accent/60 hover:text-accent-foreground hover:border-border/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        ghost: "hover:bg-accent/60 hover:text-accent-foreground",
        soft:
          "bg-primary/10 text-primary hover:bg-primary/20 border-primary/15",
        terminal:
          "btn-terminal bg-background text-primary border border-primary/30 font-mono hover:border-primary/60 hover:shadow-[0_0_24px_-4px_oklch(0.72_0.18_215_/_0.5)]",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-9 gap-2 px-3.5 text-sm",
        xs: "h-6 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-2.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 px-4 text-sm",
        xl: "h-12 gap-2.5 rounded-xl px-6 text-base [&_svg:not([class*='size-'])]:size-5",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-10",
        "icon-xl": "size-12 rounded-xl [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
            {children}
            {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
          </>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
