"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchProducts } from "@/app/lib/fetchProducts"; // Ensure path is correct

// ✅ Product ka interface
interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  imageUrl: string;
  price: number;
}

// ✅ Context ka interface
interface ProductContextProps {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loading: boolean;
}

// ✅ Default Context Value
const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (!searchQuery.trim()) {
        setProducts([]); // ✅ Agar search query empty ho toh results clear ho jayen
        return;
      }

      setLoading(true);
      try {
        const fetchedData = await fetchProducts(searchQuery);
        // ✅ Ensure price is always a number, handle null cases
        const results: Product[] = fetchedData.map((item: any) => ({
          _id: item._id,
          name: item.name,
          slug: item.slug,
          imageUrl: item.imageUrl,
          price: item.price ?? 0, // If price is null, set to 0
        }));

        setProducts(results);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [searchQuery]);

  return (
    <ProductContext.Provider value={{ products, searchQuery, setSearchQuery, loading }}>
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