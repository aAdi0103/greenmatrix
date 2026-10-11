"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

export function cn(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-7xl px-5", className)}>{children}</div>;
}

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("py-20 sm:py-24", className)}>
      {children}
    </section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Reveal({ children, i = 0, className = "" }: { children: ReactNode; i?: number; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
      {children}
    </motion.div>
  );
}

type BtnProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  type?: "button" | "submit";
  className?: string;
  target?: string;
};

export function Button({ children, href, onClick, variant = "primary", type = "button", className = "", target }: BtnProps) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-brand text-white glow-brand hover:brightness-110"
      : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 shadow-xs";
  const cls = cn(base, styles, className);
  if (href) {
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) return <a href={href} target={target} className={cls}>{children}</a>;
    return <Link href={href} className={cls}>{children}</Link>;
  }
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}

export function Card({ children, className = "", hover = true }: { children: ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={cn("rounded-2xl border border-[#BCD5F5] bg-slate-50 shadow-xs p-6", hover && "hover:border-[#6FA5E6] hover:shadow-md transition-all", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Reveal>
      <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-600 max-w-2xl">{subtitle}</p>}
    </Reveal>
  );
}

export function Field({
  label, name, type = "text", required, placeholder, textarea, value, onChange, readOnly,
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
  textarea?: boolean; value?: string; onChange?: (v: string) => void; readOnly?: boolean;
}) {
  const cls = "w-full rounded-lg bg-white border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-60 transition";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-700">{label}{required && " *"}</span>
      {textarea ? (
        <textarea name={name} required={required} placeholder={placeholder} rows={3} readOnly={readOnly}
          value={value} onChange={(e) => onChange?.(e.target.value)} className={cls} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} readOnly={readOnly}
          value={value} onChange={(e) => onChange?.(e.target.value)} className={cls} />
      )}
    </label>
  );
}
