// src/components/Cart.tsx
'use client'
import { useCart } from "@/context/useCart"; // Cart context ko import kar rahe hain
import { useRouter } from "next/router"; // For navigation

const Cart = () => {
  const { cartItems, removeItem, increaseQuantity, decreaseQuantity, clearCart } = useCart(); // Cart context ka use
  const router = useRouter();

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Redirect to checkout page
    router.push("/checkout");
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => increaseQuantity(item.id)}>Increase Quantity</button>
              <button onClick={() => decreaseQuantity(item.id)}>Decrease Quantity</button>
              <button onClick={() => removeItem(item.id)}>Remove Item</button>
            </div>
          ))}
          <div>
            <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
            <button onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;