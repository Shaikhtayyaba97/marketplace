'use client'
import { client } from "@/sanity/lib/client"; // Sanity client import karein
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react"; // Hooks import karein

// Define a Product interface
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  slug: { current: string };
  category: string;
  stock: number;
  imageUrl: string;
}

const First = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<Product[]>([]); // Products ko store karne ke liye state
  const [loading, setLoading] = useState<boolean>(true); // Loading ko track karne ke liye state

  // Fetching data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const query = await client.fetch(
        `*[_type == "product" && category == "mshampoo"] {
  _id,
  name,
  description,
  price,
  slug,
  stock,
  category,
  "imageUrl": image.asset->url
}`,
        { category } // Passing the dynamic category to the query
      );
      setProducts(query); // Fetched data ko state mein store karein
      setLoading(false); // Loading ko false kar dein
    };

    fetchData(); // Function call to fetch data
  }, [category]); // Re-run the effect when category changes

  if (loading) {
    return <p>Loading...</p>; // Loading message show karein jab tak data fetch hota hai
  }

  if (!products.length) {
    return <p>No products found.</p>; // Agar products nahi hain to message show karein
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <h1>{product.name}</h1>
          <p>{product.price}</p>
          <Link href={`daynamic/${product.slug.current}`}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={100}
              height={100}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default First;