"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  img: string;
  rating?: number;
};

type Proof = {
  label: string;
  value: string;
};

export default function Testimonials() {
  const proofs: Proof[] = useMemo(
    () => [
      { value: "5.0", label: "avaliação média" },
      { value: "Clientes verificados", label: "pessoas reais" },
      { value: "Processo claro", label: "orientação em cada etapa" },
      { value: "Resposta rápida", label: "suporte ágil" },
    ],
    []
  );

  const items: Testimonial[] = useMemo(
    () => [
      // 1–6
      {
        name: "Roberto Oliveira",
        role: "Cliente verificado",
        quote:
          "Organização excelente e retorno muito rápido. Atendimento acima da média.",
        img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Juliana Ferreira",
        role: "Cliente verificado",
        quote:
          "Me senti segura do começo ao fim. Explicam tudo com clareza e objetividade.",
        img: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Pedro Almeida",
        role: "Cliente verificado",
        quote:
          "Me ajudaram a avançar sem complicar. Comunicação impecável e bem objetiva.",
        img: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Camila Santos",
        role: "Cliente verificado",
        quote:
          "Atendimento humano mesmo. Respondem rápido e acompanham de verdade.",
        img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Marcos Lima",
        role: "Cliente verificado",
        quote:
          "Tudo muito transparente. Sem promessas exageradas — só orientação e processo bem feito.",
        img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Fernanda Rocha",
        role: "Cliente verificado",
        quote:
          "Suporte rápido e educado. Me deram um caminho claro e ajudaram do início ao fim.",
        img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },

      // 7–12
      {
        name: "Rafael Pereira",
        role: "Cliente verificado",
        quote:
          "Trabalho muito organizado. Passei confiança já no primeiro contato.",
        img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Aline Costa",
        role: "Cliente verificado",
        quote:
          "Experiência excelente. Objetivos, diretos e com acompanhamento constante.",
        img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Thiago Martins",
        role: "Cliente verificado",
        quote:
          "Me orientaram com agilidade e explicaram tudo sem complicação.",
        img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Isabela Nunes",
        role: "Cliente verificado",
        quote:
          "Muito profissional: rápido, organizado e com ótima comunicação.",
        img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Bruno Carvalho",
        role: "Cliente verificado",
        quote:
          "Gostei porque é tudo muito claro: o que acontece e quais são os próximos passos.",
        img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Patrícia Alves",
        role: "Cliente verificado",
        quote:
          "Atendimento excelente e muito rápido. Deu pra seguir com tranquilidade.",
        img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },

      // 13–18
      {
        name: "Gustavo Vieira",
        role: "Cliente verificado",
        quote:
          "A organização do processo é o diferencial. Sem confusão e sem enrolação.",
        img: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Larissa Andrade",
        role: "Cliente verificado",
        quote:
          "Me trataram com respeito e paciência. Tiraram minhas dúvidas com clareza.",
        img: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Daniel Souza",
        role: "Cliente verificado",
        quote:
          "Fluxo bem definido. Você entende o que está acontecendo em cada etapa.",
        img: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Beatriz Moraes",
        role: "Cliente verificado",
        quote:
          "Resposta rápida e atendimento humano. Me senti acompanhada o tempo todo.",
        img: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Henrique Castro",
        role: "Cliente verificado",
        quote:
          "Sem burocracia desnecessária. Tudo fluiu com velocidade e transparência.",
        img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Natália Ribeiro",
        role: "Cliente verificado",
        quote:
          "Muito profissional. Comunicação ótima e acompanhamento do início ao fim.",
        img: "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },

      // 19–22
      {
        name: "André Teixeira",
        role: "Cliente verificado",
        quote:
          "Trataram meu caso com seriedade e clareza. Ficou simples pra mim seguir o passo a passo.",
        img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Mariana Lopes",
        role: "Cliente verificado",
        quote:
          "Padrão excelente: bem direto, bem organizado e sem promessas mirabolantes.",
        img: "https://images.pexels.com/photos/3781533/pexels-photo-3781533.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Felipe Cardoso",
        role: "Cliente verificado",
        quote:
          "Equipe rápida e eficiente. Recomendo pela transparência e pelo atendimento.",
        img: "https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
      {
        name: "Sofia Araújo",
        role: "Cliente verificado",
        quote:
          "Me passou segurança. O suporte realmente acompanha e orienta com clareza.",
        img: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
      },
    ],
    []
  );

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;

    const first = el.querySelector<HTMLElement>("[data-card='1']");
    const cardW = first?.offsetWidth ?? 360;
    const gap = 16;
    el.scrollBy({ left: dir * (cardW + gap), behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const id = window.setInterval(() => {
      if (!trackRef.current) return;
      if (isHovering) return;

      const max = el.scrollWidth - el.clientWidth;
      const atEnd = el.scrollLeft >= max - 2;

      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else scrollByCards(1);
    }, 4200);

    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovering]);

  return (
    <section id="comentarios" data-nav="white" className="relative">
      <div className="container section">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="comentarios-pill">
            <span className="comentarios-pill-dot" />
            Depoimentos
          </div>

          <h2 className="comentarios-title">
            O que dizem sobre o{" "}
            <span className="comentarios-title-3d">atendimento</span>
          </h2>

          <p className="comentarios-subtitle">
            Experiências reais de quem buscou orientação e seguiu com mais tranquilidade.
          </p>

          {/* Provas sociais (chips) */}
          <div className="comentarios-proofs">
            {proofs.map((p, i) => (
              <div key={i} className="comentarios-proof">
                <span className="comentarios-proof-value">{p.value}</span>
                <span className="comentarios-proof-label">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel wrapper (para setas laterais + fade) */}
        <div className="comentarios-carousel">
          <button
            type="button"
            className="comentarios-nav comentarios-nav-left"
            aria-label="Voltar"
            onClick={() => scrollByCards(-1)}
          >
            ‹
          </button>

          <div
            ref={trackRef}
            className="comentarios-track no-scrollbar"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {items.map((t, idx) => {
              const rating = t.rating ?? 5;
              return (
                <article
                  key={`${t.name}-${idx}`}
                  data-card="1"
                  className="comentarios-card"
                >
                  {/* topo: estrelas + nota */}
                  <div className="comentarios-stars">
                    <div
                      className="comentarios-stars-row"
                      aria-label={`${rating} de 5`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} aria-hidden="true">
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="comentarios-score">5.0</div>
                  </div>

                  {/* info */}
                  <div className="comentarios-head">
                    <div className="comentarios-avatar">
                      <img src={t.img} alt={t.name} loading="lazy" />
                    </div>

                    <div className="comentarios-person">
                      <div className="comentarios-name">{t.name}</div>
                      <div className="comentarios-role">{t.role}</div>
                    </div>

                    <div className="comentarios-verified">Verificado</div>
                  </div>

                  <div className="comentarios-divider" />

                  <p className="comentarios-quote">“{t.quote}”</p>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="comentarios-nav comentarios-nav-right"
            aria-label="Avançar"
            onClick={() => scrollByCards(1)}
          >
            ›
          </button>

          {/* fades laterais */}
          <span className="comentarios-fade comentarios-fade-left" aria-hidden="true" />
          <span className="comentarios-fade comentarios-fade-right" aria-hidden="true" />
        </div>

        <div className="comentarios-foot">
          Resultados variam conforme o caso • Orientação clara e suporte rápido
        </div>
      </div>
    </section>
  );
}
