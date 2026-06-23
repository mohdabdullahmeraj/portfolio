import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="page-wrapper">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Footer />
    </main>
  );
}
