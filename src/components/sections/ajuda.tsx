"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@/components/animate-ui/components/headless/accordion";

import { useWhatsApp } from "@/components/providers/WhatsAppProvider";

const FAQ = [
  {
    q: "Como funciona o atendimento?",
    a: "Você informa alguns dados básicos, nós verificamos as opções disponíveis e te orientamos com as condições que fazem mais sentido — de forma simples e segura.",
  },
  {
    q: "Com quais situações vocês conseguem ajudar?",
    a: "Atendemos diversos cenários e parceiros do mercado. Se houver elegibilidade para o seu caso, você já recebe as opções e os próximos passos.",
  },
  {
    q: "Em quanto tempo eu vejo andamento após seguir com uma opção?",
    a: "O prazo varia conforme a instituição e o tipo de etapa escolhida. Em muitos casos, após a confirmação, as atualizações acontecem nos próximos dias úteis.",
  },
  {
    q: "Consigo ter condições facilitadas?",
    a: "Sim. Quando houver alternativa com parcelamento ou condições diferenciadas, você verá tudo com clareza (entrada, número de parcelas e valor final) antes de confirmar.",
  },
  {
    q: "Tem custo para usar?",
    a: "Não. Você pode entender as opções sem custo. Se existir alguma condição específica em uma etapa, isso fica claro antes de você seguir.",
  },
  {
    q: "É seguro compartilhar meus dados?",
    a: "Sim. Usamos boas práticas de segurança e solicitamos apenas o mínimo necessário para identificar opções e direcionar o atendimento.",
  },
  {
    q: "Posso falar com um especialista no WhatsApp?",
    a: "Pode. Se preferir atendimento humano, é só chamar no WhatsApp e seguimos com orientação no mesmo fluxo.",
  },
  {
    q: "Posso desistir depois de iniciar?",
    a: "Depende da etapa e do status do processo. A gente te orienta com clareza conforme o seu caso.",
  },
];

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function Ajuda() {
  const { loading, open } = useWhatsApp();

  const msg = useMemo(() => {
    return "Olá! Quero entender as opções disponíveis e falar com um especialista.";
  }, []);

  const pages = useMemo(() => chunk(FAQ, 4), []);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [index, setIndex] = useState(0);

  const scrollToIndex = (nextIndex: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(pages.length - 1, nextIndex));
    const slide = el.children.item(clamped) as HTMLElement | null;
    if (!slide) return;
    slide.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const w = el.clientWidth;
      if (!w) return;
      const i = Math.round(el.scrollLeft / w);
      setIndex(Math.max(0, Math.min(pages.length - 1, i)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [pages.length]);

  const canPrev = index > 0;
  const canNext = index < pages.length - 1;

  return (
    <section id="ajuda" data-nav="pink" className="ajuda">
      <div className="container ajuda-inner">
        <div className="ajuda-grid">
          {/* Left */}
          <div className="ajuda-copy">
            <div className="ajuda-kicker">
              <span className="ajuda-dot" />
              Precisa de ajuda?
            </div>

            <h2 className="ajuda-title">Dúvidas rápidas, respostas claras.</h2>
            <p className="ajuda-subtitle">
              Veja as perguntas em blocos. Use as setas para navegar.
            </p>
          </div>

          {/* Right (carousel) */}
          <div className="ajuda-carouselWrap">
            <div className="ajuda-carouselTop">
              <div className="ajuda-dots" aria-hidden="true">
                {pages.map((_, i) => (
                  <span
                    key={i}
                    className={`ajuda-dotItem ${i === index ? "is-active" : ""}`}
                  />
                ))}
              </div>

              <div className="ajuda-nav">
                <button
                  type="button"
                  className="ajuda-navBtn"
                  onClick={() => scrollToIndex(index - 1)}
                  disabled={!canPrev}
                  aria-label="Perguntas anteriores"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="ajuda-navBtn"
                  onClick={() => scrollToIndex(index + 1)}
                  disabled={!canNext}
                  aria-label="Próximas perguntas"
                >
                  ›
                </button>
              </div>
            </div>

            <div
              ref={trackRef}
              className="ajuda-carousel"
              aria-label="Perguntas frequentes em carrossel"
            >
              {pages.map((page, pageIdx) => (
                <div key={pageIdx} className="ajuda-slide">
                  <Accordion className="ajuda-acc" aria-label={`Página ${pageIdx + 1} de perguntas`}>
                    {page.map((item, idx) => (
                      <AccordionItem
                        key={`${pageIdx}-${item.q}`}
                        className="ajuda-item"
                        defaultOpen={pageIdx === 0 && idx === 0}
                      >
                        <AccordionButton className="ajuda-button" showArrow>
                          {item.q}
                        </AccordionButton>
                        <AccordionPanel className="ajuda-panel">
                          <p>{item.a}</p>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
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
