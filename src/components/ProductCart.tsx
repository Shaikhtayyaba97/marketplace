'use client'
import { useCart } from "@/context/useCart";// CartContext ko import karen

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
  const { addToCart } = useCart(); // useCart hook ko use karen

  const handleAddToCart = () => {
    const item = {
      id,
      name,
      price,
      quantity: 1,
      image,
    };
    addToCart(item); // Cart me item add karen
  };

  return (
    <div className="bg-black text-white p-4 rounded-lg shadow-lg">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-lg mb-4" />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-400">${price}</p>
      <div className="flex items-center justify-between mt-4">
        <button onClick={handleAddToCart} className="bg-black text-white px-4 py-2 rounded-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;