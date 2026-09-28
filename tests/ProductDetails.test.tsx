import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CartProvider } from "@/components/CartProvider";
import { ProductActions } from "@/components/ProductActions";
import { CartContent } from "@/components/CartContent";
import type { Product } from "@/types/product";
const product: Product = { id: 7, title: "Studio Headphones", price: 129, description: "Clear sound", category: "electronics", image: "https://example.com/headphones.png" };
describe("product purchase controls", () => {
 it("adds the selected quantity to the cart and confirms the action", async () => {
  const user = userEvent.setup();
  render(<CartProvider><ProductActions product={product} /><CartContent /></CartProvider>);
  await user.click(screen.getByRole("button", { name: "Increase quantity" }));
  await user.click(screen.getByRole("button", { name: "Add to bag" }));
  expect(screen.getByText("2 items added. Your bag is ready.")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Studio Headphones" })).toBeInTheDocument();
  expect(screen.getByText("$258.00", { selector: ".summary-total strong" })).toBeInTheDocument();
 });
});
