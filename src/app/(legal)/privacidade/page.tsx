// src/app/(legal)/privacidade/page.tsx
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade | Consultoria Digital",
  description:
    "Política de Privacidade da Consultoria Digital. Saiba como seus dados são coletados e utilizados.",
  robots: { index: true, follow: true },
};

export default function PrivacidadePage() {
  return (
    <>
      <Header />

      <section
        className="container"
        style={{ padding: "60px 20px", maxWidth: 900 }}
      >
        <h1>Política de Privacidade</h1>

        <p>
          A sua privacidade é importante para nós. Esta Política de Privacidade
          explica como coletamos, usamos e protegemos suas informações.
        </p>

        <h2>1. Coleta de Informações</h2>
        <p>
          Podemos coletar informações pessoais fornecidas voluntariamente pelo
          usuário, como nome, e-mail, telefone e demais dados enviados por meio de
          formulários ou canais de contato.
        </p>

        <h2>2. Uso das Informações</h2>
        <p>As informações coletadas são utilizadas para:</p>
        <ul>
          <li>Entrar em contato com o usuário</li>
          <li>Fornecer nossos serviços de consultoria</li>
          <li>Melhorar a experiência no site</li>
          <li>Cumprir obrigações legais</li>
        </ul>

        <h2>3. Compartilhamento de Dados</h2>
        <p>
          Não vendemos ou compartilhamos suas informações pessoais com terceiros,
          exceto quando exigido por lei ou para a execução dos serviços
          contratados.
        </p>

        <h2>4. Segurança</h2>
        <p>
          Adotamos medidas técnicas e organizacionais para proteger seus dados
          contra acesso não autorizado, perda ou uso indevido.
        </p>

        <h2>5. Cookies</h2>
        <p>
          Utilizamos cookies para melhorar a navegação e a experiência do usuário.
          Você pode desativá-los nas configurações do seu navegador.
        </p>

        <h2>6. Alterações nesta Política</h2>
        <p>
          Esta Política de Privacidade pode ser atualizada periodicamente.
          Recomendamos a consulta regular desta página.
        </p>

        <h2>7. Contato</h2>
        <p>
          Para qualquer dúvida relacionada à privacidade dos dados, entre em
          contato pelo e-mail: <strong>contato@empresa.com</strong>
        </p>
      </section>

      <Footer />
    </>
  );
}
