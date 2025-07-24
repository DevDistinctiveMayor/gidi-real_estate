// src/app/property/[id]/page.tsx
import properties from "@/data/properties.json"; // adjust the path
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function PropertyPage({ params }: PageProps) {
  const property = properties.find((p) => p.id === params.id);

  if (!property) {
    notFound();
  }

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>₦{property.price}</p>
      {/* other details */}
    </div>
  );
}
