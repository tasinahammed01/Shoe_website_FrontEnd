import { cn } from "@/lib/utils";

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20"
      )}
    />
  );
}
