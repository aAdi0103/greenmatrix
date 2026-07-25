"use client";

import { useState } from "react";
import { useRequireAdmin } from "@/lib/guards";
import { Card, Spinner, PageHeader } from "@/components/ui";

export default function SettingsPage() {
  const { ready, role } = useRequireAdmin();
  const [repSeesAll, setRepSeesAll] = useState(true);

  if (!ready || role !== "admin") return <Spinner />;

  return (
    <div className="max-w-2xl">
      <PageHeader title="Settings" subtitle="Workspace configuration." />

      <Card className="p-5">
        <h2 className="font-semibold">Lead visibility</h2>
        <p className="mt-1 text-sm text-zinc-500">Whether reps see every lead, or only leads assigned to them. (Q-02)</p>
        <label className="mt-4 flex items-center gap-3 text-sm">
          <input type="checkbox" checked={repSeesAll} onChange={(e) => setRepSeesAll(e.target.checked)} />
          Reps can see all leads
        </label>
        <p className="mt-2 text-xs text-zinc-400">Persisted to a settings table + enforced in RLS (follow-up).</p>
      </Card>

      <Card className="mt-4 p-5">
        <h2 className="font-semibold">Lead alerts</h2>
        <p className="mt-1 text-sm text-zinc-500">Email to sales on every new lead; WhatsApp/Telegram optional. (Q-03)</p>
        <p className="mt-2 text-xs text-zinc-400">SMTP transport wired in Phase 3 with real credentials.</p>
      </Card>

      <Card className="mt-4 p-5">
        <h2 className="font-semibold">Backend</h2>
        <p className="mt-1 text-sm text-zinc-500">Running on Supabase — Postgres, Auth and Storage, with row-level security.</p>
      </Card>
    </div>
  );
}
