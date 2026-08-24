import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogPostCard from "@/components/blog/BlogPostCard";
import BlogPagination from "@/components/blog/BlogPagination";
import { BLOGS_PER_PAGE, type BlogFilters, getBlogIndex } from "@/lib/blogs";

export const dynamic = "force-dynamic";

const SITE_URL = "https://drdeepanshugupta.com";
const TITLE = "Health Blog";
const DESCRIPTION =
  "Articles on kidney stones, RIRS laser surgery, prostate enlargement and andrology care, written and reviewed by Dr. Deepanshu Gupta — MCh Urology (Rank 1, RML Hospital).";
const URL = `${SITE_URL}/blog`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Dr. Deepanshu Gupta",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/doctor.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/doctor.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: URL },
  ],
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${URL}#blog`,
  name: "Dr. Deepanshu Gupta Blog",
  description: DESCRIPTION,
  url: URL,
  publisher: {
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
  },
  inLanguage: "en-IN",
};

type BlogListPageProps = {
  searchParams: Promise<{ page?: string; category?: string; q?: string }>;
};

export default async function BlogListPage({ searchParams }: BlogListPageProps) {
  const resolved = await searchParams;
  const filters: BlogFilters = {
    page: Number(resolved.page || "1") || 1,
    category: resolved.category,
    q: resolved.q?.trim(),
  };

  const { posts, total, totalPages, page, categories } = await getBlogIndex(filters);
  const selectedCategory = categories.find((c) => c.slug === filters.category);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema).replace(/</g, "\\u003c") }}
      />

      {/* HERO */}
      <section className="cond-hero edge" data-bg="#f8fafc" data-theme="light">
        <div className="cond-hero-bg"></div>
        <div className="container-x relative text-center">
          <div className="cond-breadcrumb justify-center">
            <Link href="/">Home</Link>
            <ChevronRight style={{ width: "14px", height: "14px" }} />
            <span>Blog</span>
          </div>
          <div className="chip mb-6 mx-auto w-fit">
            <span className="chip-dot"></span>Health Blog
          </div>
          <h1 className="display text-slate-900 mb-6">Kidney stones, explained clearly.</h1>
          <p className="body-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Straight answers on RIRS, kidney stone treatment, prostate care and andrology — written
            and reviewed by Dr. Deepanshu Gupta.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold text-slate-500">
            <span>
              {total} {total === 1 ? "article" : "articles"}
            </span>
            {selectedCategory && <span>· {selectedCategory.title}</span>}
            {filters.q && <span>· &ldquo;{filters.q}&rdquo;</span>}
          </div>
        </div>
      </section>

      {/* LISTING */}
      <section className="py-8 md:py-12 bg-slate-50/60 edge">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <BlogSidebar
              searchQuery={filters.q}
              categories={categories}
              activeCategorySlug={filters.category}
            />

            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm font-bold text-slate-500">
                  Showing {posts.length ? (page - 1) * BLOGS_PER_PAGE + 1 : 0}
                  {posts.length ? `–${(page - 1) * BLOGS_PER_PAGE + posts.length}` : ""} of {total}
                </p>
                {(filters.category || filters.q) && (
                  <Link href="/blog" className="text-sm font-bold text-blue-600 hover:underline">
                    Clear filters
                  </Link>
                )}
              </div>

              {posts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {posts.map((post) => (
                    <BlogPostCard key={post._id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="rounded-[2rem] border border-slate-100 bg-white p-10 text-center">
                  <h2 className="text-2xl font-bold text-slate-900">No articles yet</h2>
                  <p className="mt-3 text-sm font-medium text-slate-500">
                    {filters.category || filters.q
                      ? "Try a different category or search term."
                      : "New articles are on the way — in the meantime, book a consultation and ask directly."}
                  </p>
                  <Link href="/?interest=other#book" className="btn btn-primary mt-6 inline-flex">
                    Book Free Consultation
                  </Link>
                </div>
              )}

              <BlogPagination
                page={page}
                totalPages={totalPages}
                buildHref={(target) => blogHref({ ...filters, page: target })}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-tight edge">
        <div className="container-x text-center">
          <h2 className="heading text-slate-900 mb-4">Still have a question?</h2>
          <p className="body-lg text-slate-600 max-w-xl mx-auto mb-8">
            Reading only takes you so far. Bring your reports and get an answer specific to you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/?interest=other#book" className="btn btn-primary btn-lg">
              Book Free Consultation
            </Link>
            <a
              href="https://wa.me/918800263884"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-lg"
            >
              <MessageCircle className="w-4 h-4 text-green-600" /> WhatsApp Your Reports
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function blogHref(filters: BlogFilters) {
  const params = new URLSearchParams();
  if (filters.page && filters.page > 1) params.set("page", String(filters.page));
  if (filters.category) params.set("category", filters.category);
  if (filters.q) params.set("q", filters.q);
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}
