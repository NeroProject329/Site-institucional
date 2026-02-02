"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ElementType, ReactNode } from "react";
import { BadgePercent, ShieldCheck, Wallet, Laptop } from "lucide-react";

type Item = {
  icon: ElementType;
  title: string;
  desc: ReactNode;
};

const ITEMS: Item[] = [
  {
    icon: BadgePercent,
    title: "Condições que fazem sentido",
    desc: (
      <>
        A gente busca as <b>melhores condições disponíveis</b> para o seu momento.
        Assim, você compara alternativas com calma — com opções de{" "}
        <b>desconto</b>, <b>parcelamento</b> e mais flexibilidade.
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "Privacidade em primeiro lugar",
    desc: (
      <>
        Suas informações ficam protegidas do início ao fim. Seguimos{" "}
        <b>boas práticas de segurança</b> para garantir uma experiência
        tranquila e confiável.
      </>
    ),
  },
  {
    icon: Wallet,
    title: "Sem taxas escondidas",
    desc: (
      <>
        Você não paga nada para <b>entender suas opções</b>. Qualquer valor só
        acontece se você decidir seguir com uma alternativa apresentada —{" "}
        <b>sem cobranças surpresa</b>.
      </>
    ),
  },
  {
    icon: Laptop,
    title: "Tudo online, no seu tempo",
    desc: (
      <>
        Tecnologia pra facilitar de verdade: você escolhe{" "}
        <b>quando, onde e como</b> avançar, com um processo simples e orientação
        clara em cada etapa.
      </>
    ),
  },
];

export default function OqueFazemos() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const noteRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const photo = photoRef.current;
    const title = titleRef.current;
    const note = noteRef.current;
    if (!section || !photo || !title || !note) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-qjf='card']", section);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ✅ Desktop: entra ESQUERDA -> DIREITA (imagem primeiro)
      mm.add("(min-width: 1024px)", () => {
        gsap.set([photo, title, note, ...cards], { autoAlpha: 0 });
        gsap.set([title, note, ...cards], { x: -140 });
        gsap.set(photo, { x: -70 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(photo, { autoAlpha: 1, x: 0, duration: 1.05 })
          .to(title, { autoAlpha: 1, x: 0, duration: 0.85 }, "-=0.55")
          .to(note, { autoAlpha: 1, x: 0, duration: 0.75 }, "-=0.65")
          .to(
            cards,
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.75,
              stagger: 0.14,
            },
            "-=0.35"
          );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      // ✅ Mobile/Tablet: TOP -> BOTTOM conforme scroll, e ao subir some (scrub)
      mm.add("(max-width: 1023px)", () => {
        const ordered = [photo, title, note, ...cards];

        gsap.set(ordered, { autoAlpha: 0, y: 24 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 55%",
            scrub: 0.8,
          },
        });

        tl.to(photo, { autoAlpha: 1, y: 0, duration: 1.0 })
          .to([title, note], { autoAlpha: 1, y: 0, duration: 0.8 }, 0.15)
          .to(cards, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 }, 0.25);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="oquefazemos" data-nav="white" className="qjf" ref={sectionRef}>
      <div className="container">
        <div className="qjf-shell">
          {/* esquerda: FOTO */}
          <div className="qjf-photo" ref={photoRef}>
            <Image
              src="/img/womansofa.png"
              alt="Pessoa usando o celular"
              fill
              className="qjf-photoImg"
              sizes="(max-width: 1024px) 100vw, 52vw"
              priority={false}
              onLoadingComplete={() => ScrollTrigger.refresh()}
            />
          </div>

          {/* direita: heading + cards */}
          <div className="qjf-right">
            <div className="qjf-head">
              <h2 className="qjf-title" ref={titleRef}>
                Como nós
                <br />
                fazemos
                <br />
                <span className="qjf-underline">com clareza</span>
              </h2>

              <div
                className="qjf-note"
                aria-label="Nosso toque especial"
                ref={noteRef}
              >
                Atendimento
                <br />
                humano
              </div>
            </div>

            <div className="qjf-cards">
              {ITEMS.map((it) => {
                const Icon = it.icon;
                return (
                  <article className="qjf-card" data-qjf="card" key={it.title}>
                    <div className="qjf-cardIcon">
                      <Icon size={28} />
                    </div>
                    <h3 className="qjf-cardTitle">{it.title}</h3>
                    <p className="qjf-cardDesc">{it.desc}</p>
                    <span className="qjf-cardBlob" aria-hidden="true" />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
