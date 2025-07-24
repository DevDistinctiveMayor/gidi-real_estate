import properties from '@/data/properties.json';
import { Property } from '@/types/property';
import React from 'react';
import Image from 'next/image';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const property = properties.find((p: Property) => p.id === params.id);

  if (!property) {
    return {
      title: 'Property Not Found',
    };
  }

  return {
    title: property.title,
  };
}

export default function PropertyPage({ params }: PageProps) {
  const property = properties.find((p: Property) => p.id === params.id);

  if (!property) {
    return <div>Property not found.</div>;
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
