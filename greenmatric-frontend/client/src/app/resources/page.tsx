"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Section, Card } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { listPublished } from "@/lib/articles";
import type { Article } from "@/lib/types";

export default function ResourcesPage() {
  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    listPublished().then(setArticles).catch(() => setArticles([]));
  }, []);

  return (
    <>
      <PageHero eyebrow="Resources" title="Guides for starting & scaling a plant"
        subtitle="Cost, licence and capacity guides for entrepreneurs entering the water and beverage business." />
      <Section>
        <Container>
          {articles === null ? (
            <p className="text-mist">Loading…</p>
          ) : articles.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-ink-2/40 p-10 text-center text-mist">
              No articles published yet. Check back soon.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((a) => (
                <Link key={a.id} href={`/resources/${a.slug}`}>
                  <Card className="h-full">
                    {a.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.coverImage} alt={a.title} className="mb-4 h-40 w-full rounded-lg object-cover" />
                    )}
                    <h3 className="font-bold leading-snug">{a.title}</h3>
                    {a.excerpt && <p className="mt-2 text-sm text-mist">{a.excerpt}</p>}
                    <span className="mt-4 inline-block text-sm font-semibold text-brand">Read →</span>
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
