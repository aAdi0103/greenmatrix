import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { BRAND, TAGLINE } from "@/content/site";
import { QuoteProvider } from "@/context/quote";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${BRAND} — ${TAGLINE}`,
    template: `%s — ${BRAND}`,
  },
  description:
    "Greenmatrix Industry Pvt. Ltd. — turnkey water treatment & bottle packaging machinery. ISO 9001:2015. Bokaro, Jharkhand.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full">
        <QuoteProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingButtons />
        </QuoteProvider>
      </body>
    </html>
  );
}
