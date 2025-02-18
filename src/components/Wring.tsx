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
  stock:number;
}

const Wring = ({ category }: { category: string }) => {
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
    <div className="container mx-auto p-10 !bg-white !text-black">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-left mb-4">Rings</h1>
        <p className="text-left text-gray-600">
          Waterproof, Stainless Steel Necklace with 18k Gold Plated, Tarnish Free and Color Guaranteed for Long-Lasting Wear.
        </p>
      </div>

      {/* Sorting */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex items-center" ref={sortRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="py-2 px-4 rounded-md text-sm transition duration-200 flex items-center justify-between bg-gray-200 text-black"
          >
            <span>Sort By</span>
            <span className="ml-2">&#x2195;</span>
          </button>

          {isSortOpen && (
            <div className="absolute top-full left-0 mt-2 shadow-lg w-48 rounded-md z-10 bg-white text-black">
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
          <li key={product._id} className="p-4 rounded-lg shadow-lg text-center !bg-white !text-black">
            <div className="bg-gray-100 p-4 rounded-md">
              <Link href={`/women/ring/${product.slug.current}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="mx-auto object-contain"
                />
              </Link>
              <div className="flex justify-between items-center">
  {product.stock > 0 ? (
    <p className="text-green-500">In Stock: {product.stock}</p>
  ) : (
    <p className="text-red-500">Out of Stock</p>
  )}
</div>
            </div>
            <Link href={`/women/ring/${product.slug.current}`}>
              <h2 className="text-lg font-semibold">{product.name}</h2>
            </Link>
            <div className="flex justify-center items-center gap-2 flex-col ">
              <p className="text-gray-400 line-through">{product.originalPrice.toFixed(2)}</p>
              <p className="text-red-500 font-semibold">{product.discountedPrice.toFixed(2)}</p>
            </div>
            {/* Buttons */}
            <div className="flex flex-col gap-2 mt-3">
            <button
  onClick={() => addToCart({ id: product._id, name: product.name, price: product.discountedPrice, quantity: 1, image: product.image, stock:product.stock })}
  disabled={product.stock === 0}
  className={`w-full py-2 ${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'w-full border border-black py-2 text-black hover:bg-gray-200 transition'}`}
>
  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
</button>
            <button
            style={{ backgroundColor: "#7e5c14" }}
                className="w-full border rounded-lg border-white py-2 text-white hover:bg-gray-200 transition"
                onClick={() => {
                  addToCart({
                    id: product._id,
                    name: product.name,
                    price: product.discountedPrice,
                    quantity: 1,
                    image: product.image,
                    stock:product.stock
                  });
                  router.push("/checkout"); // Checkout page par redirect
                }}
              >
                Buy now
              </button>
              
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wring;