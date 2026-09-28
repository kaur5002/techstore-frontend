import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) { return <article className="product-card"><Link href={`/products/${product.id}`} className="product-image-link" aria-label={`View ${product.title} details`}><div className="product-image"><Image src={product.image} alt={product.title} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 28vw" priority={index < 2} unoptimized /></div></Link><div className="product-info"><p className="eyebrow">{product.category}</p><h2><Link href={`/products/${product.id}`}>{product.title}</Link></h2><div className="product-meta"><span className="price">{formatPrice(product.price)}</span>{product.rating && <span className="rating" aria-label={`${product.rating.rate} out of 5 stars`}>★ {product.rating.rate}</span>}</div></div></article>; }
