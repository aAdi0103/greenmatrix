"use client";

import Link from "next/link";
import { useState } from "react";
import { PRODUCTS, STAGES, type Stage } from "@/content/products";
import { Container, Section, Reveal, Card } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { useQuote } from "@/context/quote";
import { storageUrl } from "@/lib/storage";

export default function ProductsPage() {
  const { openQuote } = useQuote();
  const [stage, setStage] = useState<Stage | "all">("all");
  const shown = stage === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.stage === stage);

  return (
    <>
      <PageHero eyebrow="Products" title={`${PRODUCTS.length} machines for the full bottling line`}
        subtitle="From water treatment to filling, labeling, packing and handling. Filter by line stage." />
      <Section>
        <Container>
          <div className="flex flex-wrap gap-2">
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
                <Card className="group h-full flex flex-col overflow-hidden !p-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={storageUrl(`products/${p.slug}/main.jpg`)} alt={p.name} className="h-44 w-full object-cover bg-slate-100" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-[11px] uppercase tracking-wide font-semibold text-sky-600">{p.stage}</div>
                    <Link href={`/products/${p.slug}`} className="mt-2 block font-bold text-lg text-slate-900 leading-snug hover:text-brand transition">{p.name}</Link>
                    <p className="mt-2 text-sm text-slate-600 flex-1">{p.valueLine}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-md bg-blue-50 border border-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">{p.capacity}</span>
                      <button onClick={() => openQuote({ product: p.name, capacity: p.capacity })} className="text-sm font-medium text-slate-600 hover:text-brand transition">Enquire →</button>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
