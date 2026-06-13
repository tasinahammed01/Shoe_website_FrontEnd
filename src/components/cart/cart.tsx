import { cn } from "@/lib/utils";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-white rounded-2xl shadow-sm hover:shadow-lg transition", className)}>
      {children}
    </div>
  );
}