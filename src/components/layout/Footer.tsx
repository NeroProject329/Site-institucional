"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, Youtube, Rss } from "lucide-react";
import { useWhatsApp } from "@/components/providers/WhatsAppProvider";

function toHomeAnchor(pathname: string, hash: string) {
  if (pathname === "/") return hash;
  return `/${hash}`;
}

type QuickLink = { label: string; href: `#${string}` };

// ✅ bate 1:1 com o Header.tsx (NAV)
const QUICK_LINKS: QuickLink[] = [
  { label: "Home", href: "#inicio" },
  { label: "Diferenciais", href: "#parceiros" },
  { label: "Como fazemos", href: "#oquefazemos" },
  { label: "Resultados", href: "#totaldepessoas" },
  { label: "Ajuda", href: "#ajuda" },
];

export default function Footer() {
  const pathname = usePathname();
  const { loading, open } = useWhatsApp();
  const msg = "Olá! Quero falar com um especialista e entender as opções disponíveis.";

  // ✅ Opcional: coloque seu logo em /public/images/logo-footer.svg (ou .png)
  // e troque para: const LOGO_SRC = "/images/logo-footer.svg";
  const LOGO_SRC: string | null = null;

  // ✅ Opcional: badge (ex: reclame aqui) em /public/images/badge.png
  const BADGE_SRC: string | null = null;

  const year = new Date().getFullYear();

  return (
    <footer id="contato" data-nav="white" className="qj-footer">
      <div className="container qj-footer-wrap">
        <div className="qj-footer-grid">
          {/* LEFT */}
          <div className="qj-footer-left">
            <div className="qj-footer-brand">
              {LOGO_SRC ? (
                <Image
                  src={LOGO_SRC}
                  alt="Logo Consultoria & Assessoria"
                  width={44}
                  height={44}
                  className="qj-footer-logoImg"
                />
              ) : (
                <div className="qj-footer-logoMark" aria-hidden="true">
                  <span>Phb</span>
                </div>
              )}

              <div className="qj-footer-brandText">
                <div className="qj-footer-brandName">Phb Logistics - Logistica e Servicos LTDA</div>
                <div className="qj-footer-brandDesc">
                  Orientação clara, atendimento humano e um processo 100% online — no seu tempo e com
                  segurança.
                </div>
              </div>
            </div>

            <div className="qj-footer-meta">
              <div className="qj-footer-metaRow">
                <span className="qj-footer-ico" aria-hidden="true">
                  🪪
                </span>
                <span>CNPJ: 48.305.605/0001-17</span>
              </div>
              <div className="qj-footer-metaRow">
                <span className="qj-footer-ico" aria-hidden="true">
                  📍
                </span>
                <span>
                  Rua Isaltina Paula Cidade, Sala 04, São Judas Tadeu,  Parnaíba- PI, 64206-260
                </span>
              </div>
            </div>

            <div className="qj-footer-social" aria-label="Redes sociais">
              <a className="qj-footer-socialBtn" href="#" aria-label="RSS">
                <Rss size={18} />
              </a>
              <a className="qj-footer-socialBtn" href="#" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a className="qj-footer-socialBtn" href="#" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a className="qj-footer-socialBtn" href="#" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a className="qj-footer-socialBtn" href="#" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="qj-footer-right">
            {/* ✅ em vez de parceiros: navegação com âncoras do Header */}
            <div className="qj-footer-col qj-footer-col--partners">
              <h4 className="qj-footer-title">Navegação</h4>
              <ul className="qj-footer-list qj-footer-list--partners">
                {QUICK_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link className="qj-footer-link" href={toHomeAnchor(pathname, item.href)}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

    

            {/* Column 3 */}
            <div className="qj-footer-col">
              <h4 className="qj-footer-title">Transparência</h4>
              <ul className="qj-footer-list">
                <li>
                  <Link className="qj-footer-link" href="/privacidade">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link className="qj-footer-link" href="/termos">
                    Termos de uso
                  </Link>
                </li>
                <li>
                  <Link className="qj-footer-link" href="/cookies">
                    Cookies
                  </Link>
                </li>
              </ul>

             

              {BADGE_SRC ? (
                <div className="qj-footer-badge">
                  <Image
                    src={BADGE_SRC}
                    alt="Selo"
                    width={160}
                    height={56}
                    className="qj-footer-badgeImg"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar (rosa) */}
      <div className="qj-footer-bottom">
        <div className="container qj-footer-bottomInner">
          <p className="qj-footer-copy">
            © {year} Phb Logistics - Logistica e Servicos LTDA.
          </p>

          <div className="qj-footer-legal">
            <Link className="qj-footer-legalLink" href="/privacidade">
              Privacidade
            </Link>
            <span className="qj-footer-legalSep" aria-hidden="true">
              •
            </span>
            <Link className="qj-footer-legalLink" href="/termos">
              Termos
            </Link>
            <span className="qj-footer-legalSep" aria-hidden="true">
              •
            </span>
            <Link className="qj-footer-legalLink" href="/cookies">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
