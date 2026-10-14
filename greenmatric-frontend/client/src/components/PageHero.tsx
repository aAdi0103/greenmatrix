import { Container } from "./ui";

export function PageHero({
  title,
  subtitle,
  eyebrow,
  className = "",
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <section className={`pt-24 sm:pt-28 pb-2 sm:pb-3 bg-white ${className}`.trim()}>
      <Container>
        {eyebrow && <div className="text-xs uppercase tracking-[0.2em] font-semibold text-brand">{eyebrow}</div>}
        <h1 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-3 text-slate-600 max-w-2xl text-base sm:text-lg">{subtitle}</p>}
      </Container>
    </section>
  );
}
