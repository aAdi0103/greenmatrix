"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Field } from "./ui";
import { submitLead } from "@/lib/leads";

export function ContactForm({ compact = false }: { compact?: boolean }) {
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
    if (!name || !/^[+\d][\d\s-]{7,}$/.test(phone)) {
      setError("Enter a name and a valid phone number.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      await submitLead({
        name, phone,
        email: String(fd.get("email") || ""),
        city: String(fd.get("city") || ""),
        productInterest: String(fd.get("product") || ""),
        message: String(fd.get("message") || ""),
        sourcePage: pathname || "/contact",
      });
      setDone(true);
    } catch {
      setError("Something went wrong. Please call us instead.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-brand/30 bg-brand/10 p-8 text-center">
        <div className="text-4xl">✅</div>
        <h3 className="mt-3 text-xl font-bold">Enquiry received</h3>
        <p className="mt-2 text-mist">Our team will call you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-ink-2/50 p-6 space-y-4">
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" name="name" required placeholder="Your name" />
        <Field label="Phone / WhatsApp" name="phone" required placeholder="+91…" />
      </div>
      {!compact && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email" name="email" type="email" placeholder="you@company.com" />
          <Field label="City & State" name="city" placeholder="Bokaro, Jharkhand" />
        </div>
      )}
      <Field label="Product / Solution" name="product" placeholder="Which machine or line?" />
      <Field label="Message" name="message" textarea placeholder="Target output, budget, timeline…" />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button disabled={sending} className="w-full rounded-lg bg-brand py-3 font-semibold text-ink glow-brand hover:brightness-110 transition disabled:opacity-60">
        {sending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
