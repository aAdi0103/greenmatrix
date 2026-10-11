import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section, Card } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { listPublished } from "@/lib/articlesServer";

export const revalidate = 60; // ISR — reflects new publishes within a minute

export const metadata: Metadata = {
  title: "Resources",
  description: "Cost, licence and capacity guides for starting a water or beverage bottling business.",
};

export default async function ResourcesPage() {
  const articles = await listPublished();

  return (
    <>
      <PageHero eyebrow="Resources" title="Guides for starting & scaling a plant"
        subtitle="Cost, licence and capacity guides for entrepreneurs entering the water and beverage business." />
      <Section>
        <Container>
          {articles.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-10 text-center text-slate-500 shadow-xs">
              No articles published yet. Check back soon.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((a) => (
                <Link key={a.id} href={`/resources/${a.slug}`}>
                  <Card className="h-full">
                    {a.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.coverImage} alt={a.title} className="mb-4 h-40 w-full rounded-lg object-cover bg-slate-100" />
                    )}
                    <h3 className="font-bold leading-snug text-slate-900">{a.title}</h3>
                    {a.excerpt && <p className="mt-2 text-sm text-slate-600">{a.excerpt}</p>}
                    <span className="mt-4 inline-block text-sm font-semibold text-blue-600">Read →</span>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
