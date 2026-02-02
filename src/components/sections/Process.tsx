"use client";

import { useWhatsApp } from "@/components/providers/WhatsAppProvider";

export default function Process() {
  const { loading, open } = useWhatsApp();
  const msg = "Olá! Gostaria de verificar minhas ofertas!";

  const steps = [
    {
      n: "01",
      title: "Avaliação e Mapeamento",
      desc: "Executamos uma avaliação profunda da sua empresa, detectando aspectos de aprimoramento e possibilidades de expansão.",
      icon: "🔎",
    },
    {
      n: "02",
      title: "Tática e Organização",
      desc: "Elaboramos um roteiro estratégico customizado com objetivos definidos e agenda de aplicação.",
      icon: "💡",
    },
    {
      n: "03",
      title: "Aplicação e Ação",
      desc: "Executamos todas as táticas programadas com monitoramento permanente e correções quando preciso.",
      icon: "🚀",
    },
    {
      n: "04",
      title: "Êxito e Refinamento",
      desc: "Acompanhamos os êxitos, examinamos o rendimento e aplicamos aperfeiçoamentos constantes para potencializar o triunfo.",
      icon: "🎯",
    },
  ];

  return (
    <section id="sobre" data-nav="white" className="relative">
      <div className="container section">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold text-black/80 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
            Metodologia
          </div>

          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-[var(--fg)] md:text-4xl">
            Nossa metodologia de consultoria
          </h2>

          <p className="mt-3 text-pretty text-base text-[var(--muted)] md:text-lg">
            Uma abordagem organizada e validada para revolucionar sua empresa
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {steps.map((s) => (
            <div
              key={s.n}
              className="glass group relative overflow-hidden p-6 transition-transform duration-200 hover:-translate-y-0.5"
            >
              {/* highlight */}
              <div
                className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(700px circle at 20% 10%, rgba(189,27,93,.18), transparent 55%)",
                }}
              />

              <div className="relative z-10 flex items-start gap-4">
                {/* number */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand)] text-sm font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,.18)]">
                  {s.n}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <h3 className="text-lg font-semibold text-[var(--fg)]">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {s.desc}
                  </p>
                </div>
              </div>

              <div className="mt-5 h-px w-full bg-black/10" />

              <div className="mt-4 flex items-center justify-between text-xs text-black/60">
                <span>Etapa {s.n}</span>
                <span className="text-[var(--brand)]">Detalhes →</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 overflow-hidden rounded-[28px] border border-black/10 bg-white/70 p-6 backdrop-blur md:p-10">
          <div
            className="pointer-events-none absolute opacity-0"
            aria-hidden="true"
          />

          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-balance text-2xl font-semibold tracking-tight text-[var(--fg)]">
                Preparado para revolucionar sua empresa?
              </h3>
              <p className="mt-2 max-w-2xl text-pretty text-sm text-[var(--muted)] md:text-base">
                Nossa metodologia comprovada já auxiliou milhares de organizações
                a conquistarem resultados extraordinários. Não desperdice mais
                tempo e inicie sua trajetória hoje mesmo.
              </p>
            </div>

            <button
              type="button"
              onClick={() => open(msg)}
              disabled={loading}
              aria-busy={loading}
              className="group inline-flex w-full items-center justify-center rounded-2xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,.18)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 md:w-auto"
            >
              {loading ? "Carregando..." : "Solicitar Consultoria"}
              <span className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
