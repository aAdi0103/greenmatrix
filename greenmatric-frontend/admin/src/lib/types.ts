// Shared Firestore document shapes (mirrors admin/src/lib/types.ts).

export const LEAD_STATUSES = [
  "new", "contacted", "qualified", "quoted", "negotiation", "won", "lost",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_SOURCES = ["web_form", "whatsapp", "call_back", "manual"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

// Valid forward transitions (won/lost are terminal). Enforced in CRM.
export const PIPELINE: Record<LeadStatus, LeadStatus[]> = {
  new: ["contacted", "lost"],
  contacted: ["qualified", "lost"],
  qualified: ["quoted", "lost"],
  quoted: ["negotiation", "won", "lost"],
  negotiation: ["won", "lost"],
  won: [],
  lost: [],
};

export type Lead = {
  id?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
  source: LeadSource;
  sourcePage: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  city?: string;
  state?: string;
  productInterest?: string;
  capacity?: string;
  message?: string;
  status: LeadStatus;
  contacted?: boolean;
  contactedAt?: unknown;
  assignedTo?: string;
  feedback?: string;
  followUpDate?: string; // YYYY-MM-DD
  closedBy?: string;
  wonLostReason?: string;
  dealValue?: number;
};

export type LeadNote = {
  id?: string;
  text: string;
  authorUid: string;
  authorName: string;
  createdAt?: unknown;
};

export type Role = "admin" | "rep";
export type AppUser = {
  uid?: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  createdAt?: unknown;
};

export type ArticleStatus = "draft" | "published";
export type Article = {
  id?: string;
  title: string;
  slug: string;
  coverImage?: string;
  body: string;
  excerpt?: string;
  seoTitle?: string;
  seoMeta?: string;
  tags?: string[];
  status: ArticleStatus;
  authorUid?: string;
  publishedAt?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
};
