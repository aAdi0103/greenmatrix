"use client";

import type { ReactNode } from "react";
import type { LeadStatus } from "@/lib/types";

export function cn(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border border-slate-200 bg-white", className)}>{children}</div>;
}

type BtnVariant = "primary" | "outline" | "ghost" | "danger";
export function Button({
  children, onClick, type = "button", variant = "primary", disabled, className = "",
}: {
  children: ReactNode; onClick?: () => void; type?: "button" | "submit";
  variant?: BtnVariant; disabled?: boolean; className?: string;
}) {
  const styles: Record<BtnVariant, string> = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={cn("inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50", styles[variant], className)}>
      {children}
    </button>
  );
}

const STATUS_STYLE: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  qualified: "bg-indigo-100 text-indigo-700",
  quoted: "bg-purple-100 text-purple-700",
  negotiation: "bg-orange-100 text-orange-700",
  won: "bg-emerald-100 text-emerald-700",
  lost: "bg-rose-100 text-rose-700",
};
export function StatusBadge({ status }: { status: LeadStatus }) {
  return <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", STATUS_STYLE[status])}>{status}</span>;
}

export function Field({
  label, name, type = "text", value, onChange, placeholder, required, textarea, options,
}: {
  label: string; name: string; type?: string; value?: string; onChange?: (v: string) => void;
  placeholder?: string; required?: boolean; textarea?: boolean; options?: { value: string; label: string }[];
}) {
  const base = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500";
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-500">{label}{required && " *"}</span>
      {options ? (
        <select name={name} value={value} onChange={(e) => onChange?.(e.target.value)} className={base}>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : textarea ? (
        <textarea name={name} value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} required={required} rows={4} className={base} />
      ) : (
        <input name={name} type={type} value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} required={required} className={base} />
      )}
    </label>
  );
}

export function Spinner() {
  return <div className="grid min-h-[40vh] place-items-center text-slate-400">Loading…</div>;
}
