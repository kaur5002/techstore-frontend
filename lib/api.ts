import type { Product } from "@/types/product";

const DEFAULT_API_URL = "https://fakestoreapi.com";
const configuredApiUrl = process.env.NEXT_PUBLIC_PRODUCTS_API_URL?.trim();
const API_URL = (configuredApiUrl || DEFAULT_API_URL).replace(/\/+$/, "");
function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  const validRating = p.rating === undefined || (!!p.rating && typeof p.rating === "object" && typeof (p.rating as Record<string, unknown>).rate === "number" && typeof (p.rating as Record<string, unknown>).count === "number");
  return typeof p.id === "number" && typeof p.title === "string" && typeof p.price === "number" && typeof p.description === "string" && typeof p.category === "string" && typeof p.image === "string" && validRating;
}
async function request(path: string): Promise<unknown> {
  const response = await fetch(`${API_URL}${path}`, { next: { revalidate: 300 } });
  if (!response.ok) throw new Error(`Product service returned ${response.status}`);
  return response.json() as Promise<unknown>;
}
export async function getProducts(): Promise<Product[]> {
  const result = await request("/products");
  if (!Array.isArray(result)) {
    console.log
    (result);
    throw new Error("Product service returned invalid data");
  
  }
  return result.filter(isProduct).filter(product => product.category === "electronics");
}
export async function getProduct(id: string): Promise<Product | null> {
  if (!/^\d+$/.test(id)) return null;
  const result = await request(`/products/${encodeURIComponent(id)}`);
  return isProduct(result) && result.category === "electronics" ? result : null;
}
