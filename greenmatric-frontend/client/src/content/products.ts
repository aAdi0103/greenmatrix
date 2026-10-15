// Static product catalogue (PRD Appendix A + brochure specs). 12 machines.
// Images served from Supabase Storage (bucket "products", path "<slug>/main.jpg").

export type Stage = "treatment" | "blowing" | "filling" | "batch-coding" | "Batch Coding" | "labeling" | "packing" | "handling";

export type Spec = { label: string; value: string };

export type GalleryItem = {
  title: string;
  image: string;
  features?: string[];
  specs?: Spec[];
};

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
  gallery?: GalleryItem[];
  pairsWith?: string[];
  seo: { title: string; description: string };
};

export const STAGES: { id: Stage; label: string }[] = [
  { id: "treatment", label: "Treatment" },
  { id: "blowing", label: "Blowing" },
  { id: "filling", label: "Filling" },
  { id: "batch-coding", label: "Batch Coding" },
  { id: "labeling", label: "Labeling" },
  { id: "packing", label: "Packing" },
  { id: "handling", label: "Handling" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "pet-blowing",
    name: "PET Blowing 2 cavity - 6 cavity (SEMIAUTOMATIC - fully  Automatic blowing )",
    stage: "blowing",
    capacity: "1,000–12,000 BPH (2–6 Cavity)",
    valueLine: "High-efficiency semi-automatic and fully automatic PET blow moulding machines (2 to 6 cavity) producing 1,000 to 12,000 BPH from preform to bottle with low electrical consumption.",
    features: [
      "Cavity: 2-cavity to 6-cavity",
      "Production Capacity: 1,000 BPH to 12,000 BPH",
      "Machine Type: Semi-automatic / Automatic / Fully Automatic / Hand-feed Machine",
      "Index Model: Low electrical consumption",
      "Clamping System: TLC-based / Sensor-based / Pneumatic clamping system",
      "Incremental Heater Setting: 1% to 99%",
    ],
    specs: [
      { label: "Capacity", value: "1,000–12,000 BPH" },
      { label: "Control System", value: "PLC + Color Touchscreen" },
      { label: "Construction", value: "MS (Mild Steel)" },
      { label: "Product", value: "Preform to Bottle" },
    ],
    industries: ["Packaged drinking water", "Beverages", "Juice", "Carbonated Soft Drinks"],
    images: ["products/Blowing/category_imgg.jpeg"],
    gallery: [
      {
        title: "2 cavity Blowing",
        image: "/products/Blowing/2-cavity.jpeg",
      },
      {
        title: "4 cavity blowing",
        image: "/products/Blowing/4-cavity.jpeg",
      },
    ],
    pairsWith: ["water-rfc", "conveying", "rotary-bopp-labeler"],
    seo: {
      title: "PET Blowing 2 cavity - 6 cavity (SEMIAUTOMATIC - fully  Automatic blowing )",
      description: "PET Blowing 2 cavity to 6 cavity semi-automatic and fully automatic blowing machines from Greenmatrix Industry Pvt. Ltd.",
    },
  },
  {
    slug: "water-rfc",
    name: "Automatic Water RFC (Rinser–Filler–Capper)",
    stage: "filling",
    capacity: "40–400 BPM",
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
      { label: "Capacity", value: "40–400 BPM" },
      { label: "Control", value: "PLC + color touchscreen" },
      { label: "Filling", value: "Bottom-up valve, bottom-closing" },
      { label: "Products", value: "Water / natural / flavored RTD" },
      { label: "Construction", value: "Stainless steel" },
    ],
    industries: ["Packaged drinking water", "Soft drinks", "RTD beverages", "Juice"],
    images: [],
    pairsWith: ["water-purification", "rotary-bopp-labeler", "shrink-wrapping", "conveying"],
    seo: {
      title: "Automatic Water RFC — Rinser Filler Capper (40–400 BPM)",
      description: "PLC-controlled rinser-filler-capper for water and RTD beverages, 40–400 BPM, bottom-fill for precise levels and hygienic operation.",
    },
  },
  {
    slug: "batch-coding-machine",
    name: "Batch Coding Machine",
    stage: "batch-coding",
    capacity: "High Speed",
    valueLine: "Industrial Inkjet and Laser Batch Coding Machines for printing batch numbers, MRP, manufacturing and expiry dates on bottles and industrial packaging.",
    features: [
      "Intelligent cartridge system with innovative nozzle technology (Inkjet)",
      "Permanent, high-speed marking with ink-free technology (Laser)",
      "Excellent stability, low maintenance, and high-contrast print quality",
      "Prints batch number, MRP, manufacturing date, expiry date, and real-time stamps",
      "Robust IP55-rated stainless steel housing for industrial bottling environments",
      "Ideal for PET bottles, packaged drinking water, and industrial packaging",
    ],
    specs: [
      { label: "Technology Options", value: "Continuous Inkjet (CIJ) & Laser Jet Coding" },
      { label: "Housing", value: "IP55-rated stainless steel" },
      { label: "Operating Temperature", value: "0°C–45°C" },
      { label: "Ink / Solvent", value: "Ink and makeup cartridges (Inkjet) / Ink-free (Laser)" },
      { label: "Printing Capabilities", value: "Batch number, MRP, manufacturing date, expiry date, time" },
      { label: "Applications", value: "PET bottles, packaged drinking water, industrial packaging" },
    ],
    industries: [
      "PET bottles",
      "Packaged drinking water",
      "Industrial packaging",
      "Beverages",
      "Pharmaceuticals",
      "Food & FMCG",
      "Dairy",
    ],
    images: [
      "products/Coding_Machine/INKJET_Batch_coding_Machine.jpeg",
      "products/Coding_Machine/Laser_jet_Batch_coding_Machine.jpeg",
    ],
    gallery: [
      {
        title: "Inkjet Batch Coding Machine",
        image: "/products/Coding_Machine/INKJET_Batch_coding_Machine.jpeg",
        features: [
          "Intelligent cartridge system",
          "Excellent stability and print quality",
          "Innovative nozzle technology",
          "Prints batch number, MRP, manufacturing date, expiry date, and time",
        ],
        specs: [
          { label: "Housing", value: "IP55-rated stainless steel" },
          { label: "Temperature", value: "0°C–45°C" },
          { label: "Ink/Solvent", value: "Ink and makeup cartridges" },
        ],
      },
      {
        title: "Laser Batch Coding Machine",
        image: "/products/Coding_Machine/Laser_jet_Batch_coding_Machine.jpeg",
        features: [
          "Permanent, high-speed marking",
          "Ink-free technology",
          "Low maintenance",
          "Prints batch number, MRP, manufacturing date, and expiry date",
        ],
        specs: [
          { label: "Marking Technology", value: "Laser (Ink-free)" },
          { label: "Marking Speed", value: "Permanent, high-speed marking" },
          { label: "Maintenance", value: "Low maintenance" },
          { label: "Printed Data", value: "Batch number, MRP, mfg date, exp date" },
        ],
      },
    ],
    pairsWith: ["water-rfc", "rotary-bopp-labeler", "shrink-wrapping", "conveying"],
    seo: {
      title: "Batch Coding Machine — Inkjet & Laser Jet Coding",
      description: "Industrial Inkjet and Laser Batch Coding Machines for batch numbers, MRP, manufacturing date, expiry date on PET bottles and industrial packaging.",
    },
  },
  {
    slug: "rotary-bopp-labeler",
    name: "Automatic Rotary BOPP Labeling Machine",
    stage: "labeling",
    capacity: "40–400 BPM",
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
      { label: "Output", value: "40–400 BPM" },
      { label: "Accuracy", value: "±0.5–1 mm" },
      { label: "Construction", value: "Stainless steel" },
      { label: "Control", value: "PLC" },
      { label: "Labeling", value: "S-curve + drum, single pass" },
    ],
    industries: ["Packaged water", "Soft drinks", "Juice"],
    images: [],
    pairsWith: ["water-rfc", "conveying", "shrink-wrapping"],
    seo: {
      title: "Automatic Rotary BOPP Labeler — 40–400 BPM",
      description: "Rotary BOPP labeling machine, S-curve + drum in one pass, ±0.5–1 mm accuracy, 40–400 BPM.",
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
    pairsWith: ["conveying", "shrink-wrapping"],
    seo: {
      title: "Automatic Sleeve Insert Machine — 70–165 mm labels",
      description: "Servo shrink-sleeve insert machine, 45–50 micron film, full-length sleeving with No-Bottle-No-Label interlock.",
    },
  },
  {
    slug: "shrink-wrapping",
    name: "Automatic Shrink Wrapping Machine",
    stage: "packing",
    capacity: "3-30 boxes",
    valueLine: "Linear, single- and multi-track shrink wrapping with auto-collation up to 30 packs/min.",
    features: [
      "Linear, single-track and multi-track models",
      "Manual collation with partial \"U\" sealing system",
      "Pack sizes 6, 12, 18, 24, 36, 40 (with/without tray)",
      "Available in MS or SS construction",
      "Auto-collation option up to 30 PPM",
      "Motion-controller system, SS wire-mesh conveyor",
    ],
    specs: [
      { label: "Output", value: "3-30 boxes" },
      { label: "Pack sizes", value: "6 / 12 / 18 / 24 / 36 / 40" },
      { label: "Construction", value: "MS or SS" },
      { label: "Control", value: "Motion controller" },
      { label: "Conveyor", value: "SS wire mesh" },
    ],
    industries: ["Water", "Soft drinks", "FMCG", "Food"],
    images: [],
    pairsWith: ["conveying", "water-rfc"],
    seo: {
      title: "Automatic Shrink Wrapping Machine — 3-30 boxes",
      description: "Linear/multi-track shrink wrapping, pack sizes 6–40, auto-collation up to 30 packs per minute, MS or SS build.",
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
    images: ["products/water-purification/WaterPurification.jpeg"],
    pairsWith: ["water-rfc"],
    seo: {
      title: "Water Purification System — 1,000–50,000 LPH",
      description: "Turnkey BIS/WHO-compliant water purification, SS 304L/316, with ozonator, UV and integrated CIP for the bottled water industry.",
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
    industries: ["All Greenmatrix Industry Pvt. Ltd. machines"],
    images: [],
    pairsWith: [],
    seo: {
      title: "Spares & Service Network — 95%+ Availability",
      description: "5,000+ genuine OEM spares with 95%+ availability and fast dispatch, supporting Greenmatrix Industry Pvt. Ltd. machines back to 2012.",
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
    machines: ["water-rfc", "rotary-bopp-labeler", "shrink-wrapping", "conveying"],
  },
  {
    slug: "juice-line",
    name: "Juice / RTD Line",
    desc: "Hot-fill juice and RTD beverage line, treatment to packing.",
    machines: ["water-purification", "water-rfc", "sleeve-insert", "shrink-wrapping"],
  },
  {
    slug: "jar-line",
    name: "20L Jar Line",
    desc: "Bulk jar washing, filling, foiling and capping — 120–1,200 JPH.",
    machines: ["water-purification", "conveying"],
  },
];

export function getSolution(slug: string) {
  return SOLUTIONS.find((s) => s.slug === slug);
}
