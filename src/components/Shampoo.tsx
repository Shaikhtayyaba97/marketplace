"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: { current: string };
  imageUrl: string;
}

const Shampoo = ({ category }: { category: string }) => {
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
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <li key={product._id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <Link href={`/men/shampoo/${product.slug.current}`} className="block w-full">
              {/* Image Container */}
              <div className="bg-gray-100 p-4 rounded-lg mb-4 flex justify-center items-center">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              {/* Name and Price */}
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 font-medium">Price: ${product.price}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shampoo;