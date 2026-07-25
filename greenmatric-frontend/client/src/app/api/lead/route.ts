import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabaseServer";
import { isValidLead } from "@/lib/validate";

// The only write path into `leads`. RLS denies anon inserts; the service key bypasses RLS.
// ponytail: in-memory per-IP rate limit — fine for one instance; swap for a shared store if scaled.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60_000;
const MAX = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

    const b = await req.json();
    if (b.company_website) return NextResponse.json({ ok: true }); // honeypot

    const name = String(b.name ?? "").trim();
    const phone = String(b.phone ?? "").trim();
    if (!isValidLead(name, phone)) return NextResponse.json({ error: "invalid" }, { status: 400 });

    const row = {
      name, phone,
      email: b.email?.trim() || null,
      company: b.company?.trim() || null,
      city: b.city?.trim() || null,
      state: b.state?.trim() || null,
      product_interest: b.productInterest || null,
      capacity: b.capacity || null,
      message: b.message?.trim() || null,
      source: ["web_form", "whatsapp", "call_back", "manual"].includes(b.source) ? b.source : "web_form",
      source_page: String(b.sourcePage ?? "/"),
      status: "new",
    };

    const { error } = await supabaseService.from("leads").insert(row);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
