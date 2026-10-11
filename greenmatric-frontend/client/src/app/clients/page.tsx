import type { Metadata } from "next";
import { CLIENTS } from "@/content/site";
import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { EnquireButton } from "@/components/EnquireButton";

export const metadata: Metadata = {
  title: "Clients & Projects",
  description: "Trusted by PSUs, schools and water brands — CISF, CRPF, IndianOil, SAIL, Jharkhand Police and more.",
};

const SNAPSHOTS = [
  { t: "PSU & defence", d: "Water treatment and RO systems supplied to CISF, CRPF and Jharkhand Police camps." },
  { t: "Institutions & schools", d: "Drinking-water plants for DAV, Bokaro Public School, Holy Cross and Saint Joseph's." },
  { t: "Packaged-water brands", d: "Complete bottling lines for regional water brands across eastern India." },
];

export default function ClientsPage() {
  return (
    <>
      <PageHero eyebrow="Clients" title="Trusted where reliability matters"
        subtitle="From PSUs and defence camps to schools and packaged-water brands — our machines run across 14 states." />
      <Section>
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CLIENTS.map((c, i) => (
              <div key={`${c}-${i}`} className="grid place-items-center rounded-xl border border-slate-200 bg-white shadow-xs p-6 text-center font-semibold text-slate-800 hover:border-blue-400 hover:shadow-sm transition">
                {c}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">Client logos load once assets are provided; names shown as placeholders.</p>

          <div className="mt-14 grid sm:grid-cols-3 gap-5">
            {SNAPSHOTS.map((s) => (
              <div key={s.t} className="rounded-2xl border border-slate-200 bg-white shadow-xs p-6">
                <h3 className="font-bold text-slate-900">{s.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 text-slate-600 text-sm">
            Reviews & project photos — coming soon (awaiting client permission).
          </div>
          <div className="mt-8"><EnquireButton>Become a client</EnquireButton></div>
        </Container>
      </Section>
    </>
  );
}
