// checkoutPage.tsx
import CheckoutFormm from '@/components/CheckoutForm';
import React from 'react';


const CheckoutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p className="mb-6">Please review your order details and enter your information to complete the purchase.</p>
      
      {/* Render CheckoutForm component */}
    <CheckoutFormm/>
    </div>
  );
};

export default CheckoutPage;