"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, FileText, BarChart3, Users, Settings, LogOut, Menu, X, Droplet,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Spinner, cn } from "@/components/ui";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/blog", label: "Blog", icon: FileText, adminOnly: true },
  { href: "/analytics", label: "Analytics", icon: BarChart3, adminOnly: true },
  { href: "/users", label: "Users", icon: Users, adminOnly: true },
  { href: "/settings", label: "Settings", icon: Settings, adminOnly: true },
];

export default function DashLayout({ children }: { children: React.ReactNode }) {
  const { user, role, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => { if (!loading && !user) router.replace("/login"); }, [user, loading, router]);
  useEffect(() => { setOpen(false); }, [pathname]);

  if (loading || !user) return <Spinner />;

  const items = NAV.filter((n) => !n.adminOnly || role === "admin");
  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" || pathname.startsWith("/leads") : pathname.startsWith(href);

  const SidebarInner = (
    <>
      <div className="flex items-center gap-2 px-5 py-4">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-600 text-white"><Droplet className="h-4 w-4" /></span>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">Greenmatrix</div>
          <div className="text-[11px] text-zinc-400">Admin</div>
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-2">
        {items.map((n) => {
          const active = isActive(n.href);
          const Icon = n.icon;
          return (
            <Link key={n.href} href={n.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                active ? "bg-zinc-100 font-medium text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900",
              )}>
              <Icon className={cn("h-4 w-4", active ? "text-emerald-600" : "text-zinc-400")} />
              {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-zinc-100 p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-zinc-900 text-xs font-semibold text-white uppercase">
            {(user.email ?? "?")[0]}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-medium text-zinc-700">{user.email}</div>
            <div className="text-[11px] capitalize text-zinc-400">{role ?? "—"}</div>
          </div>
          <button onClick={() => logout()} title="Sign out" className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-red-600">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-zinc-200 bg-white">{SidebarInner}</aside>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-white shadow-xl">{SidebarInner}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-200 bg-white/80 px-4 backdrop-blur md:px-6">
          <button onClick={() => setOpen(true)} className="md:hidden rounded-md p-2 text-zinc-600 hover:bg-zinc-100" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden md:block text-sm font-medium text-zinc-400">
            {items.find((n) => isActive(n.href))?.label ?? ""}
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium capitalize text-zinc-500">{role}</span>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
