import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowRight, CalendarDays, ChevronRight, Clock3, MessageCircle, UserRound } from "lucide-react";
import PortableTextRenderer, { getYouTubeId } from "@/components/blog/PortableTextRenderer";
import SanityImage from "@/components/blog/SanityImage";
import BlogPostCard from "@/components/blog/BlogPostCard";
import {
  formatDate,
  getBlogPost,
  getPostCategorySlug,
  getReadTime,
  getRelatedBlogs,
  type PortableTextBlock,
} from "@/lib/blogs";

export const dynamic = "force-dynamic";

const SITE_URL = "https://drdeepanshugupta.com";

type BlogPostPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) return { title: "Article Not Found" };

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt || "";
  const image = post.seo?.ogImage?.asset?.url || post.coverImage?.asset?.url || "/doctor.png";
  const url = `${SITE_URL}/${getPostCategorySlug(post)}/${post.slug}`;

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
  const { category, slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  // A post can carry more than one category, but it only lives at one URL —
  // its first assigned category. Any other category (or the legacy /blog/
  // URL) permanently redirects here, so the same post never shows up under
  // two indexable addresses in Search Console.
  const canonicalCategory = getPostCategorySlug(post);
  if (category !== canonicalCategory) {
    permanentRedirect(`/${canonicalCategory}/${post.slug}`);
  }

  const relatedPosts = await getRelatedBlogs(post);
  const primaryCategory = post.categories?.[0];
  const path = `/${canonicalCategory}/${post.slug}`;
  const url = `${SITE_URL}${path}`;
  const description = post.seo?.metaDescription || post.excerpt || post.title;
  const image = post.seo?.ogImage?.asset?.url || post.coverImage?.asset?.url || `${SITE_URL}/doctor.png`;
  const authorName = post.author?.name || "Dr. Deepanshu Gupta";

  // "Updated" only shows for a real, later date — not the same calendar day
  // as publishedAt, which would just be redundant noise.
  const hasRealUpdate = post.updatedAt && formatDate(post.updatedAt) !== formatDate(post.publishedAt);
  const dateLine = hasRealUpdate ? (
    <>Updated {formatDate(post.updatedAt)} · Originally published {formatDate(post.publishedAt)}</>
  ) : (
    formatDate(post.publishedAt)
  );

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

  // FAQPage schema, extracted from the post's own visible content rather
  // than invented — Google requires FAQPage markup to mirror on-page
  // content, so posts without a "Frequently Asked Questions" section simply
  // get no FAQPage block.
  const faqPairs = extractFaqPairs(post.body || []);

  const faqSchema =
    faqPairs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqPairs.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }
      : null;

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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
        />
      )}
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
                {dateLine}
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

function blockText(block: PortableTextBlock): string {
  return (block.children || [])
    .map((child) => child.text || "")
    .join("")
    .trim();
}

const FAQ_HEADING_RE = /frequently asked questions|^faqs?\b/i;

function isFaqSectionHeading(block: PortableTextBlock): boolean {
  if (block.style !== "h2" && block.style !== "h3") return false;
  return FAQ_HEADING_RE.test(blockText(block));
}

// Two house styles are used for an individual FAQ entry:
//   A — the question is a fully-bold "normal" paragraph ending in "?",
//       immediately followed by a plain answer paragraph.
//   B — the question is its own H3 heading ending in "?", immediately
//       followed by a plain answer paragraph.
// Both are only recognised once already inside an FAQ section (see
// extractFaqPairs) — outside that section an H3 or bold sentence ending in
// "?" is just article prose, not an FAQ item.
function isQuestionBlock(block: PortableTextBlock): boolean {
  const text = blockText(block);
  if (!text.endsWith("?")) return false;

  if (block.style === "h3") return true; // pattern B

  if (block._type === "block" && block.style === "normal" && !block.listItem) {
    const visibleSpans = (block.children || []).filter((child) => (child.text || "").trim().length > 0);
    if (visibleSpans.length === 0) return false;
    return visibleSpans.every((child) => (child.marks || []).includes("strong")); // pattern A
  }

  return false;
}

/**
 * Pulls real Q&A pairs out of a post's own body — never invented. Only
 * extracts from an explicit "Frequently Asked Questions" (or "FAQ(s)")
 * heading: everything after it, up to the next H2 that isn't itself another
 * FAQ label, is scanned for question/answer pairs. Posts without that
 * labelled section yield an empty array and get no FAQPage schema.
 */
function extractFaqPairs(body: PortableTextBlock[]): Array<{ question: string; answer: string }> {
  const startIndex = body.findIndex(isFaqSectionHeading);
  if (startIndex === -1) return [];

  const pairs: Array<{ question: string; answer: string }> = [];
  let i = startIndex + 1;

  while (i < body.length) {
    const block = body[i];
    if (block.style === "h2" && !isFaqSectionHeading(block)) break;

    if (!isQuestionBlock(block)) {
      i++;
      continue;
    }

    const question = blockText(block);
    const answerParts: string[] = [];
    let j = i + 1;
    while (j < body.length && !isQuestionBlock(body[j]) && !(body[j].style === "h2" && !isFaqSectionHeading(body[j]))) {
      const text = blockText(body[j]);
      if (text) answerParts.push(text);
      j++;
    }

    if (answerParts.length > 0) {
      pairs.push({ question, answer: answerParts.join(" ") });
    }
    i = j;
  }

  return pairs;
}
