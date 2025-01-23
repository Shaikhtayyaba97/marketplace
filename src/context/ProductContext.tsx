'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  name: string;
  category: string;
  slug: { current: string };
  imageUrl: string;
  price: number;
}

interface ProductContextProps {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch all products from Sanity when the app loads
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"]{
        _id,
        name,
        category,
        slug,
        "imageUrl": image.asset->url,
        price
      }`;
      const result = await client.fetch(query);
      setProducts(result);
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, searchQuery, setSearchQuery }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use ProductContext
export const useSearch = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useSearch must be used within a ProductProvider");
  }
  return context;
};