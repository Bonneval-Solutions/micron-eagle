import { notFound } from "next/navigation";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { normalizeLocale } from "@/i18n";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  if (!locale) notFound();

  const client = createClient();
  const layout = await client
    .getSingle("layout", { lang: locale })
    .catch(() => null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = layout?.data as any;

  return (
    <>
      <Header
        config={layout?.data ?? null}
        navLinks={layout?.data?.nav_links ?? []}
        navDropdownItems={layout?.data?.nav_dropdown_items ?? []}
        lang={locale}
      />
      <main style={{ paddingTop: "var(--header-height)" }}>{children}</main>
      <Footer
        config={layout?.data ?? null}
        navLinks={layout?.data?.nav_links ?? []}
        navDropdownItems={layout?.data?.nav_dropdown_items ?? []}
        footerOffices={d?.footer_offices ?? []}
        footerLegalLinks={d?.footer_legal_links ?? []}
      />
      <PrismicPreview repositoryName={repositoryName} />
    </>
  );
}
