import { type MetadataRoute } from "next";

import { createClient } from "@/prismicio";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();
  const pages = await client.getAllByType("page");

  return pages
    .filter((page) => page.uid)
    .map((page) => ({
      url: page.uid === "home" ? BASE_URL : `${BASE_URL}/${page.uid}`,
      lastModified: page.last_publication_date || page.first_publication_date,
      changeFrequency: "weekly",
      priority: page.uid === "home" ? 1 : 0.7,
    }));
}
