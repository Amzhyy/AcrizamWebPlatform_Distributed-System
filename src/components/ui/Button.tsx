import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", glow = false, children, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full overflow-hidden";
    
    const variants = {
      primary: "bg-slate-900 text-white hover:bg-primary-600",
      secondary: "bg-white text-slate-900 border border-slate-200 hover:border-primary-500 hover:text-primary-600 shadow-sm",
      outline: "bg-transparent text-slate-700 border border-slate-300 hover:border-slate-400",
      ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
    };

    const sizes = {
      sm: "text-sm px-4 py-2",
      md: "text-base px-6 py-2.5",
      lg: "text-lg px-8 py-3",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], glow && "glow-effect", className)}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {variant === "primary" && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/0 via-white/20 to-primary-600/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
