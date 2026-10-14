import type { Metadata } from "next";
import { CONTACT } from "@/content/site";
import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Greenmatrix Industry Pvt. Ltd. — phone, WhatsApp, email or visit our Bokaro head office. Get a quote within 24 hours.",
};

const mapSrc = "https://www.google.com/maps?q=Telidih+Road+Chas+Bokaro+Jharkhand+827013&output=embed";

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your plant"
        subtitle="Machine enquiry or a full turnkey line — reach us any way you like. We reply within 24 hours." />
      <Section>
        <Container className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-4 text-sm">
              <a href={`tel:${CONTACT.phonePrimary}`} className="flex items-center gap-3 rounded-xl border border-[#BCD5F5] bg-slate-50 shadow-xs p-4 hover:border-[#6FA5E6] hover:shadow-sm transition">
                <span className="text-brand text-xl">📞</span>
                <div><div className="font-semibold text-slate-900">Call</div><div className="text-slate-600">{CONTACT.phonePrimary} · {CONTACT.phoneSecondary} · {CONTACT.phoneTertiary}</div></div>
              </a>
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" className="flex items-center gap-3 rounded-xl border border-[#BCD5F5] bg-slate-50 shadow-xs p-4 hover:border-[#6FA5E6] hover:shadow-sm transition">
                <span className="text-blue-600 text-xl">💬</span>
                <div><div className="font-semibold text-slate-900">WhatsApp</div><div className="text-slate-600">Chat with sales</div></div>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 rounded-xl border border-[#BCD5F5] bg-slate-50 shadow-xs p-4 hover:border-[#6FA5E6] hover:shadow-sm transition">
                <span className="text-brand text-xl">✉️</span>
                <div><div className="font-semibold text-slate-900">Email</div><div className="text-slate-600">{CONTACT.email}</div></div>
              </a>
              <div className="flex items-start gap-3 rounded-xl border border-[#BCD5F5] bg-slate-50 shadow-xs p-4 hover:border-[#6FA5E6] transition">
                <span className="text-brand text-xl">📍</span>
                <div><div className="font-semibold text-slate-900">Head office — Bokaro</div><div className="text-slate-600">{CONTACT.address}</div></div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-[#BCD5F5] bg-slate-50 shadow-xs p-4 hover:border-[#6FA5E6] transition">
                <span className="text-brand text-xl">📍</span>
                <div><div className="font-semibold text-slate-900">Branch office — Faridabad</div><div className="text-slate-600">{CONTACT.address2}</div></div>
              </div>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
              <iframe src={mapSrc} title="Greenmatrix Industry Pvt. Ltd. Bokaro location" className="w-full h-64" loading="lazy" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Send an enquiry</h2>
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
