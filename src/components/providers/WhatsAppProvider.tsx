"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type WhatsContextValue = {
  loading: boolean;
  phone: string; // só dígitos
  error: string | null;
  open: (message: string) => void;
};

const WhatsAppContext = createContext<WhatsContextValue | null>(null);

const API_BASE = "https://painel-zap-production.up.railway.app";

function getDomain(): string {
  if (typeof window === "undefined") return "";
  return window.location.hostname.replace(/^www\./, "");
}

function buildWaUrl(phoneDigits: string, message: string) {
  const phone = String(phoneDigits || "").replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const domain = useMemo(() => getDomain(), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        if (!domain) throw new Error("Domínio inválido");

        const url = `${API_BASE}/api/zap?domain=${encodeURIComponent(domain)}`;
        const r = await fetch(url, { cache: "no-store" });

        if (!r.ok) throw new Error(`HTTP ${r.status}`);

        const data = await r.json();
        const numero = String(data?.numero || "").replace(/\D/g, "");
        if (!numero) throw new Error("Número não retornado");

        if (!cancelled) {
          setPhone(numero);
          setError(null);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setPhone("");
          setError("WhatsApp indisponível no momento. Tente novamente mais tarde.");
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [domain]);

  function open(message: string) {
    if (loading) return;

    if (!phone) {
      alert(error || "WhatsApp indisponível no momento. Tente novamente mais tarde.");
      return;
    }

    const url = buildWaUrl(phone, message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const value: WhatsContextValue = { loading, phone, error, open };

  return <WhatsAppContext.Provider value={value}>{children}</WhatsAppContext.Provider>;
}

export function useWhatsApp() {
  const ctx = useContext(WhatsAppContext);
  if (!ctx) {
    throw new Error("useWhatsApp must be used within WhatsAppProvider");
  }
  return ctx;
}
