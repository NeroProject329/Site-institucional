// src/app/(legal)/cookies/page.tsx
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Política de Cookies | Consultoria Digital",
  description:
    "Política de Cookies da Consultoria Digital. Entenda como utilizamos cookies para melhorar sua experiência.",
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <>
      <Header />

      <section
        className="container"
        style={{ padding: "60px 20px", maxWidth: 900 }}
      >
        <h1>Política de Cookies</h1>

        <p>
          Esta Política de Cookies explica como a <strong>Consultoria Digital</strong>{" "}
          utiliza cookies e tecnologias semelhantes para reconhecer os usuários,
          melhorar a experiência de navegação e analisar o desempenho do site.
        </p>

        <h2>1. O que são cookies?</h2>
        <p>
          Cookies são pequenos arquivos de texto armazenados no seu dispositivo
          quando você visita um site. Eles permitem reconhecer preferências,
          entender como o site é utilizado e otimizar funcionalidades.
        </p>

        <h2>2. Por que utilizamos cookies?</h2>
        <p>Utilizamos cookies para:</p>
        <ul>
          <li>Garantir o funcionamento correto do site</li>
          <li>Melhorar sua experiência de navegação</li>
          <li>Analisar métricas de uso e desempenho</li>
          <li>Personalizar conteúdos e campanhas de marketing</li>
          <li>Cumprir obrigações legais</li>
        </ul>

        <h2>3. Tipos de cookies utilizados</h2>

        <h3>Cookies Necessários</h3>
        <p>
          Essenciais para o funcionamento do site. Sem eles, algumas funcionalidades
          podem não operar corretamente.
        </p>

        <h3>Cookies de Desempenho e Estatística</h3>
        <p>
          Coletam informações anônimas sobre como os usuários interagem com o site,
          ajudando-nos a melhorar continuamente nossos serviços.
        </p>

        <h3>Cookies de Marketing</h3>
        <p>
          Utilizados para exibir anúncios mais relevantes, limitar a frequência de
          exibição e medir a eficácia de campanhas publicitárias.
        </p>

        <h2>4. Consentimento</h2>
        <p>
          Ao acessar nosso site pela primeira vez, você poderá aceitar ou rejeitar
          o uso de cookies por meio do banner de consentimento. Sua escolha será
          armazenada e respeitada.
        </p>

        <h2>5. Como gerenciar ou desativar cookies</h2>
        <p>
          Você pode, a qualquer momento, configurar seu navegador para bloquear ou
          alertar sobre o uso de cookies. No entanto, a desativação pode afetar
          algumas funcionalidades do site.
        </p>

        <h2>6. Alterações nesta Política</h2>
        <p>
          Esta Política de Cookies pode ser atualizada periodicamente para refletir
          mudanças legais ou operacionais. Recomendamos a consulta regular desta
          página.
        </p>

        <h2>7. Contato</h2>
        <p>
          Caso tenha dúvidas sobre esta Política de Cookies, entre em contato pelo
          e-mail: <strong>contato@empresa.com</strong>
        </p>
      </section>

      <Footer />
    </>
  );
}
