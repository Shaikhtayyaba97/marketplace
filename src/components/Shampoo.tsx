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
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <li
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4"
          >
            {/* Image */}
            <div className="flex-shrink-0">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={80}
                height={80}
                className="rounded-md object-contain"
              />
            </div>

            {/* Name and Price */}
            <div className="flex-1">
              <Link href={`/men/shampoo/${product.slug.current}`}>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-700 font-medium">Price: ${product.price}</p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shampoo;