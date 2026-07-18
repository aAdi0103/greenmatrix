"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { Container } from "@/components/ui";
import { EnquireButton } from "@/components/EnquireButton";
import { getPublishedBySlug } from "@/lib/articles";
import type { Article } from "@/lib/types";

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null | "loading">("loading");

  useEffect(() => {
    getPublishedBySlug(slug).then(setArticle).catch(() => setArticle(null));
  }, [slug]);

  if (article === "loading") {
    return <div className="pt-28 pb-20"><Container><p className="text-mist">Loading…</p></Container></div>;
  }
  if (!article) {
    return (
      <div className="pt-28 pb-20">
        <Container>
          <h1 className="text-2xl font-black">Article not found</h1>
          <p className="mt-2 text-mist">It may have been unpublished.</p>
          <Link href="/resources" className="mt-4 inline-block text-brand font-semibold">← Back to resources</Link>
        </Container>
      </div>
    );
  }

  return (
    <article className="pt-28 pb-20">
      <Container className="max-w-3xl">
        <Link href="/resources" className="text-sm text-mist hover:text-white">← Resources</Link>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight">{article.title}</h1>
        {article.tags && article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((t) => <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-mist">{t}</span>)}
          </div>
        )}
        {article.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.coverImage} alt={article.title} className="mt-6 w-full rounded-2xl border border-white/10" />
        )}
        {/* Body is admin-authored HTML from the blog editor. */}
        <div className="prose-invert mt-8 space-y-4 text-mist leading-relaxed [&_h2]:text-white [&_h2]:font-bold [&_h2]:text-xl [&_a]:text-brand"
          dangerouslySetInnerHTML={{ __html: article.body }} />

        <div className="mt-12 rounded-2xl border border-brand/30 bg-brand/10 p-6 text-center">
          <h2 className="text-xl font-black">Planning your plant?</h2>
          <p className="mt-2 text-mist">Get a turnkey quote within 24 hours.</p>
          <div className="mt-4"><EnquireButton>Get a Quote</EnquireButton></div>
        </div>
      </Container>
    </article>
  );
}
