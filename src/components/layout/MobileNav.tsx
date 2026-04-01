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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors",
                isActive
                  ? "text-[#D4451A]"
                  : "text-gray-400 active:text-[#D4451A]"
              )}
            >
              <Icon className={cn("text-lg", isActive && "text-xl")} />
              <span className={cn(
                "text-[10px] font-medium",
                isActive && "font-semibold"
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
