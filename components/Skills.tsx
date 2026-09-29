'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Database, GitBranch, Monitor, Server } from 'lucide-react';

const SKILL_GROUPS = [
  {
    Icon: Monitor,
    name: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    Icon: Server,
    name: 'Backend',
    skills: ['Python', 'Flask', 'Node.js', 'REST APIs'],
  },
  {
    Icon: Database,
    name: 'Database',
    skills: ['Supabase', 'PostgreSQL', 'SQL'],
  },
  {
    Icon: GitBranch,
    name: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Figma'],
  },
];

export default function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-16 sm:px-6">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
          Technologies I use to build practical, scalable web applications.
        </p>

        <div data-testid="skill-groups" className="mt-6 grid gap-3 sm:grid-cols-2">
          {SKILL_GROUPS.map(({ Icon, name, skills }, i) => (
            <motion.article
              key={name}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.08 }}
              className="rounded-xl border border-black/10 px-4 py-5 dark:border-white/10"
            >
              <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight">
                <Icon size={18} aria-hidden="true" className="shrink-0 text-sky-600 dark:text-sky-400" />
                {name}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-black/10 px-3 py-1 text-sm text-zinc-700 dark:border-white/15 dark:text-zinc-300"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
