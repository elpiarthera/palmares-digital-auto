"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface NotFoundLeadFormProps {
  namespace: "notFound" | "previewNotFound";
}

export function NotFoundLeadForm({ namespace }: NotFoundLeadFormProps) {
  const t = useTranslations(namespace);
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!gdprConsent) return;
    setSubmitting(true);
    // In production, this would POST to an API endpoint
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  }

  const privacyHref = locale === "fr" ? "/confidentialite" : "/en/privacy-policy";

  if (submitted) {
    return (
      <Card className="border-emerald-500/30 bg-emerald-500/5">
        <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          <p className="font-semibold">{t("leadCapture.success")}</p>
          <p className="text-sm text-muted-foreground">
            {t("leadCapture.successDescription")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("leadCapture.title")}</CardTitle>
        <CardDescription>{t("leadCapture.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company-404">{t("leadCapture.company")}</Label>
            <Input id="company-404" name="company" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-404">{t("leadCapture.email")}</Label>
            <Input id="email-404" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website-404">{t("leadCapture.website")}</Label>
            <Input id="website-404" name="website" type="url" placeholder="https://" required />
          </div>
          <input type="hidden" name="context" value={`404-${namespace}`} />
          <div className="flex items-start gap-2">
            <Checkbox
              id={`gdpr-${namespace}`}
              checked={gdprConsent}
              onCheckedChange={(checked) => setGdprConsent(checked === true)}
              className="mt-0.5"
            />
            <label
              htmlFor={`gdpr-${namespace}`}
              className="text-sm text-muted-foreground leading-tight"
            >
              {t("leadCapture.gdprConsent")}{" "}
              <a href={privacyHref} className="underline hover:text-foreground">
                {t("leadCapture.gdprLink")}
              </a>
            </label>
          </div>
          <Button type="submit" className="w-full" disabled={submitting || !gdprConsent}>
            {submitting ? t("leadCapture.submitting") : t("leadCapture.submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
