import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/routing";
import { siteUrl } from "@/lib/metadata";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Francis Mwambene - Cisco",
  description: "Developer and product builder. From Tanzania, based in Russia.",
  icons: {
    icon: [
      { url: "/icon.svg?v=c", type: "image/svg+xml" },
      { url: "/favicon.ico?v=c", sizes: "32x32", type: "image/x-icon" },
    ],
  },
};
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  return (
    <html
      className="sc-ready"
      lang={locale}
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('cisco-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch(e){}`,
          }}
        />
      </head>
      {/* Extensions such as Grammarly add body attributes before hydration. */}
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
