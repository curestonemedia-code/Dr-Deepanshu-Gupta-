import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity";
import { UNCATEGORIZED_SLUG } from "@/lib/blogs";

const SITE_URL = "https://drdeepanshugupta.com";

type BlogSlugEntry = {
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
  categorySlug?: string | null;
};

// Only this site's posts — the Sanity dataset is shared with
// thecurestone.com, so an unscoped query would list Cure Stone's articles
// under this domain too. Failures degrade to an empty list rather than
// taking the whole sitemap down.
async function getBlogSlugs(): Promise<BlogSlugEntry[]> {
  try {
    return await sanityFetch<BlogSlugEntry[]>({
      query: `*[_type == "blogPost" && siteId == "dr-deepanshu" && defined(slug.current) && isPublished != false]{
        "slug": slug.current,
        publishedAt,
        updatedAt,
        "categorySlug": categories[0]->slug.current
      }`,
    });
  } catch {
    return [];
  }
}

// Next.js's built-in sitemap.xml serializer interpolates video title/
// description fields directly into the XML with no escaping of its own, so a
// raw "&", "<" or ">" in that text breaks the generated sitemap. Escape any
// free-text field passed into a `videos` sitemap entry with this.
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/kidney-stones", changeFrequency: "monthly", priority: 0.9 },
  { path: "/prostate", changeFrequency: "monthly", priority: 0.9 },
  { path: "/andrology", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/patients", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
];

// None of the pages below are "watch pages" for their embedded videos — each
// clip is one card in a testimonial carousel or a hero-side element next to
// the page's real subject, not the page's primary content. A video sitemap
// entry asserts the opposite, and Search Console's Videos report correctly
// flags that as "Video isn't on a watch page" (confirmed on / and /patients,
// which also shared the exact same videos, and /kidney-stones). So: no
// VIDEOS_BY_PATH map — the embeds stay, only the video-sitemap/structured-data
// claim of page ownership is gone. Re-add an entry only for a page genuinely
// dedicated to one specific video.
const VIDEOS_BY_PATH: Record<string, MetadataRoute.Sitemap[number]["videos"]> = {};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getBlogSlugs();

  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map((route) => {
    const videos = VIDEOS_BY_PATH[route.path];
    return {
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(videos
        ? {
            videos: videos.map((video) => ({
              ...video,
              title: escapeXml(video.title),
              description: escapeXml(video.description),
            })),
          }
        : {}),
    };
  });

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${post.categorySlug || UNCATEGORIZED_SLUG}/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : post.publishedAt ? new Date(post.publishedAt) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
