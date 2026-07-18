"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    if (!loading && user) router.replace("/");
  }, [user, loading, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email, password);
      router.replace("/");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="text-2xl font-bold text-emerald-700">Greenmatrix</div>
          <div className="text-sm text-slate-500">Internal admin · CRM & content</div>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
          <Field label="Email" name="email" type="email" value={email} onChange={setEmail} required placeholder="you@greenmatrix.test" />
          <Field label="Password" name="password" type="password" value={password} onChange={setPassword} required placeholder="••••••••" />
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <Button type="submit" disabled={busy} className="w-full">{busy ? "Signing in…" : "Sign in"}</Button>
        </form>
        <div className="mt-4 rounded-lg bg-slate-100 p-3 text-xs text-slate-500">
          <div className="font-medium text-slate-600">Demo logins (after seeding):</div>
          admin@greenmatrix.test · rep@greenmatrix.test — password <code>password123</code>
        </div>
      </div>
    </div>
  );
}
