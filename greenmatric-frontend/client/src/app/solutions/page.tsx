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
      <Section>
        <Container>
          <div className="grid sm:grid-cols-2 gap-5">
            {SOLUTIONS.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`}
                className="group rounded-2xl border border-white/10 bg-gradient-to-br from-brand/10 to-aqua/5 p-8 hover:border-brand/40 transition">
                <h2 className="text-xl font-bold">{s.name}</h2>
                <p className="mt-2 text-mist">{s.desc}</p>
                <div className="mt-4 text-sm text-mist">{s.machines.length} machines in this line</div>
                <span className="mt-4 inline-block text-sm font-semibold text-brand">Plan my line →</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
