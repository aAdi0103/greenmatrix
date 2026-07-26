"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Droplet } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button, Field } from "@/components/ui";

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [user, loading, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email, password);
      router.replace("/dashboard");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm"><Droplet className="h-5 w-5" /></span>
          <div className="text-lg font-semibold tracking-tight text-zinc-900">Greenmatrix Admin</div>
          <div className="text-sm text-zinc-500">Sign in to the CRM &amp; content panel</div>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <Field label="Email" name="email" type="email" value={email} onChange={setEmail} required placeholder="you@greenmatrix.test" />
          <Field label="Password" name="password" type="password" value={password} onChange={setPassword} required placeholder="••••••••" />
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <Button type="submit" disabled={busy} className="w-full">{busy ? "Signing in…" : "Sign in"}</Button>
        </form>
        <div className="mt-4 rounded-lg bg-zinc-100 p-3 text-xs text-zinc-500">
          <div className="font-medium text-zinc-600">Demo logins (after seeding):</div>
          admin@greenmatrix.test · rep@greenmatrix.test — password <code>password123</code>
        </div>
      </div>
    </div>
  );
}
