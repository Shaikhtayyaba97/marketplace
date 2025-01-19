import { useContext } from "react";
import { CartContext } from "@/context/CartContext"; // CartContext ko import karen

// Hook to use cart data
export const useCart = () => {
  const context = useContext(CartContext); // Use context to get cart data

  // Error handling if context is not used inside CartProvider
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context; // Return all cart methods and data
};