"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BRAND, LEGAL_NAME, ISO, CONTACT, SOCIAL, NAV,
  CLIENTS, PRESENCE, ASSETS, WHY,
} from "@/content/site";
import { PRODUCTS, STAGES, SOLUTIONS, type Stage } from "@/content/products";

const wa = `https://wa.me/${CONTACT.whatsapp}`;
const tel = `tel:${CONTACT.phonePrimary}`;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Reveal({ children, i = 0, className = "" }: { children: React.ReactNode; i?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

const STATS = [
  { n: "14", l: "States served" },
  { n: "12", l: "Machine lines" },
  { n: "5,000+", l: "Spares stocked" },
  { n: "95%+", l: "Spares availability" },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage | "all">("all");
  const shown = stage === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.stage === stage);

  return (
    <div id="home" className="relative overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/70 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <Image src={ASSETS.logo} alt={BRAND} width={38} height={30} className="rounded" />
            <span className="font-bold tracking-tight text-lg">{BRAND}</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-mist">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white transition-colors">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden sm:inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-ink glow-brand hover:brightness-110 transition">
              Get a Quote
            </a>
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
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block text-mist">{n.label}</a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16">
        <motion.div aria-hidden className="absolute -top-20 -left-24 h-96 w-96 rounded-full bg-brand/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div aria-hidden className="absolute top-40 right-0 h-96 w-96 rounded-full bg-aqua/20 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 10, repeat: Infinity }} />
        <div className="relative mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              ● {ISO}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-5 text-4xl sm:text-6xl font-black leading-[1.05] tracking-tight">
              Turnkey <span className="text-gradient">water &amp; bottling</span> plants, built end to end.
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="mt-5 text-lg text-mist max-w-lg">
              From RO treatment to filling, labeling and shrink-wrap — {LEGAL_NAME} manufactures, installs and services complete packaging lines across India.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="rounded-full bg-brand px-6 py-3 font-semibold text-ink glow-brand hover:brightness-110 transition">Get a Quote</a>
              <a href="#products" className="rounded-full border border-white/15 px-6 py-3 font-semibold hover:bg-white/5 transition">View Products</a>
            </motion.div>
            <div className="mt-12 grid grid-cols-4 gap-4 max-w-lg">
              {STATS.map((s, i) => (
                <motion.div key={s.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}>
                  <div className="text-2xl font-black text-brand">{s.n}</div>
                  <div className="text-[11px] uppercase tracking-wide text-mist">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="relative">
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-3xl overflow-hidden glow-brand border border-white/10">
              <Image src={ASSETS.hero} alt="Water treatment plant" width={720} height={540} className="w-full h-auto object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust marquee */}
      <section id="clients" className="py-10 border-y border-white/5 bg-ink-2/40">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-mist mb-6">Trusted by PSUs, schools &amp; water brands</p>
        <div className="relative overflow-hidden">
          <motion.div className="flex gap-10 whitespace-nowrap will-change-transform"
            animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="text-lg font-semibold text-white/60">{c}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 mx-auto max-w-7xl px-5">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Machines for every stage of the line</h2>
          <p className="mt-3 text-mist max-w-2xl">Twelve production-grade machines — filter by line stage.</p>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-2">
          {[{ id: "all", label: "All" }, ...STAGES].map((s) => (
            <button key={s.id} onClick={() => setStage(s.id as Stage | "all")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${stage === s.id ? "bg-brand text-ink" : "border border-white/15 text-mist hover:bg-white/5"}`}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((p, i) => (
            <Reveal key={p.slug} i={i}>
              <motion.div whileHover={{ y: -6 }} className="group h-full rounded-2xl border border-white/10 bg-ink-2/50 p-6 hover:border-brand/40 transition-colors">
                <div className="text-[11px] uppercase tracking-wide text-aqua">{p.stage}</div>
                <h3 className="mt-2 font-bold text-lg leading-snug">{p.name}</h3>
                <p className="mt-2 text-sm text-mist">{p.valueLine}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-md bg-brand/10 px-2 py-1 text-xs font-semibold text-brand">{p.capacity}</span>
                  <a href="#contact" className="text-sm text-white/70 group-hover:text-brand transition">Enquire →</a>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why */}
      <section id="about" className="py-24 bg-ink-2/40 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal><h2 className="text-3xl sm:text-4xl font-black tracking-tight">Why {BRAND}</h2></Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map((w, i) => (
              <Reveal key={w.title} i={i}>
                <div className="h-full rounded-2xl border border-white/10 p-6">
                  <div className="h-10 w-10 rounded-xl bg-brand/15 flex items-center justify-center text-brand font-black">{i + 1}</div>
                  <h3 className="mt-4 font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm text-mist">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="py-24 mx-auto max-w-7xl px-5">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Whole-line turnkey solutions</h2>
          <p className="mt-3 text-mist max-w-2xl">Starting a plant? We design and install the complete line.</p>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.slug} i={i}>
              <motion.div whileHover={{ y: -6 }} className="h-full rounded-2xl bg-gradient-to-br from-brand/15 to-aqua/10 border border-white/10 p-6">
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="mt-2 text-sm text-mist">{s.desc}</p>
                <a href="#contact" className="mt-4 inline-block text-sm font-semibold text-brand">Plan my line →</a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA + Contact */}
      <section id="contact" className="py-24 bg-ink-2/40 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-12">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Get a quote in 24 hours</h2>
            <p className="mt-3 text-mist">Tell us your target output — we&apos;ll spec the machine or the whole line.</p>
            <div className="mt-8 space-y-3 text-sm">
              <a href={tel} className="flex items-center gap-3 text-mist hover:text-white"><span className="text-brand">📞</span> {CONTACT.phonePrimary} / {CONTACT.phoneSecondary}</a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-mist hover:text-white"><span className="text-brand">✉️</span> {CONTACT.email}</a>
              <p className="flex items-center gap-3 text-mist"><span className="text-brand">📍</span> {CONTACT.address}</p>
            </div>
          </Reveal>
          <Reveal i={1}>
            <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-white/10 bg-ink p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Name*" className="rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-brand" />
                <input required placeholder="Phone / WhatsApp*" className="rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-brand" />
              </div>
              <input placeholder="City &amp; State" className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-brand" />
              <textarea placeholder="What are you looking to set up?" rows={3} className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-brand" />
              <button className="w-full rounded-lg bg-brand py-3 font-semibold text-ink glow-brand hover:brightness-110 transition">Send enquiry</button>
              <p className="text-xs text-mist">Demo form — not wired to backend yet.</p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-14">
        <div className="mx-auto max-w-7xl px-5 grid md:grid-cols-3 gap-10 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <Image src={ASSETS.logo} alt={BRAND} width={34} height={27} className="rounded" />
              <span className="font-bold">{BRAND}</span>
            </div>
            <p className="mt-3 text-mist">{LEGAL_NAME}</p>
            <p className="mt-1 text-mist">{ISO}</p>
            <div className="mt-4 flex gap-4 text-mist">
              <a href={SOCIAL.instagram} target="_blank" className="hover:text-white">Instagram</a>
              <a href={SOCIAL.youtube} target="_blank" className="hover:text-white">YouTube</a>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-3">Pan-India presence</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-mist">
              {PRESENCE.map((p) => <span key={p}>{p}</span>)}
            </div>
          </div>
          <div>
            <div className="font-semibold mb-3">Contact</div>
            <p className="text-mist">{CONTACT.phonePrimary}</p>
            <p className="text-mist">{CONTACT.email}</p>
            <p className="text-mist mt-2">{CONTACT.address}</p>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-mist">© {new Date().getFullYear()} {LEGAL_NAME}. Demo — Theme A.</p>
      </footer>

      {/* Floating actions */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        <a href={wa} target="_blank" aria-label="WhatsApp" className="h-12 w-12 rounded-full bg-brand text-ink grid place-items-center glow-brand hover:scale-110 transition">💬</a>
        <a href={tel} aria-label="Call" className="h-12 w-12 rounded-full bg-aqua text-white grid place-items-center hover:scale-110 transition">📞</a>
      </div>
    </div>
  );
}
