import { cn } from "@/lib/utils";

export default function Badge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="px-3 py-1 text-xs bg-black text-white rounded-full">
      {children}
    </span>
  );
}
