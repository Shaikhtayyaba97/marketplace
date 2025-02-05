'use client';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

const Notification = () => {
  const { notification } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);

      // Hide notification after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  }, [notification]);

  return (
    notification && (
      <div
        className={`fixed bottom-5 right-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {notification}
      </div>
    )
  );
};

export default Notification;