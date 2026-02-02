"use client";

import { useEffect } from "react";

type NavBg = "pink" | "white";

const THEME: Record<NavBg, { bg: string; wash: string }> = {
  pink: {
  bg: "#BD1B5D",
  wash:
    "radial-gradient(900px circle at 50% 0%, rgba(255,255,255,.14), transparent 60%)",
},
  white: {
  bg: "#ffffff",
  wash:
    "radial-gradient(900px circle at 50% 0%, rgba(189,27,93,.16), transparent 60%)",
},

};

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export default function ThemeScroll() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav]")
    );

    if (!sections.length) return;

    const setVars = (a: NavBg, b: NavBg, mix: number) => {
      const A = THEME[a];
      const B = THEME[b];

      const root = document.documentElement;
      root.style.setProperty("--bg-a", A.bg);
      root.style.setProperty("--wash-a", A.wash);
      root.style.setProperty("--bg-b", B.bg);
      root.style.setProperty("--wash-b", B.wash);
      root.style.setProperty("--mix", String(mix));
    };

    const pick = () => {
      const mid = window.innerHeight * 0.25; // ponto de leitura (ajustável)

      // acha seção atual (a que “cruza” o mid)
      let currentIndex = -1;
let bestDist = Number.POSITIVE_INFINITY;

for (let i = 0; i < sections.length; i++) {
  const r = sections[i].getBoundingClientRect();
  if (r.top <= mid && r.bottom >= mid) {
    const center = (r.top + r.bottom) / 2;
    const dist = Math.abs(center - mid);
    if (dist < bestDist) {
      bestDist = dist;
      currentIndex = i;
    }
  }
}


      if (currentIndex < 0) {
        // fallback: usa a primeira
        const key = (sections[0].dataset.nav as NavBg) ?? "white";
        setVars(key, key, 0);
        return;
      }

      const cur = sections[currentIndex];
      const next = sections[currentIndex + 1] ?? cur;

      const a = (cur.dataset.nav as NavBg) ?? "white";
      const b = (next.dataset.nav as NavBg) ?? a;

      // Agora vem o segredo:
      // mix baseado em quão perto o “topo” da próxima seção está do mid
      // quando nextTop == mid => mix ~ 0 (ainda na atual)
      // conforme o nextTop sobe passando o mid, mix vai pra 1
      const nextRect = next.getBoundingClientRect();

      // range em px em que acontece a mistura (quanto maior, mais “longo e premium”)
      const range = window.innerHeight * 3.5;

      // queremos que mix comece a subir antes do mid (fade antecipado)
      const start = mid + range * 0.35; // começa antes de encostar
      const end = mid - range * 0.65;   // termina depois de passar

      // mapeia nextRect.top do intervalo [start..end] para [0..1]
      const t = (start - nextRect.top) / (start - end);
      const raw = cur === next ? 0 : clamp01(t);
      const mix = raw * raw * (3 - 2 * raw);
      

      // --- hero overlay suave (evita "chapar" rosa) ---
     // --- hero overlay baseado no MIX (fica perfeito e suave) ---
const heroEl = document.getElementById("inicio") as HTMLElement | null;

if (heroEl) {
  // overlay alto no hero, e vai sumindo conforme o mix vai indo pro próximo bloco
  const isHeroCurrent = cur.id === "inicio" || heroEl === cur;

  // Quando você tá no hero: mix vai de 0->1 conforme entra no próximo bloco.
  // Então o overlay do hero deve ser o inverso: 1->0.
  const heroOverlay = isHeroCurrent ? clamp01(1 - mix) : 0;

  heroEl.style.setProperty("--hero-overlay", String(heroOverlay));
}



      setVars(a, b, mix);
    };

    pick();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        pick();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
