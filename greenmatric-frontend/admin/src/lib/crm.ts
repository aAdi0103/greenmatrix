import { supabase } from "./supabase";
import type { Lead, LeadNote } from "./types";

export { toDate, todayISO } from "./dates";
export { leadsToCsv } from "./csv";

type Row = Record<string, unknown>;

function rowToLead(r: Row): Lead {
  return {
    id: r.id as string,
    createdAt: r.created_at, updatedAt: r.updated_at,
    source: r.source as Lead["source"], sourcePage: r.source_page as string,
    name: r.name as string, phone: r.phone as string,
    email: r.email as string, company: r.company as string,
    city: r.city as string, state: r.state as string,
    productInterest: r.product_interest as string, capacity: r.capacity as string,
    message: r.message as string, status: r.status as Lead["status"],
    contacted: r.contacted as boolean, contactedAt: r.contacted_at,
    assignedTo: r.assigned_to as string, feedback: r.feedback as string,
    followUpDate: (r.follow_up_date as string) ?? undefined,
    closedBy: r.closed_by as string, wonLostReason: r.won_lost_reason as string,
    dealValue: r.deal_value as number,
  };
}

// camelCase patch -> snake_case columns (only defined keys).
const COLMAP: Record<string, string> = {
  sourcePage: "source_page", productInterest: "product_interest", contactedAt: "contacted_at",
  assignedTo: "assigned_to", followUpDate: "follow_up_date", closedBy: "closed_by",
  wonLostReason: "won_lost_reason", dealValue: "deal_value",
};
function leadToRow(patch: Partial<Lead>): Row {
  const row: Row = {};
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined || k === "id" || k === "createdAt" || k === "updatedAt") continue;
    row[COLMAP[k] ?? k] = v;
  }
  return row;
}

export function subscribeLeads(cb: (leads: Lead[]) => void) {
  const load = async () => {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    cb((data ?? []).map(rowToLead));
  };
  load();
  const ch = supabase.channel("leads-changes")
    .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, load)
    .subscribe();
  return () => { supabase.removeChannel(ch); };
}

export async function getLead(id: string): Promise<Lead | null> {
  const { data } = await supabase.from("leads").select("*").eq("id", id).maybeSingle();
  return data ? rowToLead(data) : null;
}

export async function updateLead(id: string, patch: Partial<Lead>) {
  await supabase.from("leads").update({ ...leadToRow(patch), updated_at: new Date().toISOString() }).eq("id", id);
}

export function subscribeNotes(id: string, cb: (notes: LeadNote[]) => void) {
  const load = async () => {
    const { data } = await supabase.from("lead_notes").select("*").eq("lead_id", id).order("created_at", { ascending: true });
    cb((data ?? []).map((r: Row) => ({
      id: r.id as string, text: r.text as string,
      authorUid: r.author_uid as string, authorName: r.author_name as string, createdAt: r.created_at,
    })));
  };
  load();
  const ch = supabase.channel(`notes-${id}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "lead_notes", filter: `lead_id=eq.${id}` }, load)
    .subscribe();
  return () => { supabase.removeChannel(ch); };
}

export async function addNote(id: string, text: string, authorUid: string, authorName: string) {
  await supabase.from("lead_notes").insert({ lead_id: id, text, author_uid: authorUid, author_name: authorName });
}
