"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/spot-prices";
import { FaSearch } from "react-icons/fa";
import { cn } from "@/lib/utils";

export interface CoinListing {
  id: string;
  title: string;
  slug: string;
  category: string;
  metal?: string | null;
  year?: number | null;
  mintMark?: string | null;
  grade?: string | null;
  certification?: string | null;
  certNumber?: string | null;
  description?: string | null;
  askingPrice: number;
  quantity: number;
  featured: boolean;
  sold: boolean;
  images: string;
  createdAt: string;
}

interface CoinCardProps {
  coin: CoinListing;
  onQuickView: (coin: CoinListing) => void;
}

function parseImages(imagesJson: string): string[] {
  try {
    return JSON.parse(imagesJson);
  } catch {
    return [];
  }
}

function isNewArrival(createdAt: string): boolean {
  try {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  } catch {
    return false;
  }
}

export default function CoinCard({ coin, onQuickView }: CoinCardProps) {
  const images = parseImages(coin.images);
  const primaryImage = images.length > 0 ? images[0] : null;
  const isNew = isNewArrival(coin.createdAt);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm transition-all duration-400 hover:shadow-xl hover:shadow-[#1A3C2A]/8 hover:-translate-y-1">
      {/* NEW Badge */}
      {isNew && (
        <div
          className="absolute top-3 left-3 z-20 rounded-md bg-[#D4451A] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md"
          style={{ transform: "rotate(-3deg)" }}
        >
          NEW
        </div>
      )}

      {/* Image */}
      <Link href={`/inventory/${coin.slug}`} className="relative block aspect-square overflow-hidden bg-gray-50">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={coin.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <svg
              className="h-16 w-16 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
              <text
                x="12"
                y="16"
                textAnchor="middle"
                fontSize="8"
                fill="currentColor"
                stroke="none"
              >
                $
              </text>
            </svg>
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onQuickView(coin);
          }}
          className="absolute bottom-3 right-3 rounded-full bg-white/95 p-2.5 text-gray-600 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#D4451A] hover:scale-110 group-hover:opacity-100"
          aria-label="Quick view"
        >
          <FaSearch className="h-3.5 w-3.5" />
        </button>

        {/* Category Badge */}
        <span className={cn("absolute top-3 rounded-full bg-[#1A3C2A]/90 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-white tracking-wide", isNew ? "left-16" : "left-3")}>
          {coin.category}
        </span>
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link href={`/inventory/${coin.slug}`}>
          <h3 className="font-serif text-sm font-bold leading-snug text-[#1A3C2A] transition-colors duration-300 hover:text-[#D4451A] sm:text-[15px] line-clamp-2">
            {coin.title}
          </h3>
        </Link>

        <div className="mt-auto pt-4">
          <p className="text-lg font-bold text-[#D4451A]">
            {formatPrice(coin.askingPrice)}
          </p>
        </div>
      </div>
    </div>
  );
}
