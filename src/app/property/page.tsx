import properties from "@/data/properties.json";
import { notFound } from "next/navigation";
import { Property } from "@/types/property";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return (properties as Property[]).map((property) => ({
    slug: property.slug,
  }));
}

export default function PropertyPage({ params }: PageProps) {
  const property = (properties as Property[]).find(
    (p) => p.slug === params.slug
  );

  if (!property) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{property.title}</h1>
      <p className="mt-2">{property.description}</p>
      <p className="mt-2 text-green-600 font-semibold">₦{property.price}</p>
      <p className="mt-1 text-sm text-gray-500">{property.location}</p>
      <img src={property.image} alt={property.title} className="mt-4 w-full max-w-md" />
    </div>
  );
}
