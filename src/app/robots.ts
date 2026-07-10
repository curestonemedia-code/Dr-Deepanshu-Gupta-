import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://drdeepanshugupta.com/sitemap.xml",
    host: "https://drdeepanshugupta.com",
  };
}
