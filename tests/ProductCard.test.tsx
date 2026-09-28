import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/product";

const product: Product = { id: 1, title: "Everyday Laptop", price: 429.5, description: "A useful laptop", category: "electronics", image: "https://example.com/laptop.png", rating: { rate: 4.6, count: 84 } };
describe("ProductCard", () => {
 it("shows product information, price, rating, and an accessible details link", () => {
  render(<ProductCard product={product} />);
  expect(screen.getByRole("heading", { name: "Everyday Laptop" })).toBeInTheDocument();
  expect(screen.getByText("$429.50")).toBeInTheDocument();
  expect(screen.getByLabelText("4.6 out of 5 stars")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "View Everyday Laptop details" })).toHaveAttribute("href", "/products/1");
 });
});
