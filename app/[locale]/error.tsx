"use client";

import { useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  // Detect locale from pathname
  const isFr =
    typeof window !== "undefined"
      ? !window.location.pathname.startsWith("/en")
      : true;

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-3xl font-bold">
        {isFr ? "Une erreur est survenue" : "Something went wrong"}
      </h1>
      <p className="mb-8 text-muted-foreground">
        {isFr
          ? "Nous sommes désolés. Veuillez réessayer ou revenir à l\u2019accueil."
          : "We\u2019re sorry. Please try again or go back to the homepage."}
      </p>
      <div className="flex gap-3">
        <Button onClick={() => reset()}>
          {isFr ? "Réessayer" : "Try again"}
        </Button>
        <a
          href={isFr ? "/" : "/en"}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          {isFr ? "Retour à l\u2019accueil" : "Back to homepage"}
        </a>
      </div>
    </div>
  );
}
