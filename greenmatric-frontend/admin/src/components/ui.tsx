"use client";

import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import type { LeadStatus } from "@/lib/types";

export function cn(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]", className)}>
      {children}
    </div>
  );
}

type BtnVariant = "primary" | "outline" | "ghost" | "danger";
export function Button({
  children, onClick, type = "button", variant = "primary", disabled, className = "",
}: {
  children: ReactNode; onClick?: () => void; type?: "button" | "submit";
  variant?: BtnVariant; disabled?: boolean; className?: string;
}) {
  const styles: Record<BtnVariant, string> = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm",
    outline: "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50",
    ghost: "text-zinc-600 hover:bg-zinc-100",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={cn(
        "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3.5 text-sm font-medium transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/15 disabled:opacity-50 disabled:pointer-events-none",
        styles[variant], className,
      )}>
      {children}
    </button>
  );
}

const STATUS_STYLE: Record<LeadStatus, { wrap: string; dot: string }> = {
  new: { wrap: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
  contacted: { wrap: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  qualified: { wrap: "bg-violet-50 text-violet-700", dot: "bg-violet-500" },
  quoted: { wrap: "bg-purple-50 text-purple-700", dot: "bg-purple-500" },
  negotiation: { wrap: "bg-orange-50 text-orange-700", dot: "bg-orange-500" },
  won: { wrap: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  lost: { wrap: "bg-rose-50 text-rose-700", dot: "bg-rose-500" },
};
export function StatusBadge({ status }: { status: LeadStatus }) {
  const s = STATUS_STYLE[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium capitalize", s.wrap)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />{status}
    </span>
  );
}

export function Field({
  label, name, type = "text", value, onChange, placeholder, required, textarea, options,
}: {
  label: string; name: string; type?: string; value?: string; onChange?: (v: string) => void;
  placeholder?: string; required?: boolean; textarea?: boolean; options?: { value: string; label: string }[];
}) {
  const base = "w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-zinc-600">{label}{required && " *"}</span>
      {options ? (
        <select name={name} value={value} onChange={(e) => onChange?.(e.target.value)} className={cn(base, "h-9")}>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : textarea ? (
        <textarea name={name} value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} required={required} rows={4} className={cn(base, "py-2")} />
      ) : (
        <input name={name} type={type} value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} required={required} className={cn(base, "h-9")} />
      )}
    </label>
  );
}

export function Spinner() {
  return (
    <div className="grid min-h-[50vh] place-items-center text-zinc-400">
      <Loader2 className="h-5 w-5 animate-spin" />
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 pb-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-zinc-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs font-medium text-zinc-500">{label}</div>
      <div className="mt-1.5 text-2xl font-semibold tracking-tight text-zinc-900">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-zinc-400">{hint}</div>}
    </Card>
  );
}
