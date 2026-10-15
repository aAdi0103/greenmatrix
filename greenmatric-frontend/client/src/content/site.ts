// Shared site content — brand, nav, contact, social.
// Contact from brochure/PPT; assets from existing greenmatrix.co.in for now.
// Q-01: lead with "Greenmatrix" (single constant for easy swap).

export const BRAND = "Greenmatrix Industry Pvt. Ltd.";
export const LEGAL_NAME = "Greenmatrix Industry Pvt. Ltd.";
export const TAGLINE = "Complete Bottle Packaging & Water Treatment Solutions";
export const ISO = "ISO 9001:2015 Certified";

export const CONTACT = {
  phonePrimary: "+919110992936",
  phoneSecondary: "+917667113766",
  phoneTertiary: "+919470577684",
  whatsapp: "919110992936",
  email: "info@greenmatrix.co.in",
  address: "Telidih Road, Chas, Bokaro Steel City, Jharkhand – 827013, India",
  address2: "Omaxe World Street, SCO No. 221, First Floor, Sector 79, Faridabad, Haryana 121101",
  city: "Bokaro",
};

export const SOCIAL = {
  instagram: "https://www.instagram.com/greenmatrix_industry_pvt_ltd",
  youtube: "https://youtube.com/@greenmatrix2022",
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

export interface ClientItem {
  name: string;
  logo: string;
}

export const CLIENT_LOGOS: ClientItem[] = [
  { name: "CISF", logo: "/client_image/CISF.jpeg" },
  { name: "CRPF", logo: "/client_image/CRPF.jpeg" },
  { name: "Jharkhand Police", logo: "/client_image/Jarkhand_police.jpeg" },
  { name: "DAV Public School", logo: "/client_image/DAV_Public_school.jpeg" },
  { name: "Delhi Public School", logo: "/client_image/Delhi_Public_school.jpeg" },
  { name: "Bokaro Public School", logo: "/client_image/Bokaro_Public_School.jpeg" },
  { name: "Holy Cross School", logo: "/client_image/Holy_cross.png" },
  { name: "Saint Joseph's School", logo: "/client_image/Saint_Joshep_School.jpeg" },
  { name: "St Thomas School", logo: "/client_image/Saint_Thomas_school.jpeg" },
  { name: "MGM", logo: "/client_image/MGM.jpeg" },
  { name: "Sree Ayyappa Public School", logo: "/client_image/sree_ayyappa_school.jpeg" },
  { name: "Aquapey", logo: "/client_image/Aquapey.jpeg" },
  { name: "Zestera", logo: "/client_image/Zestera.jpeg" },
  { name: "Aquafrisch", logo: "/client_image/aquafrisch.jpeg" },
  { name: "Aquaverve", logo: "/client_image/aquaverve.jpeg" },
  { name: "Buddhaqua", logo: "/client_image/buddhaqua.jpeg" },
  { name: "Goodsoul", logo: "/client_image/goodsoul.jpeg" },
  { name: "Huntwater", logo: "/client_image/huntwater.jpeg" },
];

export const CLIENTS = CLIENT_LOGOS.map((c) => c.name);

// 14-state presence (PPT "Our Presence").
export const PRESENCE = [
  "Jharkhand", "Bihar", "West Bengal", "Uttar Pradesh", "Delhi",
  "Rajasthan", "Gujarat", "Mumbai", "Bangalore", "Coimbatore",
  "Manipur", "Odisha", "Chhattisgarh", "Assam",
];

// Assets pulled from existing site (placeholders until real assets arrive).
export const ASSETS = {
  logo: "/logo_updated.jpeg",
  hero: "https://greenmatrix.co.in/wp-content/uploads/2024/01/Water-Treatment-Plants.jpg",
};

export const WHY = [
  { title: "In-house Manufacturing", body: "Most components built in-house for quality, cost control and faster turnaround." },
  { title: "95%+ Spares Availability", body: "5,000+ spare parts stocked — support even for machines built back in 2012." },
  { title: "Pan-India Presence", body: "Installed and serviced PAN India and globally" },
  { title: "ISO 9001:2015", body: "Quality-certified processes, BIS/WHO-compliant water systems." },
];
