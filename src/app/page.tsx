// src/app/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import Readline  from "@/components/sections/readline";
import Parceiros  from "@/components/sections/parceiros";
import OqueFazemos  from "@/components/sections/oquefazemos";
import TotalDePessoas  from "@/components/sections/totaldepessoas";
import Avaliacao  from "@/components/sections/avaliacao";
import Ajuda  from "@/components/sections/ajuda";

import CookieBanner from "@/components/CookieBanner";
import ThemeScroll from "@/components/theme/ThemeScroll";

export default function Home() {
  return (
    <>
      {/* Fundo global que faz o fade */}
   <div className="site-bg">
   <div className="noise" />
   </div>
   <ThemeScroll />

   <div className="relative z-10">
    <Header />
    <main>
     <Hero />
     <Readline/>
     <Parceiros/>
     <OqueFazemos/>
     <TotalDePessoas/>
     <Testimonials />
     <Avaliacao />
     <Ajuda />
    </main>
     <Footer />
     <CookieBanner />
   </div>


    </>
  );
}
