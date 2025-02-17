import { client } from "@/sanity/lib/client";

export interface Product {
  _id: string;
  name: string;
  category: string;
  slug: { current: string };
  imageUrl: string;
  price: number;
  
}

export const fetchProducts = async (searchQuery: string): Promise<Product[]> => {
  try {
    const query = `*[_type == "product" && name match "${searchQuery}*"]{
      _id,
      name,
      category,
      slug,
      "imageUrl": image.asset->url,
      price
    }`;

    const products: Product[] = await client.fetch(query);
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};