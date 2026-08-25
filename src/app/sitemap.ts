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

// Real, distinct videos from the Cure Stone YouTube channel, keyed by the
// page they're embedded on — surfaces them to Google via a video sitemap
// (https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps).
const HOME_AND_PATIENTS_VIDEOS: NonNullable<MetadataRoute.Sitemap[number]["videos"]> = [
  {
    title: "22mm Stone Clearance — Patient Case, Shimla",
    thumbnail_loc: "https://i.ytimg.com/vi/TTaSMfmViUk/hqdefault.jpg",
    description: "Patient travelled from Shimla after 4 failed surgeries. Successfully treated using FANS-RIRS laser technology with a 24-hour discharge.",
    player_loc: "https://www.youtube.com/embed/TTaSMfmViUk",
    family_friendly: "yes",
  },
  {
    title: "Thulium Laser Dusting — Live OT, Assam",
    thumbnail_loc: "https://i.ytimg.com/vi/4xDV33Zgba4/hqdefault.jpg",
    description: "Live OT footage demonstrating the pulverisation of a 21mm kidney stone causing PUJ blockage, performed on a patient from Assam.",
    player_loc: "https://www.youtube.com/embed/4xDV33Zgba4",
    family_friendly: "yes",
  },
  {
    title: "The FANS-RIRS Guide",
    thumbnail_loc: "https://i.ytimg.com/vi/K5va1bE282M/hqdefault.jpg",
    description: "Dr. Gupta breaks down the exact mechanics of FANS-RIRS laser surgery for kidney stones.",
    player_loc: "https://www.youtube.com/embed/K5va1bE282M",
    family_friendly: "yes",
  },
  {
    title: "25mm Kidney Stone Gone — RIRS Treatment",
    thumbnail_loc: "https://img.youtube.com/vi/r6gHddV_OpM/hqdefault.jpg",
    description: "Patient testimonial after RIRS laser treatment for a 25mm kidney stone.",
    player_loc: "https://www.youtube.com/embed/r6gHddV_OpM",
    family_friendly: "yes",
  },
  {
    title: "Kidney Stone Surgery Experience — Odisha",
    thumbnail_loc: "https://img.youtube.com/vi/ZIIGg4vRM5c/hqdefault.jpg",
    description: "Patient testimonial after travelling from Odisha for kidney stone surgery.",
    player_loc: "https://www.youtube.com/embed/ZIIGg4vRM5c",
    family_friendly: "yes",
  },
];

const VIDEOS_BY_PATH: Record<string, MetadataRoute.Sitemap[number]["videos"]> = {
  "/": HOME_AND_PATIENTS_VIDEOS,
  "/patients": HOME_AND_PATIENTS_VIDEOS,
  "/kidney-stones": [
    {
      title: "Bilateral Kidney Stones — How Are They Removed?",
      thumbnail_loc: "https://img.youtube.com/vi/J4Twv-dMfR4/hqdefault.jpg",
      description: "Dr. Deepanshu Gupta explains treatment for bilateral (both-kidney) kidney stones and how they are removed with laser surgery.",
      player_loc: "https://www.youtube.com/embed/J4Twv-dMfR4",
      family_friendly: "yes",
    },
  ],
};

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
