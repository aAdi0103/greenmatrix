import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebaseAdmin";
import { isValidLead } from "@/lib/validate";

// The only write path into `leads`. Firestore rules deny client creates.
// ponytail: in-memory per-IP rate limit — fine for one instance; swap for a shared
// store (Upstash/Firestore counter) if we scale to multiple serverless instances.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60_000; // 10 min
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
    if (b.company_website) return NextResponse.json({ ok: true }); // honeypot — pretend success

    const name = String(b.name ?? "").trim();
    const phone = String(b.phone ?? "").trim();
    if (!isValidLead(name, phone)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const doc: Record<string, unknown> = {
      name, phone,
      email: b.email?.trim() || null,
      company: b.company?.trim() || null,
      city: b.city?.trim() || null,
      state: b.state?.trim() || null,
      productInterest: b.productInterest || null,
      capacity: b.capacity || null,
      message: b.message?.trim() || null,
      source: ["web_form", "whatsapp", "call_back", "manual"].includes(b.source) ? b.source : "web_form",
      sourcePage: String(b.sourcePage ?? "/"),
      status: "new",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    for (const k of Object.keys(doc)) if (doc[k] === null) delete doc[k];

    await adminDb.collection("leads").add(doc);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
