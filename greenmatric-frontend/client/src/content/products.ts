// Static product catalogue (PRD Appendix A + brochure specs). 12 machines.
// Images served from Supabase Storage (bucket "products", path "<slug>/main.jpg").

export type Stage = "treatment" | "filling" | "labeling" | "packing" | "handling";

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  stage: Stage;
  capacity: string;
  valueLine: string;
  features: string[];
  specs: Spec[];
  industries: string[];
  images: string[]; // Storage paths, e.g. "products/water-rfc/main.jpg"
  pairsWith?: string[];
  seo: { title: string; description: string };
};

export const STAGES: { id: Stage; label: string }[] = [
  { id: "treatment", label: "Treatment" },
  { id: "filling", label: "Filling" },
  { id: "labeling", label: "Labeling" },
  { id: "packing", label: "Packing" },
  { id: "handling", label: "Handling" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "water-rfc",
    name: "Automatic Water RFC (Rinser–Filler–Capper)",
    stage: "filling",
    capacity: "30–400 BPM",
    valueLine: "Accurate bottom-fill for water, natural water and flavored RTD beverages at room temperature.",
    features: [
      "PLC-controlled with 7\"/10\" color touchscreen and data logging",
      "Water-lubricated moving parts for smooth, reliable running",
      "Precision neck-handling for scratch-free transfer at high speed",
      "Product recirculation maintains temperature during stoppages",
      "Wide-mouth filling valve suitable for pulp or particles",
      "Direct bottom filling reduces foaming and bottle deformation",
    ],
    specs: [
      { label: "Capacity", value: "30–400 BPM" },
      { label: "Control", value: "PLC + color touchscreen" },
      { label: "Filling", value: "Bottom-up valve, bottom-closing" },
      { label: "Products", value: "Water / natural / flavored RTD" },
      { label: "Construction", value: "Stainless steel" },
    ],
    industries: ["Packaged drinking water", "Soft drinks", "RTD beverages", "Juice"],
    images: [],
    pairsWith: ["water-purification", "bopp-label-machine", "shrink-wrapping", "conveying"],
    seo: {
      title: "Automatic Water RFC — Rinser Filler Capper (30–400 BPM)",
      description: "PLC-controlled rinser-filler-capper for water and RTD beverages, 30–400 BPM, bottom-fill for precise levels and hygienic operation.",
    },
  },
  {
    slug: "rotary-bopp-labeler",
    name: "Automatic Rotary BOPP Labeling Machine",
    stage: "labeling",
    capacity: "up to 24,000 BPH",
    valueLine: "High-speed rotary BOPP labeling — S-curve and drum in a single pass with ±0.5–1 mm accuracy.",
    features: [
      "Advanced PLC-based control system",
      "Fully stainless-steel construction for durability and hygiene",
      "Motorized height adjustment for different bottle sizes",
      "S-curve and drum labeling in one operation (±0.5–1 mm)",
      "Handles both empty and filled bottles",
      "Advanced gluing: glue tank, spray nozzles, slot-die technology",
    ],
    specs: [
      { label: "Output", value: "Up to 24,000 BPH" },
      { label: "Accuracy", value: "±0.5–1 mm" },
      { label: "Construction", value: "Stainless steel" },
      { label: "Control", value: "PLC" },
      { label: "Labeling", value: "S-curve + drum, single pass" },
    ],
    industries: ["Packaged water", "Soft drinks", "Juice"],
    images: [],
    pairsWith: ["water-rfc", "conveying", "shrink-wrapping"],
    seo: {
      title: "Automatic Rotary BOPP Labeler — up to 24,000 BPH",
      description: "Rotary BOPP labeling machine, S-curve + drum in one pass, ±0.5–1 mm accuracy, up to 24,000 bottles per hour.",
    },
  },
  {
    slug: "bopp-label-machine",
    name: "BOPP Label Machine (Nordson)",
    stage: "labeling",
    capacity: "20–300 BPM",
    valueLine: "Fully automatic hot-melt BOPP labeling with Nordson glue system and Trio motion control.",
    features: [
      "Nordson (USA) recirculating hot-melt system with low-air protection",
      "Servo label cutting with Trio Motion Controller (UK)",
      "Siemens 3 HP AC variable-speed main drive with frequency drive",
      "Motion-controller system with VFD, servo drives and HMI",
      "Blower-type vacuum pump",
      "SS-cladded mainframe with safety guarding",
    ],
    specs: [
      { label: "Capacity", value: "20–300 BPM" },
      { label: "Label cutting", value: "Servo, Trio Motion (UK)" },
      { label: "Conveyor height", value: "900–1050 mm" },
      { label: "Conveyor length", value: "3.0 m infeed to discharge" },
      { label: "Electrical", value: "440V, 3-phase, 3 HP" },
      { label: "Air", value: "80 PSI, 3 CFM, ½\" NP" },
    ],
    industries: ["Water", "Juice", "Soft drinks"],
    images: [],
    pairsWith: ["water-rfc", "conveying", "shrink-wrapping"],
    seo: {
      title: "BOPP Label Machine with Nordson Glue — 20–300 BPM",
      description: "Fully automatic BOPP labeling with Nordson hot-melt and Trio servo cutting for water, juice and soft-drink bottles, 20–300 BPM.",
    },
  },
  {
    slug: "sticker-labeling",
    name: "Automatic Sticker Labeling Machine",
    stage: "labeling",
    capacity: "40–250 labels/min",
    valueLine: "Self-adhesive sticker labeling for single or double labels, ideal for larger label sizes.",
    features: [
      "Microprocessor-controlled label dispensing with product sensing",
      "Single and double label fixing attachment",
      "Servo-controlled label dispensing system",
      "Touchscreen display for parameter setting",
      "Bottle top-hold + dual-side feeding conveyor with VFD sync",
      "All-stainless covering, compact, low maintenance",
    ],
    specs: [
      { label: "Speed", value: "40–250 labels/min" },
      { label: "Accuracy", value: "±1–2 mm" },
      { label: "Control", value: "PLC + touchscreen" },
      { label: "Material", value: "Self-adhesive sticker" },
      { label: "Construction", value: "Stainless steel" },
    ],
    industries: ["Pharmaceuticals", "Food", "Beverages", "Fertilizers", "Pesticides"],
    images: [],
    pairsWith: ["conveying", "shrink-wrapping"],
    seo: {
      title: "Automatic Sticker Labeling Machine — 40–250 labels/min",
      description: "Servo self-adhesive sticker labeling machine, single/double labels, ±1–2 mm accuracy, for pharma, food and beverage lines.",
    },
  },
  {
    slug: "sleeve-insert",
    name: "Automatic Sleeve Insert Machine",
    stage: "labeling",
    capacity: "70–165 mm labels",
    valueLine: "Full-length shrink-sleeve application with No-Bottle-No-Label interlock to prevent wastage.",
    features: [
      "PLC touchscreen with parameter settings and alarm monitoring",
      "Servo-controlled label pulling system (Delta)",
      "Four servo-driven cutting knives for precise cutting",
      "Mandrel former for 200/250 ml bottles",
      "Product sensor (Leuze/SICK) and No-Bottle-No-Label interlock",
      "Full-length sleeving to the bottom of the bottle",
    ],
    specs: [
      { label: "Label width", value: "70–165 mm" },
      { label: "Film", value: "45–50 micron shrink sleeve" },
      { label: "Accuracy", value: "±5 mm" },
      { label: "Servo", value: "Delta" },
      { label: "Sensors", value: "Leuze / SICK" },
    ],
    industries: ["Water", "Soft drinks", "Dairy", "Pharma"],
    images: [],
    pairsWith: ["conveying", "process-tunnels"],
    seo: {
      title: "Automatic Sleeve Insert Machine — 70–165 mm labels",
      description: "Servo shrink-sleeve insert machine, 45–50 micron film, full-length sleeving with No-Bottle-No-Label interlock.",
    },
  },
  {
    slug: "cold-glue-label",
    name: "Wet / Cold Glue Label Machine",
    stage: "labeling",
    capacity: "±1.5 mm accuracy",
    valueLine: "Versatile, low-cost cold-glue labeling for cans, glass, PET and plastic in any shape.",
    features: [
      "Heavy-duty SS 304 construction for vibration-free operation",
      "Variable speed control with AC frequency drive",
      "Pneumatic glue feeding and recirculation system",
      "UHMW change parts for low noise and high wear resistance",
      "Oil-bath labeling chamber + photo-reflective jam stop",
      "PLC control, motorized height adjustment, electronic BPM counter",
    ],
    specs: [
      { label: "Accuracy", value: "±1.5 mm" },
      { label: "Containers", value: "Cans, glass, PET, plastic" },
      { label: "Shapes", value: "Cylindrical, square, rectangular, irregular" },
      { label: "Construction", value: "SS 304" },
      { label: "Speed control", value: "AC frequency drive" },
    ],
    industries: ["Beverages", "Liquor", "Food", "Pharma"],
    images: [],
    pairsWith: ["conveying", "shrink-wrapping"],
    seo: {
      title: "Wet / Cold Glue Label Machine — ±1.5 mm",
      description: "Cost-effective cold-glue labeling for cans, glass and PET in any shape, SS 304, ±1.5 mm labeling accuracy.",
    },
  },
  {
    slug: "shrink-wrapping",
    name: "Automatic Shrink Wrapping Machine",
    stage: "packing",
    capacity: "2–20 PPM",
    valueLine: "Linear, single- and multi-track shrink wrapping with auto-collation up to 20 packs/min.",
    features: [
      "Linear, single-track and multi-track models",
      "Manual collation with partial \"U\" sealing system",
      "Pack sizes 6, 12, 18, 24, 36, 40 (with/without tray)",
      "Available in MS or SS construction",
      "Auto-collation option up to 20 PPM",
      "Motion-controller system, SS wire-mesh conveyor",
    ],
    specs: [
      { label: "Output", value: "2–20 PPM" },
      { label: "Pack sizes", value: "6 / 12 / 18 / 24 / 36 / 40" },
      { label: "Construction", value: "MS or SS" },
      { label: "Control", value: "Motion controller" },
      { label: "Conveyor", value: "SS wire mesh" },
    ],
    industries: ["Water", "Soft drinks", "FMCG", "Food"],
    images: [],
    pairsWith: ["conveying", "water-rfc"],
    seo: {
      title: "Automatic Shrink Wrapping Machine — 2–20 PPM",
      description: "Linear/multi-track shrink wrapping, pack sizes 6–40, auto-collation up to 20 packs per minute, MS or SS build.",
    },
  },
  {
    slug: "conveying",
    name: "Conveying Equipment (Air + Slat Chain)",
    stage: "handling",
    capacity: "line handling",
    valueLine: "Air and slat-chain conveying to move empty and filled bottles across the whole line.",
    features: [
      "Air conveyors transfer empty PET/HDPE bottles by neck-hold",
      "Hygienic positive air pressure via full-SS blowers",
      "Slat-chain conveyors for filled PET or glass bottles",
      "Single or multi-lane with pressureless combiners",
      "Multi-lane inspection and buffer sections",
      "Designed for high flexibility and line efficiency",
    ],
    specs: [
      { label: "Types", value: "Air + slat chain" },
      { label: "Bottles", value: "Empty & filled PET / glass" },
      { label: "Lanes", value: "Single / multi-lane" },
      { label: "Construction", value: "Stainless steel" },
    ],
    industries: ["Water", "Soft drinks", "Juice"],
    images: [],
    pairsWith: ["water-rfc", "rotary-bopp-labeler", "shrink-wrapping"],
    seo: {
      title: "Conveying Equipment — Air & Slat Chain Conveyors",
      description: "Neck-hold air conveyors and slat-chain conveyors for empty and filled bottles, single/multi-lane with combiners and buffers.",
    },
  },
  {
    slug: "water-purification",
    name: "Water Purification System",
    stage: "treatment",
    capacity: "1,000–50,000 LPH",
    valueLine: "BIS/WHO-compliant turnkey water treatment with ozonator, UV and integrated CIP.",
    features: [
      "Designed in compliance with WHO, ISO and BIS standards",
      "Complete turnkey project execution",
      "MOC: SS 304L / SS 316 food-grade materials",
      "Durable, low-maintenance design",
      "Integrated CIP with ozonator, UV sterilizer and SS piping",
    ],
    specs: [
      { label: "Capacity", value: "1,000–50,000 LPH" },
      { label: "MOC", value: "SS 304L / SS 316" },
      { label: "Standards", value: "WHO / ISO / BIS" },
      { label: "Includes", value: "CIP, ozonator, UV sterilizer" },
    ],
    industries: ["Packaged water", "Soft drinks", "Pharma", "Institutions"],
    images: [],
    pairsWith: ["water-rfc", "jar-line"],
    seo: {
      title: "Water Purification System — 1,000–50,000 LPH",
      description: "Turnkey BIS/WHO-compliant water purification, SS 304L/316, with ozonator, UV and integrated CIP for the bottled water industry.",
    },
  },
  {
    slug: "process-tunnels",
    name: "Process Tunnels (Cooling / Warming)",
    stage: "handling",
    capacity: "SS 304",
    valueLine: "Cooling and warming tunnels that bring bottles to ambient for immediate packing.",
    features: [
      "SS 304 construction with PVC-coated panels",
      "Dual pump-suction strainers for cleaning without stopping",
      "Per-zone temperature sensors and PID controllers",
      "All display and set values on touchscreen",
      "Optional infeed loader and discharge DTSC transfer",
    ],
    specs: [
      { label: "Function", value: "Cooling / warming" },
      { label: "Construction", value: "SS 304 + PVC panels" },
      { label: "Control", value: "Per-zone PID + touchscreen" },
    ],
    industries: ["Soft drinks", "Juice", "RTD", "Hot-fill lines"],
    images: [],
    pairsWith: ["sleeve-insert", "shrink-wrapping"],
    seo: {
      title: "Process Tunnels — Cooling & Warming",
      description: "SS 304 cooling/warming tunnels with per-zone PID control to bring bottles to ambient for immediate packing.",
    },
  },
  {
    slug: "jar-line",
    name: "Bulk Jar Rinsing & Filling (20L)",
    stage: "filling",
    capacity: "120–1,200 JPH",
    valueLine: "7-stage jar washing plus rotary fill-foil-cap for 20-litre jars, fully stainless.",
    features: [
      "Automatic 7-stage jar washing with external brushing",
      "Available in 1, 2 and 4-wide configurations",
      "Bobbin heaters in zones 2 & 3 with electronic temp control",
      "4, 8 and 12-head rotary filling, foiling and capping",
      "Full stainless steel, all product-contact parts in SS",
    ],
    specs: [
      { label: "Speed", value: "120–1,200 JPH" },
      { label: "Jar", value: "20 litre" },
      { label: "Washing", value: "7-stage + external brushing" },
      { label: "Filling heads", value: "4 / 8 / 12 rotary" },
      { label: "Construction", value: "Stainless steel" },
    ],
    industries: ["20L jar water", "Institutional water"],
    images: [],
    pairsWith: ["water-purification"],
    seo: {
      title: "Bulk 20L Jar Rinsing & Filling — 120–1,200 JPH",
      description: "7-stage 20L jar washing plus 4/8/12-head rotary filling, foiling and capping, 120–1,200 jars per hour.",
    },
  },
  {
    slug: "spares-service",
    name: "Spares & Service Network",
    stage: "handling",
    capacity: "95%+ availability",
    valueLine: "One of the fastest spares networks in the industry — 5,000+ parts, 95%+ availability.",
    features: [
      "Centralized order processing and dispatch from head office",
      "Global logistics network for fast delivery",
      "Inventory of 5,000+ spare parts, 95%+ availability",
      "Genuine OEM parts with in-house manufacturing",
      "Spares available even for machines built as early as 2012",
      "Parts guaranteed against manufacturing defects",
    ],
    specs: [
      { label: "Availability", value: "95%+ at all times" },
      { label: "Inventory", value: "5,000+ spare parts" },
      { label: "Support", value: "Models back to 2012" },
      { label: "Source", value: "Genuine OEM" },
    ],
    industries: ["All Greenmatrix machines"],
    images: [],
    pairsWith: [],
    seo: {
      title: "Spares & Service Network — 95%+ Availability",
      description: "5,000+ genuine OEM spares with 95%+ availability and fast dispatch, supporting Greenmatrix machines back to 2012.",
    },
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const SOLUTIONS = [
  {
    slug: "water-plant",
    name: "Mineral Water Plant",
    desc: "Complete turnkey packaged drinking water line — treatment to shrink-wrap.",
    machines: ["water-purification", "water-rfc", "rotary-bopp-labeler", "shrink-wrapping", "conveying"],
  },
  {
    slug: "csd-line",
    name: "CSD / Soft Drink Line",
    desc: "Carbonated soft-drink filling, labeling and packing, end to end.",
    machines: ["water-rfc", "bopp-label-machine", "process-tunnels", "shrink-wrapping", "conveying"],
  },
  {
    slug: "juice-line",
    name: "Juice / RTD Line",
    desc: "Hot-fill juice and RTD beverage line with process tunnels.",
    machines: ["water-purification", "water-rfc", "process-tunnels", "sleeve-insert", "shrink-wrapping"],
  },
  {
    slug: "jar-line",
    name: "20L Jar Line",
    desc: "Bulk jar washing, filling, foiling and capping — 120–1,200 JPH.",
    machines: ["water-purification", "jar-line", "conveying"],
  },
];

export function getSolution(slug: string) {
  return SOLUTIONS.find((s) => s.slug === slug);
}
