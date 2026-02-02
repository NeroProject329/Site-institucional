// src/app/(legal)/termos/page.tsx
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Termos de Uso | Consultoria Digital",
  description:
    "Termos de Uso da Consultoria Digital. Leia atentamente as condições para utilização de nossos serviços.",
  robots: { index: true, follow: true },
};

export default function TermosPage() {
  return (
    <>
      <Header />

      <section
        className="container"
        style={{ padding: "60px 20px", maxWidth: 900 }}
      >
        <h1>Termos de Uso</h1>

        <p>
          Ao acessar e utilizar este site, você concorda com os presentes Termos de
          Uso. Caso não concorde com qualquer condição aqui descrita, recomendamos
          que não utilize nossos serviços.
        </p>

        <h2>1. Sobre os Serviços</h2>
        <p>
          A Consultoria Digital oferece serviços de consultoria estratégica,
          assessoria empresarial e orientação especializada. As informações
          disponibilizadas têm caráter informativo e não substituem análises
          personalizadas.
        </p>

        <h2>2. Uso do Site</h2>
        <p>
          O usuário compromete-se a utilizar este site de forma ética, legal e
          responsável, não praticando qualquer ato que possa comprometer a
          segurança, funcionamento ou integridade da plataforma.
        </p>

        <h2>3. Propriedade Intelectual</h2>
        <p>
          Todo o conteúdo presente neste site, incluindo textos, imagens, marcas,
          logotipos e layouts, é de propriedade da Consultoria Digital, sendo
          proibida sua reprodução sem autorização prévia.
        </p>

        <h2>4. Limitação de Responsabilidade</h2>
        <p>
          Não nos responsabilizamos por eventuais danos diretos ou indiretos
          decorrentes do uso das informações disponibilizadas neste site.
        </p>

        <h2>5. Modificações</h2>
        <p>
          Reservamo-nos o direito de alterar estes Termos de Uso a qualquer
          momento, sem aviso prévio. Recomendamos a revisão periódica desta página.
        </p>

        <h2>6. Contato</h2>
        <p>
          Em caso de dúvidas, entre em contato pelo e-mail:{" "}
          <strong>contato@empresa.com</strong>
        </p>
      </section>

      <Footer />
    </>
  );
}
