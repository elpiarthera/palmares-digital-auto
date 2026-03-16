import { notFound } from "next/navigation";
import { getGroupByToken, getIndustryData } from "@/lib/data";
import { GroupDetailContent } from "@/app/[locale]/groupes/[slug]/content";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
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

export default async function PreviewPage({ params }: Props) {
  const { token } = await params;
  const group = getGroupByToken(token);

  if (!group) {
    notFound();
  }

  const industry = getIndustryData();

  // Load French messages for preview
  const messages = (await import("../../../messages/fr.json")).default;

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#0a0a0a" />
        <title>
          {group.name} &mdash; Aper\u00e7u confidentiel | Palmar\u00e8s Digital Auto
        </title>
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
