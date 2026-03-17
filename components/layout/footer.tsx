import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{t("tagline")}</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/classement" className="hover:text-foreground transition-colors">
              {t("ranking")}
            </Link>
            <Link href="/methodologie" className="hover:text-foreground transition-colors">
              {t("methodology")}
            </Link>
            <Link href="/a-propos" className="hover:text-foreground transition-colors">
              {t("contact")}
            </Link>
            <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
              {t("legalNotice")}
            </Link>
            <Link href="/confidentialite" className="hover:text-foreground transition-colors">
              {t("privacyPolicy")}
            </Link>
          </nav>

          <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
            <p>{t("rights")}</p>
            <p>{t("updatedQuarterly")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
