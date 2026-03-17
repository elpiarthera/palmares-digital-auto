import { getGroupByToken, getIndustryData } from "@/lib/data";
import { GroupDetailContent } from "@/app/[locale]/groupes/[slug]/content";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { PreviewNotFound } from "@/components/palmares/preview-not-found";
import type { Metadata } from "next";
import "../../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  params: Promise<{ token: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const group = getGroupByToken(token);

  if (!group) {
    return {
      title: "Lien expiré | Palmarès Digital Auto",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${group.name} — Aperçu confidentiel | Palmarès Digital Auto`,
    robots: { index: false, follow: false },
    openGraph: undefined,
  };
}

export default async function PreviewPage({ params }: Props) {
  const { token } = await params;
  const group = getGroupByToken(token);

  // Load French messages for preview
  const messages = (await import("../../../messages/fr.json")).default;

  if (!group) {
    return (
      <html lang="fr" suppressHydrationWarning>
        <head>
          <meta name="robots" content="noindex, nofollow" />
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
            <NextIntlClientProvider messages={messages} locale="fr">
              <PreviewNotFound />
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    );
  }

  const industry = getIndustryData();

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="robots" content="noindex, nofollow" />
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
          <NextIntlClientProvider messages={messages} locale="fr">
            <GroupDetailContent
              group={group}
              industry={industry}
              isPreview
            />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
