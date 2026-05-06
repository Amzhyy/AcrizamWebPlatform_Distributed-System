import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  glass?: boolean;
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = false, hover = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -5, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)" } : undefined}
        className={cn(
          "rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden",
          glass && "glass-panel",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
