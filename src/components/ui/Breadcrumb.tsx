"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronRight size={16} className="text-gray-400" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className={`${
                index === items.length - 1
                  ? "text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900 transition-colors"
              }`}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={`${
                index === items.length - 1
                  ? "text-gray-900 font-medium"
                  : "text-gray-600"
              }`}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
