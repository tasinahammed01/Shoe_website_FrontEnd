import Card from "../card/page";

export default function CategoryCard({
  title,
}: {
  title: string;
}) {
  return (
    <Card className="p-5 text-center cursor-pointer hover:scale-105 transition">
      <div className="h-20 bg-gray-100 rounded-xl mb-3" />
      <h3 className="font-medium">{title}</h3>
    </Card>
  );
}
