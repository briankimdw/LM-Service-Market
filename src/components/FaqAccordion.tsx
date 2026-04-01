"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className={cn(
              "bg-white rounded-xl border overflow-hidden transition-all duration-400",
              isOpen ? "border-[#D4451A]/30 shadow-lg shadow-[#D4451A]/5" : "border-[var(--border)] hover:border-[#D4451A]/20"
            )}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="w-full flex items-center justify-between px-4 sm:px-7 py-4 sm:py-5 text-left group"
            >
              <span
                className={cn(
                  "font-serif text-[17px] font-bold transition-colors duration-300 pr-4",
                  isOpen ? "text-[#D4451A]" : "text-[#1A3C2A] group-hover:text-[#D4451A]"
                )}
              >
                {faq.question}
              </span>
              <span
                className={cn(
                  "ml-4 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-300",
                  isOpen
                    ? "bg-[#D4451A] text-white rotate-45"
                    : "bg-[#D4451A]/10 text-[#D4451A]"
                )}
              >
                +
              </span>
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-400",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-4 sm:px-7 pb-5 sm:pb-6 text-gray-600 leading-relaxed text-[15px]">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
