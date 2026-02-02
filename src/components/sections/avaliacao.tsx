"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

export default function Avaliacao() {
  // ✅ Coloque sua imagem em /public/images/avaliacao-mulher.png
  // e troque para: const PHOTO_SRC = "/images/avaliacao-mulher.png";
  const PHOTO_SRC: string | null = null;

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="avaliacao" data-nav="white" className="section">
      <div className="container">
        <div className="ava-shell">
          {/* FOTO (espaço reservado) */}
          <motion.div
            className="ava-photo"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ava-photoSlot" aria-label="Espaço reservado para foto">
              {PHOTO_SRC ? (
                <Image
                  src={PHOTO_SRC}
                  alt="Foto da cliente"
                  fill
                  priority={false}
                  sizes="(max-width: 1024px) 92vw, 520px"
                  className="ava-photoImg"
                />
              ) : (
                <div className="ava-photoFigure" aria-hidden="true">
                  <picture className="ava-photoPicture">
                    <source media="(max-width: 768px)" srcSet="/img/loirinhamobile.png" />
                    <img className="ava-photoManual" src="/img/loirinha.png" alt="" />
                  </picture>
                </div>
              )}
            </div>
          </motion.div>

          {/* CARD (wrapper cria o 3D atrás) */}
          <motion.div
            className="ava-cardWrap"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ava-card">
              <div className="ava-pill">
                <span className="ava-pill-dot" />
                Avaliação
              </div>

              <h2 className="ava-title">
                Padrão <span className="ava-underline">alto</span> de{" "}
                <span className="ava-strong">atendimento</span>
              </h2>

              <p className="ava-text">
                Aqui você tem orientação clara e suporte ágil. A experiência é simples,
                segura e com acompanhamento em cada etapa — do primeiro contato até a melhor opção
                para o seu momento.
              </p>

              <div className="ava-rating">
                <div className="ava-stars" aria-label="Avaliação 5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="ava-star" />
                  ))}
                </div>

                <div className="ava-score">
                  <b>4,9</b> / 5 • avaliações verificadas
                </div>
              </div>

              <div className="ava-badges" aria-label="Diferenciais do atendimento">
                <span className="ava-badge">Resposta rápida</span>
                <span className="ava-badge">Atendimento humano</span>
                <span className="ava-badge">Processo seguro</span>
              </div>

              {/* detalhe cartoon/3D sólido */}
              <span className="ava-deco ava-deco-a" aria-hidden="true" />
              <span className="ava-deco ava-deco-b" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
