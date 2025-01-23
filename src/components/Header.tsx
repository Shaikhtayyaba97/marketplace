'use client';
import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/ProductContext";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/lib/fetchProducts";

const Header = () => {
  const { cartItems } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() !== "") {
        setLoading(true);
        try {
          const results = await fetchProducts(searchQuery);
          setProducts(results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setProducts([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <header className="bg-white text-black px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center justify-start">
        <Link href="/" className="text-3xl font-bold hover:opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-10 w-10">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#6EC207", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#000000", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" stroke="url(#grad1)" strokeWidth="4" fill="none" />
            <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle" fontSize="18" fill="url(#grad1)" fontWeight="bold">
              A &quot;to&quot; Z
            </text>
          </svg>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex-grow flex justify-center">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-40 sm:w-64 md:w-80 lg:w-96 p-2 border-2 border-[#6EC207] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6EC207] text-sm"
        />
      </div>

      {/* Shopping Cart Icon */}
      <div className="relative flex items-center">
        <Link href="/cart" className="flex items-center space-x-2">
          <ShoppingCartIcon className="h-6 w-6 text-black hover:text-gray-600" />
        </Link>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#6EC207] text-black text-sm rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>

      {/* Search Results Dropdown */}
      {searchQuery && (
        <div className="absolute bg-white shadow-md mt-2 rounded-md max-h-60 overflow-auto w-full md:w-96 z-50">
          {loading ? (
            <p className="p-4">Searching...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product._id}
                href={`/${product.category}/${product.slug.current}`}
                className="flex items-center p-4 hover:bg-gray-100"
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <div className="ml-4">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-500">${product.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4">No products found for &quot;{searchQuery}&quot;.</p>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;