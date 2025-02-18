'use client';
import { createContext, useContext, useReducer, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number; // Added stock field
  image: string;
}

type CartState = CartItem[];

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'INCREMENT_QUANTITY'; payload: string }
  | { type: 'DECREMENT_QUANTITY'; payload: string }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  cartItems: CartState;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
  notification: string | null;
  showNotification: (message: string) => void;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          return state.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return state; // If stock limit is reached, do nothing
      } else {
        return action.payload.stock > 0 ? [...state, { ...action.payload, quantity: 1 }] : state;
      }

    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.payload);

    case 'INCREMENT_QUANTITY':
      return state.map((item) =>
        item.id === action.payload && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case 'DECREMENT_QUANTITY':
      return state.map((item) =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    case 'CLEAR_CART':
      localStorage.removeItem('cart');
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], () => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    if (item.stock > 0) {
      dispatch({ type: 'ADD_TO_CART', payload: item });
      showNotification(`${item.name} added to cart!`);
    } else {
      showNotification(`${item.name} is out of stock!`);
    }
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const incrementQuantity = (id: string) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: id });
  };

  const decrementQuantity = (id: string) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      cartItems, 
      addToCart, 
      removeFromCart, 
      incrementQuantity, 
      decrementQuantity, 
      clearCart, 
      notification, 
      showNotification
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};