import Link from "next/link";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { parseJsonField } from "@/lib/utils";
import FeaturedCoins from "@/components/FeaturedCoins";
import TestimonialCard from "@/components/TestimonialCard";
import NewsletterForm from "@/components/NewsletterForm";
import { JsonLd } from "@/components/JsonLd";
import {
  FaShoppingBasket,
  FaWineBottle,
  FaCoffee,
  FaCookieBite,
  FaTicketAlt,
  FaHome as FaHousehold,
} from "react-icons/fa";
import { FaShieldAlt, FaAward, FaHandshake, FaStar } from "react-icons/fa";
import AnnouncementBanner from "@/components/AnnouncementBanner";

export const dynamic = 'force-dynamic';

async function getSettings() {
  return prisma.storeSettings.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  });
}

async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

const services = [
  {
    icon: FaShoppingBasket,
    title: "Groceries",
    description: "Fresh produce, dairy, bread, and everyday essentials for your kitchen.",
  },
  {
    icon: FaWineBottle,
    title: "Beer & Wine",
    description: "Excellent selection of craft beer, wine, and your favorite brands.",
  },
  {
    icon: FaCookieBite,
    title: "Snacks & Candy",
    description: "Chips, candy, cookies, and quick bites for any craving.",
  },
  {
    icon: FaCoffee,
    title: "Beverages",
    description: "Cold drinks, juices, water, energy drinks, and more.",
  },
  {
    icon: FaTicketAlt,
    title: "Lottery",
    description: "Lottery tickets and scratch-off cards. Try your luck!",
  },
  {
    icon: FaHousehold,
    title: "Household",
    description: "Cleaning supplies, toiletries, and everyday household basics.",
  },
];

const trustBadges = [
  { icon: FaShieldAlt, label: "Family Owned" },
  { icon: FaAward, label: "Midtown Favorite" },
  { icon: FaHandshake, label: "Friendly Service" },
  { icon: FaStar, label: "4.9 Star Rated" },
];

export default async function HomePage() {
  const [settings, testimonials] = await Promise.all([
    getSettings(),
    getTestimonials(),
  ]);

  const hours = parseJsonField<
    Array<{ day: string; open: string; close: string; closed: boolean }>
  >(settings.hoursJson, []);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ConvenienceStore",
          name: settings.shopName,
          address: {
            "@type": "PostalAddress",
            streetAddress: settings.address,
            addressLocality: settings.city,
            addressRegion: settings.state,
            postalCode: settings.zip,
          },
          telephone: settings.phone,
          email: settings.email,
        }}
      />

      {/* ====== HERO SECTION ====== */}
      <section className="relative min-h-[560px] md:min-h-[640px] flex items-center overflow-hidden">
        {/* Base dark green background (always present) */}
        <div className="absolute inset-0 bg-[#1A3C2A]" />

        {/* Banner image from admin settings, with dark overlay for text readability */}
        {settings.bannerImage && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${settings.bannerImage})` }}
            />
            <div className="absolute inset-0 bg-[#1A3C2A]/70" />
          </>
        )}

        {/* Gradient + decorative elements (shown when no banner image) */}
        {!settings.bannerImage && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A3C2A] via-[#1E4530] to-[#1A3C2A]" />
            <div className="absolute inset-0 opacity-100">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4451A]/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4451A]/[0.03] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
            </div>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(212,69,26,0.5) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#D4451A]/10 border border-[#D4451A]/20 px-4 py-1.5 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4451A] animate-pulse" />
              <span className="text-[#D4451A] text-xs font-semibold tracking-wider uppercase">
                Serving Midtown Atlanta Since 1987
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] font-bold text-white mb-6 leading-[1.1] tracking-tight">
              {settings.heroTitle || "Your Neighborhood Convenience Store"}
            </h1>
            <p className="text-lg sm:text-xl text-[#FFF9F2]/70 mb-10 max-w-2xl leading-relaxed">
              {settings.heroSubtitle || "Groceries, snacks, beer & wine, and everyday essentials — just a walk away."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/inventory"
                className={cn(
                  "inline-flex items-center justify-center px-8 py-4 rounded-lg",
                  "bg-gradient-to-r from-[#D4451A] to-[#B83A15] text-white font-semibold text-lg",
                  "transition-all duration-300",
                  "shadow-lg shadow-[#D4451A]/25",
                  "hover:shadow-xl hover:shadow-[#D4451A]/35 hover:-translate-y-0.5"
                )}
              >
                See What&apos;s In Store
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center px-8 py-4 rounded-lg",
                  "border-2 border-[#D4451A]/60 text-[#D4451A] hover:bg-[#D4451A] hover:text-white hover:border-[#D4451A]",
                  "font-semibold text-lg transition-all duration-300",
                  "hover:-translate-y-0.5"
                )}
              >
                Get Directions
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1A3C2A] to-transparent" />
      </section>

      {/* ====== TRUST BADGES ====== */}
      <div className="relative z-10 bg-[#1A3C2A] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-6">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2.5 text-[#FFF9F2]/50">
                <badge.icon className="h-4 w-4 text-[#D4451A]/70" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== OWNER MESSAGE BANNER ====== */}
      {settings.ownerMessageActive && settings.ownerMessage && (
        <AnnouncementBanner
          messages={settings.ownerMessage
            .split("|")
            .map((m) => m.trim())
            .filter(Boolean)}
        />
      )}

      {/* ====== FEATURED PRODUCTS ====== */}
      <section className="py-20 bg-[var(--surface-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4451A] text-sm font-semibold uppercase tracking-widest mb-3">What We Carry</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A3C2A] mb-4">
              Featured Products
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Fresh picks from our shelves — always stocked with what you need
            </p>
          </div>
          <FeaturedCoins />
          <div className="text-center mt-12">
            <Link
              href="/inventory"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold",
                "text-[#D4451A] border-2 border-[#D4451A]",
                "hover:bg-[#D4451A] hover:text-white transition-all duration-300",
                "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#D4451A]/20"
              )}
            >
              Browse All Products
              <span className="text-lg">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ====== WHAT WE OFFER ====== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D4451A] text-sm font-semibold uppercase tracking-widest mb-3">Everything You Need</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A3C2A] mb-4">
              What We Offer
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              From groceries to lottery tickets, we&apos;ve got you covered — all in your neighborhood.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className={cn(
                  "relative bg-[var(--surface-alt)] rounded-xl p-7",
                  "border border-[var(--border)]",
                  "hover:border-[#D4451A]/40 hover:shadow-xl hover:shadow-[#D4451A]/5 transition-all duration-400",
                  "group hover:-translate-y-1"
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#D4451A]/10 mb-5 transition-all duration-300 group-hover:bg-[#D4451A]/20 group-hover:scale-110">
                  <service.icon className="w-6 h-6 text-[#D4451A]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A3C2A] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-[var(--surface-alt)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[#D4451A] text-sm font-semibold uppercase tracking-widest mb-3">Our Community</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A3C2A] mb-4">
                What Our Neighbors Say
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  name={testimonial.name}
                  text={testimonial.text}
                  rating={testimonial.rating}
                />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/testimonials"
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold",
                  "text-[#D4451A] border-2 border-[#D4451A]",
                  "hover:bg-[#D4451A] hover:text-white transition-all duration-300",
                  "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#D4451A]/20"
                )}
              >
                See All Reviews
                <span className="text-lg">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ====== REVIEW US CTA ====== */}
      <section className="py-20 bg-[#1A3C2A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(212,69,26,0.5) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="h-6 w-6 text-[#D4451A]" />
              ))}
            </div>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Love Shopping With Us?
          </h2>
          <p className="text-[#FFF9F2]/60 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Help your neighbors discover L &amp; M Service Market
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.yelp.com/biz/l-and-m-service-market-atlanta"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg",
                "bg-[#D32323] hover:bg-[#B91C1C] text-white font-semibold text-lg",
                "transition-all duration-300",
                "shadow-lg shadow-[#D32323]/25",
                "hover:shadow-xl hover:shadow-[#D32323]/35 hover:-translate-y-0.5"
              )}
            >
              <FaStar className="h-5 w-5" />
              Review on Yelp
            </a>
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJ_placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg",
                "bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold text-lg",
                "transition-all duration-300",
                "shadow-lg shadow-[#4285F4]/25",
                "hover:shadow-xl hover:shadow-[#4285F4]/35 hover:-translate-y-0.5"
              )}
            >
              <FaStar className="h-5 w-5" />
              Review on Google
            </a>
          </div>
        </div>
      </section>

      {/* ====== MAP & CONTACT ====== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4451A] text-sm font-semibold uppercase tracking-widest mb-3">Come Visit</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A3C2A] mb-4">
              Find Us
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="bg-gray-100 rounded-2xl overflow-hidden min-h-[350px] flex items-center justify-center shadow-inner">
              {settings.googleMapsEmbed ? (
                <div
                  className="w-full h-full min-h-[350px]"
                  dangerouslySetInnerHTML={{ __html: settings.googleMapsEmbed }}
                />
              ) : (
                <div className="text-center text-gray-400 p-8">
                  <div className="text-5xl mb-3">&#128205;</div>
                  <p className="font-medium">Google Maps embed will appear here</p>
                  <p className="text-sm mt-1">Configure in admin settings</p>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-[var(--surface-alt)] rounded-2xl p-7 border border-[var(--border)]">
                <h3 className="font-serif text-xl font-bold text-[#1A3C2A] mb-5">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#D4451A]/10">
                      <span className="text-[#D4451A] text-lg">&#128205;</span>
                    </div>
                    <span className="text-gray-600 pt-2">
                      {settings.address}, {settings.city}, {settings.state} {settings.zip}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#D4451A]/10">
                      <span className="text-[#D4451A] text-lg">&#128222;</span>
                    </div>
                    <a href={`tel:${settings.phone}`} className="text-gray-600 hover:text-[#D4451A] transition-colors duration-300">
                      {settings.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#D4451A]/10">
                      <span className="text-[#D4451A] text-lg">&#9993;</span>
                    </div>
                    <a href={`mailto:${settings.email}`} className="text-gray-600 hover:text-[#D4451A] transition-colors duration-300">
                      {settings.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--surface-alt)] rounded-2xl p-7 border border-[var(--border)]">
                <h3 className="font-serif text-xl font-bold text-[#1A3C2A] mb-5">
                  Store Hours
                </h3>
                <div className="space-y-3">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between text-sm pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <span className="font-medium text-gray-700">{h.day}</span>
                      <span className={cn("font-medium", h.closed ? "text-red-400" : "text-gray-600")}>
                        {h.closed ? "Closed" : `${h.open} - ${h.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== NEWSLETTER ====== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3C2A] via-[#1E4530] to-[#1A3C2A]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(212,69,26,0.5) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#D4451A] text-sm font-semibold uppercase tracking-widest mb-3">Stay Connected</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Get Updates & Deals
          </h2>
          <p className="text-[#FFF9F2]/60 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Subscribe for weekly specials, new arrivals, and neighborhood news.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
