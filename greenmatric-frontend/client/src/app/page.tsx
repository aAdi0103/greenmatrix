"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { BRAND, LEGAL_NAME, ISO, CLIENTS, WHY } from "@/content/site";
import { PRODUCTS, STAGES, SOLUTIONS, type Stage } from "@/content/products";
import { Container, Section, Reveal, Button, Card, SectionHeading } from "@/components/ui";
import { useQuote } from "@/context/quote";
import { storageUrl } from "@/lib/storage";

const STATS = [
  { n: "14", l: "States served" },
  { n: `${PRODUCTS.length}`, l: "Machine lines" },
  { n: "5,000+", l: "Spares stocked" },
  { n: "95%+", l: "Availability" },
];

// Real Greenmatrix machine photos for the hero (from Supabase Storage).
const HERO_MAIN = storageUrl("products/water-rfc/main.jpg");
const HERO_THUMBS = ["water-purification", "bopp-label-machine", "shrink-wrapping"].map(
  (s) => ({ slug: s, url: storageUrl(`products/${s}/main.jpg`) }),
);

export default function Home() {
  const { openQuote } = useQuote();
  const [stage, setStage] = useState<Stage | "all">("all");
  const shown = stage === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.stage === stage);

  return (
    <div className="relative overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 bg-white">
        <Container className="relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              ● {ISO}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-5 text-4xl sm:text-6xl font-black leading-[1.05] tracking-tight text-slate-900">
              Complete <span className="text-gradient">Water Bottling Plant</span> Solutions — From Concept to Production
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="mt-5 text-lg text-slate-600 max-w-xl">
              We provide end-to-end turnkey solutions for packaged drinking water plants — RO water
              treatment systems, PET blow moulding machines, bottle filling &amp; capping lines, labeling
              machines, shrink wrapping systems, conveyors, installation, commissioning, operator training,
              Annual Maintenance Contracts (AMC) and reliable after-sales support. From project planning to
              successful plant operation, {LEGAL_NAME} delivers everything you need under one roof.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => openQuote()}>Get a Quote</Button>
              <Button href="/products" variant="outline">View Products</Button>
            </motion.div>
            <div className="mt-12 grid grid-cols-4 gap-4 max-w-lg">
              {STATS.map((s, i) => (
                <motion.div key={s.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}>
                  <div className="text-2xl font-black text-brand">{s.n}</div>
                  <div className="text-[11px] uppercase tracking-wide text-slate-500 font-medium">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.7 }}>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO_MAIN} alt="Greenmatrix bottling plant — automatic filling line" className="w-full h-auto object-cover" />
            </motion.div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {HERO_THUMBS.map((t) => (
                <Link key={t.slug} href={`/products/${t.slug}`} className="rounded-xl overflow-hidden border border-[#BCD5F5] bg-slate-50 hover:border-[#6FA5E6] shadow-xs transition">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.url} alt="Greenmatrix machine" className="h-20 w-full object-cover" />
                </Link>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Trust marquee */}
      <section className="py-10 border-y border-slate-200 bg-white">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold mb-6">Trusted by PSUs, schools &amp; water brands</p>
        <div className="relative overflow-hidden">
          <motion.div className="flex gap-10 whitespace-nowrap will-change-transform"
            animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="text-lg font-semibold text-slate-700">{c}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <Section className="bg-white">
        <Container>
          <SectionHeading title="Machines for every stage of the line" subtitle="Production-grade machines for treatment, filling, labeling, packing and handling — filter by line stage." />
          <div className="mt-8 flex flex-wrap gap-2">
            {[{ id: "all", label: "All" }, ...STAGES].map((s) => (
              <button key={s.id} onClick={() => setStage(s.id as Stage | "all")}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${stage === s.id ? "bg-brand text-white shadow-xs" : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"}`}>
              {s.label}
              </button>
            ))}
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shown.map((p, i) => (
              <Reveal key={p.slug} i={i}>
                <Card className="group h-full bg-slate-50">
                  <div className="text-[11px] uppercase tracking-wide font-semibold text-sky-600">{p.stage}</div>
                  <Link href={`/products/${p.slug}`} className="mt-2 block font-bold text-lg text-slate-900 leading-snug hover:text-brand transition">{p.name}</Link>
                  <p className="mt-2 text-sm text-slate-600">{p.valueLine}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-md bg-blue-50 border border-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">{p.capacity}</span>
                    <button onClick={() => openQuote({ product: p.name, capacity: p.capacity })} className="text-sm font-medium text-slate-600 hover:text-brand transition">Enquire →</button>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="mt-10"><Button href="/products" variant="outline">All products</Button></div>
        </Container>
      </Section>

      {/* Why */}
      <Section className="bg-white border-y border-slate-200">
        <Container>
          <SectionHeading title={`Why ${BRAND}`} />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map((w, i) => (
              <Reveal key={w.title} i={i}>
                <div className="h-full rounded-2xl border border-[#BCD5F5] bg-slate-50 shadow-xs p-6 hover:shadow-md hover:border-[#6FA5E6] transition-all">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 font-black">{i + 1}</div>
                  <h3 className="mt-4 font-bold text-slate-900">{w.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Solutions */}
      <Section className="bg-white">
        <Container>
          <SectionHeading title="Whole-line turnkey solutions" subtitle="Starting a plant? We design and install the complete line." />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.slug} i={i}>
                <Link href={`/solutions/${s.slug}`} className="block h-full rounded-2xl bg-slate-50 border border-[#BCD5F5] shadow-xs p-6 hover:border-[#6FA5E6] hover:shadow-md transition">
                  <h3 className="font-bold text-lg text-slate-900">{s.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-blue-600">Plan my line →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA band */}
      <Section className="bg-white border-t border-slate-200">
        <Container>
          <Reveal>
            <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-600 to-sky-600 p-10 text-center text-white shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Get a quote in 24 hours</h2>
              <p className="mt-3 text-blue-100 max-w-xl mx-auto">Tell us your target output — we&apos;ll spec the machine or the whole line and call you back within a day.</p>
              <div className="mt-6 flex justify-center gap-3">
                <button onClick={() => openQuote()} className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-md hover:bg-blue-50 transition">Get a Quote</button>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">Contact us</Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
