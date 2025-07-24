import properties from "@/data/properties.json"; // adjust if outside src
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateStaticParams() {
  return properties.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === params.id);

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  return {
    title: property.title,
    description: property.description,
  };
}

export default function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const property = properties.find((p) => p.id === params.id);

  if (!property) return notFound();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{property.title}</h1>
      <Image
        src={property.image}
        alt={property.title}
        width={800}
        height={600}
        className="rounded"
      />
      <p>{property.description}</p>
      <p className="text-lg font-semibold">₦{property.price}</p>
    </div>
  );
}
