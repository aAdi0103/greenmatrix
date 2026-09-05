import Image from "next/image";
import Link from "next/link";
import { BRAND, LEGAL_NAME, ISO, CONTACT, SOCIAL, PRESENCE, ASSETS, NAV } from "@/content/site";

// Brand glyphs (lucide dropped brand icons for trademark reasons).
function Instagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}
function Youtube({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23 12s0-3.8-.5-5.6a2.9 2.9 0 0 0-2-2C18.7 4 12 4 12 4s-6.7 0-8.5.4a2.9 2.9 0 0 0-2 2C1 8.2 1 12 1 12s0 3.8.5 5.6a2.9 2.9 0 0 0 2 2C5.3 20 12 20 12 20s6.7 0 8.5-.4a2.9 2.9 0 0 0 2-2C23 15.8 23 12 23 12ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-14">
      <div className="mx-auto max-w-7xl px-5 grid md:grid-cols-4 gap-10 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <Image src={ASSETS.logo} alt={BRAND} width={34} height={27} className="rounded" />
            <span className="font-bold">{LEGAL_NAME}</span>
          </div>
          <p className="mt-3 text-mist">{ISO}</p>
          <div className="mt-4 flex gap-3">
            <a href={SOCIAL.instagram} target="_blank" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-mist hover:text-white hover:border-brand/40 transition">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={SOCIAL.youtube} target="_blank" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-mist hover:text-white hover:border-brand/40 transition">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Explore</div>
          <ul className="space-y-1.5 text-mist">
            {NAV.map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Pan-India presence</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-mist">
            {PRESENCE.map((p) => <span key={p}>{p}</span>)}
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Contact</div>
          <a href={`tel:${CONTACT.phonePrimary}`} className="block text-mist hover:text-white">{CONTACT.phonePrimary}</a>
          <a href={`tel:${CONTACT.phoneSecondary}`} className="block text-mist hover:text-white">{CONTACT.phoneSecondary}</a>
          <a href={`tel:${CONTACT.phoneTertiary}`} className="block text-mist hover:text-white">{CONTACT.phoneTertiary}</a>
          <a href={`mailto:${CONTACT.email}`} className="block text-mist hover:text-white mt-1">{CONTACT.email}</a>
          <p className="text-mist mt-2">{CONTACT.address}</p>
          <p className="text-mist mt-2">{CONTACT.address2}</p>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-mist">© {new Date().getFullYear()} {LEGAL_NAME}. All rights reserved.</p>
    </footer>
  );
}
