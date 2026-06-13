"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      hover = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "bg-white border border-gray-100",
      elevated: "bg-white border border-gray-100 shadow-xl shadow-black/5",
      outlined: "bg-white border-2 border-gray-200",
      glass: "bg-white/80 backdrop-blur-xl border border-white/30",
    };

    const paddings = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const MotionComponent = hover ? motion.div : "div";
    const hoverProps = hover
      ? {
          whileHover: { y: -4, transition: { duration: 0.2 } },
        }
      : {};

    return (
      <MotionComponent
        ref={ref}
        className={`rounded-2xl ${variants[variant]} ${paddings[padding]} ${className}`}
        {...hoverProps}
        {...(props as any)}
      >
        {children}
      </MotionComponent>
    );
  }
);

Card.displayName = "Card";

export default Card;
