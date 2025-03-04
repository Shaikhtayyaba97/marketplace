import { client } from "@/sanity/lib/client";

export interface Product {
  _id: string;
  name: string;
  category: string;
  slug: { current: string };
  imageUrl: string;
  price: number | null;
}

export const fetchProducts = async (searchQuery: string): Promise<Product[]> => {
  try {
    const query = `*[_type == "product" && lower(name) match lower($searchQuery) + "*"] {
      _id, name, category, slug, "imageUrl": image.asset->url, price
    }`;

    const products: Product[] = await client.fetch(query, { searchQuery });

    return products.length > 0 ? products : [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};