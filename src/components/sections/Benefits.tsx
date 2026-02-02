// src/components/sections/Benefits.tsx
export default function Benefits() {
  const items = [
    {
      title: "Proteção e Credibilidade",
      desc: "Nossa equipe de especialistas estará sempre disponível para guiá-lo e assegurar que você faça as escolhas mais acertadas.",
      icon: "🛡️",
    },
    {
      title: "Produtividade e Lucro",
      desc: "Métodos otimizados e táticas validadas para impulsionar o desenvolvimento do seu empreendimento.",
      icon: "📈",
    },
    {
      title: "Time Qualificado",
      desc: "Especialistas com vasta experiência e capacitação em múltiplas vertentes da consultoria digital.",
      icon: "👥",
    },
    {
      title: "Suporte Individualizado",
      desc: "Propostas desenvolvidas sob medida para suprir as demandas particulares da sua empresa.",
      icon: "⚡",
    },
  ];

  return (
    <section id="servicos" data-nav="white" className="relative">
      <div className="container section">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold text-black/80 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
            Nossos serviços
          </div>

          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-[var(--fg)] md:text-4xl">
            Por que optar pelos nossos serviços?
          </h2>

          <p className="mt-3 text-pretty text-base text-[var(--muted)] md:text-lg">
            Conheça os benefícios de colaborar conosco
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {items.map((it) => (
            <div
              key={it.title}
              className="glass group relative overflow-hidden p-6 transition-transform duration-200 hover:-translate-y-0.5"
            >
              {/* subtle highlight */}
              <div className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                   style={{
                     background:
                       "radial-gradient(600px circle at 20% 10%, rgba(189,27,93,.22), transparent 55%)",
                   }}
              />

              <div className="relative z-10 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-white/70 text-xl">
                  {it.icon}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-[var(--fg)]">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {it.desc}
                  </p>
                </div>
              </div>

              <div className="mt-5 h-px w-full bg-black/10" />

              <div className="mt-4 flex items-center justify-between text-xs text-black/60">
                <span>Entrega rápida</span>
                <span className="text-[var(--brand)]">Ver mais →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
