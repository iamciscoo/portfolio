import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PersonSchema } from "@/components/portfolio/person-schema";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { setRequestLocale } from "next-intl/server";
import { isLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";
export default async function PortfolioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return (
    <div id="top">
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppLink />
      <PersonSchema />
    </div>
  );
}
