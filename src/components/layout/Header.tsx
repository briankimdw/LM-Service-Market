"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaChevronDown, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

const primaryLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/inventory" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const secondaryLinks: NavLink[] = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Request", href: "/request" },
  { label: "Testimonials", href: "/testimonials" },
];

const allLinks: NavLink[] = [...primaryLinks, ...secondaryLinks];

interface StoreInfo {
  shopName: string;
  tagline: string;
  logo: string | null;
  hoursJson: string;
  isOpen: boolean;
}

function checkIsOpen(hoursJson: string): boolean {
  try {
    const hours = JSON.parse(hoursJson) as Array<{
      day: string;
      open: string;
      close: string;
      closed: boolean;
    }>;
    const now = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = dayNames[now.getDay()];
    const todayHours = hours.find((h) => h.day === today);
    if (!todayHours || todayHours.closed) return false;

    const parseTime = (timeStr: string): number => {
      const [time, period] = timeStr.split(" ");
      const parts = time.split(":");
      let h = parseInt(parts[0]);
      const m = parseInt(parts[1] || "0");
      if (period === "PM" && h !== 12) h += 12;
      if (period === "AM" && h === 12) h = 0;
      return h * 60 + m;
    };

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return currentMinutes >= parseTime(todayHours.open) && currentMinutes <= parseTime(todayHours.close);
  } catch {
    return false;
  }
}

export function Header({ store }: { store?: StoreInfo | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  const shopName = store?.shopName || "L & M Service Market";
  const initials = useMemo(() => {
    const words = shopName.split(/\s+/).filter(Boolean);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return shopName.slice(0, 2).toUpperCase();
  }, [shopName]);

  const nameParts = useMemo(() => {
    const words = shopName.split(/\s+/);
    if (words.length <= 2) return { line1: shopName, line2: "" };
    const mid = Math.ceil(words.length / 2);
    return { line1: words.slice(0, mid).join(" "), line2: words.slice(mid).join(" ") };
  }, [shopName]);

  useEffect(() => {
    if (store?.hoursJson) {
      setIsOpen(checkIsOpen(store.hoursJson));
      const interval = setInterval(() => setIsOpen(checkIsOpen(store.hoursJson)), 60000);
      return () => clearInterval(interval);
    }
  }, [store?.hoursJson]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close "More" dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(e.target as Node) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(e.target as Node)
      ) {
        setMoreDropdownOpen(false);
      }
    }
    if (moreDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [moreDropdownOpen]);

  const isSecondaryActive = secondaryLinks.some((link) => pathname === link.href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 bg-[#1A3C2A]",
        scrolled && "shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
      )}
    >
      {/* Subtle accent line at top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4451A] to-transparent opacity-60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo / Shop Name */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-all duration-300 hover:opacity-90 group"
          >
            {store?.logo ? (
              <img
                src={store.logo}
                alt={shopName}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#D4451A]/30 sm:h-12 sm:w-12 transition-all duration-300 group-hover:ring-[#D4451A]/60"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D4451A] to-[#B83A15] text-[#1A3C2A] font-serif font-bold text-lg sm:h-12 sm:w-12 sm:text-xl shadow-lg shadow-[#D4451A]/20 transition-all duration-300 group-hover:shadow-[#D4451A]/40">
                {initials}
              </div>
            )}
            <div className="hidden sm:block">
              <h1 className="font-serif text-lg font-bold text-[#FFF9F2] leading-tight sm:text-xl tracking-wide">
                {nameParts.line1}
              </h1>
              {nameParts.line2 && (
                <p className="text-[11px] text-[#D4451A] tracking-[0.2em] uppercase font-medium">
                  {nameParts.line2}
                </p>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-300",
                  pathname === link.href
                    ? "text-[#D4451A] bg-white/10"
                    : "text-[#FFF9F2]/75 hover:text-[#D4451A] hover:bg-white/5"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#D4451A] rounded-full" />
                )}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative">
              <button
                ref={moreButtonRef}
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={cn(
                  "relative flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-300",
                  isSecondaryActive || moreDropdownOpen
                    ? "text-[#D4451A] bg-white/10"
                    : "text-[#FFF9F2]/75 hover:text-[#D4451A] hover:bg-white/5"
                )}
                aria-expanded={moreDropdownOpen}
                aria-haspopup="true"
              >
                More
                <FaChevronDown className={cn("h-2.5 w-2.5 transition-transform duration-200", moreDropdownOpen && "rotate-180")} />
                {isSecondaryActive && !moreDropdownOpen && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#D4451A] rounded-full" />
                )}
              </button>

              {/* Dropdown Panel */}
              <div
                ref={moreDropdownRef}
                className={cn(
                  "absolute right-0 top-full mt-2 w-48 origin-top-right rounded-xl bg-white py-2 shadow-xl ring-1 ring-black/5 transition-all duration-200",
                  moreDropdownOpen
                    ? "scale-100 opacity-100 translate-y-0"
                    : "scale-95 opacity-0 -translate-y-1 pointer-events-none"
                )}
              >
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                      pathname === link.href
                        ? "text-[#D4451A] bg-[#D4451A]/5"
                        : "text-gray-700 hover:text-[#D4451A] hover:bg-gray-50"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Side: Status + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Open/Closed Badge */}
            <div
              className={cn(
                "hidden sm:flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide border",
                isOpen
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"
                )}
              />
              {isOpen ? "Open Now" : "Closed"}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#FFF9F2]/80 transition-all duration-300 hover:bg-white/10 hover:text-[#D4451A] lg:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-[65px] sm:top-[81px] z-40 bg-black/40 transition-opacity duration-300 lg:hidden",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed top-[65px] sm:top-[81px] right-0 bottom-0 z-50 w-[280px] max-w-[85vw] bg-[#1A3C2A] overflow-y-auto transition-transform duration-300 ease-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Close button at top of panel */}
        <div className="flex justify-end px-4 pt-4">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#FFF9F2]/60 hover:text-[#D4451A] hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-4 pb-6 space-y-1">
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center rounded-lg px-4 py-3 text-[15px] font-medium transition-all duration-200 min-h-[44px]",
                pathname === link.href
                  ? "text-[#D4451A] bg-white/10"
                  : "text-[#FFF9F2]/75 hover:text-[#D4451A] hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-4 border-t border-white/10" />

        {/* Mobile Open/Closed Badge */}
        <div className="flex items-center gap-2 px-8 py-4">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"
            )}
          />
          <span
            className={cn(
              "text-xs font-semibold",
              isOpen ? "text-green-400" : "text-red-400"
            )}
          >
            {isOpen ? "Open Now" : "Closed"}
          </span>
        </div>

        {/* Store Contact Info */}
        <div className="px-8 pb-8 space-y-3">
          <a
            href="tel:+14048760576"
            className="flex items-center gap-3 text-[#FFF9F2]/50 hover:text-[#D4451A] transition-colors text-sm"
          >
            <FaPhone className="h-3.5 w-3.5 flex-shrink-0" />
            <span>(404) 876-0576</span>
          </a>
          <div className="flex items-start gap-3 text-[#FFF9F2]/50 text-sm">
            <FaMapMarkerAlt className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
            <span>699 Ponce De Leon Ave NE, Atlanta, GA 30308</span>
          </div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className={cn(
        "h-px bg-gradient-to-r from-transparent via-[#D4451A]/20 to-transparent transition-opacity duration-500",
        scrolled ? "opacity-100" : "opacity-0"
      )} />
    </header>
  );
}
