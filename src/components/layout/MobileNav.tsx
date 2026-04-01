"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaShoppingBasket, FaClipboardList, FaStar, FaPhone } from "react-icons/fa";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: FaHome },
  { href: "/inventory", label: "Products", icon: FaShoppingBasket },
  { href: "/request", label: "Request", icon: FaClipboardList },
  { href: "/testimonials", label: "Reviews", icon: FaStar },
  { href: "/contact", label: "Contact", icon: FaPhone },
];

export function MobileNav() {
  const pathname = usePathname();

  // Don't show on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="flex items-stretch justify-around" style={{ minHeight: "56px" }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 flex-1 min-h-[56px] min-w-[44px] transition-colors",
                isActive
                  ? "text-[#D4451A]"
                  : "text-gray-400 active:text-[#D4451A]"
              )}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b-full bg-[#D4451A]" />
              )}
              <Icon className={cn("text-xl", isActive && "text-[22px]")} />
              <span className={cn(
                "text-[10px] leading-tight",
                isActive ? "font-bold" : "font-medium"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
