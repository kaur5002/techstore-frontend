"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";
export function Header() { const { count } = useCart(); return <header className="site-header"><div className="header-inner"><Link className="brand" href="/" aria-label="TechStore home"><span className="brand-mark" aria-hidden="true">T</span><span>techstore</span></Link><nav aria-label="Main navigation"><Link href="/">Discover</Link><Link href="/cart" className="cart-link">Bag <span className="cart-count" aria-label={`${count} items in bag`}>{count}</span></Link></nav></div></header>; }
