"use client";
import { useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "./CartProvider";
import { QuantitySelector } from "./QuantitySelector";
import { Button } from "./Button";
export function ProductActions({ product }: { product: Product }) { const [quantity, setQuantity] = useState(1); const [added, setAdded] = useState(false); const { add } = useCart(); return <div className="purchase-panel"><div><span className="field-label">Quantity</span><QuantitySelector value={quantity} onChange={setQuantity} /></div><Button onClick={() => { add(product, quantity); setAdded(true); window.setTimeout(() => setAdded(false), 2400); }}>{added ? "Added to bag ✓" : "Add to bag"}</Button><p className="microcopy" role="status">{added ? `${quantity} ${quantity === 1 ? "item" : "items"} added. Your bag is ready.` : "Free delivery on orders over $50 · Easy 30-day returns"}</p></div>; }
