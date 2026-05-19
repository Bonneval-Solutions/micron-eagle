import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asText, filter } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { normalizeLocale } from "@/i18n";

type Params = { lang: string; uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { lang, uid } = await params;
  const locale = normalizeLocale(lang);
  if (!locale) notFound();

  const client = createClient();
  const page = await client
    .getByUID("page", uid, { lang: locale })
    .catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, uid } = await params;
  const locale = normalizeLocale(lang);
  if (!locale) notFound();

  const client = createClient();
  const page = await client
    .getByUID("page", uid, { lang: locale })
    .catch(() => notFound());

  return {
    title: asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: [{ url: page.data.meta_image?.url ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client
    .getAllByType("page", {
      lang: "*",
      filters: [filter.not("my.page.uid", "home")],
    })
    .catch(() => []);

  return pages.map((page) => ({
    lang: normalizeLocale(page.lang) ?? page.lang,
    uid: page.uid,
  }));
}
