"use client";

import { useState } from "react";
import { useRequireAdmin } from "@/lib/guards";
import { Card, Spinner } from "@/components/ui";

export default function SettingsPage() {
  const { ready, role } = useRequireAdmin();
  const [repSeesAll, setRepSeesAll] = useState(true);

  if (!ready || role !== "admin") return <Spinner />;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card className="mt-6 p-5">
        <h2 className="font-semibold">Lead visibility</h2>
        <p className="mt-1 text-sm text-slate-500">Whether reps see every lead, or only leads assigned to them. (Q-02)</p>
        <label className="mt-4 flex items-center gap-3 text-sm">
          <input type="checkbox" checked={repSeesAll} onChange={(e) => setRepSeesAll(e.target.checked)} />
          Reps can see all leads
        </label>
        <p className="mt-2 text-xs text-slate-400">Persisted to Firestore config + enforced in security rules in Phase 3.</p>
      </Card>

      <Card className="mt-4 p-5">
        <h2 className="font-semibold">Lead alerts</h2>
        <p className="mt-1 text-sm text-slate-500">Email to sales on every new lead; WhatsApp/Telegram optional. (Q-03)</p>
        <p className="mt-2 text-xs text-slate-400">SMTP transport wired in Phase 3 with real credentials.</p>
      </Card>

      <Card className="mt-4 p-5">
        <h2 className="font-semibold">Firebase</h2>
        <p className="mt-1 text-sm text-slate-500">Currently running on the local emulator. Swap in the production project config in Phase 3.</p>
      </Card>
    </div>
  );
}
