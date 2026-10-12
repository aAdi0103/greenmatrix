"use client";

import Link from "next/link";
import { useState } from "react";
import { BRAND, NAV } from "@/content/site";
import { BrandLogo } from "./BrandLogo";
import { useQuote } from "@/context/quote";

export function Header() {
  const [open, setOpen] = useState(false);
  const { openQuote } = useQuote();
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#172749]/95 border-b border-[#0e1930] shadow-sm">
      <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black p-0.5 shadow-sm ring-1 ring-white/20 overflow-hidden">
            <BrandLogo className="h-full w-full object-contain" />
          </div>
          <span className="font-bold tracking-tight text-lg text-white">{BRAND}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-white/85 hover:text-white transition-colors duration-150"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openQuote()}
            className="hidden sm:inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#172749] shadow-sm hover:bg-slate-100 hover:shadow transition duration-150"
          >
            Get A Quotation
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 -mr-2 text-white hover:text-slate-200 transition"
            aria-label="Menu"
          >
            <div className="w-6 space-y-1.5">
              <span className="block h-0.5 bg-white rounded-full" />
              <span className="block h-0.5 bg-white rounded-full" />
              <span className="block h-0.5 bg-white rounded-full" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#0e1930] bg-[#172749] px-5 py-4 space-y-3 shadow-lg">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block text-white/90 font-medium hover:text-white py-1 transition-colors"
            >
              {n.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              openQuote();
            }}
            className="mt-2 w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#172749] shadow-sm hover:bg-slate-100 transition"
          >
            Get A Quotation
          </button>
        </div>
      )}
    </header>
  );
}
