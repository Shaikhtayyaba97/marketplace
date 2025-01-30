'use client'

import { useCart } from "@/context/CartContext";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearch } from "@/context/ProductContext"; // Import useSearch

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: { current: string };
  imageUrl: string;
}

const Ksoap = ({ category }: { category: string }) => {
  const { addToCart } = useCart();
  const { searchQuery } = useSearch(); // Access the searchQuery
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Use lowercase 'boolean'

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

  // Filter products based on search query globally
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  if (!filteredProducts.length)
    return <p>No products found for &quot;{searchQuery}&quot;.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Soap</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <li key={product._id} className="bg-white p-4 rounded-lg shadow-lg text-center">
            <div className="bg-gray-100 p-4 rounded-md">
              <Link href={`/kids/soap/${product.slug.current}`}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="mx-auto object-contain"
                />
              </Link>
            </div>
            <Link href={`/kids/soap/${product.slug.current}`}>
              <h2 className="text-lg font-semibold">{product.name}</h2>
            </Link>
            <p className="text-gray-700 font-medium">
              Price: {product.price.toFixed(2)} {/* Format the price */}
            </p>
            <button
              onClick={() =>
                addToCart({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: product.imageUrl,
                })
              }
              className="bg-black text-white py-2 px-4 rounded-lg mt-4"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ksoap;