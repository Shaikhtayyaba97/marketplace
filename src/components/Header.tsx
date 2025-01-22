'use client';

import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext"; // CartContext ko import karna

const Header = () => {
  const { cartItems } = useCart(); // Cart items ko CartContext se fetch karna

  // Cart mein total quantity calculate karna
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white text-black px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="text-3xl font-bold font-serif text-gradient bg-clip-text hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-110">
        <Link href="/">A to Z</Link>
      </div>

      {/* Navigation Links (Visible on all screen sizes) */}
      <nav className="flex space-x-6">
        <Link href="/women" className="hover:text-gray-300">Women</Link>
        <Link href="/men" className="hover:text-gray-300">Men</Link>
        <Link href="/kids" className="hover:text-gray-300">Kids</Link>
        <Link href="/customize" className="hover:text-gray-300">Customize</Link>
      </nav>

      {/* Shopping Cart */}
      <div className="relative flex items-center space-x-2">
        <Link href="/cart" className="flex items-center space-x-2">
          <ShoppingCartIcon className="h-6 w-6 text-black hover:text-gray-300" />
        </Link>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#6EC207] text-black text-sm rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;