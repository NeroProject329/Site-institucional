// src/hooks/useWhatsAppNumber.ts
"use client";

import { useEffect, useMemo, useState } from "react";

type State = {
  loading: boolean;
  phone: string; // só dígitos (ex: 5511999999999)
  error: string | null;
};

function getDomain(): string {
  if (typeof window === "undefined") return "";
  return window.location.hostname.replace(/^www\./, "");
}

export function useWhatsAppNumber(apiBase: string) {
  const [state, setState] = useState<State>({
    loading: true,
    phone: "",
    error: null,
  });

  const domain = useMemo(() => getDomain(), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!domain) {
        setState({ loading: false, phone: "", error: "Domínio inválido" });
        return;
      }

      try {
        const url = `${apiBase}/api/zap?domain=${encodeURIComponent(domain)}`;
        const r = await fetch(url, { cache: "no-store" });

        if (!r.ok) {
          throw new Error(`HTTP ${r.status}`);
        }

        const data = await r.json();
        const numeroWhats = String(data?.numero || "").replace(/\D/g, "");

        if (!numeroWhats) {
          throw new Error("Número não retornado");
        }

        if (!cancelled) {
          setState({ loading: false, phone: numeroWhats, error: null });
        }
      } catch (e) {
        if (!cancelled) {
          setState({
            loading: false,
            phone: "",
            error: "WhatsApp indisponível no momento.",
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [apiBase, domain]);

  return state; // { loading, phone, error }
}
