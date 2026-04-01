import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/spot-prices";
import { parseJsonField } from "@/lib/utils";
import { JsonLd } from "@/components/JsonLd";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { slug: string };
}

async function getProduct(slug: string) {
  return prisma.coinListing.findUnique({ where: { slug } });
}

async function getRelatedProducts(category: string, excludeId: string) {
  return prisma.coinListing.findMany({
    where: {
      category,
      id: { not: excludeId },
      sold: false,
    },
    take: 4,
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.title,
    description: product.description || `View details for ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description || `View details for ${product.title}`,
      images: parseJsonField<string[]>(product.images, []).slice(0, 1),
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const images = parseJsonField<string[]>(product.images, []);
  const relatedProducts = await getRelatedProducts(product.category, product.id);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.description || `Details for ${product.title}`,
          image: images.length > 0 ? images[0] : undefined,
          offers: {
            "@type": "Offer",
            price: product.askingPrice,
            priceCurrency: "USD",
            availability: product.sold
              ? "https://schema.org/SoldOut"
              : "https://schema.org/InStock",
          },
        }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)] bg-white">
        <nav className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-[#D4451A] transition-colors duration-300">Home</Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <Link href="/inventory" className="hover:text-[#D4451A] transition-colors duration-300">Products</Link>
            </li>
            <li className="text-gray-300">/</li>
            <li className="text-[#1A3C2A] font-medium truncate max-w-[200px]">
              {product.title}
            </li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image Section */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border)] bg-gray-50 shadow-sm">
              {images.length > 0 ? (
                <img
                  src={images[0]}
                  alt={product.title}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                  <span className="text-8xl text-gray-300">&#x1F6D2;</span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 border-[var(--border)] hover:border-[#D4451A]/50 transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={img}
                      alt={`${product.title} - Image ${i + 1}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#1A3C2A] md:text-3xl leading-tight">
              {product.title}
            </h1>

            {/* Price - prominent */}
            <div className="mt-5">
              <p className="text-3xl font-bold text-[#D4451A]">
                {formatPrice(product.askingPrice)}
              </p>
            </div>

            {/* Details Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] p-5">
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  Category
                </dt>
                <dd className="mt-1.5 text-sm font-semibold text-[#1A3C2A]">
                  {product.category}
                </dd>
              </div>

              {product.quantity > 0 && (
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Availability
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-emerald-600">
                    In Stock
                  </dd>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-8">
                <h2 className="font-serif text-lg font-bold text-[#1A3C2A]">
                  Description
                </h2>
                <p className="mt-3 leading-relaxed text-gray-600">
                  {product.description}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/contact?subject=${encodeURIComponent(`Inquiry about ${product.title}`)}`}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#1A3C2A] to-[#245236] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#1A3C2A]/25 hover:-translate-y-0.5"
              >
                Inquire About This Product
              </Link>
              <Link
                href="/inventory"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-7 py-3.5 text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300"
              >
                &larr; Back to Products
              </Link>
            </div>
          </div>
        </div>

        {/* Related Items */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[var(--border)]">
            <h2 className="font-serif text-2xl font-bold text-[#1A3C2A]">
              Related Products
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((related) => {
                const relImages = parseJsonField<string[]>(related.images, []);
                return (
                  <Link
                    key={related.id}
                    href={`/inventory/${related.slug}`}
                    className="group overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-all duration-400 hover:shadow-xl hover:shadow-[#1A3C2A]/8 hover:-translate-y-1"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      {relImages.length > 0 ? (
                        <img
                          src={relImages[0]}
                          alt={related.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="text-4xl text-gray-300">&#x1F6D2;</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-sm font-bold text-[#1A3C2A] transition-colors duration-300 group-hover:text-[#D4451A] line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="mt-2 text-lg font-bold text-[#D4451A]">
                        {formatPrice(related.askingPrice)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
