"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { useWhatsApp } from "@/components/providers/WhatsAppProvider";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function formatBR(n: number) {
  return new Intl.NumberFormat("pt-BR").format(n);
}

export default function Hero() {
  const { loading, open } = useWhatsApp();

  const msg = useMemo(() => {
    return "Olá! Quero negociar minha dívida e entender as opções disponíveis.";
  }, []);

  const rootRef = useRef<HTMLElement | null>(null);

  // ✅ FIX: impede restaurar scroll + remove hash + força topo no load/reload
  useIsoLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // evita o browser restaurar o scroll anterior
    try {
      window.history.scrollRestoration = "manual";
    } catch {}

    // se tiver hash na URL, ele joga pra âncora ao recarregar
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    // força começar no topo (layout effect = antes de “pintar”)
    window.scrollTo(0, 0);
  }, []);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const isMobile = window.matchMedia("(max-width: 860px)").matches;

    const ctx = gsap.context(() => {
      const badge = root.querySelector<HTMLElement>("[data-hero='badge']");
      const title = root.querySelector<HTMLElement>("[data-hero='title']");
      const desc = root.querySelector<HTMLElement>("[data-hero='desc']");
      const cta = root.querySelector<HTMLElement>("[data-hero='cta']");
      const kpis = Array.from(
        root.querySelectorAll<HTMLElement>("[data-hero='kpi']")
      );
      const image = root.querySelector<HTMLElement>("[data-hero='image']");
      const counters = Array.from(
        root.querySelectorAll<HTMLElement>("[data-count]")
      );

      const fromText = isMobile ? { y: 26, x: 0 } : { x: 220, y: 0 };
      const fromKpi = isMobile ? { y: 18, x: 0 } : { x: 260, y: 0 };

      gsap.set([badge, title, desc, cta].filter(Boolean), {
        autoAlpha: 0,
        ...fromText,
        willChange: "transform,opacity",
      });

      gsap.set(kpis, {
        autoAlpha: 0,
        ...fromKpi,
        willChange: "transform,opacity",
      });

      gsap.set(image, {
        autoAlpha: 0,
        x: isMobile ? 0 : 40,
        y: isMobile ? 18 : 0,
        willChange: "transform,opacity",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1) imagem primeiro
      tl.to(
        image,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 1.35,
          ease: "power2.out",
        },
        0.15
      );

      // 2) depois texto + CTA + KPIs
      tl.to(badge, { autoAlpha: 1, x: 0, y: 0, duration: 1.0 }, 0.75)
        .to(title, { autoAlpha: 1, x: 0, y: 0, duration: 1.15 }, 0.92)
        .to(desc, { autoAlpha: 1, x: 0, y: 0, duration: 1.05 }, 1.08)
        .to(cta, { autoAlpha: 1, x: 0, y: 0, duration: 0.95 }, 1.22)
        .to(
          kpis,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            stagger: 0.12,
            duration: 0.85,
            ease: "power2.out",
          },
          1.28
        );

      // contadores depois dos KPIs entrarem
      tl.call(() => {
        counters.forEach((el) => {
          const target = Number(el.dataset.count || "0");
          const suffix = el.dataset.suffix || "";
          const prefix = el.dataset.prefix || "";
          const obj = { v: 0 };

          gsap.to(obj, {
            v: target,
            duration: 1.05,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${prefix}${formatBR(
                Math.round(obj.v)
              )}${suffix}`;
            },
            onComplete: () => {
              el.textContent = `${prefix}${formatBR(target)}${suffix}`;
            },
          });
        });
      }, undefined, "+=0.05");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(el) => {
        rootRef.current = el;
      }}
      id="inicio"
      data-nav="pink"
      className="relative isolate"
    >
      <div className="hero-container with-header-offset">
        <div className="hero-frame hero-frame--solid w-full overflow-hidden">
          <div className="hero-grid">
            {/* COPY */}
            <div className="hero-copy max-w-xl">
              <div
                data-hero="badge"
                className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-4 py-2 text-xs font-semibold text-[var(--brand)] shadow-[var(--shadow-elevated)]"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
                Contabilidade &amp; Assesoria
              </div>

              <h1
                data-hero="title"
                className="hero-titleGlow mt-5 text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl"
                >
                Descontos de até <span className="hero-gold">98%</span>. Fique hoje mesmo no Azul
              </h1>

              <p
                data-hero="desc"
                className="mt-4 text-pretty text-base text-white/85 md:text-lg"
              >
                Verifique as ofertas disponíveis para você e consulte sua situação.
              </p>
            </div>

              {/* CTA */}
            <div data-hero="cta" className="hero-ctaWrap">
            <button
  type="button"
  onClick={() => open(msg)}
  disabled={loading}
  aria-busy={loading}
  className="hero-ctaBtn group relative inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 text-base md:text-lg font-bold text-[var(--brand)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 overflow-hidden"
>
  <span className="hero-ctaLabel">
    {loading ? "Carregando..." : "Consultar Agora Grátis"}
  </span>

  <span className="hero-ctaIcon inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[color:rgba(189,27,93,.12)] transition-transform duration-200 group-hover:translate-x-0.5">
    →
  </span>
</button>


            </div>

            {/* IMAGEM */}
            <div className="hero-mediaWrap" data-hero="image">
              <div className="hero-image">
                <picture className="hero-picture">
                  <source srcSet="/img/womancelularmobile.png" media="(max-width: 860px)" />
                  <img src="/img/womancelular.png" alt="Pessoa" className="hero-person" loading="eager" decoding="async"/>
                </picture>
              </div>

            </div>

          

            {/* KPIs */}
            <div className="hero-kpis">
              <div data-hero="kpi" className="hero-kpi hero-kpi--pink p-4">
                <div
                  className="text-lg font-semibold text-[var(--brand)]"
                  data-count="18000000"
                  data-suffix="+"
                >
                  0+
                </div>
                <div className="mt-1 text-xs text-[var(--brand)]/80">
                  Negociações concluídas
                </div>
              </div>

              <div data-hero="kpi" className="hero-kpi hero-kpi--pink p-4">
                <div
                  className="text-lg font-semibold text-[var(--brand)]"
                  data-count="17"
                  data-suffix="+"
                >
                  0+
                </div>
                <div className="mt-1 text-xs text-[var(--brand)]/80">
                  Anos de experiência
                </div>
              </div>

              <div data-hero="kpi" className="hero-kpi hero-kpi--pink p-4">
                <div
                  className="text-lg font-semibold text-[var(--brand)]"
                  data-count="99.5"
                  data-suffix="%"
                >
                  0%
                </div>
                <div className="mt-1 text-xs text-[var(--brand)]/80">
                  Satisfação
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp floating */}
      <button
        type="button"
        aria-label="WhatsApp"
        onClick={() => open(msg)}
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_18px_40px_rgba(0,0,0,.35)] transition-transform duration-200 hover:scale-105 active:scale-100"
      >
        <i className="fa-brands fa-whatsapp text-xl" aria-hidden="true" />
      </button>
    </section>
  );
}
