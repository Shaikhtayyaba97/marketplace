'use client';
import { useCart } from '@/context/CartContext'; // Make sure this import path is correct
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';
import { useEffect, useState } from 'react'; // useState and useEffect to handle client-side rendering

const CartPage = () => {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } = useCart();
  const router = useRouter();

  // State to handle client-side rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Client side rendering active hota hai
  }, []);

  // If not client, return null to avoid hydration errors
  if (!isClient) return null;

  const deliveryCharges = 199;
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-4">
            
<Image
  src={item.image} // Sanity image URL fetch
  alt={item.name}
  className="w-16 h-16 object-cover rounded"
  width={100}
  height={100}
  priority
/>
              <div className="flex-1 px-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500">Price: {item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 text-lg font-semibold">
            <p>Subtotal: {totalPrice}</p>
            <p>Delivery Charges: {deliveryCharges}</p>
            <p>Total: {totalPrice + deliveryCharges}</p>
          </div>
          <button
            onClick={() => router.push('/checkout')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;