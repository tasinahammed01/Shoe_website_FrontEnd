"use client";

import { ReactNode } from "react";

interface FlexProps {
  children: ReactNode;
  direction?: "row" | "col";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  gap?: "sm" | "md" | "lg";
  wrap?: boolean;
  className?: string;
}

const directionClasses = {
  row: "flex-row",
  col: "flex-col",
};

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

const gapClasses = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

export default function Flex({
  children,
  direction = "row",
  align = "center",
  justify = "start",
  gap = "md",
  wrap = false,
  className = "",
}: FlexProps) {
  return (
    <div
      className={`
        flex ${directionClasses[direction]} ${alignClasses[align]} ${justifyClasses[justify]}
        ${gapClasses[gap]} ${wrap ? "flex-wrap" : ""} ${className}
      `}
    >
      {children}
    </div>
  );
}
