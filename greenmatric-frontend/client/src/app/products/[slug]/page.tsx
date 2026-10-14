import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, getProduct } from "@/content/products";
import { Container } from "@/components/ui";
import { EnquireButton } from "@/components/EnquireButton";
import { storageUrl } from "@/lib/storage";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: p.seo.title, description: p.seo.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const poster = storageUrl(p.images[0] ?? `products/${p.slug}/main.jpg`); // machine photo from Storage
  const related = (p.pairsWith ?? []).map(getProduct).filter(Boolean);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.valueLine,
    image: poster,
    category: p.stage,
    brand: { "@type": "Brand", name: "Greenmatrix Industry Pvt. Ltd." },
  };

  return (
    <div className="pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <Container>
        <nav className="text-sm text-slate-500 font-medium">
          <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <span className="mx-1">/</span>
          <span className="text-slate-800">{p.name}</span>
        </nav>

        <div className="mt-6 grid lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-brand">{p.stage}</div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-slate-900">{p.name}</h1>
            <p className="mt-4 text-lg text-slate-600">{p.valueLine}</p>

            <div className="mt-8 relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={poster} alt={p.name} className="w-full h-auto object-cover" />
            </div>

            <section className="mt-10">
              <h2 className="text-xl font-bold text-slate-900">Key features</h2>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-blue-600 font-bold">▸</span>{f}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold text-slate-900">Technical specifications</h2>
              <div className="mt-4 overflow-hidden rounded-xl border border-[#BCD5F5] bg-slate-50 shadow-xs hover:border-[#6FA5E6] transition-all">
                <table className="w-full text-sm">
                  <tbody>
                    {p.specs.map((s, i) => (
                      <tr key={s.label} className={i % 2 ? "bg-slate-50/70" : ""}>
                        <td className="px-4 py-3 font-medium text-slate-900 w-1/3 border-b border-slate-100">{s.label}</td>
                        <td className="px-4 py-3 text-slate-600 border-b border-slate-100">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold text-slate-900">Application industries</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.industries.map((ind) => (
                  <span key={ind} className="rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 text-sm text-blue-800 font-medium">{ind}</span>
                ))}
              </div>
            </section>

            {related.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold text-slate-900">Pairs with</h2>
                <div className="mt-4 grid sm:grid-cols-3 gap-4">
                  {related.map((r) => r && (
                    <Link key={r.slug} href={`/products/${r.slug}`} className="rounded-xl border border-[#BCD5F5] bg-slate-50 shadow-xs p-4 hover:border-[#6FA5E6] hover:shadow-md transition">
                      <div className="text-[11px] uppercase font-semibold text-sky-600">{r.stage}</div>
                      <div className="mt-1 font-semibold text-sm leading-snug text-slate-900">{r.name}</div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky enquire */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 rounded-2xl border border-[#BCD5F5] bg-slate-50 p-6 shadow-md hover:border-[#6FA5E6] transition-all">
              <div className="text-sm font-medium text-slate-500">Capacity</div>
              <div className="text-2xl font-black text-brand">{p.capacity}</div>
              <h3 className="mt-5 font-bold text-slate-900">Enquire about this machine</h3>
              <p className="mt-1 text-sm text-slate-600">Get a quote with specs and lead time. We reply within 24 hours.</p>
              <div className="mt-4 flex flex-col gap-2">
                <EnquireButton product={p.name} capacity={p.capacity}>Enquire now</EnquireButton>
                <EnquireButton product={p.name} capacity={p.capacity} variant="outline">Get A Quotation</EnquireButton>
              </div>
            </div>
          </aside>
        </div>

        {/* Turnkey banner */}
        <div className="mt-16 rounded-3xl border border-blue-200 bg-white shadow-sm p-8 text-center">
          <h2 className="text-2xl font-black text-slate-900">Setting up a full plant?</h2>
          <p className="mt-2 text-slate-600">We deliver complete turnkey lines — treatment to packing.</p>
          <div className="mt-4 flex justify-center gap-3">
            <EnquireButton>Plan my line</EnquireButton>
            <Link href="/solutions" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs">View solutions</Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
