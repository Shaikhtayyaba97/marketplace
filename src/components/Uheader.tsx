"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCartIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/ProductContext";

const Header = () => {
  const { cartItems } = useCart();
  const { searchQuery, setSearchQuery, products, loading } = useSearch();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      <header className="bg-white text-black px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden bg-white text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>

        {/* Logo */}
        <div className="flex-grow flex justify-center sm:justify-start">
          <Link href="/" className="text-4xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#7e5c14] hover:opacity-90 transition">
            A to Z
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex flex-grow space-x-6">
          <Link href="/" className="hover:text-red-500 text-lg">Home</Link>
          <Link href="/men" className="hover:text-red-500 text-lg">Men</Link>
          <Link href="/women/ring" className="hover:text-red-500 text-lg">Ring</Link>
          <Link href="/women/earring" className="hover:text-red-500 text-lg">Earring</Link>
          <Link href="/women/watches" className="hover:text-red-500 text-lg">Watches</Link>
          <Link href="/women/bracelet" className="hover:text-red-500 text-lg">Bracelet</Link>
          <Link href="/women/necklace" className="hover:text-red-500 text-lg">Necklace</Link>
          <Link href="/women/bangle" className="hover:text-red-500 text-lg">Bangles</Link>
          <Link href="/women/set" className="hover:text-red-500 text-lg">Jewellery Set</Link>
        </nav>

        {/* Search and Cart */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button onClick={() => setShowSearch(!showSearch)}>
            <MagnifyingGlassIcon className="w-6 h-6" />
          </button>

          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <ShoppingCartIcon className="w-6 h-6 text-black hover:text-gray-600" />
            {isHydrated && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Gray Line Below Header */}
      <div className="h-px bg-gray-300"></div>

      {/* Search Bar */}
      {showSearch && (
        <div className="absolute top-14 right-4 sm:right-10 md:right-16 lg:right-20 bg-white shadow-md p-4 rounded-md z-50 w-72">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          {/* Search Results Dropdown */}
          {loading ? (
            <p className="text-sm text-gray-500 mt-2">Searching...</p>
          ) : (
            products.length > 0 && (
              <div className="mt-2 bg-white shadow-md rounded-md max-h-60 overflow-y-auto">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    href={`/product/${product.slug.current}`}
                    className="flex items-center p-2 hover:bg-gray-100"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 rounded-md object-cover mr-2"
                    />
                    <span>{product.name}</span>
                  </Link>
                ))}
              </div>
            )
          )}
        </div>
        
      )}
    {/* Mobile Menu */}
    {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white text-black shadow-md flex flex-col items-start p-4 space-y-2 sm:hidden z-50">
          <Link href="/" className="text-lg text-black w-full p-2 hover:bg-gray-200" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/men" className="text-lg text-black w-full p-2 hover:bg-gray-200" onClick={() => setIsMobileMenuOpen(false)}>
            Men
          </Link>
          <Link href="/women/ring" className="text-lg text-black w-full p-2 hover:bg-gray-200" onClick={() => setIsMobileMenuOpen(false)}>
            Ring
          </Link>
          <Link href="/women/bracelet" className="text-lg text-black w-full p-2 hover:bg-gray-200" onClick={() => setIsMobileMenuOpen(false)}>
            Bracelet
          </Link>
          <Link href="/women/necklace" className="text-lg text-black w-full p-2 hover:bg-gray-200" onClick={() => setIsMobileMenuOpen(false)}>
            Necklace
          </Link>
          <Link href="/women/bangle" className="text-lg text-black w-full p-2 hover:bg-gray-200" onClick={() => setIsMobileMenuOpen(false)}>
            Bangles
          </Link>
          <Link href="/women/set" className="text-lg text-black w-full p-2 hover:bg-gray-200" onClick={() => setIsMobileMenuOpen(false)}>
            Women Set
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;











