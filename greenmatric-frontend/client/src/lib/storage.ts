// Public URL for a Supabase Storage object. `path` includes the bucket as its first
// segment, e.g. "products/water-rfc/main.jpg" → .../storage/v1/object/public/products/water-rfc/main.jpg
// ⚠️ TEMP hardcoded fallback for testing — remove before production.
const BASE = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://docamkzrimloflgpxpnw.supabase.co";

export function storageUrl(path: string): string {
  return `${BASE}/storage/v1/object/public/${path}`;
}
