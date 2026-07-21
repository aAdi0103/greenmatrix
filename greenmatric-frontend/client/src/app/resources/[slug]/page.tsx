import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { EnquireButton } from "@/components/EnquireButton";
import { getPublishedBySlug, listPublished } from "@/lib/articlesServer";

export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await listPublished();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = await getPublishedBySlug(slug);
  if (!a) return {};
  return {
    title: a.seoTitle || a.title,
    description: a.seoMeta || a.excerpt,
    openGraph: { title: a.seoTitle || a.title, description: a.seoMeta || a.excerpt, images: a.coverImage ? [a.coverImage] : [] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getPublishedBySlug(slug);
  if (!a) notFound();

  return (
    <article className="pt-28 pb-20">
      <Container className="max-w-3xl">
        <Link href="/resources" className="text-sm text-mist hover:text-white">← Resources</Link>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight">{a.title}</h1>
        {a.tags && a.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {a.tags.map((t) => <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-mist">{t}</span>)}
          </div>
        )}
        {a.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={a.coverImage} alt={a.title} className="mt-6 w-full rounded-2xl border border-white/10" />
        )}
        <div className="prose-invert mt-8 space-y-4 text-mist leading-relaxed [&_h2]:text-white [&_h2]:font-bold [&_h2]:text-xl [&_a]:text-brand [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: a.body }} />

        <div className="mt-12 rounded-2xl border border-brand/30 bg-brand/10 p-6 text-center">
          <h2 className="text-xl font-black">Planning your plant?</h2>
          <p className="mt-2 text-mist">Get a turnkey quote within 24 hours.</p>
          <div className="mt-4"><EnquireButton>Get a Quote</EnquireButton></div>
        </div>
      </Container>
    </article>
  );
}
