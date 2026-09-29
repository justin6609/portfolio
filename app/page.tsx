import About from "../components/About";
import Contact from "../components/Contact";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Skills from "../components/Skills";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white text-zinc-950 dark:bg-slate-950 dark:text-zinc-50">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Services />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
