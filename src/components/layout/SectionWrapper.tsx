"use client";

import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function SectionWrapper({ children, className = "", id }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-12 md:py-16 lg:py-20 ${className}`}>
      {children}
    </section>
  );
}
