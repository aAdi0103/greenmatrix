import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { BRAND, TAGLINE } from "@/content/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${BRAND} — ${TAGLINE}`,
  description:
    "Greenmatrix Industry Pvt. Ltd. — turnkey water treatment & bottle packaging machinery. ISO 9001:2015. Bokaro, Jharkhand.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
