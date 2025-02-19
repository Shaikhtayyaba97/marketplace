import { client } from "@/sanity/lib/client"; // Sanity client import
import Image from "next/image"; // Image component for optimized images
import { notFound } from "next/navigation"; // For handling 404 errors
import AddToCartButtons from "@/components/AddToCartButtons";

// Define a Product interface to structure the product data
interface Product {
  _id: string;
  name: string;
  description: string;
  originalPrice: number;
  slug: { current: string };
  category: string;
  stock: number;
  image: string;
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
      originalPrice,
      slug,
      stock,
      category,
      image
    }`,
    { slug }
  );

  // If the product is not found, show a 404 page 
  if (!product) return notFound();

  return (
    <div className="container mx-auto p-10 bg-white text-black">
      <div className="flex flex-col md:flex-row gap-6">
  {/* Product Image */}
  <div className="w-full md:w-1/2 flex justify-center">
    <Image 
      src={product.image} 
      alt={product.name} 
      width={300} 
      height={300} 
      className="object-contain rounded-lg w-52 h-52 md:w-96 md:h-96"
    />
  </div>


        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Stock Status */}
          <p className={`text-lg font-semibold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
          </p>

          {/* Price */}
          <p className="text-xl text-gray-700 mt-2">
            Price: <span className="font-semibold text-red-500">${product.originalPrice.toFixed(2)}</span>
          </p>

          {/* Add to Cart Button (Disabled if Out of Stock) */}
          <div className="mt-4">
            {product.stock > 0 ? (
              <AddToCartButtons product={product} />
            ) : (
              <button className="bg-gray-400 text-white py-2 px-4 rounded-md cursor-not-allowed" disabled>
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}