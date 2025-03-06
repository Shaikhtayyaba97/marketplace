import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButtons from "@/components/AddToCartButtons";

// Define a Product interface to structure the product data
interface Product {
  _id: string;
  name: string;
  description: string;
  discountedPrice: number;
  originalPrice: number;
  slug: { current: string };
  category: string;
  stock: number;
  image: string;
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Fetch product data based on the slug from Sanity
  const product: Product | null = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      description,
      discountedPrice,
      originalPrice,
      slug,
      stock,
      category,
      image
    }`,
    { slug },
    { cache: "no-store" }
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
        <div className="w-full md:w-1/2 relative">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="flex justify-between items-center">
            {product.stock > 0 ? (
              <p className="text-green-500">In stock: {product.stock}</p>
            ) : (
              <p className="text-red-500">Out of Stock</p>
            )}
          </div>

          {/* Price */}
          <div className="mt-2">
            <p className="text-xl text-gray-700">
              {product.discountedPrice < product.originalPrice && (
                <span className="text-gray-500 line-through mr-2">
                  {product.originalPrice.toFixed(2)}
                </span>
              )} <br />
              <span className="text-red-500 font-semibold">
                {product.discountedPrice.toFixed(2)}
              </span>
            </p>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-4 md:mt-6  md:bottom-10 md:left-0 md:right-0 md:w-full md:flex justify-start">
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
