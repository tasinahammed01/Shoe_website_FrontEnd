"use client";

import { ReactNode } from "react";

interface StickyProps {
  children: ReactNode;
  top?: number;
  className?: string;
}

export default function Sticky({ children, top = 0, className = "" }: StickyProps) {
  return (
    <div className={`sticky ${className}`} style={{ top }}>
      {children}
    </div>
  );
}
