'use client'
import Link from "next/link";
import { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [cartCount, setCartCount] = useState(0); // Example cart state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      {/* Left Side: Hamburger Menu Icon (Mobile Only) */}
      <div className="md:hidden flex items-center space-x-4">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Center: Logo (Mobile) - Fancy A to Z */}
      <div className="text-4xl font-bold font-serif text-gradient bg-clip-text hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-110 flex-shrink-0 md:hidden flex-1 text-center">
        <Link href="/">A to Z</Link>
      </div>

      {/* Right Side: Shopping Cart (Mobile) */}
      <div className="relative flex items-center space-x-2 md:hidden absolute right-4 top-2">
        <Link href="/cart" className="flex items-center space-x-2">
          <ShoppingCartIcon className="h-6 w-6 text-white hover:text-gray-300" />
        </Link>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>

      {/* Left Side: Logo (Desktop) */}
      <div className="text-3xl font-bold font-serif text-gradient bg-clip-text hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-110 flex-shrink-0 hidden md:flex">
        <Link href="/">A to Z</Link>
      </div>

      {/* Center: Navigation Links (Desktop Only) */}
      <nav className="flex space-x-6 hidden md:flex flex-grow justify-center">
        <Link href="/women" className="hover:text-gray-300">
          Women
        </Link>
        <Link href="/men" className="hover:text-gray-300">
          Men
        </Link>
        <Link href="/kids" className="hover:text-gray-300">
          Kids
        </Link>
        <Link href="/customize" className="hover:text-gray-300">
          Customize
        </Link>
      </nav>

      {/* Right Side: Shopping Cart (Desktop) */}
      <div className="relative flex items-center space-x-2 hidden md:flex">
        <Link href="/cart" className="flex items-center space-x-2">
          <ShoppingCartIcon className="h-6 w-6 text-white hover:text-gray-300" />
        </Link>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 text-white p-6 space-y-4 md:hidden z-10">
          <Link href="/women" className="block hover:text-gray-300">
            Women
          </Link>
          <Link href="/men" className="block hover:text-gray-300">
            Men
          </Link>
          <Link href="/kids" className="block hover:text-gray-300">
            Kids
          </Link>
          <Link href="/customize" className="block hover:text-gray-300">
            Customize
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;