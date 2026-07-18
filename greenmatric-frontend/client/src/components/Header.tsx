"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BRAND, NAV, ASSETS } from "@/content/site";
import { useQuote } from "@/context/quote";

export function Header() {
  const [open, setOpen] = useState(false);
  const { openQuote } = useQuote();
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/70 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={ASSETS.logo} alt={BRAND} width={38} height={30} className="rounded" />
          <span className="font-bold tracking-tight text-lg">{BRAND}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-mist">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-white transition-colors">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => openQuote()} className="hidden sm:inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-ink glow-brand hover:brightness-110 transition">
            Get a Quote
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2" aria-label="Menu">
            <div className="w-6 space-y-1.5">
              <span className="block h-0.5 bg-white" /><span className="block h-0.5 bg-white" /><span className="block h-0.5 bg-white" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5 bg-ink px-5 py-4 space-y-3">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block text-mist">{n.label}</Link>
          ))}
          <button onClick={() => { setOpen(false); openQuote(); }} className="mt-2 w-full rounded-full bg-brand px-4 py-2 text-sm font-semibold text-ink">Get a Quote</button>
        </div>
      )}
    </header>
  );
}
