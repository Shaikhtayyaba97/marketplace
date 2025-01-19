"use client";

import { useCart } from "@/context/useCart";
import Link from "next/link";

const CartPage = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const deliveryFee = 200; // Fixed delivery fee
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const grandTotal = totalPrice + deliveryFee;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-6 border-b">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain"
              />
              <div className="flex-1 ml-6">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-500 text-sm">${item.price}</p>
                <div className="flex items-center mt-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition"
                  >
                    -
                  </button>
                  <p className="mx-6 text-lg">{item.quantity}</p>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-gray-700 text-lg">
                ${item.price * item.quantity}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 text-sm ml-6 hover:text-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-8 flex justify-between items-center text-xl font-semibold">
            <p>Total:</p>
            <p>${totalPrice}</p>
          </div>
          <div className="mt-4 flex justify-between items-center text-xl font-semibold">
            <p>Delivery Fee:</p>
            <p>${deliveryFee}</p>
          </div>
          <div className="mt-8 flex justify-between items-center text-2xl font-bold">
            <p>Grand Total:</p>
            <p>${grandTotal}</p>
          </div>
          
          {/* Proceed to Checkout */}
          <Link href="/checkout">
            <button
              className="bg-blue-600 text-white px-8 py-3 rounded-md mt-8 w-full hover:bg-blue-500 transition"
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;