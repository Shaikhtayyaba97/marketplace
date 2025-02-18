'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock:number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart(); // Cart context ka function
  const router = useRouter(); // Next.js navigation

  const handleBuyNow = () => {
    addToCart({ ...product, quantity: 1 }); // Item ko cart me add karein
    router.push('/checkout'); // Checkout page par navigate karein
  };

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-700">${product.price}</p>
      <button
        onClick={handleBuyNow}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;