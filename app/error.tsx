"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isFr =
    typeof window !== "undefined"
      ? !window.location.pathname.startsWith("/en")
      : true;

  return (
    <html lang={isFr ? "fr" : "en"}>
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#0a0a0a",
          color: "#ededed",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "500px", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1rem" }}>
            {isFr ? "Une erreur est survenue" : "Something went wrong"}
          </h1>
          <p style={{ color: "#a1a1a1", marginBottom: "2rem" }}>
            {isFr
              ? "Nous sommes d\u00e9sol\u00e9s. Veuillez r\u00e9essayer ou revenir \u00e0 l\u2019accueil."
              : "We\u2019re sorry. Please try again or go back to the homepage."}
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <button
              onClick={() => reset()}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                backgroundColor: "#ededed",
                color: "#0a0a0a",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              {isFr ? "R\u00e9essayer" : "Try again"}
            </button>
            <a
              href={isFr ? "/" : "/en"}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: "1px solid #333",
                color: "#ededed",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {isFr ? "Retour \u00e0 l\u2019accueil" : "Back to homepage"}
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
