// src/app/property/[id]/page.tsx
import { notFound } from "next/navigation";
import { Property } from "@/types/property";

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const properties: Property[] = await import('@/data/properties.json').then(mod => mod.default);
  const property = properties.find((p) => p.id === params.id);

  if (!property) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{property.title}</h1>
      <img src={property.image} alt={property.title} className="w-full h-64 object-cover rounded-md my-4" />
      <p>{property.description}</p>
      <p className="mt-2 text-lg font-semibold">₦{property.price.toLocaleString()}</p>
      <p className="text-sm text-gray-600">Location: {property.location}</p>
    </div>
  );
}
