"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchProducts } from "@/app/lib/fetchProducts";  // Ensure this path is correct

// ✅ Product ka interface, price ko null handle karne ke liye update kiya
interface Product {
  imageUrl: string;
  price: number; // Ensure price is always a number
}

// ✅ Context ka interface
interface ProductContextProps {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// ✅ Default Context Value
const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const fetchedData = await fetchProducts(searchQuery);

        // ✅ Ensure price is always a number, handle null cases
        const results: Product[] = fetchedData.map((item: any) => ({
          imageUrl: item.imageUrl,
          price: item.price ?? 0, // If price is null, set to 0
        }));

        setProducts(results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchFilteredProducts();
  }, [searchQuery]);

  return (
    <ProductContext.Provider value={{ products, searchQuery, setSearchQuery }}>
      {children}
    </ProductContext.Provider>
  );
};

// ✅ Custom hook to use Product Context
export const useSearch = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useSearch must be used within a ProductProvider");
  }
  return context;
};