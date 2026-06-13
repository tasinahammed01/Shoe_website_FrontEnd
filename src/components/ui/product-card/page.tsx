import Card from "../card/page";
import { Heart } from "lucide-react";

export default function ProductCard({
  title,
}: {
  title: string;
}) {
  return (
    <Card className="overflow-hidden group">
      <div className="h-52 bg-gray-100 group-hover:scale-105 transition relative">
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full">
          <Heart size={16} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">⭐⭐⭐⭐☆</p>

        <div className="flex justify-between mt-3">
          <span className="font-semibold">$120</span>
          <button className="text-sm border px-3 py-1 rounded-lg hover:bg-black hover:text-white">
            Add
          </button>
        </div>
      </div>
    </Card>
  );
}
