import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BASE_URL, getPageAlternates } from "@/lib/urls";
import "../globals.css";

type Locale = "fr" | "en";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const meta: Record<string, { title: string; description: string }> = {
    fr: {
      title: "Palmar\u00e8s Digital Auto France 2026 \u2014 Classement maturit\u00e9 digitale automobile",
      description:
        "Le classement de la maturit\u00e9 digitale des 16 plus grands groupes de distribution automobile en France. 87 crit\u00e8res, 4 dimensions, transparence totale.",
    },
    en: {
      title: "Digital Auto Rankings France 2026 \u2014 Car dealer digital maturity",
      description:
        "The digital maturity ranking of the top 16 French car dealer groups. 87 criteria, 4 dimensions, full transparency.",
    },
  };

  const m = meta[locale] || meta.fr;
  const alternates = getPageAlternates(locale, "");

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: m.title,
      template: `%s | ${locale === "fr" ? "Palmar\u00e8s Digital Auto" : "Digital Auto Rankings"}`,
    },
    description: m.description,
    alternates,
    other: {
      "indexnow-key": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    },
    openGraph: {
      title: m.title,
      description: m.description,
      type: "website",
      url: alternates.canonical,
      siteName: locale === "fr" ? "Palmar\u00e8s Digital Auto France" : "Digital Auto Rankings France",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <Breadcrumbs />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
