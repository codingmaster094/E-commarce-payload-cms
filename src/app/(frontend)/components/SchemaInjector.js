"use client";
import { useEffect } from "react";

export default function SchemaInjector({ schemaJSON, faqSchema }) {
  useEffect(() => {
    if (!schemaJSON && !faqSchema) return;
    const graphItems = [];
    if (schemaJSON) graphItems.push(schemaJSON);
    if (faqSchema) graphItems.push(faqSchema);

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": graphItems,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "rank-math-schema";
    script.text = JSON.stringify(schemaData);

    const oldScript = document.getElementById("rank-math-schema");
    if (oldScript) oldScript.remove();

    document.head.appendChild(script);
  }, [schemaJSON, faqSchema]);

  return null;
}
