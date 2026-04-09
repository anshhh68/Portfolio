import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhoIAm from "@/components/WhoIAm";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      {/* Floating UI */}
      <Cursor />
      <ScrollProgress />

      {/* Navigation */}
      <Header />

      {/* Sections */}
      <Hero />
      <WhoIAm />
      <Services />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
