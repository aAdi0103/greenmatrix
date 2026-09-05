"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Field } from "@/components/ui";
import { submitLead } from "@/lib/leads";
import { trackLead } from "@/lib/gtag";
import { isValidLead } from "@/lib/validate";

type QuoteContext = { product?: string; capacity?: string };
type Ctx = { openQuote: (c?: QuoteContext) => void };

const QuoteCtx = createContext<Ctx | null>(null);
export const useQuote = () => {
  const c = useContext(QuoteCtx);
  if (!c) throw new Error("useQuote must be inside QuoteProvider");
  return c;
};

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<QuoteContext>({});
  const openQuote = useCallback((c?: QuoteContext) => {
    setPreset(c ?? {});
    setOpen(true);
  }, []);
  return (
    <QuoteCtx.Provider value={{ openQuote }}>
      {children}
      <QuoteModal open={open} onClose={() => setOpen(false)} preset={preset} />
    </QuoteCtx.Provider>
  );
}

function QuoteModal({ open, onClose, preset }: { open: boolean; onClose: () => void; preset: QuoteContext }) {
  const pathname = usePathname();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("company_website")) return; // honeypot
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    if (!isValidLead(name, phone)) {
      setError("Enter a name and a valid phone number.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      await submitLead({
        name, phone,
        city: String(fd.get("city") || ""),
        productInterest: preset.product || String(fd.get("product") || ""),
        capacity: preset.capacity || String(fd.get("capacity") || ""),
        message: String(fd.get("message") || ""),
        sourcePage: pathname || "/",
      });
      trackLead(preset.product || "quote_modal");
      setDone(true);
    } catch {
      setError("Something went wrong. Please call us instead.");
    } finally {
      setSending(false);
    }
  }

  function close() {
    onClose();
    setTimeout(() => { setDone(false); setError(null); }, 200);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] grid place-items-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
          <motion.div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-ink-2 p-6"
            initial={{ y: 24, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, opacity: 0 }}>
            <button onClick={close} aria-label="Close" className="absolute right-4 top-4 text-mist hover:text-white">✕</button>
            {done ? (
              <div className="py-8 text-center">
                <div className="text-4xl">✅</div>
                <h3 className="mt-3 text-xl font-bold">Enquiry received</h3>
                <p className="mt-2 text-mist">Our team will call you within 24 hours.</p>
                <button onClick={close} className="mt-6 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-ink glow-brand">Done</button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black">Get a quote</h3>
                <p className="mt-1 text-sm text-mist">
                  {preset.product ? `Enquiry for ${preset.product}` : "Tell us what you want to set up — we'll reply within 24h."}
                </p>
                <form onSubmit={onSubmit} className="mt-5 space-y-4">
                  <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Name" name="name" required placeholder="Your name" />
                    <Field label="Phone / WhatsApp" name="phone" required placeholder="+91…" />
                  </div>
                  <Field label="City & State" name="city" placeholder="e.g. Bokaro, Jharkhand" />
                  {preset.product ? (
                    <Field label="Product" name="product" value={preset.product} readOnly />
                  ) : (
                    <Field label="Machine / RO plant" name="product" placeholder="Which machine or RO plant?" />
                  )}
                  <Field label="Message" name="message" textarea placeholder="Target output, budget, timeline…" />
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <button disabled={sending} className="w-full rounded-lg bg-brand py-3 font-semibold text-ink glow-brand hover:brightness-110 transition disabled:opacity-60">
                    {sending ? "Sending…" : "Send enquiry"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
