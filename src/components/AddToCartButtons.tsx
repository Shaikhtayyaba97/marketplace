'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface Product {
    _id: string;
  name: string;
  originalPrice: number;
  image: string;
  stock: number;
}

interface AddToCartButtonsProps {
  product: Product;
}

const AddToCartButtons: React.FC<AddToCartButtonsProps> = ({ product }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 mt-3">
      <button
        onClick={() =>
          addToCart({
            id: product._id,
            name: product.name,
            price: product.originalPrice,
            quantity: 1,
            image: product.image,
            stock: product.stock,
          })
        }
        disabled={product.stock === 0}
        className={`w-full py-2 ${
          product.stock === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'w-full border border-black py-2 text-black hover:bg-gray-200 transition'
        }`}
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
      <button
        style={{ backgroundColor: '#7e5c14' }}
        className="w-full border rounded-lg border-white py-2 text-white hover:bg-gray-200 transition"
        onClick={() => {
          addToCart({
            id: product._id,
            name: product.name,
            price: product.originalPrice,
            quantity: 1,
            image: product.image,
            stock: product.stock,
          });
          router.push('/checkout');
        }}
      >
        Buy now
      </button>
    </div>
  );
};

export default AddToCartButtons;