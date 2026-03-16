import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "../globals.css";

const BASE_URL = "https://palmares-digital-auto.vercel.app";

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
  const canonicalUrl = locale === "fr" ? BASE_URL : `${BASE_URL}/en`;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: m.title,
      template: `%s | ${locale === "fr" ? "Palmar\u00e8s Digital Auto" : "Digital Auto Rankings"}`,
    },
    description: m.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: BASE_URL,
        en: `${BASE_URL}/en`,
        "x-default": BASE_URL,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      type: "website",
      url: canonicalUrl,
      siteName: locale === "fr" ? "Palmar\u00e8s Digital Auto France" : "Digital Auto Rankings France",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
    other: {
      "theme-color": "#0a0a0a",
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
      <head>
        <meta name="theme-color" content="#0a0a0a" />
      </head>
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
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
