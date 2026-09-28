"use client";

import Image from "next/image";
import Link from "next/link";
import {  useParams } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { ProductActions } from "@/components/ProductActions";
import {  useEffect, useState } from "react";
import { Product } from "@/types/product";
//export const revalidate = 300;
//type Props = { params: Promise<{ id: string }> };
//type ProductPageProps = { params: Promise<{ id: string }> };
// export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
//   const { id } = await params;
//   try {
//     const product = await getProduct(id);
//     return product
//       ? { title: product.title, description: product.description }
//       : {};
//   } catch {
//     return {};
//   }
// }app/products/[id]/page.tsx
export default function ProductPage()  {
  const params = useParams();
  const { id } =  params as { id: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json());
        setProduct(product);
      } catch (error) {
        console.error("TechStore product request failed:", error);
        setError("We couldn’t load this item. Please try again.");
      }
    };

    fetchProduct();
  }, [id]);

  
//   let product;
//   try {
//     product = await getProduct(id);
//   } catch {
//     return (
//       <main className="main-wrap">
//         <section className="state-card">
//           <h1>Product unavailable</h1>
//           <p>We couldn’t load this item. Please try again.</p>
//           <Link className="button button-secondary" href="/">
//             Back to collection
//           </Link>
//         </section>
//       </main>
//     );
//   }

  if (!product) {
    return null;
  }

  return (
    
      <main className="main-wrap detail-wrap">
        <Link className="back-link" href="/">
          ← Back to collection
        </Link>
        <div className="detail-grid">
          <div className="detail-image">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 52vw"
            unoptimized
          />
        </div>
        <section className="detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          {product.rating && (
            <p className="detail-rating">
              <span aria-hidden="true">★</span> {product.rating.rate}{" "}
              <span>({product.rating.count} reviews)</span>
            </p>
          )}
          <p className="detail-description">{product.description}</p>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <ProductActions product={product} />
          <div className="detail-perks">
            <p>✳ &nbsp; Thoughtfully selected essentials</p>
            <p>↗ &nbsp; Free delivery over $50</p>
          </div>
        </section>
      </div>
    </main>
  );
}
