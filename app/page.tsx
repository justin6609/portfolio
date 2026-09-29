import About from "../components/About";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Skills from "../components/Skills";
import { EMAIL_HREF, GITHUB_URL, LOCATION, REPOS_URL } from "../components/site";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white text-zinc-950 dark:bg-slate-950 dark:text-zinc-50">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <Skills />

        <Section id="projects" title="Projects">
          <p className="text-zinc-600 dark:text-zinc-400">
            MoneyTrack, Nevex E-Commerce, and this portfolio — full showcase lands in
            ticket 04.
          </p>
          <a
            href={REPOS_URL}
            className="mt-4 inline-block text-sm font-medium text-sky-600 dark:text-sky-400"
          >
            View All Projects
          </a>
        </Section>

        <Section id="experience" title="Experience">
          <p className="text-zinc-600 dark:text-zinc-400">
            Technical experience and OJT activities timeline lands in ticket 05.
          </p>
        </Section>

        <Section id="education" title="Education">
          <p className="text-zinc-600 dark:text-zinc-400">
            Christ the King College of Calbayog Inc. — BS Computer Science, 3rd Year.
          </p>
        </Section>
        <Services />

        <Section id="contact" title="Let's Build Something Together">
          <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
            I&apos;m currently open to internship, OJT, freelance, and entry-level
            opportunities.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a href={EMAIL_HREF}>neiljustinmarcelo@gmail.com</a>
            <a href={GITHUB_URL}>github.com/neiljustinmarcelo-tech</a>
            <span>{LOCATION}</span>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
