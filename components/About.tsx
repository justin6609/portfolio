'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Database,
  GraduationCap,
  Layers,
  Monitor,
  Palette,
  Puzzle,
  Server,
} from 'lucide-react';

const HIGHLIGHTS = [
  { Icon: Layers, label: 'Full-stack web development' },
  { Icon: Monitor, label: 'Frontend development' },
  { Icon: Server, label: 'Backend development' },
  { Icon: Database, label: 'Database development' },
  { Icon: Palette, label: 'UI/UX' },
  { Icon: Puzzle, label: 'Problem solving' },
  { Icon: GraduationCap, label: 'Continuous learning' },
];

const STATS: Array<{ value: string; label: string }> = [
  { value: '3rd Year', label: 'Computer Science Student' },
  { value: 'Full-Stack', label: 'Development' },
  { value: 'Multiple', label: 'Web Projects' },
  { value: 'Always', label: 'Learning' },
];

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-16 sm:px-6">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight">About Me</h2>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
          I&apos;m a Computer Science student focused on developing practical web
          applications — from responsive interfaces to the APIs and databases behind
          them.
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {HIGHLIGHTS.map(({ Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3 text-sm dark:border-white/10"
            >
              <Icon size={18} aria-hidden="true" className="shrink-0 text-sky-600 dark:text-sky-400" />
              {label}
            </li>
          ))}
        </ul>

        <ul data-testid="about-stats" className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <li
              key={`${value}-${label}`}
              className="rounded-xl border border-black/10 px-4 py-5 text-center dark:border-white/10"
            >
              <span className="block text-2xl font-bold tracking-tight">{value}</span>{' '}
              <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
