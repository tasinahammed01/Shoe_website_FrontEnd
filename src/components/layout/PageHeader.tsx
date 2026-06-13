"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: Array<{ label: string; href?: string }>;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`py-8 md:py-12 ${className}`}>
      {breadcrumb && (
        <div className="mb-4">
          <Breadcrumb items={breadcrumb} />
        </div>
      )}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
