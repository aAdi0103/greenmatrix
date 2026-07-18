import type { Metadata } from "next";
import { BRAND, LEGAL_NAME, ISO, PRESENCE } from "@/content/site";
import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { EnquireButton } from "@/components/EnquireButton";

export const metadata: Metadata = {
  title: "About & Mission",
  description: `${LEGAL_NAME} — ISO 9001:2015 certified manufacturer of water treatment and bottle packaging machinery, Bokaro, Jharkhand.`,
};

const MISSION = [
  { t: "Quality for value", d: "Source, manufacture and distribute high-standard products at competitive prices." },
  { t: "Wide network", d: "Grow through our own offices, joint ventures, dealers and agents across India." },
  { t: "Integrate manufacturing", d: "Control more production stages in-house for quality, cost and efficiency." },
  { t: "Operational excellence", d: "Improve processes, service and long-term business relationships." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title={`${BRAND} Industry Pvt. Ltd.`}
        subtitle="A fast-growing integrated water-solution and bottle-packaging manufacturer, backed by an engineering team with deep core competency in design, manufacturing, installation and service." />
      <Section>
        <Container className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-5 text-mist">
            <p>
              From RO systems, softeners, DM plants and UV/UF purification (8 LPH to 25 m³/hr) to complete
              mineral-water, CSD, juice and 20L jar lines — {LEGAL_NAME} designs and builds the whole plant.
              We also engineer effluent treatment plants and water-distribution systems for townships and complexes.
            </p>
            <p>
              We serve homes, schools, police camps, hospitals, temples, poultry farms, dialysis centres,
              textile, dye and chemical industries, soft-drink and packaged-water plants, and government supply projects.
            </p>
            <div className="rounded-xl border border-white/10 p-5">
              <div className="text-sm font-semibold text-white/80">Director&apos;s note</div>
              <p className="mt-2">
                &ldquo;Our promise is simple — reliable machines, genuine spares and service that keeps your line running.&rdquo;
                <span className="block mt-2 text-white/70">— Upendar Kumar, Director</span>
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-brand/30 bg-brand/10 p-5">
              <div className="text-2xl font-black text-brand">{ISO}</div>
              <p className="mt-1 text-sm text-mist">Quality-certified processes; BIS/WHO-compliant water systems.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-5">
              <div className="font-semibold mb-2">Presence — 14 states</div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-mist">
                {PRESENCE.map((p) => <span key={p}>{p}</span>)}
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Section className="bg-ink-2/40 border-y border-white/5">
        <Container>
          <h2 className="text-2xl font-black">Our mission</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MISSION.map((m, i) => (
              <div key={m.t} className="rounded-2xl border border-white/10 p-6">
                <div className="text-brand font-black">0{i + 1}</div>
                <h3 className="mt-3 font-bold">{m.t}</h3>
                <p className="mt-2 text-sm text-mist">{m.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10"><EnquireButton>Work with us</EnquireButton></div>
        </Container>
      </Section>
    </>
  );
}
