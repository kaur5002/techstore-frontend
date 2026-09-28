import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CartProvider, useCart } from "@/components/CartProvider";
import { CartContent } from "@/components/CartContent";
import type { Product } from "@/types/product";
const product: Product = { id: 3, title: "Pocket Speaker", price: 50, description: "Portable", category: "electronics", image: "https://example.com/speaker.png" };
function SeedCart() { const { add } = useCart(); return <button onClick={() => add(product, 1)}>Add fixture</button>; }
describe("cart", () => {
 it("shows an empty state with a way back to shopping", () => {
  render(<CartProvider><CartContent /></CartProvider>);
  expect(screen.getByRole("heading", { name: "Your bag is taking a breath" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Explore the collection" })).toHaveAttribute("href", "/");
 });
 it("updates quantity and subtotal, then removes an item", async () => {
  const user = userEvent.setup();
  render(<CartProvider><SeedCart /><CartContent /></CartProvider>);
  await user.click(screen.getByRole("button", { name: "Add fixture" }));
  expect(screen.getByText("$50.00", { selector: ".summary-total strong" })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Increase quantity for pocket speaker" }));
  expect(screen.getByText("$100.00", { selector: ".summary-total strong" })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Remove Pocket Speaker from bag" }));
  expect(screen.getByRole("heading", { name: "Your bag is taking a breath" })).toBeInTheDocument();
 });
});
