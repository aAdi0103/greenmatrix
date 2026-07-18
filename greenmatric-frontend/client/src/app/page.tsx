"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { BRAND, LEGAL_NAME, ISO, CLIENTS, ASSETS, WHY } from "@/content/site";
import { PRODUCTS, STAGES, SOLUTIONS, type Stage } from "@/content/products";
import { Container, Section, Reveal, Button, Card, SectionHeading } from "@/components/ui";
import { useQuote } from "@/context/quote";

const STATS = [
  { n: "14", l: "States served" },
  { n: "12", l: "Machine lines" },
  { n: "5,000+", l: "Spares stocked" },
  { n: "95%+", l: "Availability" },
];

export default function Home() {
  const { openQuote } = useQuote();
  const [stage, setStage] = useState<Stage | "all">("all");
  const shown = stage === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.stage === stage);

  return (
    <div className="relative overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16">
        <motion.div aria-hidden className="absolute -top-20 -left-24 h-96 w-96 rounded-full bg-brand/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div aria-hidden className="absolute top-40 right-0 h-96 w-96 rounded-full bg-aqua/20 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 10, repeat: Infinity }} />
        <Container className="relative grid lg:grid-cols-2 gap-12 items-center">
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
              <Button onClick={() => openQuote()}>Get a Quote</Button>
              <Button href="/products" variant="outline">View Products</Button>
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
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.7 }}>
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-3xl overflow-hidden glow-brand border border-white/10">
              <Image src={ASSETS.hero} alt="Water treatment plant" width={720} height={540} className="w-full h-auto object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Trust marquee */}
      <section className="py-10 border-y border-white/5 bg-ink-2/40">
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
      <Section>
        <Container>
          <SectionHeading title="Machines for every stage of the line" subtitle="Twelve production-grade machines — filter by line stage." />
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
                <Card className="group h-full">
                  <div className="text-[11px] uppercase tracking-wide text-aqua">{p.stage}</div>
                  <Link href={`/products/${p.slug}`} className="mt-2 block font-bold text-lg leading-snug hover:text-brand transition">{p.name}</Link>
                  <p className="mt-2 text-sm text-mist">{p.valueLine}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-md bg-brand/10 px-2 py-1 text-xs font-semibold text-brand">{p.capacity}</span>
                    <button onClick={() => openQuote({ product: p.name, capacity: p.capacity })} className="text-sm text-white/70 hover:text-brand transition">Enquire →</button>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="mt-10"><Button href="/products" variant="outline">All products</Button></div>
        </Container>
      </Section>

      {/* Why */}
      <Section className="bg-ink-2/40 border-y border-white/5">
        <Container>
          <SectionHeading title={`Why ${BRAND}`} />
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
        </Container>
      </Section>

      {/* Solutions */}
      <Section>
        <Container>
          <SectionHeading title="Whole-line turnkey solutions" subtitle="Starting a plant? We design and install the complete line." />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.slug} i={i}>
                <Link href={`/solutions/${s.slug}`} className="block h-full rounded-2xl bg-gradient-to-br from-brand/15 to-aqua/10 border border-white/10 p-6 hover:border-brand/40 transition">
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  <p className="mt-2 text-sm text-mist">{s.desc}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-brand">Plan my line →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA band */}
      <Section className="bg-ink-2/40 border-t border-white/5">
        <Container>
          <Reveal>
            <div className="rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/10 to-aqua/5 p-10 text-center glow-brand">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Get a quote in 24 hours</h2>
              <p className="mt-3 text-mist max-w-xl mx-auto">Tell us your target output — we&apos;ll spec the machine or the whole line and call you back within a day.</p>
              <div className="mt-6 flex justify-center gap-3">
                <Button onClick={() => openQuote()}>Get a Quote</Button>
                <Button href="/contact" variant="outline">Contact us</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
