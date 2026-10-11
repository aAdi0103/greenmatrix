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
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/85 border-b border-slate-200/80 shadow-xs">
      <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo className="h-8 w-8" />
          <span className="font-bold tracking-tight text-lg text-slate-900">{BRAND}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-600 font-medium">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-blue-600 transition-colors">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => openQuote()} className="hidden sm:inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white glow-brand hover:brightness-110 transition">
            Get a Quote
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2 text-slate-700" aria-label="Menu">
            <div className="w-6 space-y-1.5">
              <span className="block h-0.5 bg-slate-800" /><span className="block h-0.5 bg-slate-800" /><span className="block h-0.5 bg-slate-800" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-3 shadow-lg">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block text-slate-700 font-medium hover:text-blue-600">{n.label}</Link>
          ))}
          <button onClick={() => { setOpen(false); openQuote(); }} className="mt-2 w-full rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">Get a Quote</button>
        </div>
      )}
    </header>
  );
}
