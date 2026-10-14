import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { EnquireButton } from "@/components/EnquireButton";

export const metadata: Metadata = {
  title: "Industries Served",
  description: "Greenmatrix Industry Pvt. Ltd. serves packaged water, soft drinks, juice/RTD, pharma, dairy, institutions and government supply projects.",
};

const INDUSTRIES = [
  { t: "Packaged drinking water", d: "Turnkey plants from RO treatment to shrink-wrap for water brands." },
  { t: "Soft drinks (CSD)", d: "Carbonated filling, labeling and packing lines." },
  { t: "Juice & RTD", d: "Hot-fill juice and ready-to-drink beverage lines with process tunnels." },
  { t: "20L jar water", d: "Bulk jar washing, filling, foiling and capping for institutional supply." },
  { t: "Pharmaceuticals", d: "Sticker and sleeve labeling for pharma bottles and containers." },
  { t: "Dairy", d: "Filling and labeling for dairy and flavored-milk products." },
  { t: "Institutions & PSUs", d: "Water systems for schools, hospitals, defence camps and townships." },
  { t: "Government supply", d: "Compliant, documented projects for government tenders." },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero eyebrow="Industries" title="Industries we serve"
        subtitle="From packaged water to pharma and government supply — machines and turnkey lines tuned to each sector." />
      <Section className="pt-4 sm:pt-6 pb-20 sm:pb-24">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INDUSTRIES.map((i) => (
              <div key={i.t} className="rounded-2xl border border-slate-200 bg-white shadow-xs p-6 hover:border-blue-400 hover:shadow-md transition">
                <h3 className="font-bold text-slate-900">{i.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{i.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10"><EnquireButton>Discuss your industry</EnquireButton></div>
        </Container>
      </Section>
    </>
  );
}
