"use client";
import React, { useEffect, useMemo, useState } from "react";

const DEFAULT_TEXTS = {
  title: "Wir verwenden Cookies",
  intro:
    "Wir nutzen Cookies, die für den Betrieb erforderlich sind, und – nur mit Ihrer Einwilligung – optionale Cookies.",
  standardNotice:
    "Es werden keine Drittanbieter-Cookies eingesetzt; wir binden keine externen Dienste ein. Ausnahme: Das Hosting der Website erfolgt über Vercel. Dabei können technisch notwendige Prozesse auf der Infrastruktur von Vercel stattfinden (z. B. Auslieferung über Edge/CDN, Sicherheits- und Zugriffsprotokolle).",
  settingsTitle: "Cookie-Einstellungen",
  categories: [
    {
      key: "essential",
      label: "Essentiell",
      description:
        "Erforderlich für die Grundfunktionen der Website. Diese können nicht deaktiviert werden.",
      required: true,
    },
    {
      key: "functional",
      label: "Funktional",
      description:
        "Verbesserte Funktionen und Personalisierung, z. B. eingebettete Inhalte.",
    },
    {
      key: "analytics",
      label: "Analytics",
      description:
        "Anonyme Statistiken helfen uns zu verstehen, wie Besucher die Website nutzen.",
    },
    {
      key: "marketing",
      label: "Marketing",
      description:
        "Marketing-Cookies werden verwendet, um Besucher über Websites hinweg zu verfolgen.",
    },
  ],
  acceptAllLabel: "Alle akzeptieren",
  declineAllLabel: "Nur essentielle",
  saveLabel: "Auswahl speichern",
  settingsLabel: "Einstellungen",
  readMoreLabel: "Mehr erfahren",
  readMoreHref: "/datenschutz",
};

const DEFAULT_STATE = {
  essential: true,
  functional: false,
  analytics: false,
  marketing: false,
};

// ---------- Cookie Helpers ----------
function readConsent(cookieName) {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${cookieName}=`));
  if (!match) return null;
  try {
    const value = decodeURIComponent(match.split("=")[1]);
    const parsed = JSON.parse(value);
    return {
      essential: true,
      functional: !!parsed.functional,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
    };
  } catch {
    return null;
  }
}

function writeConsent(cookieName, value, maxAgeDays = 365) {
  if (typeof document === "undefined") return;
  const json = encodeURIComponent(
    JSON.stringify({
      functional: value.functional,
      analytics: value.analytics,
      marketing: value.marketing,
    })
  );
  const maxAge = maxAgeDays * 24 * 60 * 60;
  const secure =
    typeof window !== "undefined" &&
    window.location?.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${cookieName}=${json}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

// ---------- Hook ----------
function useConsentState({ cookieName, maxAgeDays, defaultState }) {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const existing = readConsent(cookieName);
    if (existing) setConsent(existing);
    else setConsent(defaultState);
  }, [cookieName, defaultState]);

  const save = (next) => {
    setConsent(next);
    writeConsent(cookieName, next, maxAgeDays);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cookie-consent", { detail: next }));
    }
  };

  return { consent, setConsent, save };
}

// ---------- Component ----------
export default function Cookie({
  cookieName = "cookie-consent",
  maxAgeDays = 365,
  defaultState: defaultStateProp,
  texts: textsProp,
  className,
  onConsentChange,
  onAfterAcceptAll,
}) {
  const texts = { ...DEFAULT_TEXTS, ...textsProp };
  const defaultState = useMemo(
    () => ({ ...DEFAULT_STATE, ...(defaultStateProp || {}) }),
    [defaultStateProp]
  );

  const { consent, setConsent, save } = useConsentState({
    cookieName,
    maxAgeDays,
    defaultState,
  });

  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const existing = readConsent(cookieName);
    setOpen(!existing);
  }, [cookieName]);

  useEffect(() => {
    if (consent && onConsentChange) onConsentChange(consent);
  }, [consent, onConsentChange]);

  if (!consent || !open) return null;

  const categories = texts.categories || DEFAULT_TEXTS.categories;

  const handleAcceptAll = () => {
    const next = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    save(next);
    setOpen(false);
    if (onAfterAcceptAll) onAfterAcceptAll(next);
  };

  const handleDeclineAll = () => {
    const next = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    save(next);
    setOpen(false);
  };

  const handleSaveSelection = () => {
    const next = { ...consent, essential: true };
    save(next);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      className={`fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-4xl overflow-x-hidden rounded-t-2xl border border-neutral-200 bg-white p-16 shadow-2xl md:mb-24 md:rounded-2xl md:p-24 ${
        className || ""
      }`}
    >
      <div className="flex flex-col gap-24 md:items-start">
        <div className="flex-1">
          <h2 id="cookie-banner-title" className="text-lg font-semibold tracking-tight">
            {texts.title}
          </h2>
          {texts.intro && <p className="mt-1 text-sm text-neutral-700">{texts.intro}</p>}
          {texts.standardNotice && (
            <p className="mt-2 text-xs text-neutral-600">{texts.standardNotice}</p>
          )}
          {texts.readMoreHref && (
            <a
              href={texts.readMoreHref}
              className="mt-2 inline-block text-sm underline underline-offset-4"
              target={texts.readMoreHref.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {texts.readMoreLabel}
            </a>
          )}
        </div>

        <div className="flex flex-1 w-full items-center md:justify-start gap-8 sm:gap-16 md:flex-row flex-col">
          <button
            type="button"
            onClick={handleDeclineAll}
            className="border border-neutral-300 px-24 py-12 text-sm w-full md:w-auto md:px-16"
          >
            {texts.declineAllLabel}
          </button>
          <button
            type="button"
            onClick={() => setShowSettings((s) => !s)}
            aria-expanded={showSettings}
            className="border border-neutral-300 px-24 py-12 text-sm w-full md:w-auto md:px-16"
          >
            {texts.settingsLabel}
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="text-sm text-white bg-primary px-24 py-12 w-full md:w-auto md:px-16"
          >
            {texts.acceptAllLabel}
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="mt-4 rounded-xl border border-neutral-200 p-2 sm:p-3">
          <h3 className="mb-2 text-sm font-medium">{texts.settingsTitle}</h3>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li
                key={cat.key}
                className="flex items-start justify-between gap-4 rounded-lg bg-neutral-50 p-3"
              >
                <div>
                  <div className="text-sm font-medium">{cat.label}</div>
                  <p className="text-xs text-neutral-700">{cat.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {cat.key === "essential" || cat.required ? (
                    <span className="rounded-full bg-neutral-200 px-2 py-1 text-xs">
                      erforderlich
                    </span>
                  ) : (
                    <label className="inline-flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={!!consent[cat.key]}
                        onChange={(e) =>
                          setConsent((prev) => ({
                            ...prev,
                            [cat.key]: e.target.checked,
                          }))
                        }
                        aria-label={`${cat.label} ${
                          consent[cat.key] ? "aktiv" : "inaktiv"
                        }`}
                      />
                      <span className="text-xs text-neutral-800">aktiv</span>
                    </label>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col sm:flex-row justify-end gap-2">
            <button
              type="button"
              onClick={handleDeclineAll}
              className="rounded-xl border border-neutral-300 px-3 py-2 text-sm min-h-[44px]"
            >
              {texts.declineAllLabel}
            </button>
            <button
              type="button"
              onClick={handleSaveSelection}
              className="rounded-xl bg-black px-3 py-2 text-sm text-white min-h-[44px]"
            >
              {texts.saveLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper for other parts of app
export function hasConsent(category) {
  if (typeof document === "undefined") return false;
  const c = readConsent("cookie-consent");
  return !!c && c[category] === true;
}
