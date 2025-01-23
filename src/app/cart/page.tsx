'use client';  // Mark as client component

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";  // For navigation

const CartPage = () => {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } = useCart();
  const router = useRouter(); // Use next/navigation for routing in app directory

  const deliveryCharges = 199;
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal + deliveryCharges;

  // Handle checkout button click
  const handleCheckout = () => {
    router.push("/checkout"); // Redirect to checkout page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4 space-x-6"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-500">Price: ${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="px-4 py-2 text-white bg-gray-500 rounded-md"
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="px-4 py-2 text-white bg-gray-500 rounded-md"
                  >
                    +
                  </button>
                </div>
                <p className="mt-2 font-semibold">Subtotal: ${item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 text-red-700 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Subtotal and Delivery Charges */}
          <div className="flex justify-between mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Subtotal</p>
            <p className="text-lg">${subtotal}</p>
          </div>

          <div className="flex justify-between mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Delivery Charges</p>
            <p className="text-lg">${deliveryCharges}</p>
          </div>

          {/* Total */}
          <div className="flex justify-between mt-6 bg-gray-100 p-4 rounded-lg shadow-md font-bold text-xl">
            <p>Total</p>
            <p>${total}</p>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-[#6EC207] text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;