"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Metric = {
  value: string;
  unit?: string;
  description: ReactNode;
};

export default function TotalDePessoas() {
  const rootRef = useRef<HTMLElement | null>(null);

  // ✅ Edite aqui os números/textos finais (mantive no padrão QuiteJá)
  const metrics: Metric[] = [
    {
      value: "+6,3",
      unit: "milhões",
      description: (
        <>
          Já ajudamos mais de <b>6,3 milhões de pessoas</b> a encontrarem
          condições melhores e seguirem com mais tranquilidade.
        </>
      ),
    },
    {
      value: "24h",
      description: (
        <>
          Você pode <b>verificar opções a qualquer hora</b>, 7 dias por semana.
          Nossa experiência é pensada para ser simples e rápida.
        </>
      ),
    },
    {
      value: "+ de R$ 16,6",
      unit: "bilhões",
      description: (
        <>
          Pessoas atendidas já conquistaram mais de{" "}
          <b style={{ whiteSpace: "nowrap" }}>R$ 16,6 bilhões em economia</b>{" "}
          em condições disponibilizadas.
        </>
      ),
    },
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(rootRef);

      const eyebrow = q(".tdp-eyebrow");
      const title = q(".tdp-title");
      const kpis = q(".tdp-kpi");
      const figure = q(".tdp-figure");

      gsap.set([eyebrow, title, kpis], { autoAlpha: 0, y: -22 });
      gsap.set(figure, { autoAlpha: 0, x: 90 });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 980px)", () => {
        const tl = gsap.timeline({
          defaults: { duration: 0.8, ease: "power3.out" },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            end: "bottom 35%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });

        tl.to(figure, { autoAlpha: 1, x: 0, duration: 0.95 }, 0);

        tl.to(eyebrow, { autoAlpha: 1, y: 0 }, 0.08)
          .to(title, { autoAlpha: 1, y: 0 }, 0.16)
          .to(kpis, { autoAlpha: 1, y: 0, stagger: 0.12 }, 0.26);

        return () => tl.kill();
      });

      mm.add("(max-width: 979px)", () => {
        const tl = gsap.timeline({
          defaults: { duration: 1, ease: "none" },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 88%",
            end: () => "+=" + Math.round(window.innerHeight * 0.7),
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        tl.to(eyebrow, { autoAlpha: 1, y: 0 })
          .to(title, { autoAlpha: 1, y: 0 }, "<0.15")
          .to(kpis, { autoAlpha: 1, y: 0, stagger: 0.18 }, "<0.15")
          .to(figure, { autoAlpha: 1, x: 0 }, "<0.2");

        return () => tl.kill();
      });

      ScrollTrigger.refresh();

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="totaldepessoas"
      data-nav="pink"
      className="section"
      aria-label="Total de pessoas que ajudamos"
    >
      <div className="container">
        <div className="tdp-grid">
          {/* LEFT */}
          <div className="tdp-left">
            <p className="tdp-eyebrow">Resultados reais</p>
            <h2 className="tdp-title">
              Nós ajudamos{" "}
              <span className="tdp-title-em">milhões de pessoas</span> a
              organizarem sua situação com mais segurança e praticidade.
            </h2>

            <div className="tdp-kpis" role="list">
              {metrics.map((m, idx) => (
                <div className="tdp-kpi" key={idx} role="listitem">
                  <div className="tdp-kpi-top">
                    <div className="tdp-kpi-value">
                      <span className="tdp-kpi-number">{m.value}</span>
                      {m.unit ? (
                        <span className="tdp-kpi-unit">{m.unit}</span>
                      ) : null}
                    </div>
                  </div>
                  <p className="tdp-kpi-desc">{m.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="tdp-right" aria-hidden="true">
            <div className="tdp-figure">
              <div className="tdp-backplate" aria-hidden="true" />
              <Image
                src="/img/couple.png"
                alt=""
                fill
                sizes="(max-width: 900px) 90vw, 520px"
                className="tdp-figure-img"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
