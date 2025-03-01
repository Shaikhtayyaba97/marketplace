import { client } from "@/sanity/lib/client";

export interface Product {
  _id: string;
  name: string;
  category: string;
  slug: { current: string };
  image: string;
  price: number | null; // Price null bhi ho sakta hai, isliye optional kardiya
}

// ✅ Corrected fetchProducts function
export const fetchProducts = async (searchQuery: string): Promise<Product[]> => {
  try {
    const query = `*[_type == "product" && name match $searchQuery + "*"] {
      _id, name, category, slug, image, price
    }`;

    const products: Product[] = await client.fetch(query, { searchQuery });

    console.log("Fetched Products:", products);

    return products.length > 0 ? products : [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};