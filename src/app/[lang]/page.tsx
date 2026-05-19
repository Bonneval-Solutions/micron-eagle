import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { locales, normalizeLocale } from "@/i18n";

type Params = { lang: string };

export default async function Home({ params }: { params: Promise<Params> }) {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  if (!locale) notFound();

  const client = createClient();
  const home = await client
    .getByUID("page", "home", { lang: locale })
    .catch(() => notFound());

  return <SliceZone slices={home.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  if (!locale) notFound();

  const client = createClient();
  const home = await client
    .getByUID("page", "home", { lang: locale })
    .catch(() => notFound());

  return {
    title: asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image?.url ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
