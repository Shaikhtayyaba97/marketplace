'use client'
import { useState } from 'react';
import axios from 'axios';
import { useCart } from '@/context/CartContext'; // CartContext se items ko fetch karein

const CheckoutFormm: React.FC = () => {
  const { cartItems } = useCart(); // Cart items ko local context se laen
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    address: '',
    phoneNumber: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.city || !formData.address || !formData.phoneNumber) {
      setError('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const orderData = {
        ...formData,
        totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0), // Calculate total price
        cartItems,
      };

      // Sanity API mein order submit karna
      const response = await axios.post('/api/order', orderData);
      console.log(response.data.message);
      // Order successfully submit hone ke baad kuch karen, jaise cart ko clear karna
    } catch (error) {
      console.error('Error submitting order:', error);
      setError('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </div>
      <button type="submit" disabled={isSubmitting}>Submit Order</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CheckoutFormm;