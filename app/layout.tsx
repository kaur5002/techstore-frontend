import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import "./globals.css";
export const metadata: Metadata = { title: { default: "TechStore — Thoughtful tech, made simple", template: "%s · TechStore" }, description: "Explore a considered collection of everyday technology at TechStore, a fictional portfolio storefront." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><Providers><Header />{children}<footer className="site-footer"><div className="footer-inner"><p>TechStore <span>·</span> Thoughtful tech, made simple.</p><p>Fictional portfolio project · Product catalog via Fake Store API</p></div></footer></Providers></body></html>; }
