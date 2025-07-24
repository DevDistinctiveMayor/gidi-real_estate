import { notFound } from "next/navigation";
import properties from "@/data/properties.json";
import { Property } from "@/types/property";

// ✅ OPTIONAL: Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === params.id);
  if (!property) {
    return {
      title: "Property Not Found",
    };
  }
  return {
    title: `${property.title} - Gidi Real Estate`,
  };
}

// ✅ Required for dynamic routing in App Router
export async function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

// ✅ Main Page Component
export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === params.id) as Property;

  if (!property) {
    notFound();
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">{property.title}</h1>
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-64 object-cover rounded my-4"
      />
      <p>{property.description}</p>
      <p className="text-lg font-semibold mt-2">₦{property.price.toLocaleString()}</p>
      <p className="text-sm text-gray-600">{property.location}</p>
    </div>
  );
}
