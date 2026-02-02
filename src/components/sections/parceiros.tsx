"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";

import type { LucideIcon } from "lucide-react";
import {
  Handshake,
  Percent,
  CalendarClock,
  BadgeCheck,
  FileText,
  TrendingDown,
  Search,
  PiggyBank,
  MessageCircle,
  ShieldCheck,
  Lock,
  Eye,
  Headset,
  Clock,
  Zap,
  Building2,
  Activity,
  BookOpen,
  Receipt,
  Layers,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Pillar = {
  key: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
};

const pillars: Pillar[] = [
  { key: "negociacao", title: "Negociação direta", desc: "Tratativa com foco em acordo viável.", Icon: Handshake },
  { key: "descontos", title: "Descontos estratégicos", desc: "Busca do melhor custo-benefício.", Icon: Percent },
  { key: "parcelamento", title: "Parcelamento flexível", desc: "Condições que cabem no seu mês.", Icon: CalendarClock },
  { key: "cpf", title: "Regularização do CPF", desc: "Organização para voltar ao jogo.", Icon: BadgeCheck },
  { key: "acordo", title: "Acordo formalizado", desc: "Clareza do que foi combinado.", Icon: FileText },
  { key: "juros", title: "Redução de encargos", desc: "Foco em juros e multas quando possível.", Icon: TrendingDown },
  { key: "analise", title: "Análise do seu caso", desc: "Leitura do cenário antes da decisão.", Icon: Search },
  { key: "planejamento", title: "Planejamento financeiro", desc: "Rota simples pra manter o acordo.", Icon: PiggyBank },
  { key: "whatsapp", title: "Atendimento no WhatsApp", desc: "Rápido, direto e humano.", Icon: MessageCircle },
  { key: "confianca", title: "Confiabilidade", desc: "Processo organizado e rastreável.", Icon: ShieldCheck },
  { key: "privacidade", title: "Privacidade", desc: "Dados tratados com cuidado.", Icon: Lock },
  { key: "transparencia", title: "Transparência total", desc: "Sem pegadinhas: o que é, é.", Icon: Eye },
  { key: "suporte", title: "Suporte", desc: "Ajuda do início ao pós-acordo.", Icon: Headset },
  { key: "prazo", title: "Agilidade", desc: "Andamento sem enrolação.", Icon: Clock },
  { key: "sem-burocracia", title: "Sem burocracia", desc: "Menos fricção, mais resultado.", Icon: Zap },
  { key: "multi-credores", title: "Múltiplos credores", desc: "Estrutura pronta pra vários cenários.", Icon: Building2 },
  { key: "acompanhamento", title: "Acompanhamento", desc: "Status e progresso sempre claros.", Icon: Activity },
  { key: "educacao", title: "Educação financeira", desc: "Base pra não voltar ao problema.", Icon: BookOpen },
  { key: "pagamento", title: "Pagamento organizado", desc: "Fluxo simples (boleto/PIX quando houver).", Icon: Receipt },
  { key: "estrutura", title: "Estrutura de processo", desc: "Etapas bem definidas e consistentes.", Icon: Layers },
];

export default function Parceiros() {
  const rootRef = useRef<HTMLElement | null>(null);

  const reduceMotion = useReducedMotion();

  const iconWrapVariants = reduceMotion
    ? {
        rest: { y: 0, rotate: 0, scale: 1 },
        hover: { y: 0, rotate: 0, scale: 1 },
        tap: { y: 0, rotate: 0, scale: 1 },
      }
    : {
        rest: { y: 0, rotate: 0, scale: 1 },
        hover: { y: -2, rotate: -2, scale: 1.03 },
        tap: { y: 0, rotate: 0, scale: 0.98 },
      };

  const spring = { type: "spring" as const, stiffness: 520, damping: 28 };

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(rootRef.current!);

      const build = (opts: { itemY: number; stagger: number }) => {
        const title = q("[data-anim='title']");
        const subtitle = q("[data-anim='subtitle']");
        const card = q("[data-anim='card']");
        const items = q("[data-anim='item']");
        const trust = q("[data-anim='trust']");

        gsap.set([title, subtitle], { autoAlpha: 0, y: 12 });
        gsap.set(card, { autoAlpha: 0, y: 18, scale: 0.985 });
        gsap.set(items, { autoAlpha: 0, y: opts.itemY, scale: 0.985 });
        gsap.set(trust, { autoAlpha: 0, y: 10 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: rootRef.current!,
            start: "top 75%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });

        tl.to(title, { autoAlpha: 1, y: 0, duration: 0.45 })
          .to(subtitle, { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.30")
          .to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55 }, "-=0.25")
          .to(items, { autoAlpha: 1, y: 0, scale: 1, duration: 0.33, stagger: opts.stagger }, "-=0.35")
          .to(trust, { autoAlpha: 1, y: 0, duration: 0.35 }, "-=0.25");

        ScrollTrigger.refresh();

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      };

      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => build({ itemY: 20, stagger: 0.075 }),
        "(min-width: 768px)": () => build({ itemY: 16, stagger: 0.055 }),
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="parceiros" data-nav="white" className="relative w-full overflow-hidden">
      <div className="parceiros-bg" />
      <div className="parceiros-glow-top" />
      <div className="parceiros-glow-corner" />

      <div className="section">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              data-anim="title"
              className="parceiros-title text-balance text-3xl tracking-tight text-[var(--fg)] md:text-4xl"
            >
              Nossos <span className="underline--text">diferenciais</span>
            </h2>

            <p data-anim="subtitle" className="parceiros-subtitle text-[15px] md:text-base">
              Estrutura, processo e atendimento pensados para você negociar com segurança — sem “cara de afiliado”, bem institucional.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl" data-anim="card">
            <div className="parceiros-card">
              <div className="parceiros-grid">
                {pillars.map((p) => (
                  <motion.div
                    key={p.key}
                    data-anim="item"
                    className="partner partner--icon"
                    role="group"
                    aria-label={p.title}
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.div
                      className="partner-icoWrap"
                      aria-hidden="true"
                      variants={iconWrapVariants}
                      transition={spring}
                    >
                      <p.Icon className="partner-ico" />
                    </motion.div>

                    <div className="partner-text">
                      <div className="partner-title">{p.title}</div>
                      <div className="partner-desc">{p.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div data-anim="trust" className="parceiros-trust">
                <span className="parceiros-dot" />
                Estrutura para você negociar com segurança
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
