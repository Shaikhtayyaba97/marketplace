"use client";

import { useCart } from "@/context/CartContext";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSearch } from "@/context/ProductContext";
import { useRouter } from "next/navigation";
import AddToCartButtons from "@/components/AddToCartButtons";

interface Product {
  _id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  slug: { current: string };
  image: string;
  createdAt?: string;
  stock: number;
}

const Mmring = ({ category }: { category: string }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { searchQuery } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<
    "lowToHigh" | "highToLow" | "bestSelling" | "alphabeticallyAZ" | "alphabeticallyZA" | "newToOld" | "oldToNew"
  >("lowToHigh");

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "product" && category == $category] {
          _id, name, originalPrice, discountedPrice, slug, image, stock
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.discountedPrice - b.discountedPrice;
    if (sortOrder === "highToLow") return b.discountedPrice - a.discountedPrice;
    if (sortOrder === "alphabeticallyAZ") return a.name.localeCompare(b.name);
    if (sortOrder === "alphabeticallyZA") return b.name.localeCompare(a.name);
    if (sortOrder === "newToOld") return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime();
    if (sortOrder === "oldToNew") return new Date(a.createdAt || "").getTime() - new Date(b.createdAt || "").getTime();
    return 0;
  });

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;

  if (!sortedProducts.length)
    return <p className="text-center text-lg font-semibold">No products found for &quot;{searchQuery}&quot;.</p>;

  return (
    <div className="container mx-auto p-6 bg-white text-black">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-left mb-2">Rings</h1>
        <p className="text-left text-gray-600">
          Waterproof, Stainless Steel Rings, Tarnish Free and Color Guaranteed for Long-Lasting Wear.
        </p>
      </div>

      {/* Product Grid */}
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <li key={product._id} className="bg-white shadow-lg rounded-md p-4 transition-all duration-300 hover:shadow-xl">
            {/* Product Image */}
            <div className="relative overflow-hidden group">
              <Link href={`/men/ring/${product.slug.current}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={250}
                  height={350}
                  className="w-full h-64 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Product Details */}
            <div className="mt-4 text-center">
              <Link href={`/men/ring/${product.slug.current}`}>
                <h2 className="text-lg font-semibold hover:text-gray-600 transition duration-200">{product.name}</h2>
              </Link>

              {/* Price Section */}
              <div className="mt-2 flex flex-col items-center">
                <span className="text-gray-500 line-through text-sm">{product.originalPrice.toFixed(2)}</span>
                <span className="text-red-500 font-bold text-lg">{product.discountedPrice.toFixed(2)}</span>
              </div>

              {/* Stock Info */}
              <p
                className={`mt-1 text-sm font-medium ${
                  product.stock > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
              </p>

              {/* Add to Cart Button */}
              <div className="mt-4">
                <AddToCartButtons
                  product={{
                    _id: product._id,
                    name: product.name,
                    originalPrice: product.originalPrice,
                    stock: product.stock,
                    image: product.image,
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mmring;