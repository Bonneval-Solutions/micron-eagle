import "./globals.css";
import { PrismicPreview } from "@prismicio/next";
import { createClient } from "@/prismicio";
import { repositoryName } from "@/prismicio";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const layout = await client.getSingle("layout").catch(() => null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = layout?.data as any;

  return (
    <html lang="en">
      <body>
        <Header
          config={layout?.data ?? null}
          navLinks={layout?.data?.nav_links ?? []}
          navDropdownItems={layout?.data?.nav_dropdown_items ?? []}
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
      </body>
    </html>
  );
}
