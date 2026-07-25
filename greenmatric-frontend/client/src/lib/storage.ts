// Public URL for a Supabase Storage object. `path` includes the bucket as its first
// segment, e.g. "products/water-rfc/main.jpg" → .../storage/v1/object/public/products/water-rfc/main.jpg
export function storageUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return `${base}/storage/v1/object/public/${path}`;
}
