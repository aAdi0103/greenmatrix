import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SOLUTIONS, getSolution, getProduct } from "@/content/products";
import { Container } from "@/components/ui";
import { EnquireButton } from "@/components/EnquireButton";

const VALUE_ADDS = [
  "In-house manufacturing & installation",
  "BIS / ISI compliance support",
  "95%+ spares availability, pan-India service",
  "Operator training & commissioning",
];

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return { title: `${s.name} — Turnkey Line`, description: s.desc };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();
  const machines = s.machines.map(getProduct).filter(Boolean);

  return (
    <div className="pt-24 pb-20">
      <Container>
        <nav className="text-sm text-slate-500 font-medium">
          <Link href="/solutions" className="hover:text-blue-600 transition-colors">Solutions</Link>
          <span className="mx-1">/</span>
          <span className="text-slate-800">{s.name}</span>
        </nav>

        <div className="mt-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">{s.name}</h1>
            <p className="mt-4 text-lg text-slate-600">{s.desc}</p>

            <section className="mt-10">
              <h2 className="text-xl font-bold text-slate-900">The line, stage by stage</h2>
              <ol className="mt-5 space-y-3">
                {machines.map((m, i) => m && (
                  <li key={m.slug} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white shadow-xs p-4 hover:border-blue-400 hover:shadow-md transition">
                    <span className="h-8 w-8 shrink-0 grid place-items-center rounded-full bg-blue-100 text-blue-700 font-black">{i + 1}</span>
                    <div className="flex-1">
                      <Link href={`/products/${m.slug}`} className="font-semibold text-slate-900 hover:text-blue-600 transition">{m.name}</Link>
                      <div className="text-xs text-slate-500">{m.capacity} · {m.stage}</div>
                    </div>
                    <span className="text-slate-400">→</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold text-slate-900">What&apos;s included</h2>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {VALUE_ADDS.map((v) => (
                  <li key={v} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-blue-600 font-bold">▸</span>{v}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 rounded-2xl border border-blue-200 bg-white p-6 shadow-md">
              <h3 className="font-bold text-slate-900 text-lg">Get a turnkey quote</h3>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p className="mt-1 text-sm text-slate-600">Share your target output (BPM/LPH) and budget — we'll design the line and reply within 24 hours.</p>
              <div className="mt-4 flex flex-col gap-2">
                <EnquireButton product={`${s.name} (turnkey line)`}>Plan my line</EnquireButton>
                <EnquireButton product={`${s.name} (turnkey line)`} variant="outline">Get a Quote</EnquireButton>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
