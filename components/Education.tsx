'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const RELEVANT_SKILL_GROUPS: Array<{ name: string; skills: string[] }> = [
  { name: 'Frontend', skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js'] },
  { name: 'Backend', skills: ['Python', 'Flask'] },
  { name: 'Database', skills: ['Supabase', 'PostgreSQL', 'SQL'] },
  { name: 'Tools', skills: ['Git', 'GitHub'] },
];

const ACADEMIC_PROJECTS = [
  { name: 'MoneyTrack', context: 'finance tracking dashboard' },
  { name: 'Nevex E-Commerce', context: 'laptop and PC store platform' },
  { name: 'Personal Portfolio', context: 'this site' },
];

export default function Education() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="education" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-16 sm:px-6">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight">Education</h2>

        <article
          data-testid="education-card"
          className="mt-6 rounded-xl border border-black/10 px-4 py-5 dark:border-white/10"
        >
          <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight">
            <GraduationCap size={18} aria-hidden="true" className="shrink-0 text-sky-600 dark:text-sky-400" />
            Christ the King College of Calbayog Inc.
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Bachelor of Science in Computer Science — 3rd Year
          </p>

          <h4 className="mt-4 text-sm font-semibold tracking-wide">Relevant skills</h4>
          <div className="mt-2 space-y-3">
            {RELEVANT_SKILL_GROUPS.map(({ name, skills }) => (
              <div key={name}>
                <h5 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{name}</h5>
                <ul className="mt-1 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-black/10 px-3 py-1 text-sm text-zinc-700 dark:border-white/15 dark:text-zinc-300"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h4 className="mt-4 text-sm font-semibold tracking-wide">Academic projects</h4>
          <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            {ACADEMIC_PROJECTS.map(({ name, context }) => (
              <li key={name}>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{name}</span>
                <span> — {context}</span>
              </li>
            ))}
          </ul>
        </article>
      </motion.div>
    </section>
  );
}
