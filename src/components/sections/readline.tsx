"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  n: 1 | 2 | 3;
  title: ReactNode;
  desc: string;
  deco?: "circle" | "spark" | null;
};

const steps: Step[] = [
  {
    n: 1,
    title: (
      <>
        <span className="sub--clean-your-name">Faça uma</span> análise rápida
      </>
    ),
    desc: "Para começar, informe seus dados básicos para identificarmos as condições disponíveis para o seu caso.",
    deco: null,
  },
  {
    n: 2,
    title: <>Confirme suas informações</>,
    desc: "Confira se está tudo certo e informe um número para contato. Assim, enviamos as orientações e o próximo passo com segurança.",
    deco: "circle",
  },
  {
    n: 3,
    title: <>Escolha o melhor caminho</>,
    desc: "Veja as alternativas disponíveis, compare com calma e siga com a opção que fizer mais sentido para o seu momento.",
    deco: "spark",
  },
];

export default function Readline() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const title = root.querySelector<HTMLElement>(
        '[data-gsap="readline-title"]'
      );
      const cards = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll('[data-gsap="readline-card"]')
      );

      if (prefersReduced) {
        gsap.set([title, cards], { clearProps: "all", autoAlpha: 1, x: 0, y: 0 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        if (!title) return;

        gsap.set(title, { autoAlpha: 0, x: 90 });
        gsap.set(cards, { autoAlpha: 0, x: 90 });

        const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

        tl.to(title, {
          autoAlpha: 1,
          x: 0,
          duration: 0.85,
        }).to(
          cards,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.75,
            stagger: 0.12,
          },
          "-=0.35"
        );

        const st = ScrollTrigger.create({
          trigger: root,
          start: "top 75%",
          end: "bottom 35%",
          onEnter: () => tl.play(),
          onEnterBack: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
        });

        return () => {
          st.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 899px)", () => {
        if (!title) return;

        gsap.set(title, { autoAlpha: 0, y: 18 });

        const titleTween = gsap.to(title, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          paused: true,
        });

        const titleST = ScrollTrigger.create({
          trigger: title,
          start: "top 85%",
          onEnter: () => titleTween.play(),
          onEnterBack: () => titleTween.play(),
          onLeaveBack: () => titleTween.reverse(),
        });

        const cardTriggers: ScrollTrigger[] = [];
        const cardTweens: gsap.core.Tween[] = [];

        cards.forEach((card) => {
          gsap.set(card, { autoAlpha: 0, y: 26 });

          const tw = gsap.to(card, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            paused: true,
          });

          const st = ScrollTrigger.create({
            trigger: card,
            start: "top 88%",
            onEnter: () => tw.play(),
            onEnterBack: () => tw.play(),
            onLeaveBack: () => tw.reverse(),
          });

          cardTweens.push(tw);
          cardTriggers.push(st);
        });

        return () => {
          titleST.kill();
          titleTween.kill();
          cardTriggers.forEach((t) => t.kill());
          cardTweens.forEach((t) => t.kill());
        };
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-nav="white" className="clean-your-name">
      <div id="clean-your-name-content" className="container section">
        <h2 data-gsap="readline-title" className="clean-your-name-title">
          <span>
            Entender suas opções e seguir com segurança é mais{" "}
            <span className="circle--text">simples</span> do que você imagina
          </span>
        </h2>

        <div id="clean-your-name-text" className="mt-8 clean-steps-grid">
          {steps.map((s) => (
            <div key={s.n} data-gsap="readline-card" className="clean-step">
              <div className="clean-step-number" aria-hidden="true">
                <span>{s.n}</span>
              </div>

              <div className="clean-step-body">
                {s.deco === "circle" && (
                  <span className="deco deco-circle" aria-hidden="true" />
                )}
                {s.deco === "spark" && (
                  <span
                    className="deco deco-spark top-[-14px]"
                    aria-hidden="true"
                  />
                )}
                <h3 className="clean-step-title">{s.title}</h3>
                <p className="clean-step-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
