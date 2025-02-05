'use client';

import { useCart } from '@/context/CartContext';

const Notification = () => {
  const { notification } = useCart();

  if (!notification) return null; // ✅ Agar koi notification nahi hai toh hide kar do

  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg transition-all">
      {notification}
    </div>
  );
};

export default Notification;