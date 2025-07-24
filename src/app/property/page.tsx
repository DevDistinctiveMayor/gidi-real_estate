import { Metadata } from "next";
import Image from "next/image";
import properties from "@/data/properties.json"; // Ensure path is correct
import { Property } from "@/types/Property"; // Your Property interface

type PageProps = {
  params: {
    id: string;
  };
};

// Generate SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const property = properties.find((p: Property) => p.id === params.id);

  if (!property) {
    return {
      title: "Property Not Found",
      description: "The property you're looking for doesn't exist.",
    };
  }

  return {
    title: `${property.title} - Property Detail`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.description,
      images: [property.image],
    },
  };
}

// Page Component
export default function PropertyDetail({ params }: PageProps) {
  const property = properties.find((p: Property) => p.id === params.id);

  if (!property) {
    return <div className="text-center text-red-500 mt-10">Property not found.</div>;
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
