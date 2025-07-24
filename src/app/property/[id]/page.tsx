import properties from '@/data/properties.json';
import { Property } from '@/types/property';
import React from 'react';

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
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>₦{property.price}</p>
      <p>{property.location}</p>
      <img src={property.image} alt={property.title} />
    </div>
  );
}
