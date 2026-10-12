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
        <Link href="/resources" className="text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium">← Resources</Link>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-900">{a.title}</h1>
        {a.tags && a.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {a.tags.map((t) => <span key={t} className="rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 text-xs font-medium text-blue-800">{t}</span>)}
          </div>
        )}
        {a.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={a.coverImage} alt={a.title} className="mt-6 w-full rounded-2xl border border-slate-200 shadow-md" />
        )}
        <div className="prose mt-8 space-y-4 text-slate-700 leading-relaxed [&_h2]:text-slate-900 [&_h2]:font-bold [&_h2]:text-xl [&_a]:text-blue-600 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: a.body }} />

        <div className="mt-12 rounded-2xl border border-blue-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-black text-slate-900">Planning your plant?</h2>
          <p className="mt-2 text-slate-600">Get a turnkey quote within 24 hours.</p>
          <div className="mt-4"><EnquireButton>Get A Quotation</EnquireButton></div>
        </div>
      </Container>
    </article>
  );
}
