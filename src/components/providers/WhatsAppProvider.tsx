"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type WhatsContextValue = {
  loading: boolean;
  phone: string; // só dígitos
  error: string | null;
  refresh: () => Promise<void>;
  open: (message: string) => void;
};

const WhatsAppContext = createContext<WhatsContextValue | null>(null);

/**
 * ✅ Configure no .env.local do SITE (landing):
 * NEXT_PUBLIC_ZAP_API_BASE=https://SUA_API_NO_RAILWAY
 *
 * Ex:
 * NEXT_PUBLIC_ZAP_API_BASE=https://troca-numeros-api-production.up.railway.app
 */
const API_BASE = "https://troca-numeros-api-production.up.railway.app";


function getDomain(): string {
  if (typeof window === "undefined") return "";
  return window.location.hostname.replace(/^www\./, "");
}

function onlyDigits(v: string) {
  return String(v || "").replace(/\D/g, "");
}

function buildWaUrl(phoneDigits: string, message: string) {
  const phone = onlyDigits(phoneDigits);
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}

async function fetchPhoneByDomain(domain: string, signal?: AbortSignal) {
  // tenta endpoint novo primeiro, depois compat antigo
  const candidates = [
    `${API_BASE}zap?domain=${encodeURIComponent(domain)}`,
  ];

  let lastError: any = null;

  for (const url of candidates) {
    try {
      const r = await fetch(url, {
        method: "GET",
        cache: "no-store",
        signal,
      });

      if (!r.ok) {
        lastError = new Error(`HTTP ${r.status}`);
        continue;
      }

      const data = await r.json();

      // ✅ novo formato sugerido
      const phone = onlyDigits(data?.phone);

      // ✅ compat com seu formato antigo
      const numero = onlyDigits(data?.numero);

      const resolved = phone || numero;

      if (!resolved) {
        lastError = new Error("Número não retornado");
        continue;
      }

      return resolved;
    } catch (e) {
      lastError = e;
    }
  }

  throw lastError || new Error("Falha ao buscar número");
}

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const domain = useMemo(() => getDomain(), []);

 const refresh = useCallback(async (): Promise<void> => {
  if (!API_BASE) {
    setPhone("");
    setError("API_BASE não configurada. Defina NEXT_PUBLIC_ZAP_API_BASE.");
    setLoading(false);
    return;
  }

  if (!domain) {
    setPhone("");
    setError("Domínio inválido.");
    setLoading(false);
    return;
  }

  setLoading(true);

  const controller = new AbortController();

  try {
    const ph = await fetchPhoneByDomain(domain, controller.signal);
    setPhone(ph);
    setError(null);
  } catch {
    setPhone("");
    setError("WhatsApp indisponível no momento. Tente novamente mais tarde.");
  } finally {
    setLoading(false);
  }
}, [domain]);


  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      try {
        if (!API_BASE) throw new Error("API_BASE missing");
        if (!domain) throw new Error("domain invalid");

        const ph = await fetchPhoneByDomain(domain, controller.signal);

        if (!cancelled) {
          setPhone(ph);
          setError(null);
          setLoading(false);
        }
      } catch {
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
      controller.abort();
    };
  }, [domain]);

  const open = useCallback(
    (message: string) => {
      if (loading) return;

      if (!phone) {
        alert(error || "WhatsApp indisponível no momento. Tente novamente mais tarde.");
        return;
      }

      const url = buildWaUrl(phone, message);
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [loading, phone, error]
  );

  const value: WhatsContextValue = { loading, phone, error, refresh, open };

  return <WhatsAppContext.Provider value={value}>{children}</WhatsAppContext.Provider>;
}

export function useWhatsApp() {
  const ctx = useContext(WhatsAppContext);
  if (!ctx) throw new Error("useWhatsApp must be used within WhatsAppProvider");
  return ctx;
}
