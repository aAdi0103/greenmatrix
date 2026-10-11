import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BRAND, TAGLINE, LEGAL_NAME, CONTACT, SOCIAL, ASSETS } from "@/content/site";
import { QuoteProvider } from "@/context/quote";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: LEGAL_NAME,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  logo: ASSETS.logo,
  email: CONTACT.email,
  telephone: CONTACT.phonePrimary,
  address: { "@type": "PostalAddress", addressLocality: CONTACT.city, addressRegion: "Jharkhand", addressCountry: "IN", streetAddress: CONTACT.address },
  sameAs: [SOCIAL.instagram, SOCIAL.youtube],
};

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
      <body className="min-h-full bg-white text-slate-900">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
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
