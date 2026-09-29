import Navbar from "../components/Navbar";

const GITHUB_URL = "https://github.com/neiljustinmarcelo-tech";
const EMAIL_HREF = "mailto:neiljustinmarcelo@gmail.com";
const pillOutline =
  "inline-flex h-11 items-center rounded-full border border-black/10 px-5 text-sm font-medium dark:border-white/15";

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
        <section id="home" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 pb-16 pt-20 sm:px-6">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Hi, I&apos;m Neil Justin Marcelo
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Building Modern Web Experiences
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Computer Science student and aspiring Full-Stack Web Developer passionate
            about building practical, scalable, and user-focused applications.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex h-11 items-center rounded-full bg-zinc-950 px-5 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
            >
              View My Projects
            </a>
            <a
              href={`${EMAIL_HREF}?subject=Resume%20Request`}
              className={pillOutline}
              title="Resume available on request — email me"
            >
              Download Resume
            </a>
            <a href="#contact" className={pillOutline}>
              Contact Me
            </a>
          </div>
          <div className="mt-6 flex gap-4 text-sm">
            <a href={GITHUB_URL}>GitHub</a>
            <a href={EMAIL_HREF}>Email</a>
          </div>
        </section>

        <Section id="about" title="About Me">
          <p className="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
            Computer Science student focused on full-stack, frontend, backend, database
            development, UI/UX, problem solving, and continuous learning.
          </p>
        </Section>

        <Section id="skills" title="Skills">
          <p className="text-zinc-600 dark:text-zinc-400">
            Frontend, Backend, Database, and Tools — full grids land in ticket 03.
          </p>
        </Section>

        <Section id="projects" title="Projects">
          <p className="text-zinc-600 dark:text-zinc-400">
            MoneyTrack, Nevex E-Commerce, and this portfolio — full showcase lands in
            ticket 04.
          </p>
          <a
            href="https://github.com/neiljustinmarcelo-tech?tab=repositories"
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

        <Section id="contact" title="Let's Build Something Together">
          <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
            I&apos;m currently open to internship, OJT, freelance, and entry-level
            opportunities.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a href={EMAIL_HREF}>neiljustinmarcelo@gmail.com</a>
            <a href={GITHUB_URL}>github.com/neiljustinmarcelo-tech</a>
            <span>Calbayog City, Samar, Philippines</span>
          </div>
        </Section>
      </main>

      <footer className="border-t border-black/10 py-8 dark:border-white/10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:text-zinc-400">
          <span>Neil Justin Marcelo — Calbayog City, Samar, Philippines</span>
          <span className="flex gap-4">
            <a href={GITHUB_URL}>GitHub</a>
            <a href={EMAIL_HREF}>Email</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
