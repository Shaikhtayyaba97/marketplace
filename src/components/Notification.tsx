'use client';
import { useCart } from '@/context/CartContext';

const Notification = () => {
  const { notification } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed top-10 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg transition-opacity duration-300">
      {notification}
    </div>
  );
};

export default Notification;