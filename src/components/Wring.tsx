"use client";

import { useCart } from "@/context/CartContext";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSearch } from "@/context/ProductContext";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  slug: { current: string };
  image: string;
  createdAt?: string;
}

const Wring = ({ category }: { category: string }) => {
  const router = useRouter()
  const { addToCart } = useCart();
  const { searchQuery } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<"lowToHigh" | "highToLow" | "bestSelling" | "alphabeticallyAZ" | "alphabeticallyZA" | "newToOld" | "oldToNew">("lowToHigh");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "product" && category == $category] {
          _id, name, originalPrice, discountedPrice, slug, image
        }`;
        const fetchedProducts = await client.fetch(query, { category });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;

  if (!filteredProducts.length)
    return <p className="text-center text-lg font-semibold">No products found for &quot;{searchQuery}&quot;.</p>;

  return (
    <div className="container mx-auto p-10 bg-white text-black">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-left mb-4">Rings</h1>
        <p className="text-left text-gray-600">
          Waterproof, Stainless Steel Necklace with 18k Gold Plated, Tarnish Free and Color Guaranteed for Long-Lasting Wear.
        </p>
      </div>

      {/* Product List */}
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <li key={product._id} className="p-4 rounded-lg shadow-lg text-center bg-white border relative">
            {/* Sale Tag */}
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded">
              Sale
            </div>

            {/* Product Image */}
            <div className="bg-gray-100 p-4 rounded-md">
              <Link href={`/women/ring/${product.slug.current}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={180}
                  height={180}
                  className="mx-auto object-contain"
                />
              </Link>
            </div>

            {/* Product Name */}
            <Link href={`/women/ring/${product.slug.current}`}>
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            </Link>

            {/* Price Section */}
            <div className="flex flex-col items-center mt-2">
            <p className="text-gray-400 line-through text-sm">
                Rs.{product.originalPrice.toFixed(2)} 
              </p>
              <p className="text-red-500 font-semibold text-lg">
                Rs.{product.discountedPrice.toFixed(2)}
              </p>
              
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 mt-3">
              <button
                style={{ backgroundColor: "#7e5c14" }}
                onClick={() =>
                  addToCart({
                    id: product._id,
                    name: product.name,
                    price: product.discountedPrice,
                    quantity: 1,
                    image: product.image,
                  })
                }
                className="text-white py-2 px-4 rounded-lg"
              >
                Add to Cart
              </button>
              <button
  className="w-full border border-black py-2 text-black hover:bg-gray-200 transition"
  onClick={() => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.discountedPrice,
      quantity: 1,
      image: product.image,
    });
    router.push("/checkout"); // Checkout page par redirect
  }}
>
  Buy Now
</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wring;