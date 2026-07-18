import { Container } from "./ui";

export function PageHero({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <section className="pt-28 pb-10 border-b border-white/5 bg-ink-2/30">
      <Container>
        {eyebrow && <div className="text-xs uppercase tracking-[0.2em] text-brand">{eyebrow}</div>}
        <h1 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight">{title}</h1>
        {subtitle && <p className="mt-4 text-mist max-w-2xl">{subtitle}</p>}
      </Container>
    </section>
  );
}
