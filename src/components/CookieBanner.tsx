// src/components/CookieBanner.tsx
"use client";

import { useEffect, useState } from "react";

type Consent = "accepted" | "rejected";

const STORAGE_KEY = "cookieConsent"; // pode ser qualquer nome, mas fixo
const SHOW_DELAY_MS = 3000;

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 1) Se já tiver decisão salva, não mostra o banner
    const saved = (localStorage.getItem(STORAGE_KEY) as Consent | null) ?? null;
    if (saved === "accepted" || saved === "rejected") return;

    // 2) Se não tiver decisão, mostra depois de 3s
    const t = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  function save(consent: Consent) {
    localStorage.setItem(STORAGE_KEY, consent);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" id="cookieBanner" role="dialog" aria-live="polite">
      <div className="cookie-content">
        <div className="cookie-text">
          <p>
            Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
            <a href="/privacidade" className="cookie-link">
              Política de Privacidade
            </a>{" "}
            e{" "}
            <a href="/termos" className="cookie-link">
              Termos de Uso
            </a>
            .
          </p>
        </div>

        <div className="cookie-actions">
          <button type="button" className="cookie-btn cookie-reject" onClick={() => save("rejected")}>
            Rejeitar
          </button>

          <button type="button" className="cookie-btn cookie-accept" onClick={() => save("accepted")}>
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
