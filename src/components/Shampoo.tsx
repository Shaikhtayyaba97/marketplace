"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/useCart"; // Import the CartContext

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: { current: string };
  imageUrl: string;
}

const Shampoo = ({ category }: { category: string }) => {
  const { addToCart } = useCart(); // Use Cart Context
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product" && category == $category] {
        _id, name, price, slug, "imageUrl": image.asset->url
      }`;
      const fetchedProducts = await client.fetch(query, { category });
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!products.length) return <p className="text-center">No products found in {category}.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Shampoo</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <li
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-lg text-center space-y-4"
          >
            {/* Image */}
            <div className="bg-gray-100 p-4 rounded-md">
              <Link href={`/men/shampoo/${product.slug.current}`}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="mx-auto object-contain"
                />
              </Link>
            </div>

            {/* Name */}
            <Link href={`/men/shampoo/${product.slug.current}`}>
              <h2 className="text-lg font-semibold">{product.name}</h2>
            </Link>

            {/* Price */}
            <p className="text-gray-700 font-medium">Price: {product.price}</p>

            {/* Add to Cart Button */}
            <div className="flex justify-center items-center space-x-4 mt-4">
              <button
                onClick={() =>
                  addToCart({
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: 1, // Start with quantity 1 when adding to the cart
                    image: product.imageUrl,
                  })
                }
                className="bg-black text-white py-2 px-4 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shampoo;