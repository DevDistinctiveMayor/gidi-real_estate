// app/property/[id]/page.tsx

import properties from "@/data/peoperties.json";
import { notFound } from "next/navigation";
import { Property } from "@/types/property";
import Image from "next/image";
import { Metadata } from "next";

// Generate static params
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return properties.map((p) => ({ id: p.id }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const property = properties.find((p) => p.id === params.id);
  if (!property) {
    return {
      title: "Property Not Found | Gidi Real Estate",
      description: "This property could not be found.",
    };
  }
  return {
    title: `${property.title} | Gidi Real Estate`,
    description: property.description,
  };
}

// Page component
export default function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const property = properties.find((p) => p.id === params.id) as Property;

  if (!property) {
    notFound(); // Use Next.js built-in 404
  }

  return (
    <div className="p-4 max-w-2xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
      <Image
        src={property.image}
        alt={property.title}
        width={800}
        height={600}
        className="w-full h-64 object-cover rounded mb-4"
        priority
      />
      <p className="text-gray-300">{property.description}</p>
      <p className="text-xl text-primary font-bold mt-2">
        ₦{property.price.toLocaleString()}
      </p>
      <p className="text-green-600 font-semibold mt-1">{property.type}</p>
      <p className="text-green-600 font-semibold mt-1">{property.location}</p>
    </div>
  );
}
