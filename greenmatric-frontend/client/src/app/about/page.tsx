import type { Metadata } from "next";
import { BRAND, LEGAL_NAME, ISO } from "@/content/site";
import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { EnquireButton } from "@/components/EnquireButton";
import { Droplets, Workflow, Cog, Headset, ShieldCheck } from "lucide-react";

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
      <PageHero eyebrow="About" title={`${BRAND} Industry Pvt. Ltd.`} />
      <Section>
        <Container className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8 text-slate-600">
            {/* About Us */}
            <div>
              <div className="inline-block">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#0369a1] uppercase">
                  About Us
                </h2>
                <div className="h-1 w-16 bg-[#0284c7] rounded-full mt-1.5" />
              </div>
              <div className="mt-4 space-y-3 leading-relaxed text-slate-600">
                <p>
                  GreenMatrix Industry Pvt. Ltd. is an emerging and integrated Water &amp; Wastewater Treatment Solutions Company, providing end-to-end solutions in the field of water purification, treatment, recycling, and water infrastructure.
                </p>
                <p>
                  With a strong focus on engineering, design, manufacturing, installation and after-sales services, the company offers customized water treatment solutions for residential, commercial, industrial, institutional and government applications.
                </p>
              </div>
            </div>

            {/* Our Core Expertise */}
            <div>
              <div className="inline-block">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#0369a1] uppercase">
                  Our Core Expertise
                </h2>
                <div className="h-1 w-20 bg-[#0284c7] rounded-full mt-1.5" />
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-slate-700">
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>RO Water Purification Systems</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>Industrial &amp; Commercial RO Plants</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>DM &amp; Softener Plants</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>UV &amp; UF Purification Systems</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>Water Treatment Plants</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>Effluent Treatment Plants (ETP)</span>
                  </li>
                </ul>
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>Packaged Drinking Water Solutions</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>Water Recycling &amp; Reuse Systems</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>Water Distribution Systems</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>Water Treatment Spares &amp; Components</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>Pumps, Instruments &amp; Automation Solutions</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7] shrink-0" />
                    <span>Sewage Treatment Plants (STP)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Operation & Maintenance Services */}
            <div>
              <div className="inline-block">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#0369a1] uppercase">
                  Operation &amp; Maintenance Services
                </h2>
                <div className="h-1 w-24 bg-[#0284c7] rounded-full mt-1.5" />
              </div>
              <p className="mt-4 leading-relaxed text-slate-600">
                Our solutions are designed for applications including industries, pharmaceutical units, packaged drinking water plants, hospitals, hotels, schools, residential complexes, government establishments, defence establishments, commercial facilities, poultry farms and other institutional requirements.
              </p>
            </div>

            {/* Our Vision */}
            <div>
              <div className="inline-block">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#0369a1] uppercase">
                  Our Vision
                </h2>
                <div className="h-1 w-16 bg-[#0284c7] rounded-full mt-1.5" />
              </div>
              <p className="mt-4 leading-relaxed text-slate-600">
                To become a trusted and professionally managed company providing innovative, reliable and sustainable water treatment solutions across India.
              </p>
            </div>

            {/* Why Greenmatrix? */}
            <div>
              <div className="inline-block">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#0369a1] uppercase">
                  Why Greenmatrix?
                </h2>
                <div className="h-1 w-20 bg-[#0284c7] rounded-full mt-1.5" />
              </div>
              <p className="mt-4 leading-relaxed text-slate-600">
                Greenmatrix Industry Pvt. Ltd. delivers complete water treatment, bottling and packaging solutions from plant design and water purification to filling, labeling, packing and after-sales service
              </p>
              <div className="mt-6 rounded-xl border border-[#BCD5F5] bg-white p-6 sm:p-7 shadow-xs">
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#0284c7] bg-blue-50/80 text-[#0284c7]">
                      <Droplets className="h-5 w-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-800 uppercase">
                      Complete Water Solutions
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#0284c7] bg-blue-50/80 text-[#0284c7]">
                      <Workflow className="h-5 w-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-800 uppercase">
                      End To End Set-Up
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#0284c7] bg-blue-50/80 text-[#0284c7]">
                      <Cog className="h-5 w-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-800 uppercase">
                      Advanced Machinery
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#0284c7] bg-blue-50/80 text-[#0284c7]">
                      <Headset className="h-5 w-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-800 uppercase">
                      Reliable After Sales Support
                    </span>
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-start sm:justify-center gap-3.5 pt-1">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#0284c7] bg-blue-50/80 text-[#0284c7]">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-800 uppercase">
                      Genuine Spare Parts Availability
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-5">
              <div className="text-2xl font-black text-brand">{ISO}</div>
              <p className="mt-1 text-sm text-slate-600">Quality-certified processes; BIS/WHO-compliant water systems.</p>
            </div>
            <div className="rounded-xl border border-[#BCD5F5] bg-slate-50 shadow-xs p-5 hover:border-[#6FA5E6] transition-all">
              <div className="font-semibold text-slate-900 mb-1">Pan-India Presence</div>
              <p className="text-sm text-slate-600">Installed and serviced PAN India and globe</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Our Leadership - Full Width Section */}
      <section className="w-full py-16 sm:py-24 bg-white relative border-t border-slate-200/80 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <div className="w-full max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-10">
            {/* Leader 1 */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[260px] aspect-[4/5] border-2 sm:border-[2.5px] border-[#3b6ea5] bg-white overflow-hidden shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/First.jpeg"
                  alt="VIKASH KUMAR"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="mt-3.5 sm:mt-4 text-center text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-wide text-[#3b6ea5]">
                VIKASH KUMAR
              </h3>
            </div>

            {/* Leader 2 */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[260px] aspect-[4/5] border-2 sm:border-[2.5px] border-[#3b6ea5] bg-white overflow-hidden shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Middle.jpeg"
                  alt="UPENDAR KUMAR"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="mt-3.5 sm:mt-4 text-center text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-wide text-[#3b6ea5]">
                UPENDAR KUMAR
              </h3>
            </div>

            {/* Leader 3 */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[260px] aspect-[4/5] border-2 sm:border-[2.5px] border-[#3b6ea5] bg-white overflow-hidden shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/last.jpeg"
                  alt="SWIKRITI BARNWAL"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="mt-3.5 sm:mt-4 text-center text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-wide text-[#3b6ea5]">
                SWIKRITI BARNWAL
              </h3>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#3b6ea5]">
              OUR LEADERSHIP
            </h2>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
              GreenMatrix Industry Pvt. Ltd. is led by a team of three Directors with complementary experience and expertise
            </p>
          </div>
        </div>
      </section>

      <Section className="bg-white border-y border-slate-200">
        <Container>
          <h2 className="text-2xl font-black text-slate-900">Our mission</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MISSION.map((m) => (
              <div key={m.t} className="rounded-2xl border border-[#BCD5F5] bg-slate-50 shadow-xs p-6 hover:shadow-md hover:border-[#6FA5E6] transition-all">
                <h3 className="font-bold text-slate-900">{m.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{m.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10"><EnquireButton>Talk to our team</EnquireButton></div>
        </Container>
      </Section>
    </>
  );
}
