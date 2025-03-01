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
    <div className="flex flex-col gap-4 mt-4 md:flex-row md:justify-center md:gap-6">
      {/* Add to Cart Button */}
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
        className={`w-full md:w-44 py-3 text-sm ${
          product.stock === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'border border-black text-black hover:bg-gray-200 transition'
        }`}
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>

      {/* Buy Now Button */}
      <button
        style={{ backgroundColor: '#7e5c14' }}
        className={`w-full md:w-44 border rounded-lg border-white py-3 text-sm text-white transition ${
          product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'
        }`}
        onClick={() => {
          if (product.stock > 0) {
            addToCart({
              id: product._id,
              name: product.name,
              price: product.originalPrice,
              quantity: 1,
              image: product.image,
              stock: product.stock,
            });
            router.push('/checkout');
          }
        }}
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
      </button>
    </div>
  );
};

export default AddToCartButtons;
