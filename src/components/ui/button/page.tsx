import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  className,
}: Props) {
  return (
    <button
      className={cn(
        "px-5 py-3 rounded-xl font-medium transition active:scale-95 inline-flex items-center gap-2",
        variant === "primary"
          ? "bg-black text-white hover:bg-black/80"
          : "border border-black hover:bg-black hover:text-white",
        className
      )}
    >
      {children}
    </button>
  );
}
