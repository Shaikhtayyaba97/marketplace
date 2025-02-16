"use client";

import { useCart } from "@/context/CartContext";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSearch } from "@/context/ProductContext"; // Search context

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: { current: string };
  image: string;
  createdAt?: string; // Add this in Sanity for proper sorting
}

const Wring = ({ category }: { category: string }) => {
  const { addToCart } = useCart();
  const { searchQuery } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({
    min: 0,
    max: 10000,
  });
  const [sortOrder, setSortOrder] = useState<
    "lowToHigh" | "highToLow" | "bestSelling" | "alphabeticallyAZ" | "alphabeticallyZA" | "newToOld" | "oldToNew"
  >("lowToHigh");

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "product" && category == $category] {
        _id, name, price, slug, image
      }`;
      console.log(fetchProducts)
        const fetchedProducts = await client.fetch(query, { category });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter products based on search and price range
  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((product) => product.price >= priceFilter.min && product.price <= priceFilter.max);

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
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
    <div className="container mx-auto p-10 bg-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-left mb-4">Rings</h1>
        <p className="text-left text-gray-600">
          Waterproof, Stainless Steel Necklace with 18k Gold Plated, Tarnish Free and Color Guaranteed for Long-Lasting Wear.
        </p>
      </div>

      {/* Filters and Sorting */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex items-center" ref={sortRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="bg-gray-800 text-white py-2 px-4 rounded-md text-sm hover:bg-gray-700 transition duration-200 flex items-center justify-between"
          >
            <span>Sort By</span>
            <span className="ml-2">&#x2195;</span>
          </button>

          {isSortOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg w-48 rounded-md z-10">
              <div className="flex flex-col">
                {[
                  { label: "Price: Low to High", value: "lowToHigh" },
                  { label: "Price: High to Low", value: "highToLow" },
                  { label: "Best Selling", value: "bestSelling" },
                  { label: "Alphabetically A-Z", value: "alphabeticallyAZ" },
                  { label: "Alphabetically Z-A", value: "alphabeticallyZA" },
                  { label: "Date: New to Old", value: "newToOld" },
                  { label: "Date: Old to New", value: "oldToNew" },
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => {
                      setSortOrder(value as any);
                      setIsSortOpen(false);
                    }}
                    className="p-2 hover:bg-gray-100 transition duration-200"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <p className="mr-4 text-lg">{sortedProducts.length} Products</p>
      </div>

      {/* Product List */}
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <li key={product._id} className="bg-white p-4 rounded-lg shadow-lg text-center">
            <div className="bg-gray-100 p-4 rounded-md">
              <Link href={`/women/ring/${product.slug.current}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="mx-auto object-contain"
                />
              </Link>
            </div>
            <Link href={`/women/ring/${product.slug.current}`}>
              <h2 className="text-lg font-semibold">{product.name}</h2>
            </Link>
            <p className="text-gray-700 font-medium">Price: ${product.price.toFixed(2)}</p>
            <button
              style={{ backgroundColor: "#7e5c14" }}
              onClick={() => addToCart({ id: product._id, name: product.name, price: product.price, quantity: 1, image: product.image })}
              className="text-white py-2 px-4 rounded-lg mt-4"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wring;