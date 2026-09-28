import type { Metadata } from "next";
import { CartContent } from "@/components/CartContent";
export const metadata: Metadata = { title: "Your bag" };
export default function CartPage() { return <main className="main-wrap cart-page"><div className="page-title"><p className="eyebrow">YOUR SELECTION</p><h1>Your bag<span className="title-period">.</span></h1><p>Good choices look good together.</p></div><CartContent /></main>; }
