"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/spot-prices";

interface Product {
  id: string;
  title: string;
  slug: string;
  askingPrice: number;
  images: string;
}

export default function FeaturedCoins() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/inventory?featured=true&limit=8");
        if (res.ok) {
          const data = await res.json();
          setProducts(data.listings || data.items || data);
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-[var(--border)] p-0 overflow-hidden"
          >
            <div className="w-full aspect-square bg-gray-100 animate-shimmer" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-100 rounded-full w-3/4 animate-shimmer" />
              <div className="h-3 bg-gray-100 rounded-full w-1/2 animate-shimmer" />
              <div className="h-5 bg-gray-100 rounded-full w-1/3 animate-shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 rounded-2xl bg-white border border-[var(--border)]">
        <p className="text-gray-400 text-lg">Check back soon for featured products!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const images = (() => {
          try {
            return JSON.parse(product.images);
          } catch {
            return [];
          }
        })();
        const hasImage = images.length > 0;

        return (
          <Link
            key={product.id}
            href={`/inventory/${product.slug}`}
            className={cn(
              "group bg-white rounded-xl",
              "border border-[var(--border)]",
              "hover:shadow-xl hover:shadow-[#1A3C2A]/8 hover:border-[#D4451A]/30 transition-all duration-400",
              "overflow-hidden hover:-translate-y-1"
            )}
          >
            <div className="w-full aspect-square bg-gray-50 flex items-center justify-center relative overflow-hidden">
              {hasImage ? (
                <img
                  src={images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-300">
                  <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                  </svg>
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </div>
            <div className="p-5">
              <h3 className="font-serif font-bold text-[#1A3C2A] group-hover:text-[#D4451A] transition-colors duration-300 line-clamp-2 text-sm sm:text-[15px] leading-snug mb-2">
                {product.title}
              </h3>
              <p className="text-lg font-bold text-[#D4451A]">
                {formatPrice(product.askingPrice)}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
