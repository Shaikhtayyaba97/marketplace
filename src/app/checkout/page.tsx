'use client';
import { useState } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cartItems, setCartItems] = useState<any[]>([]); // Cart items from context or local storage
  const [totalAmount, setTotalAmount] = useState(0); // Total amount from cart

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      customerName,
      email,
      phone,
      address,
      city,
      cartItems,
      totalAmount,
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`, // Order ID generation logic
    };

    try {
      const response = await axios.post('/api/orders', orderData);
      alert('Order submitted successfully!');
      // Redirect or reset form
    } catch (error) {
      alert('Error submitting order');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Customer Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        required
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        required
      />
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default Checkout;