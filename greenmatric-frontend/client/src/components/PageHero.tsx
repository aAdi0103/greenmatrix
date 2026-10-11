import { Container } from "./ui";

export function PageHero({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <section className="pt-28 pb-12 border-b border-slate-200 bg-white">
      <Container>
        {eyebrow && <div className="text-xs uppercase tracking-[0.2em] font-semibold text-brand">{eyebrow}</div>}
        <h1 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-4 text-slate-600 max-w-2xl text-base sm:text-lg">{subtitle}</p>}
      </Container>
    </section>
  );
}
