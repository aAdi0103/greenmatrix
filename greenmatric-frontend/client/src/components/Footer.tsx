"use client";

import Link from "next/link";
import { NAV, CONTACT } from "@/content/site";
import { BrandLogo } from "./BrandLogo";
import { useQuote } from "@/context/quote";

export function Footer() {
  const { openQuote } = useQuote();

  return (
    <footer>
      {/* Pre-Footer CTA Banner matching reference */}
      <section className="border-t border-[#1d315d] bg-[#172749] py-16 text-center text-white">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-xs font-bold tracking-[0.25em] text-blue-300 uppercase">
            READY TO BUILD WITH US?
          </p>
          <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">
            HAVE A PROJECT OR TECHNOLOGY REQUIREMENT?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s build innovative solutions together. Our multi-disciplinary engineering teams are ready to inspect, design, construct, and maintain.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow-md hover:bg-slate-100 hover:shadow-lg transition"
            >
              Contact Us →
            </Link>
            <button
              onClick={() => openQuote()}
              className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20 transition"
            >
              Get A Quotation →
            </button>
          </div>
        </div>
      </section>

      {/* Main Footer Section */}
      <div className="border-t border-slate-900/60 bg-[#0c172e] text-slate-300 pt-16 pb-12">
        <div className="mx-auto max-w-7xl px-5 flex flex-col md:flex-row flex-wrap lg:flex-nowrap justify-between items-start gap-10 text-sm">
          {/* Column 1: Brand & Statement */}
          <div className="space-y-4 max-w-sm lg:w-[32%]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black p-0.5 shadow-sm ring-1 ring-white/20 overflow-hidden">
                <BrandLogo className="h-full w-full object-contain" />
              </div>
              <span className="font-extrabold text-base tracking-wide text-white">
                GREENMATRIX INDUSTRY
              </span>
            </div>
            <p className="text-xs font-medium text-slate-200 leading-snug">
              Clean Water Technology. Precision Machinery. Empowering Enterprises.
            </p>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-sky-400">
                Brand Statement:
              </span>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                At Greenmatrix Industry, we blend advanced water purification engineering with heavy-duty packaging automation to empower beverage entrepreneurs, defence facilities, and public sector projects across India. We deliver certified, future-ready water solutions that protect health, conserve resources, and advance the nation.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs italic text-slate-300">
              &ldquo;Building Trust. Delivering Excellence. Creating the Future.&rdquo;
            </div>
          </div>

          {/* Column 2: Quick Links (Kept as current) */}
          <div className="shrink-0">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              QUICK LINKS
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="hover:text-white transition-colors block py-0.5"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Corporate Office */}
          <div className="shrink-0 max-w-xs">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              CORPORATE OFFICE
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="font-semibold text-white">Greenmatrix</p>
              <p className="text-slate-400 leading-relaxed">
                Omaxe World Street, SCO No. 221, First Floor,
                <br />
                Sector 79, Faridabad, Haryana 121101
              </p>
              <div className="pt-2">
                <a
                  href="tel:+919110992936"
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  <span className="text-slate-400">Phone: </span>
                  <span className="text-sky-300 font-medium">+91 91109 92936</span>
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="block text-slate-300 hover:text-white transition-colors mt-1.5 break-all"
                >
                  <span className="text-slate-400">Email: </span>
                  <span className="text-sky-300 font-medium">{CONTACT.email}</span>
                </a>
              </div>
              <p className="pt-2 text-slate-400">
                Mon – Sat: 10:00 AM – 6:00 PM
              </p>
            </div>
          </div>

          {/* Column 4: Regd. Office */}
          <div className="shrink-0 max-w-xs">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              REGD. OFFICE
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="font-semibold text-white">Greenmatrix</p>
              <p className="text-slate-400 leading-relaxed">
                Telidih Road, Chas,
                <br />
                Bokaro Steel City, Jharkhand – 827013, India
              </p>
              <div className="pt-2">
                <a
                  href="tel:+919852625103"
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  <span className="text-slate-400">Phone: </span>
                  <span className="text-sky-300 font-medium">+91-9852625103</span>
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="block text-slate-300 hover:text-white transition-colors mt-1.5 break-all"
                >
                  <span className="text-slate-400">Email: </span>
                  <span className="text-sky-300 font-medium">{CONTACT.email}</span>
                </a>
              </div>
              <p className="pt-2 text-slate-400">
                Mon – Sat: 10:00 AM – 6:00 PM
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-[#142343] border-t border-blue-900/50 py-4 text-center text-xs text-slate-300">
        © {new Date().getFullYear()} Greenmatrix Industry. All rights reserved. Registered Indian Engineering Organization.
      </div>
    </footer>
  );
}
