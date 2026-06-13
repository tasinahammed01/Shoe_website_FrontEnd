"use client";

interface SpacerProps {
  size?: "sm" | "md" | "lg" | "xl";
  vertical?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-2 h-2",
  md: "w-4 h-4",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

export default function Spacer({ size = "md", vertical = false, className = "" }: SpacerProps) {
  return (
    <div className={`${sizeClasses[size]} ${vertical ? "w-full" : "h-full"} ${className}`} />
  );
}
