'use client'
import { useCart } from "@/context/useCart"; // Correct import from useCart

const CartPage = () => {
  const { cartItems, removeItem, increaseQuantity, decreaseQuantity } = useCart();

  // Calculate total price (adding a fixed delivery fee)
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = 200; // Fixed delivery fee
  const grandTotal = totalPrice + deliveryFee;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-4 border-b">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-contain"
              />
              <div className="flex-1 ml-4">
                <p>{item.name}</p>
                <p>${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-800 text-white px-2 py-1 rounded-md"
                  >
                    -
                  </button>
                  <p className="mx-4">{item.quantity}</p>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-800 text-white px-2 py-1 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-gray-700">${item.price * item.quantity}</p>
            </div>
          ))}
          <div className="mt-6 flex justify-between items-center text-xl">
            <p>Total:</p>
            <p>${totalPrice}</p>
          </div>
          <div className="mt-2 flex justify-between items-center text-xl font-bold">
            <p>Delivery Fee:</p>
            <p>${deliveryFee}</p>
          </div>
          <div className="mt-6 flex justify-between items-center text-xl font-bold">
            <p>Grand Total:</p>
            <p>${grandTotal}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;