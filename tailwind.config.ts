import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          DEFAULT: "#D4451A",
          dark: "#B83A15",
          light: "#E8785A",
        },
        navy: {
          DEFAULT: "#1A3C2A",
          light: "#2A5C3E",
          dark: "#0E2118",
        },
        cream: {
          DEFAULT: "#FFF9F2",
          dark: "#F5EDE3",
        },
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        border: "var(--border)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "card-bg": "var(--card-bg)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px var(--card-shadow)",
        "card-hover": "0 8px 24px var(--card-shadow)",
      },
    },
  },
  plugins: [],
};
export default config;
