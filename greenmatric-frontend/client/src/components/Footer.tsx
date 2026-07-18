import Image from "next/image";
import Link from "next/link";
import { BRAND, LEGAL_NAME, ISO, CONTACT, SOCIAL, PRESENCE, ASSETS, NAV } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-14">
      <div className="mx-auto max-w-7xl px-5 grid md:grid-cols-4 gap-10 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <Image src={ASSETS.logo} alt={BRAND} width={34} height={27} className="rounded" />
            <span className="font-bold">{BRAND}</span>
          </div>
          <p className="mt-3 text-mist">{LEGAL_NAME}</p>
          <p className="mt-1 text-mist">{ISO}</p>
          <div className="mt-4 flex gap-4 text-mist">
            <a href={SOCIAL.instagram} target="_blank" className="hover:text-white">Instagram</a>
            <a href={SOCIAL.youtube} target="_blank" className="hover:text-white">YouTube</a>
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
          <a href={`mailto:${CONTACT.email}`} className="block text-mist hover:text-white">{CONTACT.email}</a>
          <p className="text-mist mt-2">{CONTACT.address}</p>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-mist">© {new Date().getFullYear()} {LEGAL_NAME}. All rights reserved.</p>
    </footer>
  );
}
