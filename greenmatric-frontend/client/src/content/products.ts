// Static product catalogue (PRD Appendix A + brochure specs). 12 machines.
// Images from Firebase Storage later; demo uses existing-site image / placeholder.

export type Stage = "treatment" | "filling" | "labeling" | "packing" | "handling";

export type Product = {
  slug: string;
  name: string;
  stage: Stage;
  capacity: string;
  valueLine: string;
};

export const STAGES: { id: Stage; label: string }[] = [
  { id: "treatment", label: "Treatment" },
  { id: "filling", label: "Filling" },
  { id: "labeling", label: "Labeling" },
  { id: "packing", label: "Packing" },
  { id: "handling", label: "Handling" },
];

export const PRODUCTS: Product[] = [
  { slug: "water-rfc", name: "Automatic Water RFC (Rinser–Filler–Capper)", stage: "filling", capacity: "30–400 BPM", valueLine: "Accurate bottom-fill for water & RTD beverages, PLC-controlled." },
  { slug: "rotary-bopp-labeler", name: "Automatic Rotary BOPP Labeler", stage: "labeling", capacity: "up to 24,000 BPH", valueLine: "S-curve + drum labeling in one pass, ±0.5–1 mm accuracy." },
  { slug: "bopp-label-machine", name: "BOPP Label Machine (Nordson)", stage: "labeling", capacity: "20–300 BPM", valueLine: "Nordson hot-melt gluing, Trio servo cutting for water/juice/soft-drink." },
  { slug: "sticker-labeling", name: "Automatic Sticker Labeling Machine", stage: "labeling", capacity: "40–250 labels/min", valueLine: "Single/double self-adhesive labels, ±1–2 mm, touchscreen setup." },
  { slug: "sleeve-insert", name: "Automatic Sleeve Insert Machine", stage: "labeling", capacity: "70–165 mm labels", valueLine: "Full-length shrink sleeving with No-Bottle-No-Label interlock." },
  { slug: "cold-glue-label", name: "Wet / Cold Glue Label Machine", stage: "labeling", capacity: "±1.5 mm accuracy", valueLine: "Versatile cold-glue labeling for cans, glass, PET at low running cost." },
  { slug: "shrink-wrapping", name: "Automatic Shrink Wrapping Machine", stage: "packing", capacity: "2–20 PPM", valueLine: "Linear/multi-track shrink packs of 6–40, auto-collation." },
  { slug: "conveying", name: "Conveying Equipment (Air + Slat Chain)", stage: "handling", capacity: "line handling", valueLine: "Neck-hold air + slat-chain conveying for empty and filled bottles." },
  { slug: "water-purification", name: "Water Purification System", stage: "treatment", capacity: "1,000–50,000 LPH", valueLine: "BIS/WHO-compliant turnkey RO with ozonator, UV & CIP." },
  { slug: "process-tunnels", name: "Process Tunnels (Cooling / Warming)", stage: "handling", capacity: "SS 304", valueLine: "Cool or warm bottles to ambient for immediate packing." },
  { slug: "jar-line", name: "Bulk Jar Rinsing & Filling (20L)", stage: "filling", capacity: "120–1,200 JPH", valueLine: "7-stage jar wash + rotary fill-foil-cap for 20L jars." },
  { slug: "spares-service", name: "Spares & Service Network", stage: "handling", capacity: "95%+ availability", valueLine: "5,000+ genuine OEM spares, fast dispatch, minimal downtime." },
];

export const SOLUTIONS = [
  { slug: "water-plant", name: "Mineral Water Plant", desc: "Complete turnkey packaged drinking water line — treatment to shrink-wrap." },
  { slug: "csd-line", name: "CSD / Soft Drink Line", desc: "Carbonated soft-drink filling, labeling and packing, end to end." },
  { slug: "juice-line", name: "Juice / RTD Line", desc: "Hot-fill juice and RTD beverage line with process tunnels." },
  { slug: "jar-line", name: "20L Jar Line", desc: "Bulk jar washing, filling, foiling and capping — 120–1,200 JPH." },
];
