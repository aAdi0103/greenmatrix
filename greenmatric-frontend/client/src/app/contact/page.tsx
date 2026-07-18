import type { Metadata } from "next";
import { CONTACT } from "@/content/site";
import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Greenmatrix — phone, WhatsApp, email or visit our Bokaro head office. Get a quote within 24 hours.",
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
              <a href={`tel:${CONTACT.phonePrimary}`} className="flex items-center gap-3 rounded-xl border border-white/10 p-4 hover:border-brand/40 transition">
                <span className="text-brand text-xl">📞</span>
                <div><div className="font-semibold">Call</div><div className="text-mist">{CONTACT.phonePrimary} · {CONTACT.phoneSecondary}</div></div>
              </a>
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" className="flex items-center gap-3 rounded-xl border border-white/10 p-4 hover:border-brand/40 transition">
                <span className="text-brand text-xl">💬</span>
                <div><div className="font-semibold">WhatsApp</div><div className="text-mist">Chat with sales</div></div>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 rounded-xl border border-white/10 p-4 hover:border-brand/40 transition">
                <span className="text-brand text-xl">✉️</span>
                <div><div className="font-semibold">Email</div><div className="text-mist">{CONTACT.email}</div></div>
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 p-4">
                <span className="text-brand text-xl">📍</span>
                <div><div className="font-semibold">Head office</div><div className="text-mist">{CONTACT.address}</div></div>
              </div>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <iframe src={mapSrc} title="Greenmatrix Bokaro location" className="w-full h-64" loading="lazy" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Send an enquiry</h2>
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
