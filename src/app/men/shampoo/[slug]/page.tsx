// app/shampoo/[slug]/page.tsx
import { client } from "@/sanity/lib/client"; // Sanity client import
import Image from "next/image"; // Image component for optimized images
import { notFound } from "next/navigation"; // For handling 404 errors


// Define a Product interface to structure the product data
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  slug: { current: string };
  category: string;
  stock: number;
  imageUrl: string;
}

// Dynamic page component to render product details
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Fetch product data based on the slug from Sanity
  const product: Product | null = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      description,
      price,
      slug,
      stock,
      category,
      "imageUrl": image.asset->url
    }`,
    { slug }
  );

  // If the product is not found, show a 404 page
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Product Name */}
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      {/* Product Image */}
      <Image
        src={(product.imageUrl)}
        alt={product.name}
        width={600}
        height={600}
        className="rounded-lg"
      />

      <div className="mt-6">
        {/* Product Price */}
        <p className="text-lg">
          Price: <strong>${product.price}</strong>
        </p>

        {/* Product Description */}
        <p className="mt-4 text-gray-700">{product.description}</p>
      </div>
    </div>
  );
}

// Generate static params for dynamic routes
export async function generateStaticParams() {
  // Fetch all product slugs from Sanity
  const products: { slug: { current: string } }[] = await client.fetch(
    `*[_type == "product"]{ "slug": slug.current }`
  );
  

  // Return slugs as an array of objects
  return products.map((product) => ({
    slug: product.slug.current, // Each product's slug for dynamic routing
  }));
}