'use client';

import { useCart } from '@/context/useCart'; // Cart context to manage items
import { useState } from 'react';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart(); // Fetch cart items from context
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    // Validation
    if (!formData.customerName || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill all the fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cartItems, // Cart items
          totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0), // Calculate total
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Order placed successfully!');
        clearCart(); // Empty the cart
      } else {
        console.error(data.error);
        setMessage('Failed to place order.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Checkout</h1>

      {message && (
        <div
          className={`mb-6 p-4 text-center rounded ${
            message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid gap-4 mb-6">
        <input
          type="text"
          name="customerName"
          placeholder="Your Name"
          value={formData.customerName}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />
      </div>

      <button
        onClick={handleCheckout}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-500 transition"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
};

export default CheckoutPage;