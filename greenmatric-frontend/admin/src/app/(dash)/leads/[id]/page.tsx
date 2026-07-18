"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { getLead, updateLead, subscribeNotes, addNote, toDate, todayISO } from "@/lib/crm";
import { PIPELINE, type Lead, type LeadNote, type LeadStatus } from "@/lib/types";
import { Card, Button, Field, StatusBadge, Spinner } from "@/components/ui";

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const [lead, setLead] = useState<Lead | null | "loading">("loading");
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { getLead(id).then((l) => setLead(l)); }, [id]);
  useEffect(() => subscribeNotes(id, setNotes), [id]);

  if (lead === "loading") return <Spinner />;
  if (!lead) return (
    <div><h1 className="text-xl font-bold">Lead not found</h1><Link href="/" className="text-emerald-600">← Back</Link></div>
  );

  const l = lead;
  async function patch(p: Partial<Lead>) {
    setSaving(true);
    await updateLead(id, p);
    setLead({ ...l, ...p });
    setSaving(false);
  }

  async function changeStatus(next: LeadStatus) {
    const extra: Partial<Lead> = { status: next };
    if (next === "contacted" && !l.contacted) { extra.contacted = true; }
    if (next === "won" || next === "lost") { extra.closedBy = user?.email ?? undefined; }
    await patch(extra);
  }

  async function postNote() {
    if (!note.trim() || !user) return;
    await addNote(id, note.trim(), user.uid, user.email ?? "unknown");
    setNote("");
  }

  const allowed = PIPELINE[l.status];

  return (
    <div>
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">← All leads</Link>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold">{l.name}</h1>
        <StatusBadge status={l.status} />
        <span className="text-sm text-slate-400">· {toDate(l.createdAt)?.toLocaleString() ?? ""}</span>
      </div>
      <div className="mt-2 flex gap-2">
        <a href={`https://wa.me/${l.phone.replace(/[^\d]/g, "")}`} target="_blank"><Button variant="outline">WhatsApp</Button></a>
        <a href={`tel:${l.phone}`}><Button variant="outline">Call {l.phone}</Button></a>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {/* Details */}
        <Card className="lg:col-span-1 p-5 space-y-2 text-sm h-max">
          <h2 className="font-semibold text-slate-700">Enquiry</h2>
          {[
            ["Phone", l.phone], ["Email", l.email], ["Company", l.company],
            ["City / State", [l.city, l.state].filter(Boolean).join(", ")],
            ["Product", l.productInterest], ["Capacity", l.capacity],
            ["Source", l.source], ["Page", l.sourcePage],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-slate-100 py-1.5">
              <span className="text-slate-400">{k}</span><span className="text-right text-slate-700">{v || "—"}</span>
            </div>
          ))}
          {l.message && <div className="pt-2"><div className="text-slate-400">Message</div><p className="mt-1 text-slate-700">{l.message}</p></div>}
        </Card>

        {/* Work panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-5">
            <h2 className="font-semibold text-slate-700">Pipeline</h2>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusBadge status={l.status} />
              {allowed.length > 0 ? allowed.map((s) => (
                <Button key={s} variant="outline" onClick={() => changeStatus(s)} disabled={saving} className="capitalize">→ {s}</Button>
              )) : <span className="text-sm text-slate-400">Closed</span>}
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <Field label="Assigned to" name="assignedTo" value={l.assignedTo ?? ""} onChange={(v) => setLead({ ...l, assignedTo: v })} placeholder="rep name / email" />
              <Field label="Follow-up date" name="followUpDate" type="date" value={l.followUpDate ?? ""} onChange={(v) => setLead({ ...l, followUpDate: v })} />
              <Field label="Deal value (₹)" name="dealValue" type="number" value={l.dealValue?.toString() ?? ""} onChange={(v) => setLead({ ...l, dealValue: Number(v) || undefined })} />
              <Field label="Won / Lost reason" name="wonLostReason" value={l.wonLostReason ?? ""} onChange={(v) => setLead({ ...l, wonLostReason: v })} />
              <div className="sm:col-span-2">
                <Field label="Feedback / call outcome" name="feedback" textarea value={l.feedback ?? ""} onChange={(v) => setLead({ ...l, feedback: v })} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" checked={!!l.contacted} onChange={(e) => setLead({ ...l, contacted: e.target.checked })} /> Contacted
              </label>
              <Button onClick={() => patch({
                assignedTo: l.assignedTo, followUpDate: l.followUpDate, dealValue: l.dealValue,
                wonLostReason: l.wonLostReason, feedback: l.feedback, contacted: l.contacted,
                contactedAt: l.contacted ? (l.contactedAt ?? new Date()) : undefined,
              })} disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
              {l.followUpDate === todayISO() && <span className="text-xs font-medium text-orange-600">Follow-up due today</span>}
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-5">
            <h2 className="font-semibold text-slate-700">Notes <span className="text-xs font-normal text-slate-400">(append-only)</span></h2>
            <div className="mt-3 space-y-3">
              {notes.map((n) => (
                <div key={n.id} className="rounded-lg bg-slate-50 p-3 text-sm">
                  <p className="text-slate-700">{n.text}</p>
                  <div className="mt-1 text-xs text-slate-400">{n.authorName} · {toDate(n.createdAt)?.toLocaleString() ?? "just now"}</div>
                </div>
              ))}
              {notes.length === 0 && <p className="text-sm text-slate-400">No notes yet.</p>}
            </div>
            <div className="mt-4 flex gap-2">
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note…"
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500" />
              <Button onClick={postNote}>Add</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
