"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRequireAdmin } from "@/lib/guards";
import type { AppUser } from "@/lib/types";
import { Card, Button, Field, Spinner, PageHeader } from "@/components/ui";

export default function UsersPage() {
  const { ready, role } = useRequireAdmin();
  const { user, getToken } = useAuth();
  const [users, setUsers] = useState<AppUser[] | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "rep" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const api = useCallback(async (method: string, body?: object) => {
    const token = await getToken();
    const res = await fetch("/api/users", {
      method,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error((await res.json()).error || "request failed");
    return res.json();
  }, [getToken]);

  const load = useCallback(() => { api("GET").then(setUsers).catch(() => setUsers([])); }, [api]);

  useEffect(() => { if (user) load(); }, [user, load]);

  if (!ready || role !== "admin" || users === null) return <Spinner />;

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      await api("POST", form);
      setForm({ name: "", email: "", password: "", role: "rep" });
      load();
    } catch (err) { setError(err instanceof Error ? err.message : "failed"); }
    finally { setBusy(false); }
  }

  async function toggleActive(u: AppUser) {
    await api("PATCH", { uid: u.uid, active: !u.active });
    load();
  }
  async function setRole(u: AppUser, r: string) {
    await api("PATCH", { uid: u.uid, role: r });
    load();
  }

  return (
    <div>
      <PageHeader title="Users" subtitle="Manage team access and roles." />

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"></th></tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {users.map((u) => (
                <tr key={u.uid}>
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-zinc-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <select value={u.role} onChange={(e) => setRole(u, e.target.value)} className="rounded border border-zinc-300 px-2 py-1 text-xs capitalize">
                      <option value="admin">admin</option><option value="rep">rep</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${u.active ? "bg-emerald-100 text-emerald-700" : "bg-zinc-200 text-zinc-500"}`}>{u.active ? "active" : "disabled"}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => toggleActive(u)} className="text-zinc-500 hover:underline">{u.active ? "Deactivate" : "Activate"}</button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-zinc-400">No users yet.</td></tr>}
            </tbody>
          </table>
        </Card>

        <Card className="p-5 h-max">
          <h2 className="font-semibold">Add user</h2>
          <form onSubmit={create} className="mt-4 space-y-3">
            <Field label="Name" name="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Email" name="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <Field label="Password" name="password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} required />
            <Field label="Role" name="role" value={form.role} onChange={(v) => setForm({ ...form, role: v })}
              options={[{ value: "rep", label: "Sales rep" }, { value: "admin", label: "Admin" }]} />
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <Button type="submit" disabled={busy} className="w-full">{busy ? "Creating…" : "Create user"}</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
