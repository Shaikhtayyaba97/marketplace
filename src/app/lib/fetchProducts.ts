import { client } from "@/sanity/lib/client";

export interface Product {
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

/* ✅ Search Products Based on Query */
export const fetchProducts = async (searchQuery: string): Promise<Product[]> => {
  try {
    const query = `*[_type == "product" && lower(name) match lower($searchQuery) + "*"] {
      _id, name, category, slug, image, price, stock, originalPrice, discountedPrice, _createdAt
    }`;
    const products: Product[] = await client.fetch(query, { searchQuery });
    return products.length > 0 ? products : [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

/* ✅ Fetch Products Based on Category (For MixItem) */
export const fetchMixItems = async (category: string): Promise<Product[]> => {
  try {
    const query = `*[_type == "product" && category == $category] {
      _id, name, category, slug, image, price, stock, originalPrice, discountedPrice, _createdAt
    }`;
    return await client.fetch(query, { category });
  } catch (error) {
    console.error("Failed to fetch category products:", error);
    return [];
  }
};