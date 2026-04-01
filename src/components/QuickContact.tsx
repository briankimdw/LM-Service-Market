"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaTimes } from "react-icons/fa";

export function QuickContact() {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div
      ref={popupRef}
      className="fixed bottom-20 right-4 z-50 lg:bottom-6 lg:right-6"
    >
      {/* Popup */}
      <div
        className={`absolute bottom-16 right-0 mb-2 w-56 origin-bottom-right rounded-xl bg-white p-3 shadow-2xl border border-gray-100 transition-all duration-300 ${
          open
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <p className="mb-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">
          Quick Contact
        </p>
        <div className="space-y-1.5">
          <a
            href="tel:+14048760576"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#1A3C2A] transition-colors hover:bg-[#D4451A]/10 hover:text-[#D4451A]"
          >
            <FaPhone className="h-3.5 w-3.5" />
            Call Us
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=L+%26+M+Service+Market+Atlanta+GA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#1A3C2A] transition-colors hover:bg-[#D4451A]/10 hover:text-[#D4451A]"
          >
            <FaMapMarkerAlt className="h-3.5 w-3.5" />
            Get Directions
          </a>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#1A3C2A] transition-colors hover:bg-[#D4451A]/10 hover:text-[#D4451A]"
          >
            <FaEnvelope className="h-3.5 w-3.5" />
            Send Message
          </Link>
        </div>
      </div>

      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4451A] text-white shadow-lg shadow-[#D4451A]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#D4451A]/40 active:scale-95"
        aria-label={open ? "Close quick contact" : "Open quick contact"}
      >
        {open ? (
          <FaTimes className="h-5 w-5 transition-transform duration-300" />
        ) : (
          <FaPhone className="h-5 w-5 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
}
