'use client'

import { useCart } from "@/context/CartContext";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearch } from "@/context/ProductContext"; // Import useSearch

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: { current: string };
  image: any;
}

const Wring = ({ category }: { category: string }) => {
  const { addToCart } = useCart();
  const { searchQuery } = useSearch(); // Access the searchQuery
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Use lowercase 'boolean'
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });
  const [sortOrder, setSortOrder] = useState<'lowToHigh' | 'highToLow' | 'bestSelling' | 'alphabeticallyAZ' | 'alphabeticallyZA' | 'newToOld' | 'oldToNew'>('lowToHigh');
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product" && category == $category] {
        _id, name, price, slug, image
      }`;

      const fetchedProducts = await client.fetch(query, { category });
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  // Filter products based on search query globally
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) => product.price >= priceFilter.min && product.price <= priceFilter.max);

  // Sort the filtered products based on the selected sort order
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === 'lowToHigh') return a.price - b.price;
    if (sortOrder === 'highToLow') return b.price - a.price;
    if (sortOrder === 'bestSelling') return 0; // Replace with actual best-seller logic
    if (sortOrder === 'alphabeticallyAZ') return a.name.localeCompare(b.name);
    if (sortOrder === 'alphabeticallyZA') return b.name.localeCompare(a.name);
    if (sortOrder === 'newToOld') return new Date(b._id).getTime() - new Date(a._id).getTime();
    if (sortOrder === 'oldToNew') return new Date(a._id).getTime() - new Date(b._id).getTime();
    return 0;
  });

  if (loading) return <p>Loading...</p>;

  if (!sortedProducts.length) return <p>No products found for &quot;{searchQuery}&quot;.</p>;

  return (
    <div className="container mx-auto p-10 bg-white">
      {/* Description */}
      <div className="mb-6">
        <h1 className="text-3xl  font-bold text-left mb-4"> Rings</h1>
        <p className="text-left text-gray-600">
          Waterproof, Stainless Steel Necklace with 18k Gold Plated, Tarnish Free and Color Guaranteed for Long-Lasting Wear.
        </p>
      </div>

      {/* Filters and Sorting */}
<div className="flex justify-between items-center mb-6">
  {/* Sort By Button */}
  <div className="relative flex items-center">
    <button
      onClick={() => setIsSortOpen(!isSortOpen)}
      className="bg-gray-800 text-white py-2 px-4 rounded-md text-sm hover:bg-gray-700 transition duration-200 w-auto flex items-center justify-between"
    >
      {/* Sort By Text with Icon */}
      <span className="flex items-center">
         {/* Replace with your actual icon */}
        Sort By
      </span>

      {/* Dropdown arrow */}
      <span className="ml-2">&#x2195;</span>
    </button>

    {/* Sort By options dropdown */}
    {isSortOpen && (
      <div className="absolute top-full left-0 mt-2 bg-white shadow-lg w-48 rounded-md z-10">
        <div className="flex flex-col">
          <button
            onClick={() => {
              setSortOrder('lowToHigh');
              setIsSortOpen(false);
            }}
            className="p-2 hover:bg-gray-100 transition duration-200"
          >
            Price: Low to High
          </button>
          <button
            onClick={() => {
              setSortOrder('highToLow');
              setIsSortOpen(false);
            }}
            className="p-2 hover:bg-gray-100 transition duration-200"
          >
            Price: High to Low
          </button>
          <button
            onClick={() => {
              setSortOrder('bestSelling');
              setIsSortOpen(false);
            }}
            className="p-2 hover:bg-gray-100 transition duration-200"
          >
            Best Selling
          </button>
          <button
            onClick={() => {
              setSortOrder('alphabeticallyAZ');
              setIsSortOpen(false);
            }}
            className="p-2 hover:bg-gray-100 transition duration-200"
          >
            Alphabetically A-Z
          </button>
          <button
            onClick={() => {
              setSortOrder('alphabeticallyZA');
              setIsSortOpen(false);
            }}
            className="p-2 hover:bg-gray-100 transition duration-200"
          >
            Alphabetically Z-A
          </button>
          <button
            onClick={() => {
              setSortOrder('newToOld');
              setIsSortOpen(false);
            }}
            className="p-2 hover:bg-gray-100 transition duration-200"
          >
            Date: New to Old
          </button>
          <button
            onClick={() => {
              setSortOrder('oldToNew');
              setIsSortOpen(false);
            }}
            className="p-2 hover:bg-gray-100 transition duration-200"
          >
            Date: Old to New
          </button>
        </div>
      </div>
    )}
  </div>

  {/* Product Count */}
  <div className="flex items-center">
    <p className="mr-4 text-lg">{sortedProducts.length} Products</p>
  </div>
</div>
         

      {/* Product List */}
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <li key={product._id} className="bg-white p-4 rounded-lg shadow-lg text-center">
            <div className="bg-gray-100 p-4 rounded-md">
              <Link href={`/women/ring/${product.slug.current}`}>
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="mx-auto object-contain"
                />
              </Link>
            </div>
            <Link href={`/women/ring/${product.slug.current}`}>
              <h2 className="text-lg font-semibold">{product.name}</h2>
            </Link>
            <p className="text-gray-700 font-medium">
              Price: ${product.price.toFixed(2)} {/* Format the price */}
            </p>
            <button
              style={{ backgroundColor: "#7e5c14" }}
              onClick={() =>
                addToCart({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: product.image,
                })
              }
              className="text-white py-2 px-4 rounded-lg mt-4"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wring;