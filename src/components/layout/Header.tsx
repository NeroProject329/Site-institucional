"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { label: string; href: `#${string}` };

const NAV: NavItem[] = [
  { label: "Home", href: "#inicio" },
  { label: "Diferenciais", href: "#parceiros" },
  { label: "Como fazemos", href: "#oquefazemos" },
  { label: "Resultados", href: "#totaldepessoas" },
  { label: "Ajuda", href: "#ajuda" },
];

function getHeaderOffsetPx() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-h")
    .trim();
  const n = parseInt(raw.replace("px", ""), 10);
  return Number.isFinite(n) ? n : 64;
}

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  const headerH = getHeaderOffsetPx();
  const y = el.getBoundingClientRect().top + window.scrollY - headerH - 10;

  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  history.pushState(null, "", hash);
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ começa já com o hash atual se existir
  const [activeHash, setActiveHash] = useState<string>(() => {
    if (typeof window === "undefined") return "#inicio";
    return window.location.hash || "#inicio";
  });

  const pendingHash = useRef<string | null>(null);

  const sectionIds = useMemo(() => NAV.map((n) => n.href.replace("#", "")), []);

  // trava scroll do body quando menu mobile abre
  useEffect(() => {
    if (mobileOpen) document.body.setAttribute("data-menu-open", "true");
    else document.body.removeAttribute("data-menu-open");
    return () => document.body.removeAttribute("data-menu-open");
  }, [mobileOpen]);

  // ao entrar na home com hash (ou vindo de outra página), rola suave e com offset
  useEffect(() => {
    if (pathname !== "/") return;

    const hash = pendingHash.current || window.location.hash;
    if (!hash) return;

    // ✅ já marca como ativo
    setActiveHash(hash);

    requestAnimationFrame(() => {
      scrollToHash(hash);
      pendingHash.current = null;
    });
  }, [pathname]);

  // ✅ Scroll-spy: marca o link ativo conforme a seção “passa” do header
  useEffect(() => {
    if (pathname !== "/") return;

    let ticking = false;

    const update = () => {
      ticking = false;

      const headerH = getHeaderOffsetPx();
      // ponto “marcador” no viewport (mais estável)
      const marker = window.scrollY + headerH + window.innerHeight * 0.35;

      let current: `#${string}` = "#inicio";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = `#${id}`;
      }

      setActiveHash(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    // roda no start e garante após layout
    update();
    const t = window.setTimeout(update, 200);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname, sectionIds]);

  function goTo(hash: `#${string}`) {
    // ✅ muda o ativo na hora (não fica preso no Home)
    setActiveHash(hash);
    setMobileOpen(false);

    if (pathname === "/") {
      scrollToHash(hash);
      return;
    }

    // vindo de páginas legais (/termos etc)
    pendingHash.current = hash;
    router.push(`/${hash}`);
  }

  return (
    <header className="site-header" role="banner">
      <div className="site-header__bar">
        <div className="container site-header__inner">
          {/* Logo */}
          <Link
            href={pathname === "/" ? "#inicio" : "/#inicio"}
            className="site-header__logo"
            onClick={(e) => {
              e.preventDefault();
              goTo("#inicio");
            }}
            aria-label="Ir para Home"
          >
            <span className="site-header__mark" aria-hidden="true">
              Phb
            </span>
            <span className="site-header__brandWrap">
              <span className="site-header__brand">Phb Logistics - Logistica e Servicos LTDA</span>
              <span className="site-header__tag">Mega Feirão 2026</span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="site-header__nav" aria-label="Navegação principal">
            {NAV.map((item) => {
              const isActive = activeHash === item.href;
              return (
                <Link
                  key={item.href}
                  href={pathname === "/" ? item.href : `/${item.href}`}
                  className={`site-header__link ${isActive ? "is-active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(item.href);
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="site-header__right">
            <button
              type="button"
              className="site-header__cta"
              onClick={() => goTo("#ajuda")}
            >
              Falar com especialista
            </button>

            {/* Mobile toggle */}
            <button
              type="button"
              className="site-header__menuBtn"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Espaçador pra não cobrir conteúdo */}
      <div className="site-header__spacer" />

      {/* Mobile menu */}
      <div className="site-header__mobile" data-open={mobileOpen ? "true" : "false"}>
        <button
          className="site-header__backdrop"
          aria-label="Fechar menu"
          onClick={() => setMobileOpen(false)}
        />
        <div className="site-header__panel" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="site-header__panelTop">
            <span className="site-header__panelTitle">Menu</span>
            <button
              type="button"
              className="site-header__panelClose"
              aria-label="Fechar"
              onClick={() => setMobileOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="site-header__mobileLinks">
            {NAV.map((item) => {
              const isActive = activeHash === item.href;
              return (
                <button
                  key={item.href}
                  type="button"
                  className={`site-header__mobileLink ${isActive ? "is-active" : ""}`}
                  onClick={() => goTo(item.href)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="site-header__mobileCta"
            onClick={() => goTo("#ajuda")}
          >
            Falar com especialista
          </button>
        </div>
      </div>
    </header>
  );
}
