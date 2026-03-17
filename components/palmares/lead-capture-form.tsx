"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download, Shield, BarChart3, Eye } from "lucide-react";

interface LeadCaptureFormProps {
  variant?: "full" | "compact";
  context?: string;
}

export function LeadCaptureForm({ variant = "compact", context }: LeadCaptureFormProps) {
  const t = useTranslations(variant === "full" ? "getScore" : "leadGate");
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
          <p className="font-semibold">
            {variant === "full" ? t("form.success") : t("success")}
          </p>
          {variant === "full" && (
            <p className="text-sm text-muted-foreground">
              {t("form.successDescription")}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Download className="h-4 w-4" />
            {t("title")}
          </CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="email"
                name="email"
                placeholder={t("email")}
                required
                className="flex-1"
              />
              <input type="hidden" name="context" value={context ?? ""} />
              <Button type="submit" disabled={submitting || !gdprConsent} size="sm">
                {submitting ? "..." : t("submit")}
              </Button>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="gdpr-compact"
                checked={gdprConsent}
                onCheckedChange={(checked) => setGdprConsent(checked === true)}
                className="mt-0.5"
              />
              <label htmlFor="gdpr-compact" className="text-xs text-muted-foreground leading-tight">
                {t("gdprConsent")}{" "}
                <a href={privacyHref} className="underline hover:text-foreground">
                  {t("gdprLink")}
                </a>
              </label>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  // Full form variant
  return (
    <div className="space-y-6">
      {/* Trust signals */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Shield className="h-4 w-4 text-emerald-500" />
          {t("trustSignals.freeAudit")}
        </span>
        <span className="flex items-center gap-1.5">
          <BarChart3 className="h-4 w-4 text-emerald-500" />
          {t("trustSignals.criteria")}
        </span>
        <span className="flex items-center gap-1.5">
          <Eye className="h-4 w-4 text-emerald-500" />
          {t("trustSignals.transparent")}
        </span>
      </div>

      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">{t("form.company")}</Label>
              <Input id="company" name="company" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">{t("form.website")}</Label>
              <Input id="website" name="website" type="url" placeholder="https://" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">{t("form.name")}</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("form.email")}</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("form.phone")}</Label>
              <Input id="phone" name="phone" type="tel" />
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="gdpr-full"
                checked={gdprConsent}
                onCheckedChange={(checked) => setGdprConsent(checked === true)}
                className="mt-0.5"
              />
              <label htmlFor="gdpr-full" className="text-sm text-muted-foreground leading-tight">
                {t("form.gdprConsent")}{" "}
                <a href={privacyHref} className="underline hover:text-foreground">
                  {t("form.gdprLink")}
                </a>
              </label>
            </div>
            <Button type="submit" className="w-full" disabled={submitting || !gdprConsent}>
              {submitting ? t("form.submitting") : t("form.submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
