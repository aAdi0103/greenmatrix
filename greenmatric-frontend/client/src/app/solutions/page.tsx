import Link from "next/link";
import type { Metadata } from "next";
import { SOLUTIONS } from "@/content/products";
import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Turnkey Solutions",
  description: "Whole-line turnkey bundles — mineral water, CSD/soft-drink, juice/RTD and 20L jar lines.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero eyebrow="Solutions" title="Whole-line turnkey bundles"
        subtitle="New to bottling? We design and install the complete line — treatment, filling, labeling and packing." />
      <Section className="bg-white">
        <Container>
          <div className="grid sm:grid-cols-2 gap-5">
            {SOLUTIONS.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-xs hover:border-blue-400 hover:shadow-md transition">
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{s.name}</h2>
                <p className="mt-2 text-slate-600">{s.desc}</p>
                <div className="mt-4 text-sm font-medium text-slate-500">{s.machines.length} machines in this line</div>
                <span className="mt-4 inline-block text-sm font-semibold text-blue-600">Plan my line →</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
