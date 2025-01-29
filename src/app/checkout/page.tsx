'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const { cartItems, totalPrice } = useCart();
  const router = useRouter();
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !email || !address) {
      setError('Please fill all the fields');
      return;
    }

    const orderData = {
      customerName,
      email,
      address,
      cartItems,
      totalPrice,
    };

    try {
      const response = await axios.post('/api/order', orderData);
      alert('Order placed successfully!');
      router.push(`/order/${response.data.orderId}`); // Redirect to order confirmation page
    } catch (error) {
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-lg">Name</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-lg">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-lg">Address</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          ></textarea>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#6EC207] text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;