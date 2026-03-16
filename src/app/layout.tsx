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

  return (
    <html lang="en">
      <body>
        <Header
          config={layout?.data ?? null}
          navLinks={layout?.data?.nav_links ?? []}
        />
        <main>{children}</main>
        <Footer
          config={layout?.data ?? null}
          footerLinks={layout?.data?.footer_links ?? []}
        />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
