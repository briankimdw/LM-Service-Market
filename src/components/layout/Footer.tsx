"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/inventory" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const moreLinks = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Testimonials", href: "/testimonials" },
];

interface StoreInfo {
  shopName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  socialFacebook: string;
  socialInstagram: string;
  socialTwitter: string;
}

export function Footer({ store }: { store?: StoreInfo | null }) {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const shopName = store?.shopName || "L & M Service Market";
  const address = store?.address || "";
  const cityStateZip = [store?.city, store?.state].filter(Boolean).join(", ") + (store?.zip ? ` ${store.zip}` : "");
  const phone = store?.phone || "";
  const emailAddr = store?.email || "";
  const socialFacebook = store?.socialFacebook || "";
  const socialInstagram = store?.socialInstagram || "";
  const socialTwitter = store?.socialTwitter || "";

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSubscribeStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribeStatus("success");
        setEmail("");
      } else {
        setSubscribeStatus("error");
      }
    } catch {
      setSubscribeStatus("error");
    }
  };

  const currentYear = new Date().getFullYear();
  const hasSocials = socialFacebook || socialInstagram || socialTwitter;

  return (
    <footer className="relative bg-[#1A3C2A] text-[#FFF9F2]/70 pb-20 sm:pb-0">
      {/* Top gold accent */}
      <div className="h-1 bg-gradient-to-r from-[#B83A15] via-[#D4451A] to-[#B83A15]" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Shop Info */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[#FFF9F2] mb-5 tracking-wide">
              {shopName}
            </h3>
            <address className="not-italic space-y-2.5 text-sm leading-relaxed">
              {address && <p>{address}</p>}
              {cityStateZip.trim() && <p>{cityStateZip}</p>}
              {phone && (
                <p className="pt-2">
                  <a
                    href={`tel:${phone}`}
                    className="hover:text-[#D4451A] transition-colors duration-300"
                  >
                    {phone}
                  </a>
                </p>
              )}
              {emailAddr && (
                <p>
                  <a
                    href={`mailto:${emailAddr}`}
                    className="hover:text-[#D4451A] transition-colors duration-300"
                  >
                    {emailAddr}
                  </a>
                </p>
              )}
            </address>

            {/* Social Media */}
            {hasSocials && (
              <div className="mt-6 flex items-center gap-3">
                {socialFacebook && (
                  <a
                    href={socialFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#FFF9F2]/60 transition-all duration-300 hover:bg-[#D4451A] hover:text-[#1A3C2A] hover:border-[#D4451A] hover:shadow-lg hover:shadow-[#D4451A]/20"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="h-4 w-4" />
                  </a>
                )}
                {socialInstagram && (
                  <a
                    href={socialInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#FFF9F2]/60 transition-all duration-300 hover:bg-[#D4451A] hover:text-[#1A3C2A] hover:border-[#D4451A] hover:shadow-lg hover:shadow-[#D4451A]/20"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="h-4 w-4" />
                  </a>
                )}
                {socialTwitter && (
                  <a
                    href={socialTwitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#FFF9F2]/60 transition-all duration-300 hover:bg-[#D4451A] hover:text-[#1A3C2A] hover:border-[#D4451A] hover:shadow-lg hover:shadow-[#D4451A]/20"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links - Split into two columns */}
          <div className="grid grid-cols-2 gap-8 sm:col-span-1">
            <div>
              <h3 className="font-serif text-sm font-bold text-[#FFF9F2] mb-5 uppercase tracking-widest">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-[#D4451A] transition-colors duration-300 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold text-[#FFF9F2] mb-5 uppercase tracking-widest">
                Resources
              </h3>
              <ul className="space-y-2.5">
                {moreLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-[#D4451A] transition-colors duration-300 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-sm font-bold text-[#FFF9F2] mb-5 uppercase tracking-widest">
              Newsletter
            </h3>
            <p className="text-sm mb-5 leading-relaxed">
              Stay updated with weekly specials, new products, and store
              news.
            </p>
            {subscribeStatus === "success" ? (
              <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
                <p className="text-sm text-green-400 font-medium">
                  Thank you for subscribing!
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#FFF9F2] placeholder-[#FFF9F2]/40 outline-none transition-all duration-300 focus:border-[#D4451A] focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(212,69,26,0.1)]"
                />
                <button
                  type="submit"
                  disabled={subscribeStatus === "loading"}
                  className="w-full rounded-lg bg-gradient-to-r from-[#D4451A] to-[#B83A15] px-4 py-3 text-sm font-semibold text-[#1A3C2A] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4451A]/20 disabled:opacity-50"
                >
                  {subscribeStatus === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
                {subscribeStatus === "error" && (
                  <p className="text-xs text-red-400">Something went wrong. Try again.</p>
                )}
              </form>
            )}
          </div>

          {/* Memberships */}
          <div>
            <h3 className="font-serif text-sm font-bold text-[#FFF9F2] mb-5 uppercase tracking-widest">
              Visit Us
            </h3>
            <p className="text-sm mb-5 leading-relaxed">
              Your neighborhood convenience store in Midtown Atlanta, serving the community with everyday essentials.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-14 border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#FFF9F2]/40">
            &copy; {currentYear} {shopName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#FFF9F2]/40">
            <Link href="/privacy" className="hover:text-[#D4451A] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#D4451A] transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
