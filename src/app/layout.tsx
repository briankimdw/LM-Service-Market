import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

async function getShopName(): Promise<string> {
  try {
    const settings = await prisma.storeSettings.findUnique({
      where: { id: "default" },
      select: { shopName: true },
    });
    return settings?.shopName || "L & M Service Market";
  } catch {
    return "L & M Service Market";
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const shopName = await getShopName();
  return {
    title: {
      default: "L & M Service Market | Your Neighborhood Convenience Store",
      template: `%s | ${shopName}`,
    },
    description:
      "L & M Service Market is your friendly neighborhood convenience store in Midtown Atlanta, offering groceries, beer, wine, snacks, and everyday essentials.",
    keywords: [
      "convenience store",
      "grocery",
      "beer",
      "wine",
      "snacks",
      "Midtown Atlanta",
      "neighborhood market",
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: shopName,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
