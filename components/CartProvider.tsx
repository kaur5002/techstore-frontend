"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/types/product";
import type { CartItem } from "@/types/cart";
type CartContextValue = { items: CartItem[]; count: number; subtotal: number; add: (product: Product, quantity: number, option?: string) => void; setQuantity: (id: number, quantity: number) => void; remove: (id: number) => void };
const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "techstore-cart-v1";
export function CartProvider({ children }: { children: ReactNode }) {
 const [items, setItems] = useState<CartItem[]>([]);
 const [hydrated, setHydrated] = useState(false);
 useEffect(() => { let parsedItems: CartItem[] = []; try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) { const parsed: unknown = JSON.parse(saved); if (Array.isArray(parsed)) parsedItems = parsed.filter((x): x is CartItem => x && typeof x.quantity === "number" && x.quantity > 0 && x.product && typeof x.product.id === "number"); } } catch { localStorage.removeItem(STORAGE_KEY); } queueMicrotask(() => { setItems(parsedItems); setHydrated(true); }); }, []);
 useEffect(() => { if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [items, hydrated]);
 const value = useMemo<CartContextValue>(() => ({ items, count: items.reduce((n, item) => n + item.quantity, 0), subtotal: items.reduce((n, item) => n + item.product.price * item.quantity, 0), add: (product, quantity, option) => setItems(current => { const found = current.find(item => item.product.id === product.id && item.option === option); return found ? current.map(item => item === found ? { ...item, quantity: Math.min(99, item.quantity + quantity) } : item) : [...current, { product, quantity: Math.max(1, Math.min(99, quantity)), option }]; }), setQuantity: (id, quantity) => setItems(current => current.map(item => item.product.id === id ? { ...item, quantity: Math.max(1, Math.min(99, quantity)) } : item)), remove: id => setItems(current => current.filter(item => item.product.id !== id)) }), [items]);
 return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const context = useContext(CartContext); if (!context) throw new Error("useCart must be used within CartProvider"); return context; }
