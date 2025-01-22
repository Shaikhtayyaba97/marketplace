'use client';

import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white text-black px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
      {/* Logo - Left aligned for all screen sizes */}
      <div className="flex items-center justify-start w-full md:w-auto">
        <Link href="/" className="text-3xl font-bold text-gradient bg-clip-text hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-12 w-12">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#6EC207", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#000000", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" stroke="url(#grad1)" strokeWidth="4" fill="none" />
            <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle" fontSize="18" fill="url(#grad1)" fontWeight="bold">
              A to Z
            </text>
          </svg>
        </Link>
      </div>

      {/* Centered "Everything Under One Roof" */}
      <div className="absolute inset-x-0 text-center text-black h-20 flex items-center justify-center">
        <p className="mt-1 text-sm sm:mt-2 md:mt-3 lg:mt-4 text-lg text-2xl">
          Everything Under One Roof
        </p>
      </div>

      {/* Shopping Cart Icon - Right aligned for all screen sizes */}
      <div className="relative flex items-center space-x-4">
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