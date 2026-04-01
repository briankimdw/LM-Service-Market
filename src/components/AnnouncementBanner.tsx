"use client";

import { useState, useEffect, useCallback } from "react";
import { FaBullhorn } from "react-icons/fa";

interface AnnouncementBannerProps {
  messages: string[];
}

export default function AnnouncementBanner({ messages }: AnnouncementBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const cycleMessage = useCallback(() => {
    if (messages.length <= 1) return;
    setVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
      setVisible(true);
    }, 500);
  }, [messages.length]);

  useEffect(() => {
    if (messages.length <= 1) return;
    const interval = setInterval(cycleMessage, 4000);
    return () => clearInterval(interval);
  }, [cycleMessage, messages.length]);

  if (messages.length === 0) return null;

  return (
    <div className="bg-[#D4451A] text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-center min-h-[1.25rem] sm:min-h-[1.5rem]">
            <FaBullhorn className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 animate-[pulse_2s_ease-in-out_infinite]" />
            <p
              className="text-xs sm:text-sm md:text-base font-medium transition-opacity duration-500 leading-snug"
              style={{ opacity: visible ? 1 : 0 }}
            >
              {messages[currentIndex]}
            </p>
          </div>
          {messages.length > 1 && (
            <div className="flex items-center gap-1 sm:gap-1.5">
              {messages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setVisible(false);
                    setTimeout(() => {
                      setCurrentIndex(i);
                      setVisible(true);
                    }, 300);
                  }}
                  className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-3 sm:w-4 bg-white"
                      : "w-1 sm:w-1.5 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to announcement ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
