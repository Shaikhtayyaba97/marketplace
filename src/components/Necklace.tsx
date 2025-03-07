import { fetchMixItems } from "@/app/lib/fetchProducts";
import Image from "next/image";
import Link from "next/link";
import AddToCartButtons from "@/components/AddToCartButtons";

interface Product {
  _id: string;
  name: string;
  category: string;
  slug: { current: string };
  image: string;
  price: number | null;
  stock: number;
  originalPrice: number;
  discountedPrice: number;
  _createdAt?: string;
}

const Necklace = async ({ category }: { category: string }) => {
  const products: Product[] = await fetchMixItems(category);

  if (!products.length) {
    return <p className="text-center text-lg font-semibold">No products found.</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-white text-black">
      <h1 className="text-3xl font-bold text-left mb-2">Necklaces</h1>
      <p className="text-left text-gray-600">
      Waterproof, Stainless Steel Necklaces, Tarnish Free and Color Guaranteed for Long-Lasting Wear.
      </p>

      {/* Product Grid */}
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <li key={product._id} className="bg-white shadow-lg rounded-md p-4 hover:shadow-xl transition-all duration-300">
            <Link href={`/women/necklace/${product.slug.current}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={250}
                height={350}
                className="w-full h-64 object-cover rounded-md transition-transform duration-300 hover:scale-105"
              />
            </Link>

            <div className="mt-4 text-center">
              <Link href={`/women/necklace/${product.slug.current}`}>
                <h2 className="text-lg font-semibold hover:text-gray-600 transition duration-200">{product.name}</h2>
              </Link>

              {/* Price */}
              <div className="mt-2 flex flex-col items-center">
                <span className="text-gray-500 line-through text-sm">{product.originalPrice.toFixed(2)}</span>
                <span className="text-red-500 font-bold text-lg">{product.discountedPrice.toFixed(2)}</span>
              </div>

              {/* Stock */}
              <p className={`mt-1 text-sm font-medium ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
              </p>

              {/* Add to Cart */}
              <div className="mt-4">
                <AddToCartButtons
                  product={{
                    _id: product._id,
                    name: product.name,
                    originalPrice: product.originalPrice,
                    stock: product.stock,
                    image: product.image,
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Necklace;