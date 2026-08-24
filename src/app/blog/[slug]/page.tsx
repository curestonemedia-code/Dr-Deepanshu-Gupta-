import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, ChevronRight, Clock3, MessageCircle, UserRound } from "lucide-react";
import PortableTextRenderer, { getYouTubeId } from "@/components/blog/PortableTextRenderer";
import SanityImage from "@/components/blog/SanityImage";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { formatDate, getBlogPost, getReadTime, getRelatedBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

const SITE_URL = "https://drdeepanshugupta.com";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) return { title: "Article Not Found" };

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt || "";
  const image = post.seo?.ogImage?.asset?.url || post.coverImage?.asset?.url || "/doctor.png";
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Dr. Deepanshu Gupta",
      type: "article",
      locale: "en_IN",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedBlogs(post);
  const primaryCategory = post.categories?.[0];
  const path = `/blog/${post.slug}`;
  const url = `${SITE_URL}${path}`;
  const description = post.seo?.metaDescription || post.excerpt || post.title;
  const image = post.seo?.ogImage?.asset?.url || post.coverImage?.asset?.url || `${SITE_URL}/doctor.png`;
  const authorName = post.author?.name || "Dr. Deepanshu Gupta";

  // YouTube embeds in the body carry their own uploadDate/duration in Sanity
  // (see the shared youtube.ts schema) — without VideoObject markup Google
  // has no reliable way to index them as video content.
  const videoSchemas = (post.body || [])
    .filter((block) => block._type === "youtube")
    .map((block) => {
      const ytId = getYouTubeId(block.url);
      if (!ytId) return null;
      return {
        "@type": "VideoObject",
        name: block.caption || post.title,
        description,
        thumbnailUrl: [`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`],
        uploadDate: block.uploadDate || post.publishedAt || new Date().toISOString(),
        ...(block.duration ? { duration: block.duration } : {}),
        embedUrl: `https://www.youtube.com/embed/${ytId}`,
        contentUrl: `https://www.youtube.com/watch?v=${ytId}`,
        publisher: {
          "@type": "Physician",
          name: "Dr. Deepanshu Gupta",
          "@id": `${SITE_URL}/#physician`,
        },
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${url}#article`,
    headline: post.title,
    description,
    image,
    url,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || undefined,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE_URL}/blog#blog` },
    author: {
      "@type": "Physician",
      name: authorName,
      "@id": `${SITE_URL}/#physician`,
    },
    publisher: {
      "@type": "Physician",
      name: "Dr. Deepanshu Gupta",
      "@id": `${SITE_URL}/#physician`,
    },
    ...(primaryCategory ? { about: primaryCategory.title } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />
      {videoSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", ...schema }).replace(/</g, "\\u003c"),
          }}
        />
      ))}

      {/* HEADER */}
      <section className="cond-hero edge" data-bg="#f8fafc" data-theme="light">
        <div className="cond-hero-bg"></div>
        <div className="container-x relative">
          <div className="mx-auto max-w-3xl">
            <div className="cond-breadcrumb">
              <Link href="/">Home</Link>
              <ChevronRight style={{ width: "14px", height: "14px" }} />
              <Link href="/blog">Blog</Link>
              {primaryCategory && (
                <>
                  <ChevronRight style={{ width: "14px", height: "14px" }} />
                  <Link href={`/blog?category=${primaryCategory.slug}`}>{primaryCategory.title}</Link>
                </>
              )}
            </div>

            {primaryCategory && (
              <div className="chip mb-6 w-fit">
                <span className="chip-dot"></span>
                {primaryCategory.title}
              </div>
            )}
            <h1 className="display-sm text-slate-900 mb-6 font-black!">{post.title}</h1>
            {post.excerpt && <p className="body-lg text-slate-600 mb-8">{post.excerpt}</p>}

            <div className="flex flex-wrap items-center gap-5 border-t border-slate-200 pt-6 text-sm font-bold text-slate-500">
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-4 w-4 text-blue-600" />
                {authorName}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-blue-600" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-blue-600" />
                {getReadTime(post)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* COVER IMAGE — no fixed ratio; capped height, never cropped. */}
      {post.coverImage?.asset?.url && (
        <div className="container-x mt-10">
          <div className="flex justify-center">
            <SanityImage
              image={post.coverImage}
              alt={post.title}
              width={post.coverImage.asset?.metadata?.dimensions?.width || 1600}
              height={post.coverImage.asset?.metadata?.dimensions?.height || 900}
              priority
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="h-auto max-h-[520px] w-auto max-w-full"
            />
          </div>
        </div>
      )}

      {/* BODY */}
      <section className="py-12 md:py-16 edge">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <PortableTextRenderer value={post.body} />

            {post.tags?.length ? (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-200 pt-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600"
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Author / medical-review note — this is YMYL content. */}
            <div className="mt-10 rounded-[2rem] border border-slate-100 bg-slate-50/60 p-8">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-3">
                Medically reviewed
              </p>
              <p className="text-slate-600 leading-relaxed">
                Reviewed by <strong className="text-slate-900">Dr. Deepanshu Gupta</strong> — MBBS, MCh Urology
                (Rank 1, RML Hospital). This article is general information, not a substitute for a
                consultation about your own reports.
              </p>
              <Link href="/?interest=other#book" className="btn btn-primary mt-6 inline-flex">
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-slate-50/60 edge">
          <div className="container-x">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="heading text-slate-900">Related reading</h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all"
              >
                All articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <BlogPostCard key={related._id} post={related} />
              ))}
            </div>
          </div>
        </section>
      )}

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
