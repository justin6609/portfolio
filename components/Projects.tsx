'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { REPOS_URL } from './site';

type Project = {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  repository: string | null;
  liveDemo: string | null;
};

const PROJECTS: Project[] = [
  {
    slug: 'moneytrack',
    name: 'MoneyTrack',
    description:
      'Finance dashboard for tracking balances, income, expenses, savings, and recent activity.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Recharts'],
    repository: null,
    liveDemo: null,
  },
  {
    slug: 'nevex-ecommerce',
    name: 'Nevex E-Commerce',
    description:
      'Laptop and PC e-commerce platform with product management, user accounts, admin dashboard, analytics, cart, checkout, and COD, GCash, and Maya payments.',
    tech: ['Flask', 'Jinja2', 'Supabase', 'HTML', 'CSS', 'JavaScript'],
    repository: null,
    liveDemo: null,
  },
  {
    slug: 'personal-portfolio',
    name: 'Personal Portfolio',
    description:
      'This portfolio site showcasing projects, skills, education, and journey.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel Analytics'],
    repository: null,
    liveDemo: null,
  },
];

function BrowserMockup({ slug, name }: { slug: string; name: string }) {
  return (
    <div
      role="img"
      aria-label={`CSS mockup preview of ${name}`}
      className="overflow-hidden rounded-xl border border-black/10 bg-zinc-950 transition-transform duration-300 group-hover:-translate-y-1 dark:border-white/15"
    >
      <div aria-hidden="true">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-3 font-mono text-xs text-zinc-400">{slug}.tsx</span>
        </div>
        <div className="space-y-2 p-4">
          <div className="h-2.5 w-2/3 rounded bg-gradient-to-r from-sky-500/70 to-purple-500/70 transition-all duration-300 group-hover:w-3/4" />
          <div className="h-2.5 w-1/2 rounded bg-zinc-700 transition-all duration-300 group-hover:w-3/5" />
          <div className="h-2.5 w-3/5 rounded bg-zinc-800 transition-all duration-300 group-hover:w-2/3" />
          <div className="flex gap-2 pt-1">
            <div className="h-8 flex-1 rounded bg-sky-500/20" />
            <div className="h-8 flex-1 rounded bg-purple-500/20" />
            <div className="h-8 flex-1 rounded bg-cyan-500/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.08 }}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      className="group flex flex-col rounded-xl border border-black/10 px-4 py-5 transition-shadow duration-300 hover:shadow-xl dark:border-white/10"
    >
      <BrowserMockup slug={project.slug} name={project.name} />
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{project.name}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>
      <ul
        aria-label={`${project.name} technologies`}
        className="mt-3 flex flex-wrap gap-2 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
      >
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-full border border-black/10 px-3 py-1 text-sm text-zinc-700 dark:border-white/15 dark:text-zinc-300"
          >
            {t}
          </li>
        ))}
      </ul>
      {(project.repository || project.liveDemo) && (
        <div className="mt-4 flex flex-wrap gap-3">
          {project.repository && (
            <a
              href={project.repository}
              className="text-sm font-medium text-sky-600 dark:text-sky-400"
            >
              Repository
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              className="text-sm font-medium text-sky-600 dark:text-sky-400"
            >
              Live Demo
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

export default function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-16 sm:px-6">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
          Shipped web apps I designed, built, and maintain.
        </p>

        <div data-testid="project-cards" className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <a
          href={REPOS_URL}
          className="mt-6 inline-block text-sm font-medium text-sky-600 dark:text-sky-400"
        >
          View All Projects
        </a>
      </motion.div>
    </section>
  );
}
