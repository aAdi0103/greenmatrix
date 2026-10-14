import type { Metadata } from "next";
import { CLIENT_LOGOS } from "@/content/site";
import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { EnquireButton } from "@/components/EnquireButton";

export const metadata: Metadata = {
  title: "Clients & Projects",
  description: "Trusted by PSUs, schools and water brands — CISF, CRPF, Jharkhand Police, DAV, DPS and more.",
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
            {CLIENT_LOGOS.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="flex flex-col items-center justify-center gap-3.5 rounded-xl border border-[#BCD5F5] bg-slate-50 shadow-xs p-5 text-center hover:border-[#6FA5E6] hover:bg-slate-100 hover:shadow-sm transition"
              >
                <div className="h-16 w-full flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="max-h-16 max-w-[130px] w-auto h-auto object-contain rounded-md"
                  />
                </div>
                <span className="font-semibold text-sm text-slate-800 leading-snug">
                  {c.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-14 grid sm:grid-cols-3 gap-5">
            {SNAPSHOTS.map((s) => (
              <div key={s.t} className="rounded-2xl border border-[#BCD5F5] bg-slate-50 shadow-xs p-6 hover:shadow-sm hover:border-[#6FA5E6] transition">
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
