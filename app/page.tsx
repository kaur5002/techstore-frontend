"use client";
//export const dynamic = "force-dynamic";

import { getProducts } from "@/lib/api";
import { ProductBrowser } from "@/components/ProductBrowser";
import { EmptyProducts, ErrorState } from "@/components/States";
import { use, useEffect, useState } from "react";
import { Product } from "@/types/product";

export default  function HomePage() {
//   let products;
//   try {
//     products = await getProducts();
//   } catch (error) {
//     console.error("TechStore product collection request failed:", error);
//     return (
//       <main className="main-wrap">
//         <ErrorState message="Our product collection is temporarily unavailable. Please try again." />
//       </main>
//     );
//   }
const [products, setProducts] = useState<Product[]>([]);
const [error, setError] = useState<string | null>(null);


useEffect(() => {
    const fetchProducts = async () => {
        try {
            const products = await fetch("https://fakestoreapi.com/products").then(res => res.json());
            console.log("Fetched products:", products);
            setProducts(products);
        } catch (error) {
            console.error("TechStore product collection request failed:", error);
            setError("Our product collection is temporarily unavailable. Please try again.");
        }
    };

    fetchProducts();
}, []);



  return (
    <main className="main-wrap">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow hero-kicker">
            <span className="status-dot" /> THE EVERYDAY EDIT
          </p>
          <h1>
            Good tech.
            <br />
            <span>Good choices.</span>
          </h1>
          <p className="hero-description">
            A considered collection of useful things, made for the way you live
            and work.
          </p>
          <a className="hero-link" href="#collection">
            Explore the collection <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-halo" />
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-device">
            <div className="device-screen">
              <div className="screen-glow" />
              <span>01</span>
            </div>
            <div className="device-base" />
          </div>
          <span className="art-caption">FORM MEETS FUNCTION</span>
          <span className="art-number">№ 01 — 04</span>
        </div>
        <div className="hero-bottom">
          <span>CURATED FOR YOU</span>
          <span>
            DESIGNED TO LAST <span className="hero-dash">—</span>{" "}
          </span>
        </div>
      </section>
      <section id="collection" className="collection">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>
              Find your next <em>favourite.</em>
            </h2>
          </div>
          <span className="section-note">
            Useful things, thoughtfully chosen.
          </span>
        </div>
        {products.length ? (
          <ProductBrowser products={products} />
        ) : (
          <EmptyProducts />
        )}
      </section>
    </main>
  );
}


