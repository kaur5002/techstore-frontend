import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { ProductActions } from "@/components/ProductActions";
export const revalidate = 300;
type Props = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { id } = await params; try { const product = await getProduct(id); return product ? { title: product.title, description: product.description } : {}; } catch { return {}; } }
export default async function ProductPage({ params }: Props) { const { id } = await params; let product; try { product = await getProduct(id); } catch { return <main className="main-wrap"><section className="state-card"><h1>Product unavailable</h1><p>We couldn’t load this item. Please try again.</p><Link className="button button-secondary" href="/">Back to collection</Link></section></main>; } if (!product) notFound(); return <main className="main-wrap detail-wrap"><Link className="back-link" href="/">← Back to collection</Link><div className="detail-grid"><div className="detail-image"><Image src={product.image} alt={product.title} fill priority sizes="(max-width: 800px) 100vw, 52vw" unoptimized /></div><section className="detail-copy"><p className="eyebrow">{product.category}</p><h1>{product.title}</h1>{product.rating && <p className="detail-rating"><span aria-hidden="true">★</span> {product.rating.rate} <span>({product.rating.count} reviews)</span></p>}<p className="detail-description">{product.description}</p><p className="detail-price">{formatPrice(product.price)}</p><ProductActions product={product} /><div className="detail-perks"><p>✳ &nbsp; Thoughtfully selected essentials</p><p>↗ &nbsp; Free delivery over $50</p></div></section></div></main>; }
