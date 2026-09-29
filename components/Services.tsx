'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Database, Globe, Layers, Monitor, Server } from 'lucide-react';

const SERVICES = [
  {
    Icon: Layers,
    title: 'Full-Stack Web Development',
    description: 'Contribute across UI, APIs, and databases on one web app.',
  },
  {
    Icon: Monitor,
    title: 'Frontend Development',
    description: 'Build responsive interfaces with React, Next.js, and Tailwind CSS.',
  },
  {
    Icon: Server,
    title: 'Backend Development',
    description: 'Build REST APIs with Node.js and Flask for practical use cases.',
  },
  {
    Icon: Database,
    title: 'Database Integration',
    description: 'Model data and wire Supabase and PostgreSQL queries to the app.',
  },
  {
    Icon: Globe,
    title: 'Responsive UI Development',
    description: 'Deliver mobile-first layouts that work on phone and desktop.',
  },
  {
    Icon: Code2,
    title: 'API Development',
    description: 'Design and consume REST endpoints that power dynamic features.',
  },
];

export default function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-16 sm:px-6">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
          What I can contribute to a company as an intern, OJT trainee, or entry-level developer.
        </p>

        <div data-testid="service-offerings" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ Icon, title, description }, i) => (
            <motion.article
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.08 }}
              className="rounded-xl border border-black/10 px-4 py-5 dark:border-white/10"
            >
              <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight">
                <Icon size={18} aria-hidden="true" className="shrink-0 text-sky-600 dark:text-sky-400" />
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{description}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
