import { CONTACT } from "@/content/site";

export function FloatingButtons() {
  const wa = `https://wa.me/${CONTACT.whatsapp}`;
  const tel = `tel:${CONTACT.phonePrimary}`;
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a href={wa} target="_blank" aria-label="WhatsApp" className="h-12 w-12 rounded-full bg-brand text-ink grid place-items-center glow-brand hover:scale-110 transition text-xl">💬</a>
      <a href={tel} aria-label="Call" className="h-12 w-12 rounded-full bg-aqua text-white grid place-items-center hover:scale-110 transition text-xl">📞</a>
    </div>
  );
}
