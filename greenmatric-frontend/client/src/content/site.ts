// Shared site content — brand, nav, contact, social.
// Contact from brochure/PPT; assets from existing greenmatrix.co.in for now.
// Q-01: lead with "Greenmatrix" (single constant for easy swap).

export const BRAND = "Greenmatrix";
export const LEGAL_NAME = "Greenmatrix Industry Pvt. Ltd.";
export const TAGLINE = "Complete Bottle Packaging & Water Treatment Solutions";
export const ISO = "ISO 9001:2015 Certified";

export const CONTACT = {
  phonePrimary: "+919110992936",
  phoneSecondary: "+917667113766",
  whatsapp: "919110992936",
  email: "greenmatrixind@gmail.com",
  address: "Telidih Road, Chas, Bokaro, Jharkhand, India — 827013",
  city: "Bokaro",
};

export const SOCIAL = {
  instagram: "https://www.instagram.com/greenmatrix_industry_pvt_ltd",
  youtube: "https://youtube.com/@greenmatrix2022",
};

export const NAV = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Solutions", href: "#solutions" },
  { label: "About", href: "#about" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

// Marquee PSU / institutional clients (from brochure + PPT).
export const CLIENTS = [
  "CISF", "CRPF", "IndianOil", "SAIL", "Jharkhand Police",
  "DAV Public School", "Bokaro Public School", "Holy Cross School",
  "Saint Joseph's School", "IndianOil", "Aquapey", "Zestera",
];

// 14-state presence (PPT "Our Presence").
export const PRESENCE = [
  "Jharkhand", "Bihar", "West Bengal", "Uttar Pradesh", "Delhi",
  "Rajasthan", "Gujarat", "Mumbai", "Bangalore", "Coimbatore",
  "Manipur", "Odisha", "Chhattisgarh", "Assam",
];

// Assets pulled from existing site (placeholders until real assets arrive).
export const ASSETS = {
  logo: "https://greenmatrix.co.in/wp-content/uploads/2024/01/cropped-cropped-greenmatrix-logo-119x89.png",
  hero: "https://greenmatrix.co.in/wp-content/uploads/2024/01/Water-Treatment-Plants.jpg",
};

export const WHY = [
  { title: "In-house Manufacturing", body: "Most components built in-house for quality, cost control and faster turnaround." },
  { title: "95%+ Spares Availability", body: "5,000+ spare parts stocked — support even for machines built back in 2012." },
  { title: "Pan-India Presence", body: "Installed and serviced across 14 states, from Jharkhand to Bangalore." },
  { title: "ISO 9001:2015", body: "Quality-certified processes, BIS/WHO-compliant water systems." },
];
