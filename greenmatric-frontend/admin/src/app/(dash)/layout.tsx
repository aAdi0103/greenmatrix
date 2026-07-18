"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Spinner, cn } from "@/components/ui";

const NAV: { href: string; label: string; adminOnly?: boolean }[] = [
  { href: "/", label: "Dashboard" },
  { href: "/blog", label: "Blog", adminOnly: true },
  { href: "/analytics", label: "Analytics", adminOnly: true },
  { href: "/users", label: "Users", adminOnly: true },
  { href: "/settings", label: "Settings", adminOnly: true },
];

export default function DashLayout({ children }: { children: React.ReactNode }) {
  const { user, role, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) return <Spinner />;

  const items = NAV.filter((n) => !n.adminOnly || role === "admin");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="px-5 py-5">
          <div className="text-lg font-bold text-emerald-700">Greenmatrix</div>
          <div className="text-xs text-slate-400">Admin panel</div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {items.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href}
                className={cn("block rounded-lg px-3 py-2 text-sm font-medium", active ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100")}>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-200 p-4 text-xs">
          <div className="font-medium text-slate-700 truncate">{user.email}</div>
          <div className="mt-0.5 inline-block rounded-full bg-slate-100 px-2 py-0.5 capitalize text-slate-500">{role ?? "—"}</div>
          <button onClick={() => logout()} className="mt-3 block text-slate-500 hover:text-rose-600">Sign out</button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <span className="font-bold text-emerald-700">Greenmatrix</span>
          <button onClick={() => logout()} className="text-sm text-slate-500">Sign out</button>
        </header>
        <div className="md:hidden flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-2 py-2">
          {items.map((n) => (
            <Link key={n.href} href={n.href} className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100">{n.label}</Link>
          ))}
        </div>
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
